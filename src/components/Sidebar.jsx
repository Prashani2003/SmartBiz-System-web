import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

function Sidebar(){

 return(

  <Drawer
   variant="permanent"
   sx={{
    width:220,
    "& .MuiDrawer-paper":{
     width:220,
     background:"#0f172a",
     color:"#fff"
    }
   }}
  >

   <List>

    <ListItemButton component={Link} to="/dashboard">
     <ListItemText primary="Dashboard"/>
    </ListItemButton>

    <ListItemButton component={Link} to="/products">
     <ListItemText primary="Products"/>
    </ListItemButton>

    <ListItemButton component={Link} to="/orders">
     <ListItemText primary="Orders"/>
    </ListItemButton>

    <ListItemButton component={Link} to="/ai-insights">
     <ListItemText primary="AI Insights"/>
    </ListItemButton>

     <ListItemButton component={Link} to="/admin">
     <ListItemText primary="Admin"/>
     </ListItemButton>

   </List>

  </Drawer>

 )

}

export default Sidebar;