
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
Image
} from 'react-native';


import styles from '@component/Styles';
import Header from '@component/Header';
import CmnApi from '../CmnApi';

class Login extends Component{

    static navigationOptions = { header: null };


constructor(props){
    super(props)
    global.SampleVar = '';
    global.BaseURL = CmnApi._GetBaseURL();
    global.UserID = '';
    global.CompanyID = '';

    this.state={ Num1:0,
                Num2:0, 
                result:null ,
                isLoding:true,
                dataSource:null,
                isSuccess:false,
                errorstring:null,
                loaded:true,
                error:null,
                userCred:[],
                userName:'',
                password:'',
                responseCode:null,
                responseMsg:null,
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
    this.props.navigation.replace('DashBoard');
  }
  ShowDashboard=()=>{
    this.props.navigation.replace('DashBoard');
  }

  GetReault=()=>{
    <ActivityIndicator/>
    this.setState({loaded:false});
    let url=global.BaseURL +'/UserMasters';

    fetch(url)
    .then((response) => response.json())
    .then(this.showdata)
    .catch(this.badstuff)
  }

  /* 
  POstReault=()=>{
    let uname='';
    let pass='';
     uname=this.state.userName;
     pass=this.state.password;
    this.setState({loaded:false});
    let url= global.BaseURL +'/UserMasters';

    var bodydata=JSON.stringify({UserName:uname,Password:pass});

    fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        'Content-Type': 'application/json',
        },
        body:bodydata,
      })
    .then(this.processResponse)
    .then(this.showdata)
    .catch(this.badstuff)
    } 
       processResponse=(response)=> {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]).then(res => ({
          statusCode: res[0],
          data: res[1]
        }));
      }

  showdata = (data)=>{
    let responseArry=JSON.stringify(data);
    console.log(data);

      this.setState({
        loaded: true,
        dataSource: data,
        showList: true,
        isSuccess:true,
        result:JSON.stringify(data)
      });
      JSON.parse(responseArry, (key, value) => {
        if (key=='statusCode'){
            this.setState({responseCode:value});
        }
      });
      if (this.state.responseCode=='200'){
          this.Show();
      }
      

      if (this.state.responseCode=='500'){
          this.setState({responseMsg:'Invalid User or Password.'});
      }
     
  }

  badstuff = (err)=>{
    this.setState({error:err.message,loaded:true});
}
 */

//-------------- CODE FOR ADDING COMMON API POST CLASS --------------------------

Postdata= async ()=>{
  this.setState({loaded:false});

  let uname='';
  let pass='';
   uname=this.state.userName;
   pass=this.state.password;
  let url= global.BaseURL +'/UserMasters';
  var bodydata=JSON.stringify({UserName:uname,Password:pass});
 
 await CmnApi._ApiPostData('/UserMasters',bodydata);
      let _result=CmnApi._ApiPostResult();
      if (_result.statusCode=='200'){
        global.UserID=_result.data.UserID;
        global.CompanyID=_result.data.CompanyID;

        console.log('glb_UserID: '+global.UserID);
        console.log('glb_CompanyID: '+global.CompanyID);
            this.ShowDashboard();
        }
       else if (_result.statusCode=='500'){
          this.setState({responseMsg:'Invalid User or Password.'});
      }else{
        this.setState({responseMsg:_result.data});
      }

      this.setState({loaded:true});
}


// -------------------------------------------------------------------------


render(){
    const {container,MainVw,txtbox,btnNew,BtnVW,Loadinglabel,errlabel,label} = styles;

   /*  if (!this.state.loaded) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    } */

 return(

    <ScrollView style={container}>
        <View style={MainVw}>
        <View style={{justifyContent:"center",alignItems:"center"}}>
        <Image
          style={{width: 150, height: 150}}
          source={{uri: 'https://gdurl.com/j2_V'}}
        />
        </View>
      
        <View style={{padding:10,marginTop:40}}>
        <TextInput ref={input => { this._Username = input }} placeholder="Username"  style={txtbox} onChangeText={userName=>this.setState({userName})}></TextInput>
        
        <TextInput secureTextEntry={true} placeholder="Password"  style={txtbox} onChangeText={password=>this.setState({password})}></TextInput>

       <TouchableOpacity style={btnNew} onPress={this.Postdata}>
           <Text style={{textAlign:"center",color:"white" ,fontWeight:"Bold",fontSize:18}}>
           Login
           </Text>
       </TouchableOpacity>

        </View>
       
        <View style={BtnVW}>
           
             { !this.state.loaded && (
                //  <Text style={Loadinglabel}>Loading..</Text> &&
                <ActivityIndicator />
             )}
             {this.state.error &&(
                    <Text style={errlabel}>{this.state.error}</Text>
             )}
             {this.state.loaded &&(
                    <Text style={errlabel}>{this.state.responseMsg}</Text>
             )}
                  
        </View>
      
       

        </View>
    </ScrollView>
    

 );
 }
}

export default Login