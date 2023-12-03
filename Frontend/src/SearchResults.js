import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Grid, Card, CardContent, CardActions, Typography,
    Collapse, IconButton, Button, Alert
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {upsertUser, createRental, searchCars} from './API';
import Container from "@mui/material/Container";
import Search from './Search';
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from "@mui/material/Accordion";
import { useAuth0 } from '@auth0/auth0-react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

function SearchResults() {
  const [cars, setCars] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({});
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently, user } = useAuth0();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search); // To save search results, we need a new column in the user db for saved results
    const params = {
      startDate: searchParams.get('startDate'),
      endDate: searchParams.get('endDate'),
      pickUpLocation: searchParams.get('pickUpLocation'),
      dropOffPoint: searchParams.get('dropOffPoint'),
      sortBy: searchParams.get('sortBy'),
      brands: searchParams.get('brands'),
      types: searchParams.get('types')
      // More params as needed
    };

    const fetchCars = async () => {
      try {
        const data = await searchCars(params);
        setCars(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [location.search]);

  const handleExpandClick = (id) => {
    setExpandedId(expandedId !== id ? id : null);
  };

  const handleBookNow = async (carId, carPricePerDay) => {
    if (!isAuthenticated) {
      setOpenDialog(true);
      return;
    }

    const token = await getAccessTokenSilently();
    const userData = await upsertUser(token, user.email);
    const userId = userData[0].id;

    // Extracting search parameters
    const searchParams = new URLSearchParams(location.search);
    const pickUpLocation = searchParams.get('pickUpLocation');
    const dropOffPoint = searchParams.get('dropOffPoint');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Setting booking details and opening confirmation dialog
    setBookingDetails({
      userId: userId,
      carId: carId,
      pickUpLocation: pickUpLocation,
      dropOffPoint: dropOffPoint,
      startDate: startDate,
      endDate: endDate,
      totalCost: calculateTotalCost(startDate, endDate, carPricePerDay)
    });
    setOpenConfirmation(true);
  };

    const calculateTotalCost = (startDate, endDate, pricePerDay) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const timeDiff = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return diffDays * pricePerDay;
    };


  const handleConfirmBooking = async () => {
    try {
      const token = await getAccessTokenSilently();
      const rentalData = {
        user_id: bookingDetails.userId,
        car_id: bookingDetails.carId,
        pick_up: bookingDetails.pickUpLocation,
        start_date: bookingDetails.startDate,
        start_time: 1, // 00:01 am
        drop_off: bookingDetails.dropOffPoint,
        end_date: bookingDetails.endDate,
        end_time: 1439, // 11:59 pm
        total_cost: bookingDetails.totalCost,
        status: "active",
        payment_status: "unpaid"
      };

      await createRental(token, rentalData);
      setOpenConfirmation(false);
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error creating rental:", error);
      // Handle errors
    }
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container component="main" maxWidth="md" sx={{ pt: 12, pb: 2 }}>
         <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
            <Typography>
                Modify Filters
            </Typography>

            </AccordionSummary>
              <AccordionDetails>
                <Search />
              </AccordionDetails>
            </Accordion>
        <br/>
      <Grid container spacing={2}>
        {cars.map((car) => (
          <Grid item xs={12} sm={6} md={4} key={car.car_id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {car.make} {car.model}
                </Typography>
                <Typography variant="body2">
                  Year: {car.year}
                  <br />
                  Price per Day from: {car.price_per_day}
                  <br />
                  Type: {car.type}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton
                  onClick={() => handleExpandClick(car.car_id)}
                  aria-expanded={expandedId === car.car_id}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
                <Button size="medium" color="primary"  onClick={() => handleBookNow(car.car_id, car.price_per_day)}>
                    Book Now
                </Button>
              </CardActions>
              <Collapse in={expandedId === car.car_id} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography>Transmission: {car.transmission}</Typography>
                  <Typography>Powertrain: {car.powertrain}</Typography>
                  <Typography>Seats: {car.seats}</Typography>
                  <Typography>Cargo Capacity: {car.cargo_capacity} L</Typography>
                  {car.powertrain === 'electric' && (
                    <Typography paragraph>Range: {car.range} km</Typography>
                  )}
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Dialog for non-authenticated users */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Account Required</DialogTitle>
        <DialogContent>
          <Typography>
            Please log in or sign up to book a vehicle.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          <Button onClick={() => loginWithRedirect()} color="primary">
            Log In / Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    {/* Confirmation Dialog */}
    <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)}>
      <DialogTitle>Confirm Booking</DialogTitle>
      <DialogContent>
        <Typography>{`Dates: ${bookingDetails.startDate} to ${bookingDetails.endDate}`}</Typography>
        <Typography>{`Total Cost: €${bookingDetails.totalCost}`}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenConfirmation(false)}>Cancel</Button>
        <Button onClick={handleConfirmBooking} color="primary">Book</Button>
      </DialogActions>
    </Dialog>
    {/* Snackbar Notification */}
    <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
      <Alert onClose={handleCloseSnackbar} severity="success">
        Booking confirmed!
      </Alert>
    </Snackbar>
        </Container>
  );
}

export default SearchResults;
