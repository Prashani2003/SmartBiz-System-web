import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";

function Expenses() {

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);

  const token = localStorage.getItem("token");

  const fetchExpenses = async () => {
    const res = await axios.get("http://localhost:5000/api/expenses", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const addExpense = async () => {
    await axios.post(
      "http://localhost:5000/api/expenses",
      { title, amount, category },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTitle("");
    setAmount("");
    setCategory("");
    fetchExpenses();
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Expenses</Typography>

      <Paper sx={{ p: 3, mt: 2 }}>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Amount"
          fullWidth
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Category"
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button variant="contained" onClick={addExpense}>
          Add Expense
        </Button>
      </Paper>

      <Paper sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {expenses.map((e) => (
              <TableRow key={e.id}>
                <TableCell>{e.title}</TableCell>
                <TableCell>${e.amount}</TableCell>
                <TableCell>{e.category}</TableCell>
                <TableCell>
                  {new Date(e.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

    </Container>
  );
}

export default Expenses;