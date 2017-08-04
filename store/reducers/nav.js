import { NavigationActions } from 'react-navigation'

import {AppNavigator, initialRouteName} from '~/ui/routes'
import {TabDatLich} from '~/ui/router/TabNavigation'
// home is like the root page, the very first one to go 
const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams(initialRouteName)
)

export const nav = (state = initialState, action) =>   
  AppNavigator.router.getStateForAction(action, state) || state

const initialStateBook = TabDatLich.router.getStateForAction(
  TabDatLich.router.getActionForPathAndParams('datlichle')
)

export const navBook = (state = initialStateBook, action) =>
TabDatLich.router.getStateForAction(action, state) || state
