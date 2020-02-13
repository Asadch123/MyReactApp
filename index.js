/**
 * @format
 */
import React from 'react';

import {AppRegistry} from 'react-native';
import App from './App';
import Login from '@component/Login/Com_login';
import {name as appName} from './app.json';
 import {Provider} from 'react-redux';
import {createStore,combineReducers} from 'redux';
import Reducer from './app/store/Reducer';
import ReducerB from './app/store/ReducerB';

const rootReducer=combineReducers({
    r:Reducer,
    rB:ReducerB
});

const store= createStore(rootReducer); 

//<Provider store={store}> App</Provider>


class MyApp extends React.Component{
render(){
    return(
        <Provider store={store}><App/></Provider>
    );
}
}

AppRegistry.registerComponent(appName, () =>MyApp);
