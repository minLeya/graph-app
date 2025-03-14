import React from 'react';
import Header from './Header';
import { Box } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Box sx={{ 
        pt: '64px', // высота хедера
        minHeight: '100vh',
        width: '100%'
      }}>
        {children}
      </Box>
    </>
  );
};

export default Layout; 