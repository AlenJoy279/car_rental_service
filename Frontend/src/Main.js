import React, { Component } from "react";
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
// import { useAuth0 } from '@auth0/auth0-react';
import {
    Route,
    HashRouter,
    Routes,
} from "react-router-dom";
import { 
    createTheme, 
    ThemeProvider 
} from '@mui/material/styles';

// import SignUp from "./SignUp";
// import LogIn from "./LogIn";
import Search from "./Search";
import SharedAppBar from "./SharedAppBar";
import Footer from "./Footer";
import MyAccount from "./MyAccount";
import About from "./About";
// import ResetPassword from "./ResetPassword";


const defaultTheme = createTheme();


// TODO: 
//
// Event handlers (user input)
// fluid grids -> breakpoints -> mobile-first
// footer to the bottom of a page



class Main extends Component {
    
    render() {
      return (
        <ThemeProvider theme={defaultTheme}>
            <Container 
                component="main" 
                maxWidth={false} 
                disableGutters={true} 
                sx={{alignContent:"space-between"}}
            >
                <HashRouter>
                    <Grid sx={12}>
                        <Box>
                            <SharedAppBar/>
                        </Box>
                    </Grid>
                    <Grid>
                        <Box 
                            className="content"
                        >
                            <Routes ref={(ref) => {debugger}}>
                                <Route exact path="/search" element={<Search/>}/>
                                {/* <Route path="/signup" element={<SignUp/>}/>
                                <Route path="/login" element={<LogIn/>}/> */}
                                <Route path="/myaccount" element={<MyAccount/>}/>
                                <Route path="/about" element={<About/>}/>
                                {/* <Route path="/resetpassword" element={<ResetPassword/>}/> */}
                            </Routes>
                        </Box>
                    </Grid>
                    </HashRouter>
                <Grid sx={12}>
                    <Box>
                        <Footer/>
                    </Box>
                </Grid>    
            </Container>
        </ThemeProvider>
      );
    }
}
  
export default Main;