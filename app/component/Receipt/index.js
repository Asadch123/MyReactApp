
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
Image,
Picker,
Alert,
} from 'react-native';


import styles from '@component/Styles';
import Header from '@component/Header';
import ModalDropdown from 'react-native-modal-dropdown';
import DatePicker from 'react-native-datepicker'
import CmnApi from '../CmnApi';
import ImagePicker from 'react-native-image-picker';
const options = {
    title: 'Select a Photo',
    takePhotoButtonTitle: 'Take a Photo',
    chooseFromLibraryButtonTitle:'Choose from gallery',
    quality:1,
  };


class Receipt extends Component{

constructor(props){
    super(props)

 

    this.state={ 
                result:null ,
                isLoding:true,
                dataSource:null,
                isSuccess:false,
                loaded:true,
                error:null,
                narration:'',
                responseCode:null,
                responseMsg:null,
                date:new Date(),
                mode:null,
                fromAcc:null,
                toAcc:null,
                dataSource2:null,
                vAmount:null,
                respData:null,
                savedVoucherNo:null,
                ImageSource:null,
                Imagedata:null,
            }

    this.myTextInput = React.createRef();
}

selectPhoto=()=>{
    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
      
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = { uri: response.uri };
      
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      
          this.setState({
            ImageSource: source,
            Imagedata:response.uri, 
          });
        }
      });
}


componentDidMount() {

    this.fillDropDowns();

  }

  fillDropDowns = async ()=>{

    await CmnApi._ApiGetData('/Accounts');
    let _result=CmnApi._ApiPostResult();

    if (_result.statusCode=='200'){
          this.setState({
           loaded: false,
           dataSource:null,
            dataSource:_result.data
              });
            }
  }


  baseURL=global.BaseURL;
  

validations=()=>{
  let result =false;

  if (this.state.fromAcc==null || this.state.fromAcc=='0' ){
    alert('Select From Account');
  }else if(this.state.toAcc==null || this.state.toAcc=='0'){
    alert('Select To Account');
  }else if(this.state.narration==null|| this.state.narration==''){
    alert('Enter some Narration');
  }else if(this.state.vAmount==null){
    alert('Enter some Amount');
  }else{
    result=true;
  }
  return result
}

 //-------------- CODE FOR ADDING COMMON API POST CLASS --------------------------
submitRecord=async()=>{
  if (this.validations()){
    await this.Postdata();
  }
}


Postdata= async ()=>{
  this.setState({loaded:true});

  let _FromAcc='';
  let _ToAcc='';
  let _Narration='';
  let _Date='';
  let _VoucherType='Receipt';
  let _ItemName='';
  let _Qty=0;
  let _Amount='';
  let _UserID=global.UserID;

  _FromAcc=this.state.fromAcc;
  _ToAcc=this.state.toAcc;
  _Narration=this.state.narration;
  _Date=this.state.date;
  _Amount=this.state.vAmount;

  var bodydata=JSON.stringify({VoucherType:_VoucherType,FromAccountCode:_FromAcc,ToAccountCode:_ToAcc,vDate:_Date,ItemName:_Narration,Qty:_Qty,Amount:_Amount,UserID:_UserID});
  

 await CmnApi._ApiPostData('/Transactions',bodydata);
      let _result=CmnApi._ApiPostResult();
      if (_result.statusCode=='200'){
      
        this.setState({
          savedVoucherNo:_result.data
        });

       let imagename= this.state.savedVoucherNo

      let body = new FormData();
      body.append('photo', { uri: this.state.Imagedata, name: imagename+'.png', filename: 'imageName.png', type: 'image/png' });
      body.append('Content-Type', 'image/png');

      await CmnApi._ApiPostImages('Upload/PostImage', body);
      let _ImageResult = CmnApi._ApiPostResult();

      this.setState({
        loaded:false
      });

        console.log('imagersult: '+_ImageResult);

        //------ALERT-----------------------------

        Alert.alert(
          'Successfully Saved !',
          this.state.savedVoucherNo,
          [
            {text: 'OK', onPress: () => 
           this.setState({
            fromAcc:null,
            toAcc:null,
            narration:null,
            vAmount:null,
            date:new Date(),
           ImageSource:null
          }),
  
          },
          ],
          {cancelable: false},
        );

      //--------------------------------------------

        }
       else if (_result.statusCode=='500'){
          this.setState({responseMsg:'Something went wrong, Contact Support.'});
      }else{
        this.setState({responseMsg:_result.data});
      }

    
}


// -------------------------------------------------------------------------


render(){
    const {Rcpdatetimepkr,container,MainVw,txtbox,btnNew,BtnVW,Loadinglabel,errlabel,label,dropdown,datetimepkr,txtboxSqr} = styles;
    if (this.state.loaded) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    
    return(

    <ScrollView style={{ flex:1,
      backgroundColor:'#D0D3D4',
      flexGrow: 1}}>
        <View >

        <View style={{padding:5}}>
      
        <Text style={{ fontSize:17,
                        paddingBottom:10,
                        paddingTop:15}}>
                          From Account
        </Text>
        <Picker style={{   backgroundColor:'white',
                            borderColor:"#fec119",
                            fontSize:15,
                            marginTop:3,
                            elevation: 8,
                            borderRadius: 14,
                            borderWidth: 1}}
             selectedValue={this.state.fromAcc}
            onValueChange={(modeValue, modeIndex) => this.setState({fromAcc: modeValue})}>
              <Picker.Item key={'unselectable'} label={'--Select--'} value={0} />

          { this.state.dataSource.map((item, key)=>(
            <Picker.Item label={item.AccountName} value={item.AccountNo} key={key} />)
            )}
        </Picker>

        
        <TextInput  placeholder="Amount" keyboardType="Numeric" style={txtboxSqr} value={this.state.vAmount} onChangeText={vAmount=>this.setState({vAmount})}></TextInput>
        
        <TextInput multiline={true} placeholder="Narration"  style={txtboxSqr} value={this.state.narration} onChangeText={narration=>this.setState({narration})}></TextInput>
        
        <Text style={{ fontSize:17,
                        paddingBottom:10,
                        paddingTop:10}}>To Account</Text>
        <Picker style={{   backgroundColor:'white',
                            borderColor:"#fec119",
                            fontSize:15,
                            marginTop:3,
                            elevation: 8,
                            borderRadius: 14,
                            borderWidth: 1}}
             selectedValue={this.state.toAcc}
            onValueChange={(modeValue, modeIndex) => this.setState({toAcc: modeValue})}>
              <Picker.Item key={'unselectable'} label={'--Select--'} value={0} />
          { this.state.dataSource.map((item, key)=>(
            <Picker.Item label={item.AccountName} value={item.AccountNo} key={key} />)
            )}
        </Picker>

      <View style={{flex:1,flexDirection:'row'}}>
              <View style={{ flex: 5 }}>
                <DatePicker
                  style={{
                    backgroundColor: 'white',
                    fontSize: 15,
                    marginTop: 8,
                    elevation: 10
                  }}

                  date={this.state.date}
                  mode="date"
                  placeholder="Select Date"
                  format="DD-MMM-YYYY"
                  minDate="2000-01-01"
                  maxDate="2099-12-31"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(date) => { this.setState({ date: date }) }}
                />
              </View>
              <View style={{ flex: 5 }}>
                <View style={{flexDirection:'row-reverse'}}>
                  <View style={{flex:1,alignItems:'flex-end'}}>
                    <Image style={{ height: 120, width: 120, marginTop: 10 }}
                      source={this.state.ImageSource != null ? this.state.ImageSource :
                        require('./img/ImageNA.jpg')}
                    >
                    </Image>
                      <TouchableOpacity style={{
                      fontSize: 12,
                      backgroundColor: '#fec119',
                      justifyContent: 'space-around',
                      borderRadius: 10, marginTop: 5, padding: 5
                    }} onPress={this.selectPhoto}>
                      <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
                        Select Image
                      </Text>
                    </TouchableOpacity>
                  </View>
                
                </View>
              </View>
      </View>
       
         

       <TouchableOpacity style={{  marginTop:5,
                                  justifyContent:'space-around',
                                  borderRadius:20,
                                  padding:13,
                                  backgroundColor:"#fec119",
                                  elevation: 8}} onPress={this.submitRecord}>
           <Text style={{textAlign:"center",color:"white" ,fontWeight:"Bold",fontSize:18}}>
           Save
           </Text>
       </TouchableOpacity>
     

       

        </View>
       
        <View style={BtnVW}>
           
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

export default Receipt