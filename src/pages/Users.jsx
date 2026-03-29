import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Paper } from "@mui/material";

function Users() {

    const [users, setUsers] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get("http://localhost:5000/api/users", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));
    }, []);

    const deleteUser = (id) => {
        axios.delete(`http://localhost:5000/api/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                setUsers(users.filter(u => u.id !== id));
            })
            .catch(err => console.log(err));
    };

    return (
        <Container sx={{ mt: 4 }}>

            <Typography variant="h4" gutterBottom>
                Users Management
            </Typography>

            <Paper sx={{ p: 2 }}>
                <Table>

                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <Button
                                        color="error"
                                        onClick={() => deleteUser(user.id)}
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

export default Users;