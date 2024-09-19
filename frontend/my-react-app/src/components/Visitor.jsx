import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card} from '@mui/material';
import Header from './header'
import Display from './Display'
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

const Visitor = ({user})=>{
    let [SelectedFunctionality, setSelectedFunctionality] = useState("");
    // console.log("user state in visitor is ",user);
    let navigate = useNavigate();
    let token = localStorage.getItem('token');
    let type = localStorage.getItem('type');
    useEffect(()=>{
        if(!token || type!=="Visitor"){
            navigate('/login');
        }
    },[navigate]);

    let selectFunc = (func)=>{
        setSelectedFunctionality(func);
    }

    return(
        <div>
            <Header header={"Visitor"} endButton={"logout"} />
            <div style={{display:'flex',justifyContent:'center', alignItems:"center"}}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }} sx={{ marginTop:"20px",maxWidth:"90%"}}>
                    <Grid item xs={12} sm={6} md={4} sx={{ heigh: "200px" }}>
                        <Link href="#display" onClick={()=>{selectFunc("Inbox")}}>
                            <Card elevation={7} sx={{height:150, width:"100%", cursor:'pointer'}}>
                                <h2>📫</h2>
                                <h2>Inbox</h2>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} sx={{ heigh: "200px" }}>
                        <Link href="#display" onClick={()=>{selectFunc("MeetingForm")}}>
                            <Card elevation={7} sx={{height:150, width:"100%", cursor:'pointer'}}>
                                <h2>📩</h2>
                                <h2>Send Requests</h2>
                            </Card>
                        </Link>
                    </Grid>
                    {/* <Grid item xs={12} sm={6} md={4} sx={{ heigh: "200px" }}>
                        <Link href="#display">
                            <Card elevation={7} sx={{height:150, width:"100%", cursor:'pointer'}}>
                                <h2>Func...</h2>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} sx={{ heigh: "200px" }}>
                        <Link href="#display">
                            <Card elevation={7} sx={{height:150, width:"100%", cursor:'pointer'}}>
                                <h2>Func...</h2>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} sx={{ heigh: "200px" }}>
                        <Link href="#display">
                            <Card elevation={7} sx={{height:150, width:"100%", cursor:'pointer'}}>
                                <h2>Func...</h2>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} sx={{ heigh: "200px" }}>
                        <Link href="#display">
                            <Card elevation={7} sx={{height:150, width:"100%", cursor:'pointer'}}>
                                <h2>Func...</h2>
                            </Card>
                        </Link>
                    </Grid> */}
                </Grid>
            </div>
            {SelectedFunctionality == ""?null:
            <div id="display" style={{ height:"800px", backgroundColor:"white"}} >
                <Display user={user} SelectedFunctionality={SelectedFunctionality} />
            </div>}
        </div>
    )
}

export default Visitor;