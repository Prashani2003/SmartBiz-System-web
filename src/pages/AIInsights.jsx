import { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  CircularProgress
} from "@mui/material";

function AIInsights() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/ai-insights",
        { query },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      setResponse(res.data.response);
    } catch (err) {
      console.error("AI query error:", err);
      setResponse("Error generating insights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        AI Insights
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: "#94a3b8" }}>
        Ask questions about your business in natural language. Examples:
        <br />- "How did I perform last month?"
        <br />- "What were my top 5 selling items in June?"
        <br />- "Write a thank-you email to a supplier for delivery delay"
        <br />- "Create a Facebook post for our 50% off sale"
      </Typography>

      <Paper sx={{ padding: 3, backgroundColor: "#1e293b", color: "white" }}>
        <TextField
          label="Ask AI"
          fullWidth
          multiline
          rows={4}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{
            mb: 2,
            "& .MuiInputBase-root": { color: "white" },
            "& .MuiInputLabel-root": { color: "#94a3b8" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#94a3b8" },
              "&:hover fieldset": { borderColor: "#4ade80" },
              "&.Mui-focused fieldset": { borderColor: "#4ade80" }
            }
          }}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          sx={{ backgroundColor: "#4ade80", "&:hover": { backgroundColor: "#22c55e" } }}
        >
          {loading ? <CircularProgress size={24} /> : "Generate Insights"}
        </Button>

        {response && (
          <Box sx={{ mt: 3, p: 2, backgroundColor: "#0f172a", borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              AI Response:
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
              {response}
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default AIInsights;