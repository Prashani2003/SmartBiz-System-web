import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function MainLayout() {

  return (
    <Box sx={{
      display: "flex",
      height: "100vh",
      overflow: "hidden",
      backgroundColor: "#020617"
    }}>

      <Sidebar />

      <Box sx={{
        flexGrow: 1,
        p: 3,
        backgroundColor: "#020617",
        color: "white",
        overflowY: "auto"
      }}>
        <Outlet />
      </Box>

    </Box>
  );
}

export default MainLayout;