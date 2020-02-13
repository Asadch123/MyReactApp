

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Text,
} from 'react-native';

import CmnFunc from '../CmnFunc';

 class Header extends Component{
  static navigationOptions = { header: null };
  
  constructor(){
    super()
    this.state={}
  }

  Show=()=>{
  //  this.props.navigation.replace('Login');

  alert(global.UserID);

  }

  render(){
    let elements=[]
    let row=[]
    let num=0
    for(let i=0; i<3;i++){
      num +=1
      row.push(
        <TouchableOpacity ><Text style={styles.btntxt}>{num}</Text></TouchableOpacity>
      )
      elements.push(
        <View style={styles.row}>
          {row}
        </View>
      )
    }

    return(
          <View style={styles.container}>
              <View style={styles.result}></View>
              <View style={styles.calculation}></View>
              <Button style={styles.btn} title="Go to Login Screen" onPress={this.Show}></Button>
              <View style={styles.buttons}>
                  <View style={styles.numbers}>
                   {elements}
                  </View>
                  <View style={styles.operations}></View>
              </View>
          </View>
    );
  }

}

const styles=StyleSheet.create({
  container:{
    flex:1
  },
  result:{
    flex:2,
    backgroundColor:'white'
  },
  calculation:{
    flex:1,
    backgroundColor:'#E5E7E9'
  },
  buttons:{
    flex:7,
    flexDirection:'row'
  },
  numbers:{
    flex:3,
    backgroundColor:'#273746',
  },
  operations:{
    flex:1,
    backgroundColor:'#5D6D7E',
  },
  row:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
  },
  btntxt:{
    fontSize:40,
    color:'white'
  }
})

export default Header