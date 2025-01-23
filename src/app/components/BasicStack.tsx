"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import MailIcon from "@mui/icons-material/Mail";
import Link from "next/link";
import Image from "next/image";
import Me from "../components/img/me.png";
import { useTheme } from "../themeContext";
import StyledPaper from "./StyledPaper";

const StyledItem = styled(StyledPaper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));

interface BasicStackProps {}

const BasicStack: React.FC<BasicStackProps> = () => {
  const { darkMode } = useTheme();

  const iconStyle = {
    color: darkMode ? "#fff" : "#0a0a0a",
    ml: "2%",
    "&:hover": {
      color: "#3269ba",
    },
  };

  return (
    <Box sx={{ width: "100%", my: "5%" }}>
      <Stack spacing={2}>
        <StyledItem>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: darkMode ? "#fff" : "#0a0a0a",
            }}
          >
            <Image
              src={Me}
              alt="me"
              width={30}
              height={30}
              style={{
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            Developed by Saba Asgarian
            <Link href="https://www.instagram.com/saba_asgarian_web?igsh=M2Z2dTU3cHFmeW1o&utm_source=qr">
              <InstagramIcon sx={iconStyle} />
            </Link>
            <Link href="https://www.linkedin.com/in/saba-asgarian-69161088?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app">
              <LinkedInIcon sx={iconStyle} />
            </Link>
            <Link href="https://github.com/SabaAsgarian">
              <GitHubIcon sx={iconStyle} />
            </Link>
            <Link href="mailto:computer.sabaa@gmail.com">
              <MailIcon sx={iconStyle} />
            </Link>
          </Box>
        </StyledItem>
      </Stack>
    </Box>
  );
};

export default BasicStack;
