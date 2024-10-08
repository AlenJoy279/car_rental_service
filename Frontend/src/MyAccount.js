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
import { useAuth0 } from '@auth0/auth0-react';
import { Alert } from "@mui/material";

import Home from "./Home";
import { upsertUser, updateUser } from "./API"


const defaultTheme = createTheme();

// Styling and code reference: MUI documentation

// An idea might be to redirect here and prompt user to fill in additional personal details
// After they have created an account
const MyAccount = () => {


    const [userState, setUserState] = useState(
      {
        user_id: 0,
        token: "",
      }
    ) 

    const [apiState, setApiState] = useState(
      {
        error: false,
        message: "",  
      }
    ) 

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
      });

      const [errors, setErrors] = useState({});

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
            setApiState({error:true, message:"Error fetching user data"})
          }
        };

    fetchData();
    }, []);


    // remove trailing symbols and replace multiple whitespaces with one
    const normalizeValue = (name, value) => {
      if (name == "fullName" || name == "phoneNumber") {return value.trim().replace(/  +/g, ' ')};
      return value;
    };


    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value});
      setErrors({ ...errors, [name]: '' });
    };


    // validate inputs and show hints to users
    const checkErrors = () => {
      let errors = {};

      // if empty field
      if (formData.fullName.trim() == "") {
        errors.fullName = "This field cannot be empty. Please enter your full name."
      };

      // if only one word
      if (! formData.fullName.trim().match(/\s/)) {
        errors.fullName = "Please enter your name and surname."
      };

      // if numbers or special characters are entered
      if (! formData.fullName.match(/^[a-zA-Z\s]+$/)) {
        errors.fullName = "Please enter valid name. Numbers and special characters are not allowed."
      };

      // if empty field
      if (formData.phoneNumber == "") {
        errors.phoneNumber = "This field cannot be empty. Please enter your phone."
      };

      // if letters or special characters entered
      if (! formData.phoneNumber.match(/^\d+$/)) {
        errors.phoneNumber = "Please enter phone number in the valid format, i.e., 1234567890. Letters and special characters are not allowed."
      };

      // if letters or special characters entered
      if (formData.phoneNumber.length > 10) {
        errors.phoneNumber = "Please check if phone number is correct. It cannot be more than 10 digits."
      };

      return errors;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      let validationErrors = checkErrors();
      // setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
      } else {

        for (let name in formData) {
          let value = formData[name];
          formData[name] = normalizeValue(name, value);
        };
        console.log(formData);
        setFormData(formData);

        try {
          const response = await updateUser(
            userState.token,
            userState.user_id,
            {full_name: formData.fullName, phone: formData.phoneNumber}
          );

          // On success & upon error
          console.log('User data updated:', response.data);
        } catch (error) {
            console.error("Error updating user data:", error);
        }
      }
    };

      return (
        <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
        
        {apiState.error?<Alert severity="error" onClose={() => {setApiState({error:false})}}>{apiState.message}</Alert>:<></>}
        
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


// check if auntheticated, if not -> MyAcocunt wouldn't be available
export default withAuthenticationRequired(MyAccount, {
    onRedirecting: () => <Home/>
})