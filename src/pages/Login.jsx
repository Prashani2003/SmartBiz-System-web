import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper
} from "@mui/material";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    try {

      const res = await axios.post(
        "http://127.0.0.1:5000/api/auth/login",
        { email, password }
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      }

    } catch (err) {
      alert("Login failed");
    }

  };

  return (

    <Box sx={{ background: "#0b1120", height: "100vh" }}>

      <Container maxWidth="sm">

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >

          <Paper
            elevation={6}
            sx={{
              padding: 4,
              width: "100%",
              background: "#1e293b",
              borderRadius: 3
            }}
          >

            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ color: "#3b82f6", fontWeight: "bold" }}
            >
              SmartBiz Login
            </Typography>

            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                input: { color: "#fff" },
                label: { color: "#cbd5f5" },
                "& .MuiOutlinedInput-root": {
                  background: "#334155"
                }
              }}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                input: { color: "#fff" },
                label: { color: "#cbd5f5" },
                "& .MuiOutlinedInput-root": {
                  background: "#334155"
                }
              }}
            />

            <Button
              variant="contained"
              fullWidth
              sx={{
                marginTop: 2,
                background: "#3b82f6",
                fontWeight: "bold",
                "&:hover": {
                  background: "#2563eb"
                }
              }}
              onClick={handleLogin}
            >
              Login
            </Button>

            <Typography align="center" marginTop={2} sx={{ color: "#e2e8f0" }}>
              Don't have an account?{" "}
              <Link
                to="/register"
                style={{ color: "#3b82f6", textDecoration: "none", fontWeight: "bold" }}
              >
                Register
              </Link>
            </Typography>

          </Paper>

        </Box>

      </Container>

    </Box>

  );

}

export default Login;