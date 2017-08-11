import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    addNavigationHelpers,
    StackNavigator,
    DrawerNavigator
} from 'react-navigation';

import Menu from './containers/Home/Menu';
import JobToday from './containers/Home/JobToday';

import Detail from '~/ui/containers/Home/JobToday/List/Detail';
import Time from '~/ui/containers/Home/JobToday/List/Detail/Time';
import Call from '~/ui/containers/Home/JobToday/List/Detail/Call';
import Chat from '~/ui/containers/Home/JobToday/List/Detail/Chat';
import Tally from '~/ui/containers/Home/JobToday/List/Detail/Tally';

import General from '~/ui/containers/Home/CreateNewJob/General';
import Delivery from '~/ui/containers/Home/CreateNewJob/Delivery';
import Enquiry from './containers/Home/Menu/Enquiry'
import TallyService from '~/ui/containers/Home/CreateNewJob/TallyService'

import material from '~/theme/variables/material';
import Notifications from './containers/Home/Notification';
import ChatAdmin from './containers/Home/Chat';
import Filter from './containers/Home/Filter';

export const initialRouteName = 'jobtoday'
export const AppNavigator = DrawerNavigator(
    {
        jobtoday: {
            screen: StackNavigator(
                {
                    jobtoday_screen: {
                        screen: JobToday,
                    },
                    detail_screen: {
                        screen: Detail
                    },
                    time_screen: {
                        screen: Time
                    },
                    call_screen: {
                        screen: Call
                    },
                    chat_screen: {
                        screen: Chat
                    },
                    tally_screen: {
                        screen: Tally
                    },
                    general_screen: {
                        screen: General,
                    },
                    delivery_screen: {
                        screen: Delivery
                    },
                    tallyservice_screen: {
                        screen: TallyService
                    },
                },
                {
                    headerMode: 'none'
                }
            )
        },
        enquiry: {
            screen: Enquiry
        },
        notification_screen: {
            screen: Notifications
        },
        listchat_screen: {
            screen: ChatAdmin
        },
        filter_screen: {
            screen: Filter
        },
    },
    {
        initialRouteName,
        drawerWidth: material.deviceWidth * 0.8,
        drawerPosition: 'left',
        contentComponent: props => <Menu {...props} />
    }
);

// const AppWithNavigationState = ({ dispatch, nav }) =>
//     <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />;

// const mapStateToProps = state => ({
//     nav: state.nav
// });

// export default connect(mapStateToProps)(AppWithNavigationState);
