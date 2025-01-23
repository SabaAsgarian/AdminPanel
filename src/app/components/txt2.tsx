"use client"
import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledImage = styled('img')({
  width: '40px',
  height: '40px',
  borderRadius: '50%', // Makes the image circular
});

interface Txt2Props {
  data: {
    id: string;
    avatar: string;
    title: string;
    brand: string;
    price: string;
    color: string;
    description: string;
  }
}

export default function Txt2({ data }: Txt2Props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography>{data.id} - </Typography>
      <StyledImage sx={{ ml: 1.5 }} src={data.avatar} alt="" />
      <Box sx={{ ml: 2 }}> {/* Margin left for spacing */}
        <Typography variant="body1">{data.title} {data.brand}</Typography>
      </Box>
    </Box>
  );
}