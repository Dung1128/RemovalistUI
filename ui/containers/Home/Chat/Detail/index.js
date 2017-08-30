import React, {
  Component,
} from 'react';
import material from '~/theme/variables/material'
import {
  Linking,
  Platform,
  Dimensions,
} from 'react-native';
import { Container } from 'native-base';
import Header from '~/ui/components/Header';
import GiftedMessenger from './GiftedMessenger';
import { logo } from '~/assets'
import {
  Client,
  Constants,
  AccessManager,
} from 'react-native-twilio-chat';


let STATUS_BAR_HEIGHT = material.toolbarHeight;

class GiftedMessengerContainer extends Component {

  constructor(props) {
    super(props);

    this._isMounted = false;
    this._messages = this.getInitialMessages();

    this.state = {
      messages: this._messages,
      isLoadingEarlierMessages: false,
      typingMessage: '',
      allLoaded: false,
    };
  }

  getToken(identity) {
    return fetch('http://localhost:3000/token?device=' + Platform.OS + '&identity=' + identity, {
      method: 'get',
    })
      .then(res => res.json());
  }

  parseMessage(message) {
    return {
      uniqueId: message.sid,
      text: message.body,
      name: message.author,
      position: message.author === this.state.client.userInfo.identity ? 'right' : 'left',
      date: message.timestamp,
      image: logo
    };
  }

  initializeMessenging(identity) {
    console.log('starting init');
    this.getToken(identity)
      .then(({ token }) => {
        // initaite new Access Manager
        const accessManager = new AccessManager(token);
        console.log(token)
        accessManager.onTokenWillExpire = () => {
          this.getToken(identity)
            .then(newToken => accessManager.updateToken(newToken.token));
        };

        accessManager.onTokenInvalid = () => {
          console.log('Token is invalid');
        };

        accessManager.onTokenExpired = () => {
          console.log('Token is expired');
        };

        // initiate the client with the token, not accessManager
        const client = new Client(token);

        client.onError = ({ error, userInfo }) => {
          console.log(error);
          console.log(userInfo);
        };

        client.onSynchronizationStatusChanged = (status) => {
          console.log(status);
        };

        client.onClientConnectionStateChanged = (state) => {
          // console.log(state);
        };

        client.onClientSynchronized = () => {
          console.log('client synced');
          client.getPublicChannels()
            .then(res => {
              const firstChannel = res.items[0]
              // console.log(firstChannel.sid)

              client.getChannel(firstChannel.sid)
                .then((channel) => {
                  channel.initialize()
                    .then(() => {
                      console.log(channel);
                      if (channel.status !== Constants.TCHChannelStatus.Joined) {
                        channel.join();
                      }

                      channel.getMessages(20)
                        .then((messages) => {
                          // array of message instances
                          // console.log(messages)
                          const parsedMessages = messages.map(message => this.parseMessage(message))
                          // console.log(parsedMessages)
                          this.setMessages(parsedMessages);
                        })

                    })
                    .catch((error) => {
                      console.log(error);
                    });

                  channel.onTypingStarted = (member) => {
                    this.setState({ typingMessage: member.userInfo.identity + ' is typing...' });
                  };

                  channel.onTypingEnded = () => {
                    this.setState({ typingMessage: '' });
                  };

                  channel.onMessageAdded = message => this.handleReceive(this.parseMessage(message));


                  this.setState({ client, channel, accessManager });



                });


            });


        };

        client.initialize()
          .then(() => {
            console.log(client);
            console.log('client initilized');
            // register the client with the accessManager
            accessManager.registerClient();
          });
      });
  }


  componentDidMount() {

    this.initializeMessenging(this.props.navigation.state.params.username);
  }

  componentWillUnmount() {
    this._isMounted = false;
    try{
      this.state.client && this.state.client.shutdown()
      this.state.channel && this.state.channel.close()
    } catch(e){
      console.log(e)
    }
  }

  getInitialMessages() {
    return [];
  }

  setMessageStatus(uniqueId, status) {
    const messages = [];
    let found = false;

    for (let i = 0; i < this._messages.length; i++) {
      if (this._messages[i].uniqueId === uniqueId) {
        const clone = Object.assign({}, this._messages[i]);
        clone.status = status;
        messages.push(clone);
        found = true;
      } else {
        messages.push(this._messages[i]);
      }
    }

    if (found === true) {
      this.setMessages(messages);
    }
  }

  setMessages(messages) {
    this._messages = messages;

    // append the message
    this.setState({
      messages,
    });
  }

  handleSend(message = {}) {
    if (this.state.client) {
      this.state.channel.sendMessage(message.text)
        .catch(error => console.error(error));
    } else {
      // this.initializeMessenging(message.text);
      // message.uniqueId = Math.round(Math.random() * 10000); // simulating server-side unique id generation
      // this.setMessages(this._messages.concat(message));
      // this.botMessage(`Hello ${message.text}!`, 1000)
      // .then(() => this.botMessage(BOT_CONFIRMATIONS[Math.floor(Math.random() * BOT_CONFIRMATIONS.length)], 2000));
    }
  }

  handleReceive(message = {}) {
    // make sure that your message contains :
    // text, name, image, position: 'left', date, uniqueId
    this.setMessages(this._messages.concat(message));
  }

  onErrorButtonPress(message = {}) {
    // Your logic here
    // re-send the failed message

    // remove the status
    this.setMessageStatus(message.uniqueId, '');
  }

  render() {

    // console.log(this.state.messages)
    return (

      <Container>
        <Header
          title='Chat Detail'
          iconLeft='back'
          onPress={() => this.props.navigation.goBack()}
        />

        <GiftedMessenger
          ref={c => this._GiftedMessenger = c}

          styles={{
            bubbleRight: {
              marginLeft: 70,
              backgroundColor: '#007aff',
            },
          }}

          autoFocus={false}
          messages={this.state.messages}
          handleSend={this.handleSend.bind(this)}
          onErrorButtonPress={this.onErrorButtonPress.bind(this)}
          maxHeight={Dimensions.get('window').height - STATUS_BAR_HEIGHT}

          loadEarlierMessagesButton={false}

          senderName='Awesome Developer'
          senderImage={null}
          onImagePress={this.onImagePress}
          displayNames={true}

          onChangeText={() => this.state.channel ? this.state.channel.typing() : false}

          parseText={true} // enable handlePhonePress, handleUrlPress and handleEmailPress
          handlePhonePress={this.handlePhonePress}
          handleUrlPress={this.handleUrlPress}
          handleEmailPress={this.handleEmailPress}

          isLoadingEarlierMessages={this.state.isLoadingEarlierMessages}

          typingMessage={this.state.typingMessage}
        />
      </Container>
    );
  }

  handleUrlPress(url) {
    Linking.openURL(url);
  }

}


module.exports = GiftedMessengerContainer;
