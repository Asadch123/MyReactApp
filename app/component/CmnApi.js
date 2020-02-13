//const mainURL='http://172.16.56.117:91/api';
//const mainURL='http://172.16.64.110:90/api/';


const mainURL='http://myexpences.somee.com/api/';



let POSTresult=[];

const GetURL=()=>{
    let url=mainURL;
    return  url
}

const GetUploadsURL=()=>{
  let url='http://myexpences.somee.com/Uploads/';
  return  url
}


const postImages= async (url,bodydata)=>{
  
  console.log('postImagesCalled');

await fetch(mainURL+url, {
          method: 'POST',
          headers: {  
            "Content-Type": "multipart/form-data",
            "otherHeader": "foo",
            },
    body:bodydata,
  })
  .then(processResponse)
  .then(showdata)
  .catch(badstuff)

  console.log('postImagesFinish');
} 





const getData= async (url)=>{
    console.log('GetMethodCalled');
    POSTresult=[];
    
  await fetch(mainURL+url, {
            method: 'GET',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'ComapanyID':global.CompanyID,
            }
    })
    .then(processResponse)
    .then(showdata)
    .catch(badstuff)

    console.log('GetMethodFinish');
} 





const postData= async (url,bodydata)=>{
  
    console.log('PostMethodCalled');
    POSTresult=[];

  await fetch(mainURL+url, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
      body:bodydata,
    })
    .then(processResponse)
    .then(showdata)
    .catch(badstuff)

    console.log('PostMethodFinish');
} 
   
const  processResponse=(response)=> {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]).then(res => ({
      statusCode: res[0],
      data: res[1]
    }));
  }
const showdata = (data)=>{
console.log(JSON.stringify(data));
   
    POSTresult= data
}

const badstuff = (err)=>{
alert(JSON.stringify(err.message));
}

const GetAPIResult=()=>{
    return  POSTresult
}


export default {
    _GetBaseURL:GetURL,
    _ApiPostData:postData,
    _ApiPostResult:GetAPIResult,
    _ApiGetData:getData,
    _ApiPostImages:postImages,
    _GetUploadsURL:GetUploadsURL,
}