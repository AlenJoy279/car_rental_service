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



const extraSmallWidth = "600px";


const buttonMediaStyle = {
    ['@media (min-width: 0px)']: {
      display: "none",
    },
    [`@media (min-width: ${extraSmallWidth})`]: {
      display: "inline-flex",
    },
  };


const menuItemMediaStyle = {
    ['@media (min-width: 0px)']: {
      display: "block",
    },
    [`@media (min-width: ${extraSmallWidth})`]: {
      display: "none",
    },
  };



export default function SharedAppBar() {

    const [anchorEl, setAnchorEl] = React.useState(null); 
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    console.log("authenticated?", isAuthenticated); 
    
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <Container sx={{ flexGrow: 1 }}>
            <CssBaseline>
                <AppBar position="fixed">
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

                                {
                                    isAuthenticated && (
                                        <>
                                            <MenuItem component={Link} to="/managebookings" onClick={handleClose}>
                                                Manage Bookings
                                            </MenuItem>    
                                        </>
                                    )
                                }

                                {
                                    !isAuthenticated && (
                                        <>
                                            <MenuItem 
                                            component={Link} 
                                            sx={menuItemMediaStyle}
                                            onClick = {loginWithRedirect}
                                            >
                                                Log In
                                            </MenuItem>    
                                        </>
                                    )
                                }

                                {
                                    !isAuthenticated && (
                                        <>
                                            <MenuItem 
                                            component={Link} 
                                            sx={menuItemMediaStyle}
                                            onClick = { () => {
                                                loginWithRedirect({authorizationParams: {
                                                 screen_hint: "signup",
                                                }})
                                            }}
                                            >
                                                Sign Up
                                            </MenuItem>    
                                        </>
                                    )
                                }

                                {
                                    isAuthenticated && (
                                        <>
                                            <MenuItem 
                                            component={Link} 
                                            sx={menuItemMediaStyle}
                                            onClick = {() => {
                                                logout({returnTo: window.location.origin});
                                            }}
                                            >
                                                Log Out
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
                                    sx={buttonMediaStyle}
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
                                    sx={buttonMediaStyle}
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
                                    sx={buttonMediaStyle}
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
