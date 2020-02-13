const Getdata=()=>{
    let MyName='i m asad here';
    return  MyName
}

ParsedDate=(strDate)=>{
   /*  var strSplitDate = String(strDate).split(' ');
    var date = new Date(strSplitDate[0]);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; 
    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    date =  dd + "-" + mm + "-" + yyyy;
    return date.toString(); */

    
  const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  let current_datetime = new Date(strDate)

  let formatted_date = current_datetime.getDate() + "-" + months[current_datetime.getMonth()] + "-" + current_datetime.getFullYear()
    return formatted_date
  }


   CurrencyFormat=(num)=> {
    let result = '';
    if (num==='0' || num==='0.00' || num===''){
      result='0.00';
    }else{
      result= num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
    return result
  }


export default {
    _getParsedDate:ParsedDate,
    _currencyFormat:CurrencyFormat,
}