import React from 'react';
import {
    StyleSheet, 
    View,
    Button,
    TouchableOpacity,
    Text,
    TextInput,
    AppRegistry, 
    } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Header from '@component/Header';
import Login from '@component/Login/Com_login';
import OldLogin from '@component/Login/OldLogin';
import UsersList from '@component/Login/UsersList';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
//import { Icon } from 'react-native-elements';
import { color } from 'react-native-reanimated';
import Receipt from '@component/Receipt';
import Statement from '@component/Statement';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const DashBoard=createMaterialBottomTabNavigator(

    
    {
           
            Statement: {screen:Statement,
                navigationOptions:{
                    tabBarLabel:'Statement',
                    activeColor:'#fec119',
                    inactiveColor:'#000000',
                    barStyle:{backgroundColor:'#ffffff'},
                    tabBarIcon:()=>(
                        <View>
                            <Icon name={'book'} size={25} style={{color:'#000000'}} />
                        </View>
                    )
                }
            },
            Receipt: {screen:Receipt,
                navigationOptions:{
                    tabBarLabel:'Receipt',
                    activeColor:'#fec119',
                    inactiveColor:'#000000',
                    headerVisible: false,
                    barStyle:{backgroundColor:'#ffffff'},
                   
                    tabBarIcon:()=>(
                        <View>
                            <Icon name={'list'} size={25} style={{color:'#000000'}} />
                        </View>
                    )
                }
            }
    }

    
);

export default createAppContainer(DashBoard);