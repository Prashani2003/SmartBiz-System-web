import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  CircularProgress,
  Chip,
  Box
} from "@mui/material";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch Orders
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔹 Status Chip Color
  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "warning";
      case "completed": return "success";
      case "cancelled": return "error";
      default: return "default";
    }
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h4">
          Orders
        </Typography>
        <Button variant="contained" component={Link} to="/create-order">
          Create New Order
        </Button>
      </Box>

      <Paper sx={{ padding: 2 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer_name}</TableCell>
                    <TableCell>${order.total}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        color={getStatusColor(order.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ mr: 1 }}
                      >
                        View
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="success"
                      >
                        Invoice
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Container>
  );
}

export default Orders;