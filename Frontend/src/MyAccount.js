import React from "react";
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid"
import { withAuthenticationRequired } from "@auth0/auth0-react";

import About from "./About";



const MyAccount = () => {
    const defaultTheme = createTheme();
    
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

export default withAuthenticationRequired(MyAccount, {
    onRedirecting: () => <About/>
})

