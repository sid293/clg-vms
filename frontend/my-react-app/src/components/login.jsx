import React,{useState,useEffect} from 'react';
import Card from '@mui/material/Card';
import {useSnackbar} from 'notistack';
import Typography from '@mui/material/Typography';
import { TextField} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import CardContent from '@mui/material/CardContent';
import {useNavigate, Link} from 'react-router-dom';
// import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Header from './header';
import axios from 'axios';

// dotenv.config();

const baseBackendUrl = import.meta.env.VITE_backend_url;

const Login = ({user,handleSetUser})=>{
    let [loading, setLoading] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    let navigate = useNavigate();
    
    let [details, useDetails] = useState({username:"",password:""});
    let setDetails = (e)=>{
        useDetails({...details,[e.target.id]:e.target.value});        
    };

    let loginData = (data)=>{
        setLoading(true);
        let url = baseBackendUrl+"/api/v1/login";
        axios.post(url,data).then((response)=>{
            if(response.data.success){
                enqueueSnackbar("Login Successful.", {variant:"success"});
                setLoading(false);
                let token = response.data.token;
                let type = response.data.type;
                let userData = response.data.user;
                handleSetUser(userData);
                localStorage.setItem("user", userData.username);
                localStorage.setItem("token", token);
                localStorage.setItem("type", type);
                localStorage.setItem("email", userData.email);
                navigate(`/${type}`); 
                // navigate("/visitor"); 
            }
        }).catch((error)=>{
            console.log(error);
            console.log("invalid credentials");
            enqueueSnackbar("Invalid Credentials.", {variant:"error"});
            setLoading(false);
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
                            Don't have an account:<Link to="/signup">Sign Up</Link>
                        </Typography>
                        {loading?
                        <CircularProgress />
                        :
                        <Button onClick={()=>{loginData(details)}} size="large" variant="contained" >Login</Button>
                        }
                </Card>
            </div>
        </div>
    )
}
export default Login;