import React from "react";
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid"



const defaultTheme = createTheme();


export default function About(){
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container>
                <Grid>
                    <Typography align="center" component="h1" variant="h5">
                        Rental Car App. Your journey starts here.
                    </Typography>
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

