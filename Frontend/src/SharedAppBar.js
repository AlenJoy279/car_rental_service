import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from "react-router-dom";
import { Container } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';



export default function SharedAppBar() {

    const [anchorEl, setAnchorEl] = React.useState(null); 
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };
  

    return (
        <Container sx={{ flexGrow: 1 }}>
            <CssBaseline>
                <AppBar position="static">
                    <Toolbar>
                        <Box>
                            <IconButton
                                size="large"
                                area-aria-controls="menu-appbar"
                                onClick={handleMenu}
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                {/*
                                Public areas
                                */}

                                <MenuItem component={Link} to="/about" onClick={handleClose}>
                                    About
                                </MenuItem>
                                
                                <MenuItem component={Link} to="/search" onClick={handleClose}>
                                    Search
                                </MenuItem>
                                

                                {/*
                                Private areas
                                */}

                                {
                                    isAuthenticated && (
                                        <>
                                            <MenuItem component={Link} to="/myaccount" onClick={handleClose}>
                                                My Account
                                            </MenuItem>    
                                        </>
                                    )
                                }

                            </Menu>
                        </Box>
                    
                        <Typography 
                            variant="h6" 
                            align="center" 
                            component="div" 
                            sx={{ flexGrow: 1 }}>
                            
                            Rental Car App
                        
                        </Typography>
                    
                        <Box>
                            {/*
                            Private vs public areas 
                            */}
                            {!isAuthenticated && 
                                <Button 
                                    variant = "contained" 
                                    onClick = {loginWithRedirect} 
                                    color = "primary"
                                    disableElevation = "true"
                                    >                            
                                    Log in
                                </Button>
                            }
                            {!isAuthenticated && 
                                <Button 
                                    variant = "contained" 
                                    onClick = { () => {
                                        loginWithRedirect({authorizationParams: {
                                            screen_hint: "signup",
                                          }})
                                    }}
                                    color = "primary"
                                    disableElevation = "true"
                                    >                            
                                    Sign up
                                </Button>
                            }

                            {isAuthenticated && 
                                <Button 
                                    variant = "contained" 
                                    onClick = {() => {
                                        logout({returnTo: window.location.origin});
                                    }} 
                                    color="primary"
                                    disableElevation = "true"
                                    >                            
                                    Log out
                                </Button>
                            }
                        </Box>
                    </Toolbar>
                </AppBar>
            </CssBaseline>
        </Container>
    );
}
