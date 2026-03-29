import { useEffect, useState } from "react";
import axios from "axios";

import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Paper } from "@mui/material";

function AdminProducts() {

    const [products, setProducts] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get("http://localhost:5000/api/products", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
    }, []);

    const deleteProduct = (id) => {
        axios.delete(`http://localhost:5000/api/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                setProducts(products.filter(p => p.id !== id));
            })
            .catch(err => console.log(err));
    };

    return (
        <Container sx={{ mt: 4 }}>

            <Typography variant="h4" gutterBottom>
                Product Management
            </Typography>

            <Paper sx={{ p: 2, background: "#1e293b", color: "white" }}>
                <Table>

                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: "white" }}>ID</TableCell>
                            <TableCell sx={{ color: "white" }}>Name</TableCell>
                            <TableCell sx={{ color: "white" }}>Price</TableCell>
                            <TableCell sx={{ color: "white" }}>Stock</TableCell>
                            <TableCell sx={{ color: "white" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {products.map(product => (
                            <TableRow key={product.id}>
                                <TableCell sx={{ color: "white" }}>{product.id}</TableCell>
                                <TableCell sx={{ color: "white" }}>{product.name}</TableCell>
                                <TableCell sx={{ color: "white" }}>${product.price}</TableCell>
                                <TableCell sx={{ color: "white" }}>{product.stock}</TableCell>

                                <TableCell>
                                    <Button
                                        color="error"
                                        onClick={() => deleteProduct(product.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </Paper>

        </Container>
    );
}

export default AdminProducts;