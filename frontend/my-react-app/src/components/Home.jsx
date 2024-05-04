import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Grid,Card,Link} from '@mui/material';

const Home = ()=>{
    let navigate = useNavigate();
    let redirect = (page)=>{
        if(page == "login"){
            navigate("/login");
        }else if(page == "signup"){
            navigate("/signup");
        }
    }
    return(
        <div>
            <h1>
               Welcome 
            </h1>
            <Grid container columnSpacing={10} sx={{justifyContent:'center',alignItems:'center'}}>
                <Grid item>
                    <Link onClick={()=>{redirect("login")}}>
                        <Card elevation={7} sx={{height:150, width:400, cursor:'pointer'}}><h2>Login</h2></Card>
                    </Link>
                </Grid>
                <Grid  item>
                    <Link onClick={()=>{redirect("signup")}}>
                        <Card elevation={7} sx={{height:150, width:400, cursor:'pointer'}}><h2>Sign Up</h2></Card>
                    </Link>
                </Grid>
            </Grid>
        </div>
    )
}

export default Home;