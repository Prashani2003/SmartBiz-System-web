import { useState, useEffect } from "react";
import axios from "axios";

import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function CreateOrder() {
  const [customerName, setCustomerName] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [total, setTotal] = useState(0);

  // 🔹 Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/products", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setProducts(res.data);

      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  // 🔹 Add product
  const addProduct = (productId) => {
    const product = products.find(p => p.id === productId);

    if (product) {
      const existing = selectedProducts.find(p => p.id === productId);

      if (existing) {
        existing.quantity += 1;
        setSelectedProducts([...selectedProducts]);
      } else {
        setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
      }
    }
  };

  // 🔹 Remove product
  const removeProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };

  // 🔹 Update quantity
  const updateQuantity = (productId, quantity) => {
    const updated = selectedProducts.map(p =>
      p.id === productId
        ? { ...p, quantity: parseInt(quantity) || 1 }
        : p
    );

    setSelectedProducts(updated);
  };

  // 🔹 Calculate total
  useEffect(() => {
    const newTotal = selectedProducts.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0
    );
    setTotal(newTotal);
  }, [selectedProducts]);

  // 🔥 SUBMIT ORDER (FIXED)
  const handleSubmit = async () => {

    if (!customerName || selectedProducts.length === 0) {
      alert("Please enter customer name and add products");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const orderData = {
        customer_name: customerName,
        items: selectedProducts.map(p => ({
          product_id: p.id,
          quantity: p.quantity,
          price: p.price   // 🔥 IMPORTANT FIX
        }))
      };

      console.log("Sending order:", orderData);

      await axios.post(
        "http://localhost:5000/api/orders", // 🔥 FIXED URL
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Order created successfully");

      // reset
      setCustomerName("");
      setSelectedProducts([]);
      setTotal(0);

    } catch (err) {
      console.error("Error creating order:", err);
      console.error(err.response?.data);
      alert("Error creating order");
    }
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create Order
      </Typography>

      <Paper sx={{ padding: 3 }}>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Customer Name"
              fullWidth
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              label="Add Product"
              fullWidth
              onChange={(e) => addProduct(e.target.value)}
              value=""
            >
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name} - ${product.price}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        {selectedProducts.length > 0 && (
          <Table sx={{ mt: 3 }}>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Subtotal</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {selectedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price}</TableCell>

                  <TableCell>
                    <TextField
                      type="number"
                      size="small"
                      value={product.quantity}
                      onChange={(e) =>
                        updateQuantity(product.id, e.target.value)
                      }
                      inputProps={{ min: 1 }}
                    />
                  </TableCell>

                  <TableCell>
                    ${(product.price * product.quantity).toFixed(2)}
                  </TableCell>

                  <TableCell>
                    <IconButton
                      onClick={() => removeProduct(product.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <Typography variant="h6" sx={{ mt: 2 }}>
          Total: ${total.toFixed(2)}
        </Typography>

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Create Order
        </Button>

      </Paper>
    </Container>
  );
}

export default CreateOrder;