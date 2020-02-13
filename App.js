import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Header from '@component/Header';
import Login from '@component/Login/Com_login';
import DashBoard from '@component/DashBoard';
import Tempform from '@component/Login/Tempform';



const navigator = createStackNavigator({
    DashBoard: DashBoard,
    Tempform: Tempform,

},{
    initialRouteName:'Tempform',
    defaultNavigationOptions:{
    }
});


const App = createAppContainer(navigator);

export default App;
