import { Link } from "react-router-dom";

import {
 Container,
 Grid,
 Card,
 CardContent,
 Typography,
 Button
} from "@mui/material";

function Dashboard(){

 return(

  <Container sx={{marginTop:4}}>

   <Typography variant="h4" gutterBottom>
    SmartBiz Dashboard
   </Typography>

   <Grid container spacing={3}>

    <Grid item xs={12} md={3}>
     <Card elevation={3}>
      <CardContent>
       <Typography variant="h6">Products</Typography>

       <Typography variant="body2" sx={{marginBottom:2}}>
        Manage your products
       </Typography>

       <Button
        variant="contained"
        component={Link}
        to="/products"
       >
        View
       </Button>

      </CardContent>
     </Card>
    </Grid>


    <Grid item xs={12} md={3}>
     <Card elevation={3}>
      <CardContent>
       <Typography variant="h6">Orders</Typography>

       <Typography variant="body2" sx={{marginBottom:2}}>
        Manage customer orders
       </Typography>

       <Button
        variant="contained"
        component={Link}
        to="/orders"
       >
        View
       </Button>

      </CardContent>
     </Card>
    </Grid>


    <Grid item xs={12} md={3}>
     <Card elevation={3}>
      <CardContent>
       <Typography variant="h6">Add Product</Typography>

       <Typography variant="body2" sx={{marginBottom:2}}>
        Create new product
       </Typography>

       <Button
        variant="contained"
        component={Link}
        to="/add-product"
       >
        Add
       </Button>

      </CardContent>
     </Card>
    </Grid>


    <Grid item xs={12} md={3}>
     <Card elevation={3}>
      <CardContent>
       <Typography variant="h6">Create Order</Typography>

       <Typography variant="body2" sx={{marginBottom:2}}>
        Create new order
       </Typography>

       <Button
        variant="contained"
        component={Link}
        to="/create-order"
       >
        Create
       </Button>

      </CardContent>
     </Card>
    </Grid>

   </Grid>

  </Container>

 )

}

export default Dashboard;