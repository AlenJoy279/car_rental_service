import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';



const defaultTheme = createTheme();



export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            What we are looking for today?
          </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}>
                        <DatePicker
                            margin="normal"
                            fullWidth
                            id="date"
                            label="Date"
                            name="date"
                            autoFocus
                            slotProps={{textField:{required: true}}}
                        />
                    </DemoContainer>
                </LocalizationProvider>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="pickUpLocation"
                    label="Pick-up location"
                    id="pickUpLocation"
                    autoComplete="Pick-up location"
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="dropOffPoint"
                    label="Drop-off point"
                    id="dropOffPoint"
                    autoComplete="Drop-off point"
                />

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                    <Typography>
                        More search parameters
                    </Typography>
                    
                    </AccordionSummary>
                    <AccordionDetails>
                            <TextField
                                margin="normal"
                                fullWidth
                                name="brand"
                                label="Brand"
                                id="brand"
                                autoComplete="brand"
                            />    

                            <TextField
                                margin="normal"
                                fullWidth
                                name="transmissionType"
                                label="Transmission type"
                                id="transmissionType"
                                autoComplete="Transmission type"
                            />    
                    </AccordionDetails>
                </Accordion>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Search
                </Button>
              </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}