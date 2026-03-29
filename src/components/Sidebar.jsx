import { Box, Typography } from "@mui/material";

import { Dashboard, ShoppingCart, Inventory, SmartToy, Logout } from "@mui/icons-material";

import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
    { name: "Orders", icon: <ShoppingCart />, path: "/orders" },
    { name: "Products", icon: <Inventory />, path: "/products" },
    { name: "AI Tools", icon: <SmartToy />, path: "/ai-insights" }
  ];

  return (
    <Box sx={{
      width: 260,
      height: "100vh",
      background: "linear-gradient(180deg, #020617, #020617)",
      color: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      p: 2,
      borderRight: "1px solid #1e293b"
    }}>

      <Box>

        <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 4
        }}>
          <Box sx={{
            width: 40,
            height: 40,
            borderRadius: "12px",
            background: "linear-gradient(135deg,#3b82f6,#06b6d4)"
          }} />
          <Typography variant="h6">SmartBiz</Typography>
        </Box>


        {menu.map((item) => {

          const active = location.pathname === item.path;

          return (
            <Box
              key={item.name}
              onClick={() => navigate(item.path)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 1.5,
                mb: 1,
                borderRadius: 2,
                cursor: "pointer",

                background: active
                  ? "linear-gradient(90deg,#3b82f6,#2563eb)"
                  : "transparent",

                boxShadow: active
                  ? "0 0 15px rgba(59,130,246,0.5)"
                  : "none",

                "&:hover": {
                  backgroundColor: "#1e293b"
                }
              }}
            >
              {item.icon}
              <Typography>{item.name}</Typography>
            </Box>
          );
        })}

      </Box>

      <Box>

        <Box
          onClick={() => navigate("/admin")}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 2,
            cursor: "pointer",
            p: 1,
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "#1e293b"
            }
          }}
        >
          <Box sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "#3b82f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold"
          }}>
            A
          </Box>

          <Box>
            <Typography fontSize={14}>Admin</Typography>
            <Typography fontSize={12} sx={{ opacity: 0.6 }}>
              ADMIN
            </Typography>
          </Box>
        </Box>

        <Box
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            color: "#f87171",
            cursor: "pointer",
            p: 1,
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "#1e293b"
            }
          }}
        >
          <Logout />
          Logout
        </Box>

      </Box>

    </Box>
  );
}

export default Sidebar;