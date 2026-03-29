import { useEffect, useState } from "react";
import axios from "axios";

import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, CircularProgress, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";

function Products() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: ""
  });

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleOpenAdd = () => {
    setForm({ name: "", price: "", stock: "" });
    setEditingId(null);
    setOpen(true);
  };

  const handleEdit = (p) => {
    setForm({
      name: p.name,
      price: p.price,
      stock: p.stock
    });
    setEditingId(p.id);
    setOpen(true);
  };

  const handleSave = async () => {

    if (!form.name || !form.price || !form.stock) {
      alert("All fields required");
      return;
    }

    try {
      if (editingId) {

        await axios.put(
          `http://localhost:5000/api/products/${editingId}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/products",
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setOpen(false);
      fetchProducts();

    } catch (err) {
      console.error(err);
      alert("Error saving product");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchProducts();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container sx={{ marginTop: 4 }}>

      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: 2 }}
        onClick={handleOpenAdd}
      >
        Add Product
      </Button>

      <Paper sx={{ padding: 2 }}>

        {loading ? (
          <CircularProgress />
        ) : (
          <Table>

            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {products.length > 0 ? (
                products.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.price}</TableCell>
                    <TableCell>{p.stock}</TableCell>

                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => handleEdit(p)}
                        sx={{ marginRight: 1 }}
                      >
                        Edit
                      </Button>

                      <Button
                        color="error"
                        variant="contained"
                        onClick={() => handleDelete(p.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No products found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

          </Table>
        )}

      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)}>

        <DialogTitle>
          {editingId ? "Edit Product" : "Add Product"}
        </DialogTitle>

        <DialogContent>

          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            value={form.name}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            label="Price"
            name="price"
            fullWidth
            value={form.price}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            label="Stock"
            name="stock"
            fullWidth
            value={form.stock}
            onChange={handleChange}
          />

        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>

      </Dialog>

    </Container>
  );
}

export default Products;