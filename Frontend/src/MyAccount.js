import React, {useState, useEffect} from "react";
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Container from "@mui/material/Container";
import { Link } from 'react-router-dom';
import { withAuthenticationRequired } from "@auth0/auth0-react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';


import Home from "./Home";

const defaultTheme = createTheme();

// Styling and code reference: MUI documentation

// An idea might be to redirect here and prompt user to fill in additional personal details
// After they have created an account
const MyAccount = () => {

    // Only a placeholder for now to reflect one logged-in user
    // Will have to read the email/auth id in from auth0 and search in the db for them
    const user_id = 2;
    const base_url = 'http://127.0.0.1:5000'
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
      });
      const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
      });

      // Function to clear the form
    const clearForm = () => {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
      });
    };


      useEffect(() => {
        const fetchData = async () => {
          try {

            const response = await axios.get(base_url + `/user/get/id`, { params: { id: user_id } });


            const userData = response.data[0];

            console.log(userData)

            // Update state with the fetched data
            setFormData(prevFormData => ({
              ...prevFormData,
                firstName: userData.email_text ? userData.email_text.split(' ')[0] : '',
                lastName: userData.email_text && userData.email_text.split(' ').length > 1 ? userData.email_text.split(' ')[1] : '',
                email: userData.full_name || '',
                phoneNumber: userData.phone || '',

            }));
          } catch (error) {
            console.error("Error fetching user data:", error);
            // Handle errors
          }
        };

    fetchData();
  }, []);

      const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: '' });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        let validationErrors = {};

        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
       } else {
        // Combine first name and last name into full name as in the db
        const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;

        try {
          const response = await axios.put(`${base_url}/user/update/${user_id}`, {
            full_name: fullName, // Using the correct database column names
            email: formData.email,
            phone: formData.phoneNumber,
          }, {
            params: { id: user_id } // Send user_id as a query parameter
          });

          // On success
          console.log('User data updated:', response.data);
        } catch (error) {
          console.error("Error updating user data:", error);
          // Handle errors - tbd
        }
      }
    };
    
      return (
        <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
        <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
        <AccountCircleIcon sx={{ fontSize: 40, mt: 2 }} />
        <form onSubmit={handleSubmit}>
          <Typography component="h2" variant="h6" align="center">
            Personal Details
          </Typography>
          <TextField
            fullWidth
            required
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            margin="normal"
            error={Boolean(errors.firstName)}
            helperText={errors.firstName}
          />
          <TextField
            fullWidth
            required
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            margin="normal"
            error={Boolean(errors.lastName)}
            helperText={errors.lastName}
          />
          <TextField
            fullWidth
            disabled
            label="Email Address"
            name="email"
            value={formData.email}
            InputProps={{
              readOnly: true,
            }}
            margin="normal"
          />
          <TextField
            fullWidth
            required
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            margin="normal"
            error={Boolean(errors.phoneNumber)}
            helperText={errors.phoneNumber}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 2,
              width: '100%',
              mt: 3,
              mb: 2
            }}
          >
            <Link to="/managebookings" style={{ textDecoration: 'none', display: 'block' }}>
            <Button variant="outlined" fullWidth >
              Manage Bookings
            </Button>
            </Link>
            <Button type="submit" variant="contained" fullWidth>
              Update Settings
            </Button>
    
          </Box>
        </form>
        </Box>
        </Container>
        </ThemeProvider>
      );
}    

export default withAuthenticationRequired(MyAccount, {
    onRedirecting: () => <Home/>
})


