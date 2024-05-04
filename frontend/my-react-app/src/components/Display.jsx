import * as url from 'url';
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import {Box,Card } from '@mui/material';
import {Typography} from '@mui/material';
import {enqueueSnackbar, useSnackbar} from 'notistack';
import {QrReader} from 'react-qr-reader';
// import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import {TextField, Button} from '@mui/material';
// import QRCode from 'qrcode.js';
// import { resolve } from 'path';
// import {TimePicker, LocalizationProvider} from '@mui/x-date-pickers';
// import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
// import { Input as BaseInput } from '@mui/base/Input';

const baseBackendUrl = "https://clg-vms-backend.onrender.com";
let email = localStorage.getItem("email");
let sender = localStorage.getItem("user");
let userType = localStorage.getItem("type");
// console.log("usertype is ",userType);

function generateQR(data){
    return new Promise((resolve,reject)=>{
        let url = baseBackendUrl+"/generate-qr";
        // let ddata = {data:data};
        let queryParams = {params:{data:data}};
        axios.get(url, queryParams)
            .then((response)=>{
                // console.log("response data qrgeneration ", response.data);
                // setQrdata(response.data);
                resolve(response.data);
                // return response;
            }).catch((err)=>{
                console.error(err);
            })
    });
}

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}      

const Inbox = ({user})=>{
    let [qrImageData, setQrdata] = useState("");
    // console.log("user name is ",user);
    let [arrayData, setData] = useState([]);
    let [update, setUpdate] = useState(false);
    let [DisplayQrData, setDisplayQrData] = useState("");
    // let data = {user:user.username};
    // console.log("sending inbox data is ", data);
    useEffect(()=>{
        let url = baseBackendUrl+"/api/v1/users/inbox";
        let data = {user:sender,type:userType};
        axios.post(url,data)
            .then((response)=>{
                // console.log("response data for inbox ",response.data);
                // return response;
                setData(response.data.data);
                // console.log("array data is ", response.data);
            }).catch((err)=>{
                console.error(err);
            })
    },[update])

    // function generateRandomString(length) {
    //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     let result = '';
    //     const charactersLength = characters.length;
    //     for (let i = 0; i < length; i++) {
    //       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    //     }
    //     return result;
    // }      

    let changeRequestStatus = async(entry,changeTo)=>{   //change to changeRequestStatus
        //todo: update status to rejected
        let data = {status:changeTo,id:entry.id};
        let url = baseBackendUrl+"/api/v1/requests/update";
        axios.post(url,data)
            .then((response)=>{
                // console.log("response data for status update ", response.data);
                setUpdate(prev => !prev);
            }).catch((err)=>{
                console.error(err);
            })
        if(changeTo == "accepted"){
            let randomString = generateRandomString(8);
            console.log("reciever is ",sender);
            let data = {sender:entry.sender, receiver:sender, qrdata:randomString, status:"Out",time:entry.time,timeout:entry.timeout};
            let url = baseBackendUrl+"/api/v1/qrs/add";
            axios.post(url, data).then((response)=>{
                console.log("response data for qr data ", response.data);
                if(response.data.success){
                    console.log("qr added");
                }else{
                    console.log("error occured");
                }
            }).catch((error)=>{
                console.log("error is ", error);
            })
            //todo: set meeting data in database - (employee-reciever, visitor-sender, time , reason)
            let data2 = {employee:sender,visitor:entry.sender,time:entry.time,reason:entry.reason};
            let url2 = baseBackendUrl+"/api/v1/meeting/add";
            axios.post(url2, data2).then((response)=>{
                console.log("response data for meeting data ", response.data);
                if(response.data.success){
                    console.log("meeting added");
                }else{
                    console.log("error occured");
                }
            }).catch((error)=>{
                console.log("error is ", error);
            })
        }else{

        }
        //post request to 
    }

    let showQr = async (entry)=>{
        //make post request to /qrs/get based on entry.sender and sender
        let url = baseBackendUrl+"/api/v1/qrs/getqr";
        let data = {sender:entry.reciever, receiver:sender};
        console.log("sender is ",entry.reciever);
        console.log("receiver is ", sender);
        axios.post(url, data).then((response)=>{
            // console.log("response data for get qr data ", response.data);
            if(response.data.success){
                // console.log("qr found");
                // console.log("qr data is ", response.data.result);
                // console.log("qr data is ", response.data.result[0].data);
                // let qrImgData = generateQR(response.data.result[0].data);
                // setQrdata(response.data.data);
                setQrImgData(response.data.result[0].data);
            }else{
                console.log("qr not found");
            }
        }).catch((error)=>{
            console.log("error is ", error);
        })
        let setQrImgData = async (text)=>{
            let qrImgData = await generateQR(text);
            // console.log("hellow qrImgData is ", qrImgData);
            setDisplayQrData(qrImgData);
        }
    }
    
    return(
        <div>
            <h2>Inbox</h2>
            <div> 
                {
                    DisplayQrData == ""?
                <table border={"2px"} aria-label="custom pagination table">
                    <thead>
                        {userType == "Visitor"?<th>To</th>:<th>Sender</th>}
                        {userType == "Employee"?<th>Email</th>:null}
                        <th>Reason</th>
                        <th>Time</th>
                        <th>Status/ Response</th>
                        {userType == "Visitor"?<th>QRs</th>:null}
                        {/* <th>Respond</th> */}
                    </thead>
                    <tbody>
                        {/* <tr>
                            <td>sample</td>
                            <td>sample</td>
                            <td>sample</td>
                            <td>sample</td>
                        </tr> */}
                        {arrayData.length > 0 ? 
                        (arrayData.map((entry,index)=>{
                            return(
                                <tr key={index}>
                                    {/* <td>{entry.sender}</td> */}
                                    {userType == "Visitor"?<td>{entry.reciever}</td>:<td>{entry.sender}</td>}
                                    {userType == "Employee"?<td>{entry.email}</td>:null}
                                    
                                    <td>{entry.reason}</td>
                                    <td>{entry.time}</td>
                                    {/* <td>{entry.status}</td> */}
                                    {userType == "Employee"?
                                    <td>{entry.status == "pending"? <div><Button onClick={()=>{changeRequestStatus(entry,"accepted")}} size="medium" sx={{backgroundColor:'green'}} variant="contained">A</Button><Button onClick={()=>{changeRequestStatus(entry,"rejected")}} size="medium" sx={{backgroundColor:'red'}} variant="contained">R</Button></div>:entry.status}</td>
                                    :
                                    <td>{entry.status}</td>
                                    }
                                    {/* <td><Button size="medium" sx={{backgroundColor:'green'}} variant="contained">A</Button><Button onClick={rejectRequest} size="medium" sx={{backgroundColor:'red'}} variant="contained">R</Button></td> */}
                                    {userType == "Visitor"?<td>{entry.status=="accepted"?<Button onClick={()=>{showQr(entry)}}>show</Button>:null}</td>:null}
                                </tr>
                            )
                            // console.log("entry is ", entry); 
                        })):(
                            <tr>
                                <td colSpan="5">No data found</td>
                            </tr>
                        )
                        }

                    </tbody>
                </table>
                :
                <Box sx={{height:"80vh",width:"80vw"}}>
                    <Button onClick={()=>{setDisplayQrData("")}}>Back</Button>
                    <img style={{height:"100%",width:"100%"}} src={DisplayQrData} alt="QRcode"/>
                </Box>}
            </div>
        </div>
    )
}

const MeetingForm = ()=>{
    let {enqueueSnackbar} = useSnackbar();
    // let email = localStorage.getItem("email");
    // let sender = localStorage.getItem("user");
    // console.log("email is ", email);
    // console.log("sender is ", sender);
    let [data, setState] = useState({name:"",reason:"",email:email, sender:sender});

    let setData = (e)=>{        
        let {id, value} = e.target;
        let submitButton = document.getElementById("sub");
        if(id === "time" && new Date(value) < new Date()){
            // console.log("please select time in future enqueuesnackbar");
            enqueueSnackbar("Please select time in future.", {variant:"warning"});
            submitButton.disabled = true;
            return;
        }else{
            // console.log("setting time ");
            submitButton.disabled = false;
        }
        if(id === "duration"){
            // console.log("please select duration in range 1-8 enqueuesnackbar");
            if(value>8 || value<1){
                enqueueSnackbar("Please select duration in range 1-8.", {variant:"warning"});
                submitButton.disabled = true;
                return;
            }
        }else{
            submitButton.disabled = false;
        }
        // console.log("id is ", id, " value is ", value);
        setState({...data, [id]:value});
    }


    let submitForm = (data)=>{
        // console.log("form data for submission is ",data);
        let timeout = new Date(data.time);
        let timeouthours = timeout.getHours();
        let newhours = (timeouthours + parseInt(data.duration)) % 24;
        timeout.setHours(newhours);
        data.timeout = timeout;
        console.log("timeout is ",timeout," time in is ",data.time);
        
        let url = baseBackendUrl+"/api/v1/meeting/form";
        //WHAT DATA AM I SENDING
        axios.post(url, data)
            .then((response)=>{
                // console.log("response data for /meeting/form ", response.data);
                // return response;
                if(response.data.success == true){
                    // console.log("request submitted successfully enqueuesnackbar");
                    enqueueSnackbar("Request submitted successfully.", {variant:"success"});
                }else if(response.data.success == false && response.data.data == "user does not exist"){
                    // console.log("User not found enqueuesnackbar");
                    enqueueSnackbar("User not found.", {variant:"warning"});
                }else{
                    // console.log("something went wrong enqueuesnackbar");
                    enqueueSnackbar("Something went wrong at backend.", {variant:"error"});
                }
            }).catch((err)=>{
                console.error(err);
                enqueueSnackbar("Backend request failed.", {variant:"error"});
            })
    }


    // function generateQRCode(data) {
    //     const qrCodeData = data;

    //     const qrcode = new QRCode(document.getElementById('qrcode-canvas'), {
    //     text: qrCodeData,
    //     width: 256,
    //     height: 256,
    //     colorDark: '#000000',
    //     colorLight: '#ffffff',
    //     // correctLevel: QRCode.CORRECT_LEVEL.H // Adjust error correction level if needed
    //     });

    // }

    // const qrImageData = generateQR("hellow world");
    // generateQR("hellow boid");
    return(
        <div>
            <h1>Meeting Form</h1>
            <Box style={{display:'flex', justifyContent:'center'}} >
                <Card elevation={8} sx={{width:"50vw", height:"60vh",display:'flex',justifyContent:'center', flexDirection:'column',alignItems:'center', padding:"50px",gap:"4.5vh"}}>
                    <TextField required onChange={setData} id="name" label="Person to meet" variant="filled" />
                    <TextField required onChange={setData} id="reason" type="text" label="Reason" variant="filled" />
                    {/* <TextField id="email" type="email" onChange={setData} label="Email" variant="filled" /> */}
                    <Typography>Time</Typography>
                    <input onChange={setData} type="datetime-local" id="time" name="time" label="inster time" style={{backgroundColor:"white", color:"black"}}/>
                    {/* <Typography>Duration</Typography> */}
                    <TextField
                        id="duration"
                        onChange={setData}
                        label="Hours"
                        type="number"
                        inputProps={{ min: 1, max: 8 }} 
                        InputLabelProps={{ shrink: true }} 
                        />
                    <Button size="large" id="sub" variant="contained" onClick={()=>{submitForm(data)}} >Submit</Button>
                </Card>
            </Box>
            {/* PUT THIS IN QRCODE SECTION */}
            {/* <div id="qrcode-canvas">
                <img src={qrImageData} alt="QR Code"/>
            </div> */}
        </div>
    )
}

const ValidateQr = ()=>{
    const [resultValidation, setResult] = useState({color:"yellow",found:"Valid"});
    // const [qrtext, setQrtext] = useState("");
    // const [times, setTimes] = useState({time:"",timeout:""});
    let time;
    let timeout;
    let coolDownTime = 3000;
    let timeOutId = null;
    
    
    let ValidateUser = (text)=>{
        let validationResultButton = document.getElementById("validationResult");
        let validationSuccess = ()=>{
            validationResultButton.style.backgroundColor = "green";
            enqueueSnackbar("Success.", {variant:"success"});
        };
        let switchInOut = (user)=>{
            //MAKING REQUEST TO LOCALHOST /USERS/SETSTATUS WITH USER AS BODY
            let url = baseBackendUrl+"/api/v1/users/switchstatus";
            let data = {user:user,qrdata:text};
            axios.post(url, data).then((response)=>{
                if(response.data.success == true){
                    console.log("status changed successfully");
                    console.log("response data for switchstatus ", response.data);
                    validationResultButton.innerText = "User checked "+response.data.newStatus;
                }else{
                    console.log("status not changed successfully");
                }
            }).catch((err)=>{
                console.error(err);
            })
        }
        let validateUserTypeUserTime = (reciever)=>{
            let url = baseBackendUrl+"/api/v1/users/getuser";
            let data = {user:reciever};
            axios.post(url,data).then((response)=>{
                // console.log("response data for getuser ", response.data);
                if(response.data.success == true){
                    // console.log("user type is ", response.data.result[0].type);
                    let userType = response.data.result[0].type;
                    if(userType == "Visitor"){
                        if(response.data.result[0].status == "out"){
                            // console.log("user is visitor, accepted, change state");
                            // visitorQrCheck();
                            let currentTime = new  Date();
                            // console.log("comparing times ",currentTime," time: ",time," timeout: ",timeout);
                            if(currentTime < time){
                                // console.log("Your time has not yet arrived.");
                                enqueueSnackbar("Your time has not yet arrived yet.", {variant:"warning"});
                            }else if(currentTime > timeout){
                                // console.log("Your time has expired.");
                                enqueueSnackbar("Your time has expired.", {variant:"error"});
                            }else{
                                console.log("Success, switchInOut");
                                //SUCCESS STATUS WITH DEBOUNCING
                                if(!timeOutId){
                                    validationSuccess();
                                    switchInOut(reciever);
                                    timeOutId = setTimeout(()=>{
                                        timeOutId = null;
                                    },coolDownTime);
                                }else{
                                    clearTimeout(timeOutId);
                                    timeOutId = setTimeout(()=>{
                                        timeOutId = null;
                                    },coolDownTime);
                                }
                            }
                        }else{
                            //SUCCESS STATUS WITH DEBOUNCING
                            if(!timeOutId){
                                console.log("user is visitor, accepted, let him out, switchInOut");
                                validationSuccess();
                                switchInOut(reciever);
                                timeOutId = setTimeout(()=>{
                                    timeOutId = null;
                                },coolDownTime);
                            }else{
                                clearTimeout(timeOutId);
                                timeOutId = setTimeout(()=>{
                                    timeOutId = null;
                                },coolDownTime);
                            }
                        }
                    }else{
                        //TEST THIS PART AFTER CREATING EMPLOYEE QR
                        //SUCCESS STATUS WITH DEBOUNCING
                        if(!timeOutId){
                            console.log("user is employee, accepted, switchInOut");
                            validationSuccess();
                            switchInOut(reciever);
                            timeOutId = setTimeout(()=>{
                                timeOutId = null;
                            },coolDownTime);
                        }else{
                            clearTimeout(timeOutId);
                            timeOutId = setTimeout(()=>{
                                timeOutId = null;
                            },coolDownTime);
                        }                    }
                }else{
                    console.log("user type not found");
                }
            }).catch((err)=>{
                console.error(err);
            })
        };
        //todo: turn text into qrdata and check if user is present in db
        let data = {text:text};
        // if(text.length == 0){return;}
        let url = baseBackendUrl+"/api/v1/qrs/validate";
        console.log("validating user with data ",data.text);
        axios.post(url,data)
            .then((response)=>{
                if(response.data.result == false){
                    //USER NOT FOUND STATUS WITH DEBOUNCING
                    if(!timeOutId){
                        validationResultButton.style.backgroundColor = "red";
                        validationResultButton.innerText = "Invalid";
                        enqueueSnackbar("User not found.", {variant:"error"});
                        timeOutId = setTimeout(()=>{
                            timeOutId = null;
                        },coolDownTime);
                    }else{
                        clearTimeout(timeOutId);
                        timeOutId = setTimeout(()=>{
                            timeOutId = null;
                        },coolDownTime);
                    }
                }else if(response.data.result == "multiple"){
                    console.log("multiple users found");
                    validationResultButton.style.backgroundColor = "yellow";
                    validationResultButton.innerText = "Multiple";
                    enqueueSnackbar("Multiple users found.", {variant:"warning"});
                }else{
                    console.log("user found",response.data.result);
                    time = new Date(response.data.result[0].time);
                    timeout = response.data.result[0].timeout;

                    //TESTING PURPOSE
                    // time = new Date().getTime() - (60*60*1000);
                    // timeout = new Date().getTime() + (60*60*1000);
                    // console.log("find timeout ",response.data.result[0]);

                    validateUserTypeUserTime(response.data.result[0].reciever);
                }
            }).catch((err)=>{
                console.log("vaidating user error occured");
                console.error(err);
            })
        
    }

    const QRScanner = () => {
        // Function to handle QR code scan
        const handleScan = (data) => {
            // console.log("handlescan working ",data);
          if (data) {
            // console.log("qrtextdata is ",data.text);
            // setQrtext(data.text);
            if(data.text){
                ValidateUser(data.text);
                // let reciever = 
                // if(validationResult == "false"){
                //     // setResult({color:"red", found:"Invalid"});
                // }else if(validationResult == "multiple"){
                //     // setResult({color:"yellow", found:"multiple"});
                // }else{
                //     // setResult({color:"green", found:"valid"});
                // }
            }
          }
        };
        // useEffect(()=>{
        //     // console.log("useeffect result is ", result);
        //     //check if user is present in db
        //     ValidateUser(qrtext);
        // },[qrtext])
        // Function to handle scan error
        const handleError = (error) => {
          console.error("qr scannign errror ",error);
        };
        return (
          <div style={{display:"flex",justifyContent:"center"}}>
            <div >
                <QrReader
                delay={300}
                onError={handleError}
                //   onScan={handleScan}
                // onScan=(handleScan)
                onResult={handleScan}
                style={{ width: '100%'}}
                />
                {/* <p>{result.text}</p> */}
                {/* <Box id="validationResult" style={{border:"2px solid blue",height:"10vh",width:"40vw",backgroundColor:resultValidation.color}}>{resultValidation.found}</Box> */}
                <Box id="validationResult" style={{border:"2px solid blue",height:"10vh",width:"50vw",backgroundColor:"yellow",borderRadius:"10px",fontSize:"5vw",color:"gray"}}>Status</Box>
            </div>
          </div>
        );
    };

    return(
        <div>
            <h1>Validate QR</h1>
            <div style={{height:"500px", width:"500px"}}>
                <QRScanner/>
            </div>
        </div>
    )
}

const CheckedInUsers = ()=>{
    // let rows2;
    const [rows2, setRows2] = useState([]);
    useEffect(()=>{
        let url = baseBackendUrl+"/api/v1/qrs/checkedin";
        axios.get(url).then((response)=>{
            console.log("checkedin users ", response.data);
            // rows2 = response.data.result;
            //use map to go through response.data.result array of objects and from each object and add new Date() around values of time and timeout            
            // response.data.result.map((row)=>{}) 
            setRows2(response.data.result);
            // changerows2(response.data.result);
        }).catch((err)=>{
            console.error(err);
        })
    },[])
    function convertTimeToHoursMinutes(milliseconds) {
        // Ensure milliseconds is a number
        milliseconds = parseInt(milliseconds, 10);
      
        // Handle negative values (optional)
        if (milliseconds < 0) {
          console.error("Invalid time difference: Cannot convert negative milliseconds to time.");
          return null; // Or return a meaningful error message
        }
      
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
      
        return `${hours}:${minutes.toString().padStart(2, '0')}`; // Format with leading zero for minutes
      }
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'reciever', headerName: 'User', width: 130, description:"Hover for more info." },
        { field: 'time', headerName: 'Check In Time', width: 130,
        // valueFormatter: (params) => {
        //     const date = params.value;
        //     // const date = params;
        //     console.log("params in valueformatter ",params);
        //     // Customize the formatting here (example: YYYY-MM-DD HH:MM)
        //     return date.toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
        //   },
        },
        {
          field: 'timeout',
          headerName: 'Check Out Time',
        //   type: 'number',
          width: 130,
        },
        // {
        //   field: 'status',
        //   headerName: 'Overtime',
        // //   description: 'This column has a value getter and is not sortable.',
        // //   sortable: false,
        //   width: 130,
        // //   valueGetter: (value, row) => `${row.time || ''} ${row.timeout || ''}`,
        // },
    ];


    let timein = new Date().getTime - (60*60*1000);
    const rows = [
        { id: 1, reciever: 'Snow', time:new Date(timein), timeout: new Date(new Date().getTime() + (60*60*1000)), overtime: convertTimeToHoursMinutes(new Date()-new Date().getTime()+(60*60*60*1000))},
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <h1>Checked In Users</h1>
        <DataGrid
            rows={rows2}
            columns={columns}
            initialState={{
            pagination: {
                paginationModel: { page: 0, pageSize: 5 },
            },
            }}
            pageSizeOptions={[5, 10]}
            // checkboxSelection
        />
        </div>
    );    
}

const ManageEmployees = ()=>{
    let [addEmployee, setAddEmployee] = useState(false);
    let [updateState, setUpdateState] = useState(true);
    let [rows2,setRows2] = useState([]);
    let [rows3,setRows3] = useState([]);
    let rows4 = [];
    useEffect(()=>{
        console.log("fetching employees data");
        let url = baseBackendUrl+"/api/v1/users/employees";
        axios.get(url).then((response)=>{
            console.log("employees ", response.data.result);
            for(let i in response.data.result){
                // console.log(response.data.result[i]);
                // let entryData = response.data.result[i];
                // setRows3((prev)=> ({...prev,entryData}));
                rows4.push(response.data.result[i]);
                // rows4.push(response.data.result[i]);
            }
            setRows2(response.data.result);
            console.log("rows4 is ",rows4);
            setRows3(rows4);
            // console.log("rows2 ", rows2);
        }).catch((err)=>{
            console.error(err);
        })
    },[]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'username', headerName: 'Name', width: 130, description:"Hover for more info." },
        { field: 'email', headerName: 'Email', width: 130,
        // valueFormatter: (params) => {
        //     const date = params.value;
        //     // const date = params;
        //     console.log("params in valueformatter ",params);
        //     // Customize the formatting here (example: YYYY-MM-DD HH:MM)
        //     return date.toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
        //   },
        },
        {
          field: 'password',
          headerName: 'Password',
        //   type: 'number',
          width: 130,
        },
        {
          field: 'status',
          headerName: 'Status',
        //   description: 'This column has a value getter and is not sortable.',
        //   sortable: false,
          width: 130,
        //   valueGetter: (value, row) => `${row.time || ''} ${row.timeout || ''}`,
        },
    ];

    const rows = [
        // { id: 1, user: 'Snow', email:new Date(timein), timeout: new Date(new Date().getTime() + (60*60*1000)), overtime: convertTimeToHoursMinutes(new Date()-new Date().getTime()+(60*60*60*1000))},
        { id: 2, username: 'Lannister', email: 'Cersei', password: 42 },
        { id: 3, username: 'Lannister', email: 'Jaime', password: 45 },
        { id: 4, username: 'Stark', email: 'Arya', password: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];

    let removeEmployee = (entry)=>{
        let url = baseBackendUrl+"/api/v1/users/removeuser";
        console.log("username in entry is ",entry.username);
        let data = {user:entry.username};
        axios.post(url,data).then((response)=>{
            console.log("response is ", response);
            if(response.status == 200){
                console.log("employee removed snackbar");
                enqueueSnackbar("Employee removed successfully.", {variant:"success"});
                // alert("Employee removed successfully.");
                setUpdateState((prev)=>!prev);
                // window.location.reload();
                //remove it from rows2
            }
        }).catch((err)=>{
            console.error(err);
        })
    }


    return(
        <div>
            <h1>Manage Employees</h1>
            {/* <DataGrid
                rows={rows3}
                columns={columns}
                initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
                }}
                pageSizeOptions={[5, 10]}
                // checkboxSelection
            /> */}
            <table border={"2px solid black"}>
                <tr>
                    <th>Name</th>
                    <th>email</th>
                    <th>Password</th>
                    <th>status</th>
                    <th>Edit</th>
                </tr>
                {rows2.map((entry)=>{
                    return(<tr key={entry.id}>
                        <td>{entry.username}</td>
                        <td>{entry.email}</td>
                        <td>{entry.password}</td>
                        <td>{entry.status}</td>
                        <td><Button onClick={()=>{removeEmployee(entry)}}>Remove</Button></td>
                    </tr>)
                })}
                <tr>
                    <td colSpan={5}><Button onClick={()=>{setAddEmployee(true)}}>Add Employee</Button></td>
                </tr>
            </table>
            {addEmployee ? <AddEmployeeForm setAddEmployee={setAddEmployee} /> : null}
        </div>
    )
}
  
const AddEmployeeForm = ({setAddEmployee})=>{
    const {enqueueSnackbar} = useSnackbar();
    // const {register, handleSubmit, formState: {errors}} = useForm();
    const [formData,setState] = useState({username:"",password:"",confirmPassword:"",email:"",type:"Employee"});
    // const navigate = useNavigate();
    const setData = (e)=>{
        // setState(...formData,{[e.target.id]:e.target.value});
        // console.log("setting data",formData); //formdata giving me undefined.
        setState((prev)=>({...prev,[e.target.id]:e.target.value}));
    };
    
    const giveEmployeeQr = ()=>{
        let randomString = generateRandomString(8);
        // console.log("reciever is ",sender);
        let QrEndTime = new Date();
        QrEndTime.setMonth(QrEndTime.getMonth() + 3);
        let data = {sender:formData.username, receiver:"Admin", qrdata:randomString, status:"Out",time:new Date(),timeout:QrEndTime};
        let url = baseBackendUrl+"/api/v1/qrs/add";
        axios.post(url, data).then((response)=>{
            console.log("response data for qr data ", response.data);
            if(response.data.success){
                console.log("qr added for employee till ",QrEndTime);
            }else{
                console.log("error occured");
            }
        }).catch((error)=>{
            console.log("error is ", error);
        })

    }
    const signUpData = (data)=>{
        if(data.username === "" || data.password === "" || data.confirmPassword === "" || data.email === ""){
            console.log("username ",data.username);
            console.log("password ", data.password);
            console.log("confirmPassword ", data.confirmPassword);
            console.log("email ", data.email);
            console.log("type ", data.type);
            console.log("some fields are empty snackbar");
            enqueueSnackbar("All fields should be filled.", {variant:"error"});
            return;
        }
        if(data.password !== data.confirmPassword){
            console.log("passwords don't match snackbar");
            enqueueSnackbar("Passwords don't match.", {variant:"error"});
            return;
        }else if(data.password.length < 8){
            console.log("password length is less than 8 snackbar");
            enqueueSnackbar("Password length should be greater than 8.", {variant:"error"});
            return;
        }
        let url = baseBackendUrl+"/api/v1/register";
        axios.post(url, data)
        .then((response)=>{
            if(response.status === 201){
                console.log("user added snackbar");
                enqueueSnackbar("Employee added successfully.", {variant:"success"});
                giveEmployeeQr();
            }else{
                console.log("something went wrong");
                enqueueSnackbar("Something went wrong.", {variant:"error"});
            }
        }).catch((error)=>{
            console.log("error is ", error);
            if(error.response.data.message == "username already exist"){
                console.log("username already present snackbar");
                enqueueSnackbar("Username already taken.", {variant:"warning"});
            }else if(error.response.data.message == "email already exist"){
                console.log("email already present snackbar");
                enqueueSnackbar("Email already taken.", {variant:"warning"});
            }else{
                console.log('snackbar: somethign went wrong in backend');
                enqueueSnackbar("Something went wrong, check backend.", {variant:"error"});
            }
        })
    };
    
    const cancel = ()=>{
        setAddEmployee(false);
        // navigate(-1);
    }

    return(
        <div>
            <h1 style={{margin:0}}>Add Employeee</h1>
            {/* <Link to="/login">Login</Link> */}
            <div style={{display:'flex', justifyContent:'center'}}>
                <Card elevation={8} sx={{width:"50vw", height:"60vh",display:'flex',justifyContent:'center', flexDirection:'column',alignItems:'center', padding:"50px",gap:"4.5vh"}}>
                            <TextField required onChange={setData} id="username" label="Username" variant="filled" />
                            <TextField required onChange={setData} id="password" type="password" label="Password" variant="filled" />
                            <TextField required onChange={setData} id="confirmPassword" type="password" label="Confirm Password" variant="filled" />
                            <TextField required id="email" type="email" onChange={setData} label="Email" variant="filled" />
                        {/* <Typography>
                            Don't have an account:<a href="">Sign Up</a>
                        </Typography> */}
                        <Button size="large" variant="contained" onClick={()=>{signUpData(formData)}} >Add Employee</Button>
                        <Button size="large" variant="contained" onClick={()=>{cancel()}} >Cancel</Button>
                </Card>
            </div>

        </div>
    )
}

const EmployeeQr = ()=>{
    let EmployeeName = sender;
    console.log("employeename is  ",EmployeeName);
    let [DisplayQrData, setDisplayQrData] = useState("");
    let showQr = async (EmployeeName)=>{
        //make post request to /qrs/get based on entry.sender and sender
        let url = baseBackendUrl+"/api/v1/qrs/getqr";
        let data = {sender:"Admin", receiver:EmployeeName};
        // console.log("sender is ",entry.reciever);
        // console.log("receiver is ", sender);
        axios.post(url, data).then((response)=>{
            // console.log("response data for get qr data ", response.data);
            console.log("response is ",response);
            if(response.data.success){
                // console.log("qr found");
                console.log("qr data is ", response.data.result);
                // console.log("qr data is ", response.data.result[0].data);
                // let qrImgData = generateQR(response.data.result[0].data);
                // setQrdata(response.data.data);
                setQrImgData(response.data.result[0].data);
            }else{
                console.log("qr not found");
            }
        }).catch((error)=>{
            console.log("error is ", error);
        })
        let setQrImgData = async (text)=>{
            let qrImgData = await generateQR(text);
            // console.log("hellow qrImgData is ", qrImgData);
            setDisplayQrData(qrImgData);
        }
    }
    useEffect(()=>{
        showQr(EmployeeName);
    })

    return(
        <div>
            <h1>Employee QR</h1>
            <div width="80vw" height="60vh">
                <img src={DisplayQrData} alt="QrImage" />
            </div>
        </div>
    )
}


const Display = ({user, SelectedFunctionality})=>{
    // console.log("SelectedFunctionality is ", SelectedFunctionality);
    // console.log("user is ", user);
    return(
        <div>
            <h1>Func...</h1>
            <div style={{display:"flex",justifyContent:"center",width:"100vw"}}>
                {/* <Inbox user={user}/> */}
                {/* <ValidateQr/>    */}
                {/* <MeetingForm/> */}
                {SelectedFunctionality == "Inbox"?<Inbox user={user}/>:null}
                {SelectedFunctionality == "MeetingForm"?<MeetingForm />:null}
                {SelectedFunctionality == "QRScanner"?<ValidateQr />:null}
                {SelectedFunctionality == "CheckedInUsers"?<CheckedInUsers />:null}
                {SelectedFunctionality == "ManageEmployees"?<ManageEmployees />:null}
                {SelectedFunctionality == "EmployeeQR"?<EmployeeQr />:null}
            </div>
            {/* <QRScanner/> */}
        </div>
    )
}

export default Display;