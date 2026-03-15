import {
 Container,
 Typography,
 Grid,
 Card,
 CardContent,
 Button
} from "@mui/material";

function Admin(){

 return(

  <Container sx={{marginTop:4}}>

   <Typography variant="h4" gutterBottom>
    Admin Panel
   </Typography>

   <Grid container spacing={3}>

    <Grid item xs={12} md={4}>
     <Card elevation={4} sx={{borderRadius:3}}>
      <CardContent>

       <Typography variant="h6">
        Manage Users
       </Typography>

       <Typography variant="body2" sx={{mb:2}}>
        View and manage system users
       </Typography>

       <Button variant="contained">
        View Users
       </Button>

      </CardContent>
     </Card>
    </Grid>

    <Grid item xs={12} md={4}>
     <Card elevation={4} sx={{borderRadius:3}}>
      <CardContent>

       <Typography variant="h6">
        Manage Products
       </Typography>

       <Typography variant="body2" sx={{mb:2}}>
        Admin product control
       </Typography>

       <Button variant="contained">
        Manage
       </Button>

      </CardContent>
     </Card>
    </Grid>

    <Grid item xs={12} md={4}>
     <Card elevation={4} sx={{borderRadius:3}}>
      <CardContent>

       <Typography variant="h6">
        Reports
       </Typography>

       <Typography variant="body2" sx={{mb:2}}>
        View business reports
       </Typography>

       <Button variant="contained">
        View Reports
       </Button>

      </CardContent>
     </Card>
    </Grid>

   </Grid>

  </Container>

 )

}

export default Admin;