import React,{useEffect,useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import { useHistory } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import './header.css';

// const history = useHistory();
let navigate = (to)=>{
    // console.log(to);
    // const naviagte = useNavigate();
    if(to == "Sign Up"){
        // history.push("/signup");
        console.log("navigate to signup");
        // naviagte.push("/signup");
        // naviagte("/signup");
    }else if(to == "Login"){
        // history.push("/login");
        console.log("navigate to login");
        // naviagte.push("/login");
        // naviagte("/login");
    }
    // history.push(to);
}

const Header = ({header,endButton})=>{

    const navigate = useNavigate();

    const handleClick = ()=>{
        // navigate(endButton === "Sign Up" ? "/signup" : "/login");
        if(endButton === "logout"){
            localStorage.removeItem("user");
            localStorage.clear();
            navigate("/login");
            // window.location.reload();
        }else if(endButton === "Sign Up"){
            navigate("/signup");
        }else{
            navigate("/login");
        }
};
    return(
        <div>
            <Box sx={{boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'}} display="flex" justifyContent="space-between">
                <Box sx={{boxShadow:"0"}} className="header">
                    <Typography variant="h3" color="inherit" component="div">
                        {header}: {localStorage.getItem("user")}
                    </Typography>
                </Box>
                <Box sx={{display:'flex',alignItems:'center'}}> 
                    {/* <Button size="large" variant="text" onClick={()=>{navigate(endButton)}}>{endButton}</Button> */}
                    <Button size="large" variant="text" onClick={handleClick}>{endButton}</Button>
                </Box>
            </Box>
        </div>
    );
}

export default Header;