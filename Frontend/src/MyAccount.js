import React, {useState} from "react";
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { Link } from 'react-router-dom';
import { withAuthenticationRequired } from "@auth0/auth0-react";
// Styling reference: MUI documentation

import Home from "./Home";
import PasswordCriteria from "./PasswordCriteria"


const defaultTheme = createTheme();



const MyAccount = () => {
    const [formData, setFormData] = useState({
        username: '',
        confirmUsername: '',
        password: '',
        confirmPassword: '',
      });
      const [errors, setErrors] = useState({
        username: '',
        password: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
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
        <form onSubmit={handleSubmit}>
          <Typography component="h1" variant="h5" align="center">
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


