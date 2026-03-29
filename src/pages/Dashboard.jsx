import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WarningIcon from "@mui/icons-material/Warning";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

function Dashboard() {

  const [data, setData] = useState({
    total_products: 0,
    total_orders: 0,
    total_revenue: 0,
    low_stock: 0
  });

  const [sales, setSales] = useState([]);
  const [recent, setRecent] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {


    axios.get("http://localhost:5000/api/dashboard", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setData(res.data))
      .catch(err => console.log(err));


    axios.get("http://localhost:5000/api/dashboard/sales", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {

        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        const formatted = days.map(day => {

          const found = res.data.find(item =>
            new Date(item.date).toLocaleDateString("en-US", { weekday: "short" }) === day
          );

          return {
            day,
            sales: found ? found.total : 0
          };
        });

        setSales(formatted);

      })
      .catch(err => console.log(err));


    axios.get("http://localhost:5000/api/dashboard/recent-sales", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setRecent(res.data))
      .catch(err => console.log(err));


    axios.get("http://localhost:5000/api/dashboard/top-products", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setTopProducts(res.data))
      .catch(err => console.log(err));

  }, []);

  return (
    <Box>

      <h1>Dashboard</h1>
      <p style={{ color: "#94a3b8" }}>
        Overview of your business performance
      </p>

      <Box sx={{ display: "flex", gap: 3, mt: 3, flexWrap: "wrap" }}>

        <Box sx={card}>
          <Box sx={row}>
            <div>
              <p style={{ color: "#4ade80" }}>Total Revenue</p>
              <h2>${data.total_revenue}</h2>
            </div>
            <AttachMoneyIcon sx={{ color: "#4ade80", fontSize: 40 }} />
          </Box>
        </Box>

        <Box sx={card}>
          <Box sx={row}>
            <div>
              <p style={{ color: "#38bdf8" }}>Total Orders</p>
              <h2>{data.total_orders}</h2>
            </div>
            <TrendingUpIcon sx={{ color: "#38bdf8", fontSize: 40 }} />
          </Box>
        </Box>

        <Box sx={card}>
          <Box sx={row}>
            <div>
              <p style={{ color: "#f472b6" }}>Products</p>
              <h2>{data.total_products}</h2>
            </div>
            <AccountBalanceWalletIcon sx={{ color: "#f472b6", fontSize: 40 }} />
          </Box>
        </Box>

        <Box sx={card}>
          <Box sx={row}>
            <div>
              <p style={{ color: "#f97316" }}>Low Stock</p>
              <h2>{data.low_stock}</h2>
            </div>
            <WarningIcon sx={{ color: "#f97316", fontSize: 40 }} />
          </Box>
        </Box>

      </Box>

      <Box sx={{ display: "flex", gap: 3, mt: 4 }}>

        <Box sx={box}>
          <h3>Sales — Last 7 Days</h3>

          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={sales}>
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#4ade80" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        <Box sx={box}>
          <h3>Top Products</h3>

          {topProducts.length > 0 ? (
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={topProducts}>
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="total_sold" fill="#38bdf8" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p style={{ color: "#94a3b8" }}>No data yet</p>
          )}

        </Box>

      </Box>

      <Box sx={{ ...box, mt: 4 }}>
        <h3>Recent Sales</h3>

        {recent.length > 0 ? (
          recent.map((item) => (
            <div key={item.id} style={{ marginTop: 10 }}>
              {item.customer_name} — ${item.total_price}
            </div>
          ))
        ) : (
          <p style={{ color: "#94a3b8" }}>No recent sales</p>
        )}

      </Box>

    </Box>
  );
}

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