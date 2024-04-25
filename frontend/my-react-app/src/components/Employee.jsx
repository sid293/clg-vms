import React from 'react';
// import {useNavigate} from 'react-router-dom';
// import {useEffect} from 'react';
import Header from './header'
import Display from './Display'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Box, ThemeProvider, Card} from '@mui/material';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';


const Employee = ()=>{
    let [SelectedFunctionality, setSelectedFunctionality] = useState("");
    let navigate = useNavigate();
    let token = localStorage.getItem('token');
    let type = localStorage.getItem('type');
    useEffect(()=>{
        if(!token || type!=="Employee"){
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
            {/* <h1>Employee</h1> */}
            <Header header={"Employee"} endButton={"logout"} />
            <div style={{display:'flex',justifyContent:'center'}}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{}}>
                    <Grid item xs={6} md={6}>
                        <Link href="#display" onClick={()=>{selectFunc("Inbox")}}>
                            <Card elevation={7} sx={{height:150, width:400, cursor:'pointer'}}>
                                {/* <Typography>Inbox</Typography> */}
                                <h2>Inbox</h2>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Link href="#display" onClick={()=>{selectFunc("EmployeeQR")}}>
                            <Card elevation={7} sx={{height:150, width:400, cursor:'pointer'}}>
                                <h2>My QR</h2>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item xs={6} md={6}>                           
                    {/* employee shouldn't have this ability */}
                        <Link href="#display" onClick={()=>{selectFunc("")}}>
                            <Card elevation={7} sx={{height:150, width:400, cursor:'pointer'}}>
                                <h2>Func...</h2>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Link href="#display">
                            <Card elevation={7} sx={{height:150, width:400, cursor:'pointer'}}>
                                <h2>Func...</h2>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Link href="#display">
                            <Card elevation={7} sx={{height:150, width:400, cursor:'pointer'}}>
                                <h2>Func...</h2>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item xs={6} md={6}>
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
                <Display user={"Employee"} SelectedFunctionality={SelectedFunctionality} />
            </div>}
        </div>
    )
};

// module.exports = Employee;
export default Employee;