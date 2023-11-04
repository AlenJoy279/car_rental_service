// PasswordCriteria.js
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import {ListItemText} from "@mui/material";

// Utility function to check password criteria
export const validatePassword = (password) => {
  const criteria = {
    minLength: password.length >= 10,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /[0-9]/.test(password),
    specialChars: /[!@#$%^&*]/.test(password),
  };

  // At least 10 characters and 3 of the other 4 criteria
  const passedCriteria = Object.values(criteria).filter(Boolean).length;
  return criteria.minLength && passedCriteria >= 4;
};

function PasswordCriteria({ password }) {
  const criteria = {
    minLength: password.length >= 10,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /[0-9]/.test(password),
    specialChars: /[!@#$%^&*]/.test(password),
  };

  const criteriaText = {
    minLength: 'At least 10 characters',
    lowercase: 'At least one lower case letter (a-z)',
    uppercase: 'At least one upper case letter (A-Z)',
    numbers: 'At least one number (0-9)',
    specialChars: 'At least one special character (!@#$%^&*)',
  };

  return (
    <Card variant="outlined" sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="body2">
          Your new password must contain:
        </Typography>
        <List sx={{ padding: 1 }}>
          <ListItem sx={{ padding: '2px 0'}}>
            <ListItemIcon>
              {criteria.minLength ? <CheckIcon color="success" /> : <CloseIcon color="error" />}
            </ListItemIcon>
            <ListItemText primary="At least 10 characters" primaryTypographyProps={{ variant: 'body2' }}/>
          </ListItem>
          </List>
          <Typography variant="body2" sx={{ mt: 2 }}>
            And at least 3 of the following:
          </Typography>
        <List sx={{ padding: 1 }}>
          {/*The filter prevents min length from being mapped again*/}
          {Object.entries(criteria).filter(([key]) => key !== 'minLength').map(([key, value]) => (
            <ListItem key={key} sx={{ padding: '2px 0' }}>
              <ListItemIcon>
                {value ? <CheckIcon color="success" /> : <CloseIcon color="error" />}
              </ListItemIcon>
              <ListItemText primary={criteriaText[key]} primaryTypographyProps={{ variant: 'body2' }}/>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default PasswordCriteria;
