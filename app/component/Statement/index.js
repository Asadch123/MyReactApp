
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
FlatList,Item,Picker,Modal,TouchableHighlight
} from 'react-native';


import styles from '@component/Styles';
import ModalDropdown from 'react-native-modal-dropdown';
import DatePicker from 'react-native-datepicker'
import CmnApi from '../CmnApi';
import CmnFunc from '../CmnFunc';
import Lightbox from 'react-native-lightbox';
import { Avatar } from 'react-native-elements';

class Statement extends Component{
  static navigationOptions = { header: null };

constructor(props){
    super(props)
  
    this.state={ 
        refreshing: true,
        dataSource:null,
        Fromdate:new Date(),
        Todate: new Date(),
        AccdataSource:null,
        AccountNo:null,
        CurrentBalance:null,
        modalVisible: false,
            }

}

componentDidMount() {
  
  this.fillDataSources();
  }
  toggleModal(visible) {
    this.setState({ modalVisible: visible });
  }

fillDataSources=()=>{
  let date= new Date();
  let frmdate= new Date(date.getFullYear(),date.getMonth(), 1);

  this.setState({refreshing:true,Fromdate:frmdate});
  //this.Getlistdata();
  this.fillDropDowns();
  
}

  //--------------FILLING DROPDOWNS DATASOURCE --------------------

  
  Getlistdata= async ()=>{

    this.setState({dataSource:null});

    await CmnApi._ApiGetData('/Transactions');
    let _result=CmnApi._ApiPostResult();

    if (_result.statusCode=='200'){
          this.setState({
           dataSource:null,
            dataSource:_result.data
              });
            }
  }


  fillDropDowns = async ()=>{
    await CmnApi._ApiGetData('/Accounts');
    let _result=CmnApi._ApiPostResult();
    if (_result.statusCode=='200'){
          this.setState({
            refreshing: false,
           AccdataSource:null,
           AccdataSource:_result.data
              });
            }
  }

//---------------------------------------------------------

//-------------- CODE FOR ADDING COMMON API get CLASS --------------------------

validations=()=>{
  let result =false;

  if (this.state.AccountNo==null || this.state.AccountNo=='0' ){
    alert('Select Any Account');
  }
 else{
    result=true;
  }
  return result
}

submitRecord=async()=>{
  if (this.validations()){
    await this.Postdata();
  }
}


Postdata= async ()=>{
  this.setState({refreshing:true});

  this.setState({
    dataSource:null,
    CurrentBalance:null,
  });

  console.log('Postdata called');
  let _FromDate='';
  let _ToDate='';
  let _AccountNo='';
  let _CompanyID='';
 

  _FromDate=this.state.Fromdate;
  _ToDate=this.state.Todate;
  _AccountNo=this.state.AccountNo;
  _CompanyID=global.CompanyID;

  var bodydata=JSON.stringify({AccountNo:_AccountNo,FromDate:_FromDate,ToDate:_ToDate,CompanyID:_CompanyID});
 

 await CmnApi._ApiPostData('/AccountStatement',bodydata);
      let _result=CmnApi._ApiPostResult();
      console.log(_result);


      if (_result.statusCode=='200'){
      
        this.setState({
          refreshing:false,
          dataSource:_result.data.StatementList,
          CurrentBalance:_result.data.CB,
        });
          
        }
        else if (_result.statusCode=='204'){
          this.setState({responseMsg:'No any data.'});
      }
       else if (_result.statusCode=='500'){
          this.setState({responseMsg:'Something went wrong, Contact Support.'});
      }else{
        this.setState({responseMsg:_result.data});
      }
      
       this.setState({
          refreshing:false
        });
      console.log('Postdata Finish');
}


showimage=(No)=>{
  return ( <Lightbox style = {{flex: 1}}>
    <Image
        style={{ width: 250, height: 250 }}
        resizeMode='center'
          source={{uri: CmnApi._GetUploadsURL()+ No +'.png.png'}}
        /> 
 </Lightbox>  )
}

// -------------------------------------------------------------------------


render(){
    const {Statementlabel,Statementdropdown,btnStatement,datetimepkr,StatementBal,Statementcontainer,container,MainVw,txtbox,btnNew,BtnVW,Loadinglabel,errlabel,label} = styles;

   
    if (this.state.refreshing) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

 return(


  <View style={Statementcontainer}>

    <View >
       <TouchableOpacity style={StatementBal} >
      <Text style={{textAlign:"center",color:"white" ,fontWeight:'bold',fontSize:24}}>
         Current Balance
      </Text>
      <Text style={{textAlign:"center",color:"white" ,fontWeight:'bold',fontSize:18}}>
      {this.state.CurrentBalance ? CmnFunc._currencyFormat(this.state.CurrentBalance) :'0.00'}
      </Text>
    </TouchableOpacity>
<View >


  <View style={{flexDirection:'row'}}>
   
      <View style={{flex:1,alignItems:'center'}}>
          <Text style={{fontSize:14}}>
            From Date
          </Text>
        <DatePicker
            style={datetimepkr}
            date={this.state.Fromdate}
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
            onDateChange={(date) => {this.setState({Fromdate: date})}}
          />
    </View>


    <View style={{flex:1,alignItems:'center'}}>
        <Text style={{fontSize:14}}>
            To Date
          </Text>
        <DatePicker
            style={datetimepkr}
            date={this.state.Todate}
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
            onDateChange={(date) => {this.setState({Todate: date})}}
          />
    </View>

</View>


  <View>
    
      <View style={{borderRadius: 20, borderWidth: 1, backgroundColor:'white', borderColor: 'white', overflow: 'hidden',margin:3}}>
        <Picker style={Statementdropdown}
             selectedValue={this.state.AccountNo}
            onValueChange={(modeValue, modeIndex) => this.setState({AccountNo: modeValue})}>
              <Picker.Item key={'unselectable'} label={'--Select Account--'} value={0} />

          { this.state.AccdataSource.map((item, key)=>(
            <Picker.Item label={item.AccountName} value={item.AccountNo} key={key} />)
            )}
          </Picker>
      </View>
        


        <TouchableOpacity style={btnStatement} onPress={this.submitRecord} >
           <Text style={{textAlign:"center",color:"white" ,fontWeight:'Bold',fontSize:15}}>
          View Transactions
           </Text>
       </TouchableOpacity>
  </View>
    
</View>


   
  </View>

     {this.state.dataSource !==null ?

    <ScrollView style={{marginTop:1}} >
        <View style={{marginTop:1}}>
        <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) => (
            <View style={{backgroundColor:'white',marginBottom:3}}>
                <View style={{padding:2 ,flexDirection:'row'}}>
                    <Text style={{ fontSize:12,
                                    marginTop:1,
                                    marginBottom:2,
                                    fontWeight:'bold',
                                    color:'#fec119'}}>
                       {CmnFunc._getParsedDate(item.VoucherDate)}
                        </Text>
                      
                        { 
                         <TouchableOpacity  onPress={() => { this.toggleModal(true) }}>  
                           <Image
                              style={{width: 35, height: 25,marginLeft:15}}
                              source={{uri: CmnApi._GetUploadsURL()+ item.VoucherNo +'.png.png'}}
                            /> 
                          </TouchableOpacity>

                        }

                  <View style={{flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: 20}} >

                    <Modal  transparent={false}
                      visible={this.state.modalVisible}
                      onRequestClose={() => { console.log("Modal has been closed.") }}>

                      <View style={{flex: 1,
                                    alignItems: 'center',
                                    backgroundColor: 'white',
                                    justifyContent: 'center',
                                    padding : 2,}}>
                        <Image
                          style={{ width: '100%', height: '80%', resizeMode: 'stretch' }}
                          source={{ uri: CmnApi._GetUploadsURL()+ item.VoucherNo +'.png.png' }}
                        />
                        <TouchableHighlight style={{
                                                      padding: 8,
                                                      backgroundColor: '#fec119',
                                                      marginBottom: 2,
                                                      marginTop: 5,borderRadius:20}}
                          onPress={() => { this.toggleModal(!this.state.modalVisible) }}>

                          <Text style={{ color: 'white',
                                        fontSize: 20,
                                        textAlign: 'center',}}>Back to List</Text>

                        </TouchableHighlight>
                      </View>
                    </Modal>

                    
                  </View>

                    </View>    
                    <View style={{flex:1,flexDirection:'row',marginBottom:5}}>
                      <View style={{flex:5}}>
                        <Text style={{ fontSize:15,
                                        marginTop:1,
                                        marginBottom:2,
                                        marginLeft:1}}>
                                          
                          {item.Narration}
                        </Text>


                      </View>
                      <View style={{flex:5}}>
                        <View style={{textAlign:'right',marginRight:20}}>
                              <View style={{flexDirection:'row-reverse'}}>
                              <Text style={{fontSize:12,textAlign:'right',color:'grey'}}>
                                    Bal:  {CmnFunc._currencyFormat(item.Balance)}
                              </Text>
                              
                                {item.Debit == 0 ? 
                                    <Text style={{fontSize:15,fontWeight:'bold',textAlign:'right',color:'red',marginRight:20}}>{CmnFunc._currencyFormat(item.Credit)}</Text>  
                                :   <Text style={{fontSize:15,fontWeight:'bold',textAlign:'right',color:'green',marginRight:20}}>{CmnFunc._currencyFormat(item.Debit)}</Text> 
                                }
                              </View>
                        </View>
                      </View>
                  </View>
                              
                
             </View>   
            )}
            keyExtractor={item => item.Record_ID}
        />

        </View>
    </ScrollView>

    : null
  }  

    </View>

 );
 }
}

export default Statement