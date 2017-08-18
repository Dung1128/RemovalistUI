import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NativeModules, StatusBar, View } from 'react-native'
import { StyleProvider } from 'native-base'

import getTheme from '~/theme/components'
import material from '~/theme/variables/material'

import Login from './containers/Login'
import Home from './containers/Home'
import Toasts from './components/Toasts'
import * as authSelectors from '~/store/selectors/auth'

const UIManager = NativeModules.UIManager


@connect(state => ({
    isLogged: authSelectors.isLogged(state),
}), null)
export default class App extends Component {

    componentWillMount() {
        UIManager.setLayoutAnimationEnabledExperimental &&
            UIManager.setLayoutAnimationEnabledExperimental(true)
    }

    // init route with tab, then each page in tab will have stack navigator
    // which will not be cached, but tab at home will be, and it should be
    render() {
        const { user, isLogged } = this.props
        return (
            <StyleProvider style={getTheme(material)}>
                <View style={{ flex: 1 }}>
                    <Home screenProps={user} />
                </View>
            </StyleProvider>
        )
    }
}

