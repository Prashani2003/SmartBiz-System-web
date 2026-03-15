import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function MainLayout(){

 return(

  <Box sx={{display:"flex"}}>

   <Sidebar/>

   <Box sx={{flexGrow:1}}>

    <Header/>

    <Box sx={{padding:3}}>
     <Outlet/>
    </Box>

    <Footer/>

   </Box>

  </Box>

 )

}

export default MainLayout;