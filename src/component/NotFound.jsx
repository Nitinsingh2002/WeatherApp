
import { Box,Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <Box sx={{ height: "100vh", width: '100vw', display: "flex", alignItems: "center", justifyContent: "center",flexDirection:"column" }}>
          <Typography variant='h4' color="error">404 - Page Not Found</Typography>
          <Typography variant='body2'>The page you are looking for does not exist.</Typography>
          <Link to="/">Go back to home</Link>
        </Box>
    );
};

export default NotFound;
