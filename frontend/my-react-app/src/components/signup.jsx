// import React from 'react';
// import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {Button, Card, TextField, CircularProgress} from '@mui/material';
// import './signup.css';
import {useSnackbar} from 'notistack';
// import {Snackbar} from '@mui/material';
// import {useForm} from 'react-hook-form';
import axios from 'axios';
import Header from './header';
import Autocomplete from '@mui/material/Autocomplete';

// const baseBackendUrl = "https://clg-vms-backend.onrender.com";
const baseBackendUrl = import.meta.env.VITE_backend_url;

const Signup = ()=>{
    let[loading, setLoading] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    // const {register, handleSubmit, formState: {errors}} = useForm();
    const [formData,setState] = useState({username:"",password:"",confirmPassword:"",email:"",type:"Visitor"});
    // const navigate = useNavigate();
    const accountType = [
        { id: 1, label: 'Visitor' },
        { id: 2, label: 'Reception' },
        // { id: 3, label: 'Visitor' },
      ];      
    const setData = (e)=>{
        setState((prev)=>({...prev,[e.target.id]:e.target.value}));
    };
    // const setDataAutocomplete = (e,newValue)=>{
    //     console.log("account type is ",newValue.label);
    //     // setState((prev)=>({...prev,[e.target.id]:newvalue.label}));
    //     if (newValue) {
    //         console.log("setting state of type");
    //         setState(prev => ({ ...prev, type: newValue.label }));
    //     } else {
    //         setState(prev => ({ ...prev, type: "" }));
    //     }
    // };
    const signUpData = (data)=>{
        setLoading(true);
        if(data.username === "" || data.password === "" || data.confirmPassword === "" || data.email === "" || data.type === ""){
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
            setLoading(false);
            return;
        }else if(data.password.length < 8){
            console.log("password length is less than 8 snackbar");
            enqueueSnackbar("Password length should be greater than 8.", {variant:"error"});
            setLoading(false);
            return;
        }
        let url = baseBackendUrl+"/api/v1/register";
        axios.post(url, data)
        .then((response)=>{
            if(response.status === 201){
                console.log("user added snackbar");
                enqueueSnackbar("User added successfully.", {variant:"success"});
                setLoading(false);
            }else{
                console.log("something went wrong");
                enqueueSnackbar("Something went wrong.", {variant:"error"});
                setLoading(false);
            }
        }).catch((error)=>{
            console.log("error is ", error);
            if(error.response.data.message == "username already exist"){
                console.log("username already present snackbar");
                enqueueSnackbar("Username already taken.", {variant:"warning"});
                setLoading(false);
            }else if(error.response.data.message == "email already exist"){
                console.log("email already present snackbar");
                enqueueSnackbar("Email already taken.", {variant:"warning"});
                setLoading(false);
            }else{
                console.log('snackbar: somethign went wrong in backend');
                enqueueSnackbar("Something went wrong, check backend.", {variant:"error"});
                setLoading(false);
            }
        })
    };

    return(
        <div>
            <Header header={"Sign Up "} endButton={"Login"} />
            <div style={{display:'flex', justifyContent:'center'}}>
                <Card elevation={8} sx={{margin:"40px", width:"50vw", height:"70vh",display:'flex',justifyContent:'center', flexDirection:'column',alignItems:'center', padding:"50px",gap:"4.5vh"}}>
                            <h1 style={{margin:"0px"}}>Signup</h1>
                            <TextField required onChange={setData} id="username" label="Username" variant="filled" />
                            <TextField required onChange={setData} id="password" type="password" label="Password" variant="filled" />
                            <TextField required onChange={setData} id="confirmPassword" type="password" label="Confirm Password" variant="filled" />
                            <TextField required id="email" type="email" onChange={setData} label="Email" variant="filled" />
                        {loading ?  <CircularProgress/>:
                        <Button size="large" variant="contained" onClick={()=>{signUpData(formData)}} >Sign Up</Button>
                        }
                </Card>
            </div>

        </div>
    )
}

export default Signup;
