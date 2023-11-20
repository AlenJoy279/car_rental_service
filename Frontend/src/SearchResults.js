import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { searchCars } from './API'; // Adjust the path as needed

function SearchResults() {
    const [cars, setCars] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);

        const params = {
            startDate: searchParams.get('startDate'),
            endDate: searchParams.get('endDate'),
            pickUpLocation: searchParams.get('pickUpLocation'),
            dropOffPoint: searchParams.get('dropOffPoint'),
            // More params
        };

        const fetchCars = async () => {
            try {
                const data = await searchCars(params);
                setCars(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, [location.search]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Grid container spacing={2}>
            {cars.map((car) => (
                <Grid item xs={12} sm={6} md={4} key={car.id}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {car.make} {car.model}
                            </Typography>
                            <Typography variant="body2">
                                Year: {car.year}
                                <br />
                                Price: {car.price}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default SearchResults;
