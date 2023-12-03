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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import Slider from '@mui/material/Slider';
import Stack from '@mui/joy/Stack';
import { useNavigate } from 'react-router-dom';
import {Grid} from "@mui/material";
import { getAllManufacturers, getAllBodyTypes } from './API';

const defaultTheme = createTheme();

export default function Search() {
    const navigate = useNavigate();
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [sortBy, setSortBy] = React.useState('make');
    const [selectedBrands, setSelectedBrands] = React.useState([]);
    const [selectedTypes, setSelectedTypes] = React.useState([]);
    const [manufacturers, setManufacturers] = React.useState([]);
    const [bodyTypes, setBodyTypes] = React.useState([]);


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        for (let [key, value] of data.entries()) {
            console.log(`${key}: ${value}`);
        }

        const formData = {};
        data.forEach((value, key) => (formData[key] = value));
        console.log(formData);


        const queryParams = new URLSearchParams({
            startDate: startDate?.format('YYYY-MM-DD') || '',
            endDate: endDate?.format('YYYY-MM-DD') || '',
            pickUpLocation: data.get('pickUpLocation'),
            dropOffPoint: data.get('dropOffPoint'),
            sortBy,
            brands: selectedBrands.join(','),
            types: selectedTypes.join(','),
            // Further params
        }).toString();


        // Navigate to SearchResults with query parameters
        console.log(formData)
        navigate(`/searchresults?${queryParams}`);
    };

    const handleSortChange = (event) => {
    setSortBy(event.target.value);
    };

    const handleBrandsChange = (event) => {
      setSelectedBrands(event.target.value);
    };

    const handleTypesChange = (event) => {
      setSelectedTypes(event.target.value);
    };

    React.useEffect(() => {
        async function fetchFilters() {
            try {
                const manufacturersData = await getAllManufacturers();
                const bodyTypesData = await getAllBodyTypes();

                setManufacturers(manufacturersData);
                setBodyTypes(bodyTypesData);
            } catch (error) {
                console.error('Error fetching filter options:', error);
            }
        }

        fetchFilters();
    }, []);



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

    const [value, setValue] = React.useState([2, 7]);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
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
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <DatePicker
                    disablePast
                    label="Start Date"
                    value={startDate}
                    onChange={setStartDate}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DatePicker
                    disablePast
                    label="End Date"
                    value={endDate}
                    onChange={setEndDate}
                    minDate={startDate}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </Grid>
              </Grid>
            </LocalizationProvider>

            <TextField
              margin="normal"
              required
              fullWidth
              name="pickUpLocation"
              label="Pick-up location"
              id="pickUpLocation"
              autoComplete="pick-up location"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="dropOffPoint"
              label="Drop-off point"
              id="dropOffPoint"
              autoComplete="drop-off point"
            />

            <InputLabel id="sortByLabel">Sort by</InputLabel>
              <Select
                labelId="sortByLabel"
                id="demoSort"
                value={sortBy}
                onChange={handleSortChange}
                fullWidth
              >
                <MenuItem value={"make"}>Name</MenuItem>
                <MenuItem value={"price_per_day"}>Price Per Day (dsc)</MenuItem>
                <MenuItem value={"year"}>Year</MenuItem>
                <MenuItem value={"Cargo capacity"}>Cargo Capacity</MenuItem>
              </Select>


            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>More search parameters</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={1.5}>

                  <InputLabel id="manufacturerChipSelLabel">Brand(s)</InputLabel>
                  <Select
                    labelId="manufacturerChipSelLabel"
                    id="manufacturerChipSel"
                    value={selectedBrands}
                    onChange={handleBrandsChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Brand(s)" />}
                    multiple
                    fullWidth
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {manufacturers.sort().map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>

                  <InputLabel id="typeChipSelLabel">Type(s)</InputLabel>
                  <Select
                      labelId="typeChipSelLabel"
                      id="typeChipSel"
                      value={selectedTypes}
                      onChange={handleTypesChange}
                      input={<OutlinedInput id="select-multiple-chip-type" label="Type(s)" />}
                      multiple
                      fullWidth
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {bodyTypes.sort().map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>

                </Stack>
              </AccordionDetails>
            </Accordion>

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Search
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
