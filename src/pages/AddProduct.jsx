import { useState } from "react";
import axios from "axios";

import { Container, Typography, TextField, Button, Paper } from "@mui/material";

function AddProduct() {

    const [businessId, setBusinessId] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");

    const handleSubmit = async () => {

        console.log("Add Product Clicked");

        try {

            const res = await axios.post(
                "http://localhost:5000/api/products/create",
                {
                    business_id: businessId,
                    name,
                    price,
                    stock
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            console.log(res.data);

            alert("Product added successfully");

            setBusinessId("");
            setName("");
            setPrice("");
            setStock("");

        } catch (err) {
            console.log("Error:", err);
            alert("Error adding product");
        }

    };

    return (

        <Container sx={{ marginTop: 4 }}>

            <Paper sx={{ padding: 4 }}>

                <Typography variant="h4" gutterBottom>
                    Add Product
                </Typography>

                <TextField
                    label="Business ID"
                    fullWidth
                    margin="normal"
                    value={businessId}
                    onChange={(e) => setBusinessId(e.target.value)}
                />

                <TextField
                    label="Product Name"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <TextField
                    label="Price"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <TextField
                    label="Stock"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                />

                <Button
                    variant="contained"
                    sx={{ marginTop: 2 }}
                    onClick={handleSubmit}
                >
                    Add Product
                </Button>

            </Paper>

        </Container>

    )

}

export default AddProduct;