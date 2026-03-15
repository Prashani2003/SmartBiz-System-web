import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import {
 Container,
 Box,
 TextField,
 Button,
 Typography,
 Paper
} from "@mui/material";

function Register(){

 const [name,setName] = useState("");
 const [email,setEmail] = useState("");
 const [password,setPassword] = useState("");

 const navigate = useNavigate();

 const handleRegister = async () => {

  try{

   await axios.post(
    "http://localhost:5000/api/auth/register",
    { name,email,password }
   );

   alert("Registration successful");
   navigate("/");

  }catch(err){
   alert("Register failed");
  }

 };

 return(

  <Box sx={{background:"#0b1120", height:"100vh"}}>

   <Container maxWidth="sm">

    <Box
     display="flex"
     justifyContent="center"
     alignItems="center"
     height="100vh"
    >

     <Paper
      elevation={6}
      sx={{
        padding:4,
        width:"100%",
        background:"#1e293b",
        borderRadius:3
      }}
     >

     <Typography
      variant="h4"
      align="center"
      sx={{color:"#3b82f6", fontWeight:"bold", marginBottom:2}}
     >
      SmartBiz Register
     </Typography>

     <TextField
      label="Name"
      fullWidth
      margin="normal"
      value={name}
      onChange={(e)=>setName(e.target.value)}
      sx={{
        input:{color:"#fff"},
        label:{color:"#cbd5f5"},
        "& .MuiOutlinedInput-root":{
         background:"#334155"
        }
      }}
     />

     <TextField
      label="Email"
      fullWidth
      margin="normal"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
     sx={{
        input:{color:"#fff"},
        label:{color:"#cbd5f5"},
        "& .MuiOutlinedInput-root":{
         background:"#334155"
        }
      }}
     />

     <TextField
      label="Password"
      type="password"
      fullWidth
      margin="normal"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      sx={{
        input:{color:"#fff"},
        label:{color:"#cbd5f5"},
        "& .MuiOutlinedInput-root":{
         background:"#334155"
        }
      }}
     />

     <Button
      variant="contained"
      fullWidth
      sx={{
        marginTop:2,
        background:"#3b82f6",
        "&:hover":{
          background:"#2563eb"
        }
      }}
      onClick={handleRegister}
     >
      Register
     </Button>

     <Typography align="center" marginTop={2} sx={{color:"#e2e8f0"}}>
      Already have an account?{" "}
      <Link
       to="/"
       style={{color:"#3b82f6", textDecoration:"none", fontWeight:"bold"}}
      >
       Login
      </Link>
     </Typography>

    </Paper>

   </Box>

  </Container>

 </Box>

 )

}

export default Register;