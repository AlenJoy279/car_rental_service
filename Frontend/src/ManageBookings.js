import React from "react";
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Link from '@mui/material/Link';
import { withAuthenticationRequired } from "@auth0/auth0-react";



import Home from "./Home";



const defaultTheme = createTheme();




const ManageBookings = () => {
    // Dummy bookings data
    const bookings = [
        {
            id: 1,
            period: { start: "01/10/2023", end: "10/10/2023" },
            price: "€200",
            status: "Past",
        },
        {
            id: 2,
            period: { start: "05/11/2023", end: "10/11/2023" },
            price: "€250",
            status: "Upcoming",
        },
        {
            id: 3,
            period: { start: "15/12/2023", end: "20/12/2023" },
            price: "€300",
            status: "Upcoming",
        },
    ];

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
                    <Typography component="h1" variant="h5" align="center">
                        Manage Bookings
                    </Typography>

                    <Table sx={{ minWidth: 650, mt: 3 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Booking Period</TableCell>
                                <TableCell style={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="right">Price</TableCell>
                                <TableCell style={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="right">Status</TableCell>
                                <TableCell style={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookings.map(booking => (
                                <TableRow key={booking.id}>
                                    <TableCell>{`${booking.period.start} - ${booking.period.end}`}</TableCell>
                                    <TableCell align="right">{booking.price}</TableCell>
                                    <TableCell align="right">{booking.status}</TableCell>
                                    <TableCell align="right">
                                        {booking.status === "Upcoming" ? (
                                            <Link href="#" variant="body2">
                                                Manage Booking
                                            </Link>
                                        ) : (
                                            <Link href="#" variant="body2">
                                                View Booking
                                            </Link>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default withAuthenticationRequired(ManageBookings, {
    onRedirecting: () => <Home/>
})
