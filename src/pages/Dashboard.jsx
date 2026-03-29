import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WarningIcon from "@mui/icons-material/Warning";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer} from "recharts";

// chart sample data
const chartData = [
  { day: "Mon", sales: 30 },
  { day: "Tue", sales: 50 },
  { day: "Wed", sales: 40 },
  { day: "Thu", sales: 70 },
  { day: "Fri", sales: 60 },
  { day: "Sat", sales: 90 },
  { day: "Sun", sales: 75 }
];

function Dashboard() {

  // 🟢 state (backend data)
  const [data, setData] = useState({
    total_products: 0,
    total_orders: 0,
    total_revenue: 0,
    low_stock: 0
  });

  // 🟢 API call
  useEffect(() => {
    axios.get("http://localhost:5000/api/dashboard", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  }, []);

  return (
    <Box>

      <h1>Dashboard</h1>
      <p style={{ color: "#94a3b8" }}>
        Overview of your business performance
      </p>

      {/* 🔹 TOP CARDS */}
      <Box sx={{
        display: "flex",
        gap: 3,
        mt: 3,
        flexWrap: "wrap"
      }}>

        {/* 💰 Monthly Sales */}
        <Box sx={card}>
          <Box sx={row}>
            <div>
              <p style={{ color: "#4ade80" }}>Monthly Sales</p>
              <h2>${data.total_revenue}</h2>
              <small>This month</small>
            </div>
            <AttachMoneyIcon sx={{ color: "#4ade80", fontSize: 40 }} />
          </Box>
        </Box>

        {/* 📊 Expenses */}
        <Box sx={card}>
          <Box sx={row}>
            <div>
              <p style={{ color: "#facc15" }}>Monthly Expenses</p>
              <h2>${data.total_revenue}</h2>
              <small>This month</small>
            </div>
            <TrendingUpIcon sx={{ color: "#facc15", fontSize: 40 }} />
          </Box>
        </Box>

        {/* 💵 Profit */}
        <Box sx={card}>
          <Box sx={row}>
            <div>
              <p style={{ color: "#fb7185" }}>Net Profit</p>
              <h2>${data.total_revenue}</h2>
              <small>Operating at loss</small>
            </div>
            <AccountBalanceWalletIcon sx={{ color: "#fb7185", fontSize: 40 }} />
          </Box>
        </Box>

        {/* ⚠️ Low Stock */}
        <Box sx={card}>
          <Box sx={row}>
            <div>
              <p style={{ color: "#f97316" }}>Low Stock</p>
              <h2>{data.low_stock}</h2>
              <small>Need restocking</small>
            </div>
            <WarningIcon sx={{ color: "#f97316", fontSize: 40 }} />
          </Box>
        </Box>

      </Box>

      {/* 🔹 SECOND ROW */}
      <Box sx={{ display: "flex", gap: 3, mt: 4 }}>

        {/* 📈 Chart */}
        <Box sx={box}>
          <h3>Sales — Last 7 Days</h3>

          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={chartData}>
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#4ade80"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* 🛒 Top Products */}
        <Box sx={box}>
          <h3>Top Products</h3>
          <p style={{ color: "#94a3b8" }}>No sales data yet</p>
        </Box>

      </Box>

      {/* 🔹 Recent Sales */}
      <Box sx={{ ...box, mt: 4 }}>
        <h3>Recent Sales</h3>
      </Box>

    </Box>
  );
}

// 🎨 styles
const card = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "16px",
  width: "220px",
  color: "white",
  boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
};

const box = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "16px",
  flex: 1,
  height: "250px",
  color: "white",
  boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
};

const row = {
  display: "flex",
  justifyContent: "space-between"
};

export default Dashboard;