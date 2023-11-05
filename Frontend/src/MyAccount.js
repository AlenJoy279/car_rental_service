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
import { useAuth0 } from '@auth0/auth0-react';


import Home from "./Home";
import API, { upsertUser, updateUser } from "./API"


const defaultTheme = createTheme();

// Styling and code reference: MUI documentation

// An idea might be to redirect here and prompt user to fill in additional personal details
// After they have created an account
const MyAccount = () => {

    // Only a placeholder for now to reflect one logged-in user
    // Will have to read the email/auth id in from auth0 and search in the db for them
    const [userState, setUserState] = useState(
      {
        user_id: 0,
        token: "",  
      }

    ) 

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
      });
      const [errors, setErrors] = useState({
        fullName: '',
        phoneNumber: '',
      });

      // Function to clear the form
    const clearForm = () => {
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
      });
    };

    const { getAccessTokenSilently, user } = useAuth0();

    useEffect(() => {
      const fetchData = async () => {
          try {

            let token = await getAccessTokenSilently()
            
            const response = await upsertUser(token, user.email);
            const userData = response[0]
            
            console.log("userData", userData)
           
            // set user state
            setUserState({user_id: userData.id, token: token});

            // Update state with the fetched data
            setFormData(prevFormData => ({
              ...prevFormData,
                fullName: userData.full_name || "",
                email: userData.email_text || '',
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

        try {
          const response = await updateUser(userState.token, userState.user_id, {full_name: formData.fullName, phone: formData.phoneNumber});

          // On success
          console.log('User data updated:', response.data);
        } catch (error) {
            console.error("Error updating user data:", error);
            // Handle errors - tbd
        }
      }
    };
    
    debugger;

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
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            margin="normal"
            error={Boolean(errors.fullName)}
            helperText={errors.fullName}
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


