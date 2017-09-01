
import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  Dimensions,
  Animated,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
  PixelRatio
} from 'react-native';

import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import GiftedSpinner from 'react-native-gifted-spinner';
import { Button, Input } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import ButtonIcon from '~/ui/components/ButtonIcon'
import material from '~/theme/variables/material';
import styles from './styles'

export default class GiftedMessenger extends Component {

  static defaultProps = {
    displayNames: true,
    placeholder: 'Type a message...',
    styles: {},
    autoFocus: true,
    onErrorButtonPress: (message, rowID) => { },
    loadEarlierMessagesButton: false,
    loadEarlierMessagesButtonText: 'Load earlier messages',
    onLoadEarlierMessages: (oldestMessage, callback) => { },
    parseText: false,
    handleUrlPress: (url) => { },
    handlePhonePress: (phone) => { },
    handleEmailPress: (email) => { },
    initialMessages: [],
    messages: [],
    handleSend: (message, rowID) => { },
    maxHeight: Dimensions.get('window').height,
    senderName: 'Sender',
    senderImage: null,
    sendButtonText: 'Send',
    onImagePress: null,
    inverted: true,
    hideTextInput: false,
    submitOnReturn: false,
  }

  static propTypes = {
    displayNames: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
    styles: React.PropTypes.object,
    autoFocus: React.PropTypes.bool,
    onErrorButtonPress: React.PropTypes.func,
    loadEarlierMessagesButton: React.PropTypes.bool,
    loadEarlierMessagesButtonText: React.PropTypes.string,
    onLoadEarlierMessages: React.PropTypes.func,
    parseText: React.PropTypes.bool,
    handleUrlPress: React.PropTypes.func,
    handlePhonePress: React.PropTypes.func,
    handleEmailPress: React.PropTypes.func,
    initialMessages: React.PropTypes.array,
    messages: React.PropTypes.array,
    handleSend: React.PropTypes.func,
    maxHeight: React.PropTypes.number,
    senderName: React.PropTypes.string,
    senderImage: React.PropTypes.object,
    sendButtonText: React.PropTypes.string,
    onImagePress: React.PropTypes.func,
    inverted: React.PropTypes.bool,
    hideTextInput: React.PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this._data = [];
    this._rowIds = [];

    var textInputHeight = 0;
    if (this.props.hideTextInput === false) {
      textInputHeight = 44;
    }

    this.listViewMaxHeight = this.props.maxHeight - textInputHeight;

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        if (typeof r1.status !== 'undefined') {
          return true;
        }
        return r1 !== r2;
      }
    });

    this.onSend = this.onSend.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
    this.renderLoadEarlierMessages = this.renderLoadEarlierMessages.bind(this)
    this.renderRow = this.renderRow.bind(this)
    this.onKeyboardWillShow = this.onKeyboardWillShow.bind(this)
    this.onKeyboardWillHide = this.onKeyboardWillHide.bind(this)

    this.state = {
      dataSource: ds.cloneWithRows([]),
      text: '',
      disabled: true,
      height: new Animated.Value(this.listViewMaxHeight),
      isLoadingEarlierMessages: false,
      allLoaded: false,
    };
  }



  getMessage(rowID) {
    if (typeof this._rowIds[this._rowIds.indexOf(rowID)] !== 'undefined') {
      if (typeof this._data[this._rowIds[this._rowIds.indexOf(rowID)]] !== 'undefined') {
        return this._data[this._rowIds[this._rowIds.indexOf(rowID)]];
      }
    }
    return null;
  }

  getPreviousMessage(rowID) {
    if (typeof this._rowIds[this._rowIds.indexOf(rowID - 1)] !== 'undefined') {
      if (typeof this._data[this._rowIds[this._rowIds.indexOf(rowID - 1)]] !== 'undefined') {
        return this._data[this._rowIds[this._rowIds.indexOf(rowID - 1)]];
      }
    }
    return null;
  }

  getNextMessage(rowID) {
    if (typeof this._rowIds[this._rowIds.indexOf(rowID + 1)] !== 'undefined') {
      if (typeof this._data[this._rowIds[this._rowIds.indexOf(rowID + 1)]] !== 'undefined') {
        return this._data[this._rowIds[this._rowIds.indexOf(rowID + 1)]];
      }
    }
    return null;
  }

  renderName(rowData = {}, rowID = null) {
    if (this.props.displayNames === true) {
      var diffMessage = null;
      if (this.props.inverted === false) {
        diffMessage = null; // force rendering
      } else if (rowData.isOld === true) {
        diffMessage = this.getNextMessage(rowID);
      } else {
        diffMessage = this.getPreviousMessage(rowID);
      }
      if (diffMessage === null || (this._data[rowID].name !== diffMessage.name || this._data[rowID].id !== diffMessage.id)) {
        return (
          <Text style={[styles.name]}>
            {rowData.name}
          </Text>
        );
      }
    }
    return null;
  }

  renderDate(rowData = {}, rowID = null) {
    var diffMessage = null;
    if (this.props.inverted === false) {
      diffMessage = null; // force rendering
    } else if (rowData.isOld === true) {
      diffMessage = this.getNextMessage(rowID);
    } else {
      diffMessage = this.getPreviousMessage(rowID);
    }
    if (rowData.date instanceof Date) {
      if (diffMessage === null) {
        return (
          <Text style={[styles.date]}>
            {moment(rowData.date).calendar()}
          </Text>
        );
      } else if (diffMessage.date instanceof Date) {
        let diff = moment(rowData.date).diff(moment(diffMessage.date), 'minutes');
        if (diff > 5) {
          return (
            <Text style={[styles.date]}>
              {moment(rowData.date).calendar()}
            </Text>
          );
        }
      }
    }
    return null;
  }

  renderImage(rowData = {}, rowID = null) {
    if (rowData.image !== null) {

      var diffMessage = null;
      if (this.props.inverted === false) {
        diffMessage = null; // force rendering
      } else {
        diffMessage = this.getNextMessage(rowID);
      }

      if (diffMessage === null || (this._data[rowID].name !== diffMessage.name || this._data[rowID].id !== diffMessage.id)) {
        if (typeof this.props.onImagePress === 'function') {
          return (
            <TouchableHighlight
              underlayColor='transparent'
              onPress={() => this.props.onImagePress(rowData, rowID)}
              style={styles.imagePosition}
            >
              <Image source={rowData.image} style={[styles.imagePosition, styles.image, (rowData.position === 'left' ? styles.imageLeft : styles.imageRight)]} />
            </TouchableHighlight>
          );
        } else {
          return (
            <Image source={rowData.image} style={[styles.imagePosition, styles.image, (rowData.position === 'left' ? styles.imageLeft : styles.imageRight)]} />
          );
        }
      } else {
        return (
          <View style={styles.imagePosition} />
        );
      }
    }
    return (
      <View style={styles.spacer} />
    );
  }

  renderErrorButton(rowData = {}, rowID = null) {
    if (rowData.status === 'ErrorButton') {
      return (
        <ErrorButton
          onErrorButtonPress={this.props.onErrorButtonPress}
          rowData={rowData}
          rowID={rowID}
          styles={{
            errorButtonContainer: styles.errorButtonContainer,
            errorButton: styles.errorButton,
          }}
        />
      )
    }
    return null;
  }

  renderStatus(rowData = {}, rowID = null) {
    if (rowData.status !== 'ErrorButton' && typeof rowData.status === 'string') {
      if (rowData.status.length > 0) {
        return (
          <View>
            <Text style={styles.status}>{rowData.status}</Text>
          </View>
        );
      }
    }
    return null;
  }

  renderText(rowData = {}, rowID = null) {
    return (
      <Text
        style={[styles.text, (rowData.position === 'left' ? styles.textLeft : styles.textRight)]}
      >
        {rowData.text}
      </Text>
    );
  }


  renderRow(rowData = {}, sectionID = null, rowID = null) {
    return (
      <View>
        {this.renderDate(rowData, rowID)}
        {rowData.position === 'left' ? this.renderName(rowData, rowID) : null}
        <View style={styles.rowContainer}>
          {rowData.position === 'left' ? this.renderImage(rowData, rowID) : null}
          {rowData.position === 'right' ? this.renderErrorButton(rowData, rowID) : null}
          <View style={[styles.bubble, (rowData.position === 'left' ? styles.bubbleLeft : styles.bubbleRight), (rowData.status === 'ErrorButton' ? styles.bubbleError : null)]}>
            {this.renderText(rowData, rowID)}
            <Text style={rowData.position === 'left' ? styles.timeLeft : styles.timeRight}>{moment(rowData.date).format("HH:mm")}</Text>
          </View>
          {rowData.position === 'right' ? this.renderImage(rowData, rowID) : null}
        </View>
        {rowData.position === 'right' ? this.renderStatus(rowData, rowID) : null}
      </View>
    );
  }

  onChangeText(text) {
    this.setState({
      text: text
    })
    if (text.trim().length > 0) {
      this.setState({
        disabled: false
      })
    } else {
      this.setState({
        disabled: true
      })
    }
  }

  componentDidMount() {
    this.scrollResponder = this.refs.listView.getScrollResponder();

    if (this.props.messages.length > 0) {
      this.appendMessages(this.props.messages);
    } else if (this.props.initialMessages.length > 0) {
      this.appendMessages(this.props.initialMessages);
    } else {
      this.setState({
        allLoaded: true
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this._data = [];
    this._rowIds = [];
    this.appendMessages(nextProps.messages);
  }

  onKeyboardWillHide(e) {
    Animated.timing(this.state.height, {
      toValue: this.listViewMaxHeight,
      duration: 150,
    }).start();
  }

  onKeyboardWillShow(e) {
    Animated.timing(this.state.height, {
      toValue: this.listViewMaxHeight - (e.endCoordinates ? e.endCoordinates.height : e.end.height),
      duration: 200,
    }).start();
  }

  onSend() {

    var message = {
      text: this.state.text.trim(),
      name: this.props.senderName,
      image: this.props.senderImage,
      position: 'right',
      date: new Date(),
    };
    var rowID = this.appendMessage(message);
    this.props.handleSend(message, rowID);
    this.onChangeText('');
    this.scrollResponder.scrollTo({ x: 0, y: 0 });
  }

  postLoadEarlierMessages(messages = [], allLoaded = false) {
    this.prependMessages(messages);
    this.setState({
      isLoadingEarlierMessages: false
    });
    if (allLoaded === true) {
      this.setState({
        allLoaded: true,
      });
    }
  }

  preLoadEarlierMessages() {
    this.setState({
      isLoadingEarlierMessages: true
    });
    this.props.onLoadEarlierMessages(this._data[this._rowIds[this._rowIds.length - 1]], this.postLoadEarlierMessages);
  }

  renderLoadEarlierMessages() {
    if (this.props.loadEarlierMessagesButton === true) {
      if (this.state.allLoaded === false) {
        if (this.state.isLoadingEarlierMessages === true) {
          return (
            <View style={styles.loadEarlierMessages}>
              <GiftedSpinner />
            </View>
          );
        } else {
          return (
            <View style={styles.loadEarlierMessages}>
              <Button
                transparent
                style={styles.loadEarlierMessagesButton}
                onPress={() => { this.preLoadEarlierMessages() }}
              >
                <Text>{this.props.loadEarlierMessagesButtonText}</Text>
              </Button>
            </View>
          );
        }
      }
    }
    return null;
  }

  prependMessages(messages = []) {
    var rowID = null;
    for (let i = 0; i < messages.length; i++) {
      messages[i].isOld = true;
      this._data.push(messages[i]);
      this._rowIds.push(this._data.length - 1);
      rowID = this._data.length - 1;
    }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this._data, this._rowIds),
    });

    return rowID;
  }

  prependMessage(message = {}) {
    var rowID = this.prependMessages([message]);
    return rowID;
  }

  appendMessages(messages = []) {
    var rowID = null;
    for (let i = 0; i < messages.length; i++) {
      this._data.push(messages[i]);
      this._rowIds.unshift(this._data.length - 1);
      rowID = this._data.length - 1;
    }
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this._data, this._rowIds),
    });
    return rowID;
  }

  appendMessage(message = {}) {
    var rowID = this.appendMessages([message]);
    return rowID;
  }

  refreshRows() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this._data, this._rowIds),
    });
  }

  setMessageStatus(status = '', rowID) {
    if (status === 'ErrorButton') {
      if (this._data[rowID].position === 'right') {
        this._data[rowID].status = 'ErrorButton';
        this.refreshRows();
      }
    } else {
      if (this._data[rowID].position === 'right') {
        this._data[rowID].status = status;

        // only 1 message can have a status
        for (let i = 0; i < this._data.length; i++) {
          if (i !== rowID && this._data[i].status !== 'ErrorButton') {
            this._data[i].status = '';
          }
        }
        this.refreshRows();
      }
    }
  }

  renderAnimatedView() {
    if (this.props.inverted === true) {
      return (
        <Animated.View
          style={{
            height: this.state.height,
          }}

        >
          <ListView
            ref='listView'
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            renderFooter={this.renderLoadEarlierMessages}
            style={styles.listView}
            enableEmptySections={true}
            renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}

            // not working android RN 0.14.2
            onKeyboardWillShow={this.onKeyboardWillShow}
            onKeyboardWillHide={this.onKeyboardWillHide}

            /*
              keyboardShouldPersistTaps={false} // @issue keyboardShouldPersistTaps={false} + textInput focused = 2 taps are needed to trigger the ParsedText links
              keyboardDismissMode='interactive'
            */

            keyboardShouldPersistTaps="always"
            keyboardDismissMode='on-drag'

            {...this.props}
          />

        </Animated.View>
      );
    }
    return (
      <Animated.View
        style={{
          height: this.state.height,
        }}

      >
        <ListView
          ref='listView'
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderFooter={this.renderLoadEarlierMessages}
          style={styles.listView}
          enableEmptySections={true}
          // When not inverted: Using Did instead of Will because onKeyboardWillShow is not working in Android RN 0.14.2
          onKeyboardDidShow={this.onKeyboardWillShow}
          onKeyboardDidHide={this.onKeyboardWillHide}

          /*
            keyboardShouldPersistTaps={false} // @issue keyboardShouldPersistTaps={false} + textInput focused = 2 taps are needed to trigger the ParsedText links
            keyboardDismissMode='interactive'
          */

          keyboardShouldPersistTaps={true}
          keyboardDismissMode='on-drag'

          {...this.props}
        />

      </Animated.View>
    );

  }

  render() {
    return (
      <View
        style={styles.container}
        ref='container'
      >
        {(this.props.inverted === true ? this.renderAnimatedView() : null)}
        {this.renderTextInput()}
        {(this.props.inverted === false ? this.renderAnimatedView() : null)}
      </View>
    )
  }

  renderTextInput() {
    if (this.props.hideTextInput === false) {
      return (
        <View style={styles.textInputContainer}>
          <View >
            <ButtonIcon icon='add' color='white' size={15} />
          </View>
          <View style={styles.textInputContent}>
            <Input
              style={{ height: 30, alignItems: 'flex-start', lineHeight: 25 }}
              placeholder={this.props.placeholder}
              ref='textInput'
              onChangeText={this.onChangeText}
              value={this.state.text}
              autoFocus={this.props.autoFocus}
              returnKeyType={this.props.submitOnReturn ? 'send' : 'default'}
              onSubmitEditing={this.props.submitOnReturn ? this.onSend : null}
              blurOnSubmit={false}
              multiline
              clearTextOnFocus
              keyboardShouldPersistTaps='always'
            />
            <TouchableOpacity
              onPress={this.state.disabled ? null : this.onSend}
            >
              <Icon name='md-send' style={{ fontSize: 25 }} color={this.state.disabled ? 'gray' : material.redColor} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return null;
  }
}

class ErrorButton extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };

    this.onPress = this.onPress.bind(this)
  }

  static defaultProps = {
    onErrorButtonPress: () => { },
    rowData: {},
    rowID: null,
    styles: {},
  }

  onPress() {
    this.setState({
      isLoading: true,
    });

    this.props.onErrorButtonPress(this.props.rowData, this.props.rowID);
  }

  render() {
    if (this.state.isLoading === true) {
      return (
        <View style={[this.props.styles.errorButtonContainer, {
          backgroundColor: 'transparent',
          borderRadius: 0,
        }]}>
          <GiftedSpinner />
        </View>
      );
    }
    return (
      <View style={this.props.styles.errorButtonContainer}>
        <TouchableHighlight
          underlayColor='transparent'
          onPress={this.onPress}
        >
          <Text style={this.props.styles.errorButton}>↻</Text>
        </TouchableHighlight>
      </View>
    );
  }
}