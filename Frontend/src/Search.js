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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';

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

    const [options, setSortOption] = React.useState('Name');

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const [tOptions, setTOption] = React.useState('Any'); // Transmission options

    const handleTChange = (event) => {
        setTOption(event.target.value);
    };

    const [manufacturerName, setManufacturerName] = React.useState([]);

    const handleManufacturerSel = (event) => {
        const {
            target: { value },
        } = event;
        setManufacturerName(
            // On autofill, we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const manufacturers = [
        'Audi',
        'Bentley',
        'BMW',
        'Citroen',
        'Chevrolet',
        'Dacia',
        'Fiat',
        'Ford',
        'Lexus',
        'Mercedes',
        'Nissan',
        'Opel',
        'Porsche',
        'Tesla',
        'Toyota'
    ];

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
                            id="startDate"
                            label="Start Date"
                            name="startDate"
                            autoFocus
                            slotProps={{textField:{required: true}}}
                        />
                    </DemoContainer>
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}>
                        <DatePicker
                            margin="normal"
                            fullWidth
                            id="endDate"
                            label="End Date"
                            name="endDate"
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
                            {/*Following filters can also be reused for search results page*/}
                            <InputLabel id="sortByLabel">Sort by</InputLabel>
                            <Select
                                labelId="sortByLabel"
                                id="demoSort"
                                margin="normal"
                                fullWidth
                                value={options}
                                label="options"
                                onChange={handleSortChange}
                            >
                                <MenuItem value={"Name"}>Name</MenuItem>
                                <MenuItem value={"Price (asc)"}>Price (asc)</MenuItem>
                                <MenuItem value={"Price (dsc)"}>Price (dsc)</MenuItem>
                                <MenuItem value={"Highest rated"}>Highest Rated</MenuItem>
                                <MenuItem value={"Cargo capacity"}>Cargo Capacity</MenuItem>
                            </Select>

                            <InputLabel id="manufacturerChipSelLabel">Brand(s)</InputLabel>
                            <Select
                                labelId="manufacturerChipSelLabel"
                                id="manufacturerChipSel"
                                margin="normal"
                                fullWidth
                                multiple
                                value={manufacturerName}
                                onChange={handleManufacturerSel}
                                input={<OutlinedInput id="select-multiple-chip" label="Brand(s)" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {manufacturers.map((name) => (
                                    <MenuItem
                                        key={name}
                                        value={name}
                                    >
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>

                            <InputLabel id="selTransmissionLabel">Transmission</InputLabel>
                            <Select
                                labelId="selTransmissionLabel"
                                id="demoTransmission"
                                margin="normal"
                                fullWidth
                                value={tOptions}
                                label="tOptions"
                                onChange={handleTChange}
                            >
                                <MenuItem value={"Any"}>Any</MenuItem>
                                <MenuItem value={"Manual"}>Manual</MenuItem>
                                <MenuItem value={"Automatic"}>Automatic</MenuItem>
                            </Select>
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