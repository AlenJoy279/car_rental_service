import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Grid, Card, CardContent, CardActions, Typography,
  Collapse, IconButton, Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { searchCars } from './API';
import Container from "@mui/material/Container";
import Search from './Search';
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from "@mui/material/Accordion";

function SearchResults() {
  const [cars, setCars] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
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
                  <Button size="medium" color="primary" fullWidth>
                    Book Now
                  </Button>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default SearchResults;
