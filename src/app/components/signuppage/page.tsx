"use client"
import React from 'react';

import {Box, Container, Typography, Switch } from '@mui/material';
import { styled } from '@mui/system';

import signupImg from './../img/signup.png'
import Image from 'next/image';

import Signup from './../signup'
import { useTheme } from './../../themeContext';
// dark mode switch style
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#8796A5',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#003892',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export default function page() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <Container maxWidth='xl' sx={{  backgroundColor: darkMode ? '#19222c' : '#f2f4f8', minHeight: '100vh',maxHeight:'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
        {/* Toggle Button */}
        <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
        <MaterialUISwitch 
          checked={darkMode}
          onChange={toggleDarkMode}
        />
      </Box>
      <Container className='container' maxWidth="xl" sx={{paddingY:{xs:'15%',lg:'0px'}, backgroundColor: darkMode ? '#222e3c' : '#ffffff', height: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '10px' ,    boxShadow: darkMode 
            ? '0px 0px 10px 0px rgba(0, 0, 0, 0.5)'
            : '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
          color: darkMode ? '#fff' : '#0a0a0a'}}>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'transparent', color: 'white' }}>
      <Typography component="h1" variant="h5" sx={{ color: 'white', mb: 3 }}>

      </Typography>
     
   <Box sx={{display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
    <Image src={signupImg} alt="signup" priority style={{width:'50%',height:'50%'}} />
    <Signup /> {/* Use the imported signup component */}
   </Box>
    </Box>
      </Container>
    </Container>
  );
}