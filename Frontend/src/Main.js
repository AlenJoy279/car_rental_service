import React, { Component } from "react";
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import {
    Route,
    HashRouter,
    Routes,
    Navigate
} from "react-router-dom";
import { 
    createTheme, 
    ThemeProvider 
} from '@mui/material/styles';

import Search from "./Search";
import SharedAppBar from "./SharedAppBar";
import Footer from "./Footer";
import MyAccount from "./MyAccount";
import About from "./About";
import Home from "./Home";
import ManageBookings from "./ManageBookings";



const defaultTheme = createTheme();



// TODO: 
//
// Event handlers (user input)
// breakpoints -> mobile-first



class Main extends Component {
    
    render() {
      return (
        <ThemeProvider theme={defaultTheme}>
            <Container 
                sx={{"&.MuiContainer-root": {
                    display:"flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%"
                  }
                }}
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
                            <Routes>
                                <Route path="/" element={<Navigate to="/home"/>} />
                                <Route path="/home" element={<Home/>}/>
                                <Route path="/myaccount" element={<MyAccount/>}/>
                                <Route path="/search" element={<Search/>}/>
                                <Route path="/about" element={<About/>}/>
                                <Route path="/managebookings" element={<ManageBookings/>}/>
                            </Routes>
                        </Box>
                    </Grid>
                    </HashRouter>
                <Grid sx={12}>
                    <Box>
                        <Footer
                            left="0"
                            bottom="0"
                            maxWidth="100%"   
                        />
                    </Box>
                </Grid>    
            </Container>
        </ThemeProvider>
      );
    }
}
  
export default Main;