import {
 AppBar,
 Toolbar,
 Typography,
 Box,
 IconButton,
 Avatar
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";

function Header(){

 const handleLogout = () => {

  localStorage.removeItem("token");
  window.location.href="/";

 };

 return(

  <AppBar position="static" sx={{background:"#1e293b"}}>

   <Toolbar>

    <Typography variant="h6">
     SmartBiz Admin Panel
    </Typography>

    <Box sx={{flexGrow:1}} />

    <Typography sx={{mr:2}}>
     Admin
    </Typography>

    <Avatar sx={{mr:2, background:"#3b82f6"}}>
     A
    </Avatar>

    <IconButton color="inherit" onClick={handleLogout}>
     <LogoutIcon/>
    </IconButton>

   </Toolbar>

  </AppBar>

 )

}

export default Header;