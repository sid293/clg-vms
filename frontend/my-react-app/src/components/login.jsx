import React,{useState,useEffect} from 'react';
import Card from '@mui/material/Card';
import {useSnackbar} from 'notistack';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import {useNavigate} from 'react-router-dom';
// import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Header from './header';
import axios from 'axios';

// dotenv.config();

// const baseBackendUrl = "https://clg-vms-backend.onrender.com";
const baseBackendUrl = import.meta.env.VITE_backend_url;
// const backendUrl = process.env.VITE_backend_url;
// console.log("backend url ",baseBackendUrl);
// console.log("backend url ",backendUrl);


const Login = ({user,handleSetUser})=>{
    const {enqueueSnackbar} = useSnackbar();
    let navigate = useNavigate();
    
    let [details, useDetails] = useState({username:"",password:""});
    let setDetails = (e)=>{
        useDetails({...details,[e.target.id]:e.target.value});        
    };

    let loginData = (data)=>{
        // console.log(data);
        // console.log("data is ",data);
        let url = baseBackendUrl+"/api/v1/login";
        axios.post(url,data).then((response)=>{
            if(response.data.success){
                // console.log("login success snackbar");
                enqueueSnackbar("Login Successful.", {variant:"success"});
                // console.log("user data recieved ", response.data);
                let token = response.data.token;
                let type = response.data.type;
                let userData = response.data.user;
                // console.log("setting eamil state to ",email);
                handleSetUser(userData);
                localStorage.setItem("user", userData.username);
                localStorage.setItem("token", token);
                localStorage.setItem("type", type);
                localStorage.setItem("email", userData.email);
                // window.location.href = `/${type}`;
                navigate(`/${type}`); 
                // navigate("/visitor"); 
            }
        }).catch((error)=>{
            console.log(error);
            console.log("invalid credentials");
            enqueueSnackbar("Invalid Credentials.", {variant:"error"});
        });
    };

    return(
        <div>
            <Header header={"Login"} endButton={"Sign Up"}/>
            <div style={{display:'flex', justifyContent:'center',alignItems:"center", height:"88vh"}}>
                <Card elevation={8} sx={{width:"40vw", height:"60vh",display:'flex',justifyContent:'center', flexDirection:'column',alignItems:'center', padding:"50px",gap:"4.5vh"}}>
                        <h1 style={{margin:"15px"}}>Login</h1>
                            <TextField onChange={setDetails} id="username" label="Username" variant="filled" />
                            <TextField onChange={setDetails} id="password" type="password" label="Password" variant="filled" />
                        <Typography>
                            Don't have an account:<a href="/signup">Sign Up</a>
                        </Typography>
                        <Button onClick={()=>{loginData(details)}} size="large" variant="contained" >Login</Button>
                </Card>
            </div>
        </div>
    )
}
export default Login;