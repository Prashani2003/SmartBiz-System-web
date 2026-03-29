import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function MainLayout() {

  return (

    <Box sx={{
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#0f172a"   // main background
    }}>

      {/* Sidebar */}
      <Sidebar />

      {/* Right Side */}
      <Box sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column"
      }}>

        {/* Header */}
        <Header />

        {/* Content */}
        <Box sx={{
          flexGrow: 1,
          padding: 3,
          backgroundColor: "#020617",  // content background
          color: "white"
        }}>
          <Outlet />
        </Box>

        {/* Footer */}
        <Footer />

      </Box>

    </Box>

  );
}

export default MainLayout;