import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {Box,Card } from '@mui/material';
import {Typography} from '@mui/material';
import {useSnackbar} from 'notistack';
import {QrReader} from 'react-qr-reader';
import {TextField, Button} from '@mui/material';
import Header from './header'
import Display from './Display'
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';


let email = localStorage.getItem("email");
let sender = localStorage.getItem("user");
let userType = localStorage.getItem("type");



const Reception = ()=>{
    let [SelectedFunctionality, setSelectedFunctionality] = useState("");
    let selectFunc = (func)=>{
        setSelectedFunctionality(func);
        // console.log("setting selectedfunctionality to ",SelectedFunctionality);
    }
    let navigate = useNavigate();
    let token = localStorage.getItem('token');
    let type = localStorage.getItem('type');
    useEffect(()=>{
        if(!token || type!=="Reception"){
            // window.location.href = '/login';
            navigate('/login');
        }
    },[navigate]);

    return(
        <div>
            <Header header={"Reception"} endButton={"logout"} />
            <div style={{display:'flex',justifyContent:'center'}}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{}}>
                    <Grid item xs={6} md={6}>
                        <Link href="#display" onClick={()=>{selectFunc("QRScanner")}}>
                            <Card elevation={7} sx={{height:150, width:400, cursor:'pointer'}}>
                                {/* <Typography>Inbox</Typography> */}
                                <h2>Validate QR</h2>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Link href="#display" onClick={()=>{selectFunc("CheckedInUsers")}}>
                            <Card elevation={7} sx={{height:150, width:400, cursor:'pointer'}}>
                                <h2>Checked-in users.</h2>
                            </Card>
                        </Link>
                    </Grid>
                </Grid>
            </div>
            {SelectedFunctionality == ""?null:
            <div id="display" style={{height:"800px", backgroundColor:"white"}} >
                <Display user={"Employee"} SelectedFunctionality={SelectedFunctionality} />
            </div>}
        </div>
    ) 
};

// module.exports = Reception;
export default Reception;