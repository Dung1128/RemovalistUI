import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    addNavigationHelpers,
    StackNavigator,
    DrawerNavigator
} from 'react-navigation';

import Menu from './containers/Home/Menu';
import JobToday from './containers/Home/JobToday';
import General from './containers/Home/General';
import Delivery from './containers/Home/Delivery';
import Enquiry from './containers/Home/Menu/Enquiry'
import TallyService from './containers/Home/TallyService'

import material from '~/theme/variables/material';

export const initialRouteName = 'jobtoday'
export const AppNavigator = DrawerNavigator(
    {
        jobtoday: {
            screen: JobToday,
        },
        enquiry: {
            screen: Enquiry
        },
        createnewjob: {
            screen: StackNavigator(
                {
                    general_screen: {
                        screen: General,
                    },  
                    delivery_screen: {
                        screen: Delivery
                    },
                    tally_screen: {
                        screen: TallyService
                    },
                },
                {
                    headerMode: 'none'
                }
            )
        },
        // notification: {
        //     screen: StackNavigator(
        //         {
        //             Notifications_Screen: {
        //                 screen: Notifications
        //             },
        //             Detail_Noti: {
        //                 screen: DetailNoti
        //             }
        //         },
        //         {
        //             headerMode: 'none'
        //         }
        //     )
        // }
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
