
import React, { Component } from 'react'
import {
StyleSheet, 
View,
Button,
TouchableOpacity,
Text,
TextInput,
ScrollView,
ActivityIndicator,
FlatList,
Container 
} from 'react-native';
class UsersList extends Component{

constructor(props){
    super(props)
    this.state={ Num1:0,
                Num2:0, 
                result:0 ,
                isLoding:true,
                dataSource:null,
                showList: false,
                dlist:[],
                errormsg:null,
            }
    this.myTextInput = React.createRef();
}




Sum=()=>{
    let n1=parseFloat(this.state.Num1);
    let n2=parseFloat(this.state.Num2);
    
    let r=n1+n2;
    
    this.setState({result:r});
    this._Username.clear();
    this._Password.clear();
}

ClearControl=()=>{
    this._Username.clear();
    this._Password.clear();
    this.setState({result:''});
}

Show=()=>{
    this.props.navigation.navigate('Header');
  }

  
  componentDidMount(){
    return 
    /*
    fetch('http://172.16.64.110:90/api/UserMasters')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
      */
  }

  GetReault=()=>{
    <ActivityIndicator/>
    fetch('http://172.16.64.110:80/api/UserMasters')
    .then((response) => response.json())
    .then((responseJson) => {

      this.setState({
        isLoading: false,
        dataSource: responseJson,
        showList: true,
        
      }, function(){

      });
    })
    .catch((error) =>{
      console.error(error);
      this.setState({errormsg:error})

    });

  }


  

  render(){

    /*
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
         
        </View>
      )
    }
    */
   
    return(
     
      <View  style={styles.container}>
            <View>

              <Button onPress={this.GetReault} title="Press me" style={{paddingTop:50}}></Button>
    <           Text>{this.state.errormsg}</Text>
            </View>

              <View style={{flex: 1, paddingTop:50}}>
              {this.state.dataSource  && this.state.dataSource.length >0 &&(
                  this.state.dataSource.map( UserMaster => (
                    <View style={styles.row}>
                        
                        <Text key={UserMaster.Record_ID} style={styles.label}>
                        {UserMaster.UserName}{UserMaster.Password}
                        </Text>
                    </View>
  
                  ))
              )}
              
            </View>
         </View >
    );
  }


}
const styles=StyleSheet.create({
    container:{
      flex:1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
        },
container1:{
flex:1,
backgroundColor:'white'
},
container2:{
    flex:2,
    backgroundColor:'grey'
    },
container3:{
        flex:1,
    backgroundColor:'white'
    },
txtbox:{
    backgroundColor:'white',
    borderColor:"#fec119",
    borderWidth:1,
    
        },
label:{
    fontSize:20,
    paddingBottom:10,
    paddingTop:10,
    justifyContent: 'space-around'
        },
btn:{
    fontSize:20,
    marginTop:30,
    textAlign:'center',
    backgroundColor:"#fec119",
    padding:10,
    color:'white'
    },
opc:{
paddingLeft:150,
paddingRight:150
    },
row:{
    flexDirection:'row',
    justifyContent:'center'
},
Btncol:{
    paddingRight:5
}

})
export default UsersList