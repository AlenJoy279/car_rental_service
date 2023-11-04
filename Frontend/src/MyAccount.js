import React, {useState, useEffect} from "react";
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { Link } from 'react-router-dom';
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { validatePassword } from './PasswordCriteria';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';

import Home from "./Home";
import PasswordCriteria from "./PasswordCriteria"

const defaultTheme = createTheme();

// Styling and code reference: MUI documentation

// An idea might be to redirect here and prompt user to fill in additional personal details
// After they have created an account
const MyAccount = () => {

    // Only a placeholder for now to reflect one logged-in user
    // Will have to read the email/auth id in from auth0 and search in the db for them
    const user_id = 1;
    const base_url = 'http://127.0.0.1:5000'

    const [formData, setFormData] = useState({
        username: '',
        confirmUsername: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        email: '', // Assuming this is fetched and set from the backend
        phoneNumber: '',
      });
      const [errors, setErrors] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
      });

      // Function to clear the form
    const clearForm = () => {
      setFormData({
        username: '',
        confirmUsername: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
      });
    };


      useEffect(() => {
        const fetchData = async () => {
          try {

            const response = await axios.get(base_url + `user/get/id`, { params: { id: user_id } });

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
  }, [user_id]);




      // Add a new state for password validity
    const [isPasswordValid, setIsPasswordValid] = useState(true);
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });

          if (name === 'password') {
        const isValid = validatePassword(value);
        setIsPasswordValid(isValid);
          }

      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        let validationErrors = {};
    
        if (formData.username !== formData.confirmUsername) {
          validationErrors.username = 'Usernames do not match';
        }
        if (formData.password !== formData.confirmPassword) {
          validationErrors.password = 'Passwords do not match';
        }
        if (!isPasswordValid) {
          validationErrors.password = 'Password does not meet the required criteria';
        }
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
        } else {
          console.log('Form data submitted:', formData);
          // Logic for form data submission
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
                Account Settings
          </Typography>
          <TextField
            fullWidth
            label="Change Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            margin="normal"
          />
          {formData.username && (
            <TextField
              required
              fullWidth
              label="Confirm Username"
              name="confirmUsername"
              value={formData.confirmUsername}
              onChange={handleChange}
              error={Boolean(errors.username)}
              helperText={errors.username}
              margin="normal"
            />
          )}
          <TextField
            fullWidth
            label="Change Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
          {formData.password && <PasswordCriteria password={formData.password} />}
          {formData.password && (
            <TextField
              required
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
              margin="normal"
            />
          )}
          {Object.values(errors).some(Boolean) && (
            <Alert severity="error">Please fix the errors above</Alert>
          )}

          <Typography component="h2" variant="h6" align="center">
            Personal Details
          </Typography>
          <TextField
            fullWidth
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
            // No error or helperText as it's display only
          />
          <TextField
            fullWidth
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


