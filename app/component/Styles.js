import { StyleSheet } from 'react-native'

export default StyleSheet.create({
   
    MainVw:{
        paddingTop:20
          },
          StatementBal:{
            margin:2,
            justifyContent:'space-around',
            borderRadius:25,
            padding:10,
            backgroundColor:"#fec119",
            elevation: 20,
        },
          Statementcontainer:{
            flex:1,
            backgroundColor:'#D0D3D4',
            padding:2,
            flexGrow: 1
            },

      container:{
          flex:1,
          backgroundColor:'#D0D3D4',
          padding:10,
          flexGrow: 1
          },
          containerCenter:{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'#D0D3D4',
            },

  container1:{
  flex:1,
  backgroundColor:'white'
  },
  BtnVW:{
      marginTop:35,
      elevation: 8,
      },
  container2:{
      flex:2,
      backgroundColor:'grey'
      },
  container3:{
          flex:1,
      backgroundColor:'white'
      },
txtboxSqr:{
        backgroundColor:'white',
        fontSize:15,
        marginTop:10,
        elevation: 8,
            },
  txtbox:{
      backgroundColor:'white',
      borderColor:"#fec119",
     fontSize:15,
      borderRadius: 20 ,
      marginTop:10,
      elevation: 8,
          },
    Rcpdatetimepkr:{
            backgroundColor:'white',
           fontSize:15,
            borderRadius: 20 ,
            marginTop:3,
            elevation: 8
                },

          datetimepkr:{
            backgroundColor:'white',
           fontSize:15,
            marginTop:1,
            elevation: 8
                },
                Statementdropdown:{
                    backgroundColor:'white',
                    fontSize:15,
                },
    dropdown:{
    backgroundColor:'white',
    borderColor:"#fec119",
    fontSize:15,
    borderRadius: 20,
    marginTop:10,
    elevation: 8,
    padding:17,
    borderRadius: 14,
    borderWidth: 1,
        },
  label:{
      fontSize:17,
      paddingBottom:10,
      paddingTop:15,
      paddingBottom:-10
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
      justifyContent:'space-around',
      borderRadius:10,
      borderWidth: 1,
      padding:20
  },
  btnStatement:{
    marginTop:5,
    marginBottom:5,
    marginLeft:120,
    marginRight:120,
    borderRadius:20,
    padding:7,
    backgroundColor:"#fec119",
    elevation: 8,
},
  btnNew:{
      marginTop:40,
      justifyContent:'space-around',
      borderRadius:20,
      padding:13,
      backgroundColor:"#fec119",
      elevation: 8,
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