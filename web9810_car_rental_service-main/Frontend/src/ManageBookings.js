import React from "react";
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { withAuthenticationRequired } from "@auth0/auth0-react";
// Styling reference: MUI documentation


import Home from "./Home";



const defaultTheme = createTheme();




const ManageBookings = () => {
    // Dummy bookings data
    const bookings = [
        { period: "10/12/2023 - 15/12/2023", price: "€200", status: "Upcoming", id: 1 },
        { period: "05/12/2023 - 08/12/2023", price: "€150", status: "Upcoming", id: 2 },
        { period: "08/11/2023 - 08/11/2023", price: "€123", status: "Completed", id: 3 },
        { period: "21/11/2023 - 08/11/2023", price: "€456", status: "Completed", id: 4 },
        { period: "05/11/2023 - 08/11/2023", price: "€235.45", status: "Completed", id: 5 },
        { period: "05/11/2023 - 08/11/2023", price: "€150", status: "Completed", id: 6 },
        { period: "05/11/2023 - 08/11/2023", price: "€150", status: "Completed", id: 7 },

    ];

    return (
        <ThemeProvider theme={defaultTheme}>
          <Container component="main">
            <Box sx={{ marginTop: 12}}>
              <Typography component="h1" variant="h5" align="center">
                Manage Bookings
              </Typography>
              <Grid container spacing={2}  sx={{ marginTop: 1 }}>
                {bookings.map((booking) => (
                  <Grid item xs={12} sm={6} md={4} key={booking.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6" component="div">
                          Booking Period
                        </Typography>
                        <Typography color="text.secondary">
                          {booking.period}
                        </Typography>
                        <Typography variant="h6" component="div">
                          Price
                        </Typography>
                        <Typography color="text.secondary">
                          {booking.price}
                        </Typography>
                        <Typography variant="h6" component="div">
                          Status
                        </Typography>
                        <Typography color="text.secondary">
                          {booking.status}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        {booking.status === "Upcoming" ? (
                          <Button size="small">Manage Booking</Button>
                        ) : (
                          <Button size="small">View Booking</Button>
                        )}
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </ThemeProvider>
        );
}

export default withAuthenticationRequired(ManageBookings, {
    onRedirecting: () => <Home/>
})
