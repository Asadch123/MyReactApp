
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
    FlatList, Item, Picker,
} from 'react-native';


import styles from '@component/Styles';
import ModalDropdown from 'react-native-modal-dropdown';
import DatePicker from 'react-native-datepicker'
import CmnApi from '../CmnApi';
import CmnFunc from '../CmnFunc';
import {connect} from 'react-redux';

import ImagePicker from 'react-native-image-picker';
const options = {
    title: 'Select a Photo',
    takePhotoButtonTitle: 'Take a Photo',
    chooseFromLibraryButtonTitle:'Choose from gallery',
    quality:1,
  };
  

class Tempform extends Component {
    static navigationOptions = { header: null };

    constructor(props) {
        super(props)

        this.state = {
            refreshing: false,
            dataSource: null,
            Fromdate: new Date(),
            Todate: new Date(),
            AccdataSource: null,
            AccountNo: null,
            CurrentBalance: null,
            ImageSource:null,
            Imagedata:null,
           count:0,
        }

    }

    componentDidMount() {


    }


    IncAge=()=>{
      this.setState({count:++ this.state.count });
      
    }

    DecAge=()=>{
      this.setState({count:--this.state.count});
    }
    


    //---------------------------------------------------------

    //-------------- CODE FOR ADDING COMMON API get CLASS --------------------------


    submitRecord = async () => {
            await this.Postdata();
    }


//================ For images upload ==================



  
  //=====================================================


    Postdata = async () => {

        this.setState({ refreshing: true });
        console.log('Postdata calledd');
 
      let body = new FormData();
      body.append('photo', { uri: this.state.Imagedata, name: 'Myphoto.png', filename: 'imageName.png', type: 'image/png' });
      body.append('Content-Type', 'image/png');

      await CmnApi._ApiPostImages('Upload/PostImage', body);
      let _result = CmnApi._ApiPostResult();
      console.log(_result);

      alert(_result.data.Message);

      this.setState({ refreshing: false });
        
        console.log('Postdata Finishh');
    }


    // -------------------------------------------------------------------------

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





    render() {
        const { containerCenter,Statementlabel, Statementdropdown, btnStatement, datetimepkr, StatementBal, Statementcontainer, container, MainVw, txtbox, btnNew, BtnVW, Loadinglabel, errlabel, label } = styles;


      /*   if (this.state.refreshing) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        } */
        return (

            <View style={{flex:1,
                justifyContent:'center',
                alignItems:'center',
                backgroundColor:'#D0D3D4',}}>

          {/*   <Image style={{height:200,width:200,marginTop:30}}
            source={this.state.ImageSource !=null ? this.state.ImageSource :
            require('./img/ImageNA.jpg')}
            >

            </Image>



                <TouchableOpacity style={{ fontSize:20,
                                            backgroundColor:'white',
                                            justifyContent:'space-around',
                                            borderRadius:10,
                                            borderWidth: 0,
                                            paddingRight:60,paddingLeft:60,marginTop:20}} onPress={this.selectPhoto}>
                    <Text style={{fontSize:20,color:'red',textAlign:'center'}}>
                            Select
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ fontSize:20,
                                            backgroundColor:'white',
                                            justifyContent:'space-around',
                                            borderRadius:10,
                                            borderWidth: 0,
                                            paddingRight:60,paddingLeft:60,marginTop:20}} onPress={this.submitRecord}>
                    <Text style={{fontSize:20,color:'red',textAlign:'center'}}>
                            Upload
                    </Text>
                </TouchableOpacity>
 */}

                <View >

                          
                <TouchableOpacity style={{ fontSize:20,
                                            backgroundColor:'white',
                                            justifyContent:'space-around',
                                            borderRadius:10,
                                            borderWidth: 0,
                                            paddingRight:60,paddingLeft:60,marginTop:20}} onPress={this.props.increaseNumbers}>
                    <Text style={{fontSize:20,color:'#1f7a7a',textAlign:'center'}}>
                          Increase
                    </Text>
                </TouchableOpacity>

                <Text style={{fontSize:20,color:'#1f7a7a',textAlign:'center'}}>
                     {this.props.numbers}
                </Text>

                <TouchableOpacity style={{ fontSize:20,
                                            backgroundColor:'white',
                                            justifyContent:'space-around',
                                            borderRadius:10,
                                            borderWidth: 0,
                                            paddingRight:60,paddingLeft:60,marginTop:20}} onPress={this.props.decreaseNumbers}>
                    <Text style={{fontSize:20,color:'#1f7a7a',textAlign:'center'}}>
                            Decrease
                    </Text>
                </TouchableOpacity>

                </View>

            <View style={{marginTop:40}}>

           
                <TouchableOpacity style={{ fontSize:20,
                                            backgroundColor:'white',
                                            justifyContent:'space-around',
                                            borderRadius:10,
                                            borderWidth: 0,
                                            paddingRight:60,paddingLeft:60,marginTop:20}} onPress={()=>this.props.increaseAge(this.state.count)}>
                    <Text style={{fontSize:20,color:'red',textAlign:'center'}}>
                          Increase
                    </Text>
                </TouchableOpacity>

                <Text style={{fontSize:20,color:'red',textAlign:'center'}}>
                {this.props.age}
                    </Text>

                <TouchableOpacity style={{ fontSize:20,
                                            backgroundColor:'white',
                                            justifyContent:'space-around',
                                            borderRadius:10,
                                            borderWidth: 0,
                                            paddingRight:60,paddingLeft:60,marginTop:20}} onPress={this.props.decreaseAge}>
                    <Text style={{fontSize:20,color:'red',textAlign:'center'}}>
                            Decrease
                    </Text>
                </TouchableOpacity>
            </View>
            </View>
        );
    }
}

function  mapStateToProps(store) {
  return{
         age:store.r.age,
         numbers:store.rB.numbers
  }
}

function mapDispatchToProps(dispatch){
  return{
      increaseAge : (b)=>dispatch({
        type:'Increase_Age',
        b:8
      }),
      decreaseAge:()=>dispatch({type:'Decrease_Age'}),
      increaseNumbers:()=>dispatch({type:'increaseNumbers'}),
      decreaseNumbers:()=>dispatch({type:'decreaseNumbers'}),

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Tempform)