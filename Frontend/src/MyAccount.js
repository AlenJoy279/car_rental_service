import React from "react";
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid"



const defaultTheme = createTheme();


export default function MyAccount(){
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container>
                <Grid>
                    <Typography align="center" component="h1" variant="h5">
                        My Account / Private area.. To be updated..
                    </Typography>
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

