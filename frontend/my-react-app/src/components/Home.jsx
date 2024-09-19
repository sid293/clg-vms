import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Grid,Card,Link, Typography,Box} from '@mui/material';

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
               Home 
            </h1>
            <Grid container columnSpacing={10} sx={{justifyContent:'center',alignItems:'center'}}>
                <Grid item>
                    <Link onClick={()=>{redirect("login")}}>
                        <Card elevation={7} sx={{height:150, width:400, cursor:'pointer'}}>
                            <h2>🚪</h2>
                            <h2>Login</h2>
                        </Card>
                    </Link>
                </Grid>
                <Grid  item>
                    <Link onClick={()=>{redirect("signup")}}>
                        <Card elevation={7} sx={{height:150, width:400, cursor:'pointer'}}>
                            <h2>📄</h2>
                            <h2>Sign Up</h2>
                        </Card>
                    </Link>
                </Grid>
            </Grid>
            <div style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                height:"40vh"
            }}>
                <Box sx={{
                    height:180,
                    width:400,
                    border:"3px solid yellow",
                    borderRadius:"10px",
                    background:"black",
                }}>
                    <Typography sx={{
                        color:"green",
                    height:180,
                    width:400,
                    }}>
                        <br></br>Accounts to explore: (password is same as username)
                        employeenine<br/>
                        visitorfive<br/>
                        receptionone<br/>
                        admin
                    </Typography>
                </Box>
            </div>
        </div>
    )
}

export default Home;