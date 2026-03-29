import { useEffect, useState } from "react";
import axios from "axios";

import { Container, Typography, Paper } from "@mui/material";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function Reports() {

    const [data, setData] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get("http://localhost:5000/api/dashboard/sales", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <Container sx={{ mt: 4 }}>

            <Typography variant="h4" gutterBottom>
                Reports & Analytics
            </Typography>

            <Paper sx={{ p: 3, background: "#1e293b", color: "white" }}>

                <Typography variant="h6" gutterBottom>
                    Sales Overview (Last 7 Days)
                </Typography>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <XAxis dataKey="date" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip />
                        <Bar dataKey="total" fill="#4ade80" />
                    </BarChart>
                </ResponsiveContainer>

            </Paper>

        </Container>
    );
}

export default Reports;