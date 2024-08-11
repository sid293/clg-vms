import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Box, ThemeProvider, Card} from '@mui/material';
import Header from './header'
import Display from './Display'
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
// import QrReader from 'react-qr-reader';
import {QrReader} from 'react-qr-reader';

// import qrcodeJs from 'qrcode.js';

const Visitor = ({user})=>{
    let [SelectedFunctionality, setSelectedFunctionality] = useState("");
    // console.log("user state in visitor is ",user);
    let navigate = useNavigate();
    let token = localStorage.getItem('token');
    let type = localStorage.getItem('type');
    useEffect(()=>{
        if(!token || type!=="Visitor"){
            // window.location.href = '/login';
            navigate('/login');
        }
    },[navigate]);

    let selectFunc = (func)=>{
        setSelectedFunctionality(func);
        // console.log("setting selectedfunctionality to ",SelectedFunctionality);
    }

    return(
        <div>
            <Header header={"Visitor"} endButton={"logout"} />
            {/* <h1>Visitor</h1> */}
            <div style={{display:'flex',justifyContent:'center', height:"90vh", alignItems:"center"}}>
                {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}  sx={{}}> */}
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }} sx={{ marginTop:"20px",height:"50vh",maxWidth:"90%"}}>
                    <Grid item xs={6} md={4}>
                        <Link href="#display" onClick={()=>{selectFunc("Inbox")}}>
                            <Card elevation={7} sx={{height:150, width:400, cursor:'pointer'}}>
                                {/* <Typography>Inbox</Typography> */}
                                <h2>Inbox</h2>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Link href="#display">
                            <Card elevation={7} sx={{height:150, width:400, cursor:'pointer'}}>
                                <h2>Func...</h2>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Link href="#display" onClick={()=>{selectFunc("MeetingForm")}}>
                            <Card elevation={7} sx={{height:150, width:400, cursor:'pointer'}}>
                                <h2>Send Requests</h2>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Link href="#display">
                            <Card elevation={7} sx={{height:150, width:400, cursor:'pointer'}}>
                                <h2>Func...</h2>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Link href="#display">
                            <Card elevation={7} sx={{height:150, width:400, cursor:'pointer'}}>
                                <h2>Func...</h2>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Link href="#display">
                            <Card elevation={7} sx={{height:150, width:400, cursor:'pointer'}}>
                                <h2>Func...</h2>
                            </Card>
                        </Link>
                    </Grid>
                </Grid>
            </div>
            {SelectedFunctionality == ""?null:
            <div id="display" style={{ height:"800px", backgroundColor:"white"}} >
                <Display user={user} SelectedFunctionality={SelectedFunctionality} />
            </div>}
        </div>
    )
}

// module.exports = Visitor;
export default Visitor;