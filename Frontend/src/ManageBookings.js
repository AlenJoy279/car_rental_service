import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {upsertUser, getUserRentals, getCarById, deleteRental} from './API';
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
import Home from "./Home";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Snackbar, Alert } from '@mui/material';

const defaultTheme = createTheme();

const ManageBookings = () => {
  const [rentals, setRentals] = useState([]);
  const { getAccessTokenSilently, user } = useAuth0();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRentalId, setSelectedRentalId] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");


  const handleCancelClick = (rentalId) => {
    setSelectedRentalId(rentalId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmCancel = async () => {
    try {
      const result = await deleteRental(selectedRentalId);
      setRentals(prevRentals => prevRentals.filter(rental => rental.id !== selectedRentalId));
      setSnackbarMessage("Booking successfully canceled.");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error cancelling rental:", error);
      setSnackbarMessage("Failed to cancel booking.");
      setOpenSnackbar(true);
    }
  };



  useEffect(() => {
    const fetchRentalsAndCars = async () => {
      try {
        const token = await getAccessTokenSilently();
        const userData = await upsertUser(token, user.email);
        const userId = userData[0].id;

        const rentalsData = await getUserRentals(userId);
        const rentalsWithCarDetails = await Promise.all(rentalsData.map(async rental => {
          const carData = await getCarById(rental.car_id);
          return { ...rental, carDetails: carData[0] };
        }));
        setRentals(rentalsWithCarDetails);
      } catch (error) {
        console.error("Error fetching rentals:", error);
      }
    };

    fetchRentalsAndCars();
  }, [getAccessTokenSilently, user.email]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md" sx={{ pt: 12, pb: 2 }}>
        <Box sx={{ marginTop: 12 }}>
          <Typography component="h1" variant="h5" align="center">
            Manage Bookings
          </Typography>
          <Grid container spacing={2} sx={{ marginTop: 1 }}>
            {rentals.map((rental) => (
              <Grid item xs={12} sm={6} md={4} key={rental.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {rental.carDetails.make} {rental.carDetails.model}
                    </Typography>
                    <Typography color="text.secondary">
                      Pick Up: {rental.pick_up}
                    </Typography>
                    <Typography color="text.secondary">
                      Drop Off: {rental.drop_off}
                    </Typography>
                    <Typography color="text.secondary">
                      Period: {formatDate(rental.start_date)} - {formatDate(rental.end_date)}
                    </Typography>
                    <Typography color="text.secondary">
                      Total Cost: €{rental.total_cost}
                    </Typography>
                    <Typography color="text.secondary">
                      Status: {rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
                    </Typography>
                    <br/>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleCancelClick(rental.id)}
                      disabled={rental.status === 'completed'}
                    >
                      Cancel Booking
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Cancel Booking"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to cancel this booking?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              No
            </Button>
            <Button onClick={handleConfirmCancel} color="secondary" autoFocus>
              Yes, Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity="success">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}

export default withAuthenticationRequired(ManageBookings, {
    onRedirecting: () => <Home/>
});


