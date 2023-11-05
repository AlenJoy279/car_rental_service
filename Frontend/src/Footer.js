import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { 
    createTheme, 
    ThemeProvider 
} from '@mui/material/styles';


const defaultTheme = createTheme();


function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/AlenJoy279/web9810_car_rental_service">
                Rental Car App Project
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
  

function Footer() {

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid sx={12}>
                <Box component="footer" sx={{ bgcolor: 'background.paper', py: 5 }}>
                    <Copyright />
                </Box>
            </Grid>
        </ThemeProvider>
    );
}

export default Footer;