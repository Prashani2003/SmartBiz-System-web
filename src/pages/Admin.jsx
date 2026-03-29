import { Container, Typography, Grid, Card, CardContent, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

function Admin() {

    const navigate = useNavigate();

    return (
        <Container sx={{ mt: 4 }}>

            <Typography variant="h4" gutterBottom>
                Admin Panel
            </Typography>

            <Grid container spacing={3}>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={cardStyle}>
                        <CardContent>

                            <Typography variant="h6" gutterBottom>
                                Manage Users
                            </Typography>

                            <Typography variant="body2" sx={{ mb: 2, color: "#94a3b8" }}>
                                View and manage system users
                            </Typography>

                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => navigate("/admin/users")}
                            >
                                View Users
                            </Button>

                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={cardStyle}>
                        <CardContent>

                            <Typography variant="h6" gutterBottom>
                                Manage Products
                            </Typography>

                            <Typography variant="body2" sx={{ mb: 2, color: "#94a3b8" }}>
                                Admin product control
                            </Typography>

                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => navigate("/admin/products")}
                            >
                                Manage
                            </Button>

                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={cardStyle}>
                        <CardContent>

                            <Typography variant="h6" gutterBottom>
                                Reports
                            </Typography>

                            <Typography variant="body2" sx={{ mb: 2, color: "#94a3b8" }}>
                                View business reports
                            </Typography>

                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => navigate("/admin/reports")}
                            >
                                View Reports
                            </Button>

                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

        </Container>
    );
}

const cardStyle = {
    borderRadius: "16px",
    background: "#1e293b",
    color: "white",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    transition: "0.3s",
    "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 6px 25px rgba(0,0,0,0.5)"
    }
};

export default Admin;