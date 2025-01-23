"use client"
import React, { useRef, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ErrorIcon from '@mui/icons-material/Error';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { styled } from '@mui/material/styles';
import { TextField, Button, Box, Typography } from '@mui/material';
import Link from 'next/link';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import '../globals.css'
import { useTheme } from './../themeContext';
// Styled components
const StyledForm = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
});

const WhiteTextField = styled(TextField)({
    backgroundColor: '#ffffff',
    borderRadius: '4px',
    '& .MuiInputBase-input': {
        color: '#0a0a0a', // Text color
    },
    '& .MuiInputLabel-root': {
        color: '#0a0a0a', // Label color
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#0a0a0a', // Border color
        },
        '&:hover fieldset': {
            borderColor: '#0a0a0a', // Hover border color
        },
        '&.Mui-focused fieldset': {
            borderColor: '#0a0a0a', // Focused border color
        },
    },
});

const StyledButton = styled(Button)({
    backgroundColor: '#3b7ddd',
    color: 'white',
    '&:hover': {
        backgroundColor: '#326abb',
    },
});
export default function Signin() {
    const [showpass, setShowpass] = useState(true);
    const showic = useRef<HTMLDivElement>(null);
    const { darkMode} = useTheme();
    const formik = useFormik({
        initialValues: {
            email: '',
            pass: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Please enter a valid email address.')
                .required(`What's your Email address?`),
            pass: Yup.string()
                .required(`Password is required!`)
                .min(8, 'Must be 8 characters long or More')
                .matches(/[0-9]/, 'Password must have a Number')
                .matches(/[A-Z]/, 'Password must have an uppercase char')
                .matches(/[a-z]/, 'Password must have a lowercase char')
                .matches(/[&#$@!*]/, 'Password must have a Symbol'),
        }),
        onSubmit: values => {
            const url = new URL('https://66b9e0c8fa763ff550f9f4a9.mockapi.io/users');
            url.searchParams.append('email', values.email);
            url.searchParams.append('pass', values.pass);

            fetch(url, {
                method: 'GET',
                headers: { 'content-type': 'application/json' },
            }).then(res => {
                if (res.ok) {
                    return res.json();
                }
            }).then(tasks => {
                if (tasks == undefined) {
                    alert('User Not Found!!!\nEmail address or Password not exist!')
                }
                else {
                    alert('Your Sign-In Was Succesfull. Welcome!')
                    window.location.href = '../components/dashboard';
                }
            })
        },
    });
    const show = () => {
        if (!showic.current) return;
        
        if (showpass) {
            (showic.current.children[0] as HTMLElement).style.display = 'flex';
            (showic.current.children[1] as HTMLElement).style.display = 'none';
        } else {
            (showic.current.children[0] as HTMLElement).style.display = 'none';
            (showic.current.children[1] as HTMLElement).style.display = 'flex';
        }
        setShowpass(!showpass);
    }
    return (
        <StyledForm className='flex flex-wrap *:my-[8px] w-full' onSubmit={formik.handleSubmit}>
            <Box sx={{display:'flex',flexDirection:'column',justifyContent:'start',alignItems:'start'}}>
                <Typography variant='h4' sx={{  color: darkMode ? '#fff' : '#0a0a0a',fontFamily:'main',fontWeight:'bolder'}} className=' font-extrabold'>Login</Typography>
            </Box>
            <label className='font-loginform ' htmlFor="email" style={{  color: darkMode ? '#fff' : '#0a0a0a' }}>Email</label>
            <WhiteTextField className='w-full bg-[#F8F9FA] font-text border-b outline-none h-[45px] placeholder:font-loginform3'
                 id="email"
                 name="email"
                 type="email"
                 placeholder='Enter Your Email'
                 autoComplete='off'
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 value={formik.values.email}
                 error={formik.touched.email && Boolean(formik.errors.email)}
                 helperText={formik.touched.email && formik.errors.email}
            />
            {formik.touched.email && formik.errors.email ? (
                <div className='w-full flex justify-start items-center'>
                    <p className='font-loginh2 text-sm text-red-500'> <ErrorIcon className='text-lg text-red-500' /> {formik.errors.email}</p>
                </div>
            ) : null}

            <label className='font-loginform w-full pt-[10px] ' htmlFor="pass" style={{  color: darkMode ? '#fff' : '#0a0a0a' }}>Password</label> 
            <div className='w-full flex flex-wrap justify-between items-center'>
                <WhiteTextField className='w-[90%] bg-[#F8F9FA] font-text border-b outline-none h-[45px] placeholder:font-loginform3'
                    placeholder='Enter Your Password'
                    id="pass"
                    name="pass"
                    autoComplete='off'
                    type={showpass ? "password" : "text"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.pass}
                />
                <div onClick={show} ref={showic} className='w-[10%] *:absolute relative flex justify-center cursor-pointer items-center'>
                    <span className='hidden justify-center items-center w-full'><VisibilityIcon /></span>
                    <span className='w-full flex justify-center items-center'><VisibilityOffIcon /></span>
                </div>
            </div>
            {formik.touched.pass && formik.errors.pass ? (
                <div className='w-full flex justify-start items-center'>
                    <p className='font-loginh2 text-sm text-red-500'> <ErrorIcon className='text-lg text-red-500' /> {formik.errors.pass}</p>
                </div>
            ) : null}
            <StyledButton className='w-full py-[8px] rounded-md capitalize font-loginform1 border-[1px] border-[#0162e8] transition-all duration-700 hover:bg-[#0054ca] bg-[#0162e8] text-white' type="submit">Sign in</StyledButton>
            <Box sx={{display:'flex',justifyContent:'start',alignItems:'center'}}>
                <h5 style={{  color: darkMode ? '#fff' : '#0a0a0a' }}>Don't have an account?</h5>
                <TrendingFlatIcon/>
                <Link href='../components/signuppage'>
                <StyledButton sx={{marginBottom:'10%'}}>Sign Up</StyledButton>
                </Link>
            </Box>
        </StyledForm>
    );
}