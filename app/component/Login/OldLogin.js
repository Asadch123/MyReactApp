
import React, { Component } from 'react'
import {
StyleSheet, 
View,
Button,
TouchableOpacity,
Text,
TextInput,
ScrollView,
ActivityIndicator
} from 'react-native';
class OldLogin extends Component{

constructor(props){
    super(props)
    this.state={ Num1:0,
                Num2:0, 
                result:null ,
                isLoding:true,
                dataSource:null,
                isSuccess:false,
                errorstring:null,
                loaded:true,
                error:null,
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


    baseURL='http://172.16.56.117:91/api/UserMasters';
  //baseURL='http://172.16.64.110:90/api/UserMasters';


  GetReault=()=>{
    <ActivityIndicator/>
    this.setState({loaded:false});
    let url=this.baseURL ;

    fetch(url)
    .then((response) => response.json())
    .then(this.showdata)
    .catch(this.badstuff)
  }

  showdata = (data)=>{
      this.setState({
        loaded: true,
        dataSource: data,
        showList: true,
        isSuccess:true
      });
  }

  badstuff = (err)=>{
    this.setState({error:err.message,loaded:true});
}

render(){
 return(

    <ScrollView style={styles.container}>
        <Text style={styles.label}>Username</Text>
        <TextInput ref={input => { this._Username = input }} placeholder="Username" keyboardType='numeric' style={styles.txtbox} onChangeText={Num1=>this.setState({Num1})}></TextInput>
        <Text style={styles.label}>Password</Text>
        <TextInput ref={input => { this._Password = input }} placeholder="Password" keyboardType='numeric' style={styles.txtbox} onChangeText={Num2=>this.setState({Num2})}></TextInput>

        <Text style={styles.label}>Result</Text>
        <TextInput   style={styles.txtbox} value={this.state.result}></TextInput>
        
        { this.state.result ? <Text>{this.state.result}</Text> : null }
     
        <View  style={styles.row}>
            <View style={styles.Btncol}>
                <TouchableOpacity onPress={this.Sum}>
                    <Text  style={styles.Opcbtn}>Calculate</Text>
                </TouchableOpacity>
            </View>
            <View  style={styles.Btncol}>
                <TouchableOpacity onPress={this.ClearControl}>
                    <Text  style={styles.Opcbtn}>Clear</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.BtnVW}>
            <Button style={styles.btn} title="Go to Header Screen" onPress={this.Show}></Button>
        </View>
        
        <View style={styles.BtnVW}>
             <Button style={styles.btn} title="Login" onPress={this.GetReault}></Button>
           
             { !this.state.loaded && (
                 <Text style={styles.Loadinglabel}>Loading..</Text>
             )}
             {this.state.error &&(
                    <Text style={styles.errlabel}>{this.state.error}</Text>
             )}
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
      

    </ScrollView>
    

 );
 }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#D0D3D4',
        padding:10,
        flexGrow: 1
        },
container1:{
flex:1,
backgroundColor:'white'
},
BtnVW:{
    marginTop:15
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
  
    borderWidth:1,
    
        },
label:{
    fontSize:20,
    paddingBottom:10,
    paddingTop:10
        },
Loadinglabel:{
    fontSize:20,
    paddingBottom:10,
    paddingTop:10,
    textAlign :"center",
    color:'#fec119'
    },
errlabel:{
     fontSize:10,
     paddingBottom:10,
        paddingTop:10,
        color:'red',
        fontWeight:"bold",
        textAlign:"center"
    },
Opcbtn:{
    fontSize:20,
    marginTop:30,
    textAlign:'center',
    backgroundColor:"#fec119",
    padding:10,
    color:'white',
    paddingTop:20,
    justifyContent:'space-around'
    },

    btn:{
        fontSize:20,
        color:'white',
        paddingTop:20,
        justifyContent:'space-around'
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
export default OldLogin