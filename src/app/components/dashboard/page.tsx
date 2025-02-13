"use client";
import React, { useEffect, useState } from "react";


import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Box, Grid, TextField, Typography } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ResponsiveDrawer from "../ResponsiveDrawer";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import EditNoteIcon from "@mui/icons-material/EditNote";

import StackedAreas from "../StackedAreas";

import DashboardIcon from "@mui/icons-material/Dashboard";
import BasicStack from "../BasicStack";
import SellIcon from "@mui/icons-material/Sell";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useTheme } from '../../themeContext';
import StyledPaper from '../StyledPaper';
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { useMyContext } from '../../myContext';

import CancelIcon from "@mui/icons-material/Cancel";


// Define types for fetched data
interface User {
  id: string;
  img: string;
  fname: string;
  lname: string;
  status: string;
  email: string;
  city: string;
  street: string;
  mobile: string;
  user?: string;
  pass?: string;
  age?: string;
}
const WhiteTextField = styled(TextField)({
  backgroundColor: 'transparent',
  borderRadius: '4px',
  '& .MuiInputBase-input': {
    color: 'black', // Text color
  },
  '& .MuiInputLabel-root': {
    color: 'black', // Label color
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'black', // Border color
    },
    '&:hover fieldset': {
      borderColor: 'black', // Hover border color
    },
    '&.Mui-focused fieldset': {
      borderColor: 'black', // Focused border color
    },
  },
  '& .MuiInputBase-root': {
    '&.Mui-focused .MuiInputBase-input': {
      color: 'black', // Ensure text stays black when focused
    },
  },
  '& label.Mui-focused': {
    color: 'black',
  },
});
const StyledItem = styled(StyledPaper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  transition: '0.3s ease',
  '&:hover': {
    backgroundColor: '#3269ba',
    color: 'white',
  },
}));

// its gets it from api 
const userStats = [
  { name: 'Active', value: 400 },
  { name: 'Inactive', value: 300 },
  { name: 'New', value: 200 },
];

const productStats = [
  { name: 'Laptops', count: 120 },
  { name: 'Mobiles', count: 200 },
  { name: 'Tablets', count: 150 },
  { name: 'Accessories', count: 300 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  const { dashboardData, setDashboardData } = useMyContext();
  const [searchTerm, setSearchTerm] = useState('');
  const { darkMode } = useTheme();
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  // const router = useRouter();

  // useEffect(() => {
  //   const token = getCookie('token');
    
  //   // Check token immediately
  //   if (!token || !verifyToken(token as string)) {
  //     router.push('/');
  //     return;
  //   }

  //   // Set up timer to check token expiration
  //   const checkTokenInterval = setInterval(() => {
  //     const currentToken = getCookie('token');
  //     if (!currentToken || !verifyToken(currentToken as string)) {
  //       router.push('/');
  //     }
  //   }, 1000); // Check every second

  //   return () => clearInterval(checkTokenInterval);
  // }, [router]);
  const fetchData = async () => {
    try {
      const response = await fetch('https://66b9e0c8fa763ff550f9f4a9.mockapi.io/users');
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      // Replace the entire data instead of adding to it
      setDashboardData(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array

  // فیلتر کردن داده‌ها بر اساس جستجو
  const filteredData = dashboardData.filter(item =>
    item.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.lname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // محاسبه داده‌های صفحه‌بندی شده
  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <ResponsiveDrawer>
      <Box sx={{ 
        maxWidth: '100vw',
        overflowX: 'hidden'
      }}>
        <Grid container>
          <Grid item xs={12}>
            <Box sx={{
              width: { xs: '95%', sm: '100%' },
              mx: 'auto',
              color: darkMode ? '#fff' : '#000',
              px: { xs: 1, sm: 2, md: 3 },
            }}>
              <h1>
                <DashboardIcon /> Dashboard
              </h1>
              
              <ResponsiveStack />
            
              <Box sx={{ mt: 4, mb: 4, width: '100%', overflowX: 'hidden' }}>
                <StackedAreas />
              </Box>
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
                gap: { xs: 2, sm: 3 },
                mt: 4,
                width: '100%'
              }}>
                {/* circle chart*/}
                <StyledPaper sx={{ p: 2 }}>
                  <h2>Users status</h2>
                  <Box sx={{minHeight:'400px',maxHeight:'auto' }}>
                  <ResponsiveContainer width="100%" height={400} >
                    <PieChart >
                      <Pie
                        data={userStats}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"

                      >
                        {userStats.map((_,index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}  style={{fontSize:'10px'}}/>
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: darkMode ? 'white' : '#fff',
                          color: darkMode ? '#fff' : '#000',
                        }}
                      />
                      <Legend
                        formatter={(value) => <span style={{ color: darkMode ? '#fff' : '#000' }}>{value}</span>}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  </Box>
                </StyledPaper>

                {/* bar chart*/}
                <StyledPaper sx={{ p: 2 }}>
                  <h2>Products Statistics</h2>
                  <Box sx={{paddingTop:{xs:'0',lg:'10%'},minHeight:'300px',maxHeight:'auto'}}>
                  <ResponsiveContainer width="100%" height={300}  >
                    <BarChart
                      data={productStats}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#ccc'} />
                      <XAxis
                        dataKey="name"
                        tick={{ fill: darkMode ? '#fff' : '#000' }}
                      />
                      <YAxis
                        tick={{ fill: darkMode ? '#fff' : '#000' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: darkMode ? '#222e3c' : '#fff',
                          color: darkMode ? '#fff' : '#000',
                        }}
                      />
                      <Legend
                        formatter={(value) => <span style={{ color: darkMode ? '#fff' : '#000' }}>{value}</span>}
                      />
                      <Bar dataKey="count" name="amounts" fill="#3269ba" />
                    </BarChart>
                  </ResponsiveContainer>
                  </Box>
                </StyledPaper>
              </Box>
              <Box sx={{ mt: 4  }}>
                <CollapsibleTable />
              </Box>
              
              <BasicStack />
            
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ResponsiveDrawer>
  );
}

function ResponsiveStack(): React.ReactElement {
  return (
    <div>
      <Box sx={{ width: "100%",cursor:"pointer" }}>
        <Stack
          direction={{ xs: "column", sm: "column", md: "column", lg: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          {[
            { icon: <AccountBoxIcon sx={{ fontSize: 40 }} />, label: "Users", value: "4500" },
            { icon: <HowToRegIcon sx={{ fontSize: 40 }} />, label: "Subscribers", value: "3000" },
            { icon: <SellIcon sx={{ fontSize: 40 }} />, label: "Sales", value: "2000" },
            { icon: <CheckCircleOutlineIcon sx={{ fontSize: 40 }} />, label: "Orders", value: "2002" },
          ].map((item, index) => (
            <StyledItem
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: { xs: "100%", sm: "100%" },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {item.icon}
                <Box sx={{ ml: 1, textAlign: "center" }}>
                  <Typography variant="h6">{item.label}</Typography>
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    {item.value}
                  </Typography>
                </Box>
              </Box>
            </StyledItem>
          ))}
        </Stack>
      </Box>
    </div>
  );
}

function CollapsibleTable(): React.ReactElement {
  const { darkMode } = useTheme();
  const { dashboardData } = useMyContext();
  const [page, setPage] = useState<number>(1);
  const rowsPerPage = 4;

  const paginatedData = dashboardData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <TableContainer component={StyledPaper} sx={{ width: "auto", overflowX: "auto" }}>
        <Table aria-label="collapsible table" sx={{
          tableLayout: "auto",
          width: "100%",
          overflowX: "auto",
          '& .MuiTableCell-root': {
            color: darkMode ? '#fff' : '#000'
          }
        }}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((val) => (
              <Row key={val.id} val={val} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(dashboardData.length / rowsPerPage)}
        page={page}
        onChange={handleChange}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
            sx={{ color: darkMode ? '#fff' : '#000' }}
          />
        )}
      />
    </>
  );
}

interface RowProps {
  val: User;
}

const Row: React.FC<RowProps> = ({ val }) => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newData, setNewData] = useState<User>({ ...val });
  const { darkMode } = useTheme();
  const { updateDashboardData } = useMyContext();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!newData) return;

    const updatedData = {
      ...newData,
      id: val.id,
      img: newData.img || val.img,
    };

    try {
      const response = await fetch(`https://66b9e0c8fa763ff550f9f4a9.mockapi.io/users/${updatedData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error('Failed to update');

      const responseData = await response.json();

      updateDashboardData({
        id: responseData.id,
        img: responseData.img,
        fname: responseData.fname,
        lname: responseData.lname,
        status: responseData.status,
        email: responseData.email,
        city: responseData.city,
        street: responseData.street,
        mobile: responseData.mobile,
        user: responseData.user,
        pass: responseData.pass,
        age: responseData.age
      });

      setIsEditing(false);
      setNewData(responseData);
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update user');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewData(val);
  };

  return (
    <React.Fragment>
      <TableRow sx={{
        '& > *': { borderBottom: 'unset' },
        backgroundColor: darkMode ? '#222e3c' : '#fff',
      }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            sx={{ color: darkMode ? '#fff' : '#000', }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={{ color: darkMode ? '#fff' : '#000' }}>
          {val.id}
        </TableCell>
        <TableCell component="th" scope="row">
          {isEditing ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1,width:{xs:'210px'} }}>
              <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
              <Grid item xs={12} >
                {([
                  { name: 'img' as keyof User, label: 'Image' },
                  { name: 'fname' as keyof User, label: 'First Name' },
                  { name: 'lname' as keyof User, label: 'Last Name' },
                  { name: 'street' as keyof User, label: 'Street' },
                  { name: 'status' as keyof User, label: 'Status' },
                  { name: 'user' as keyof User, label: 'User' },
                  { name: 'age' as keyof User, label: 'Age' },
                  { name: 'pass' as keyof User, label: 'Password' },
                  { name: 'city' as keyof User, label: 'City' },
                  { name: 'email' as keyof User, label: 'Email' },
                  { name: 'mobile' as keyof User, label: 'Mobile' }
                ]).map((field) => (
                  <WhiteTextField
                    key={field.name}
                    id={field.name}
                    name={field.name}
                    label={field.label}
                    value={newData[field.name]}
                    onChange={(e) => setNewData({ ...newData, [field.name]: e.target.value })}
                    sx={{
                      backgroundColor: darkMode ? '#2c3b4f' : '#fff',
                      '& .MuiInputBase-input': {
                        color: darkMode ? '#fff !important' : '#000 !important',
                      },
                      '& .MuiInputLabel-root': {
                        color: darkMode ? '#fff' : '#000',
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: darkMode ? 'white' : '#000',
                        },
                      },
                      '& label.Mui-focused': {
                        color: darkMode ? '#fff' : '#000',
                      
                      },
                    }}
                  />
                ))}
             </Grid>
             </Grid>
              
              <IconButton onClick={handleSave}>
                <EditNoteIcon sx={{ color: darkMode ? '#fff' : '#000' }} />
              </IconButton>
              <IconButton onClick={handleCancel}>
                <CancelIcon sx={{ color: darkMode ? '#fff' : '#000' }} />
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <img
                src={val.img}
                alt={`${val.fname} ${val.lname}`}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: `2px solid ${darkMode ? '#fff' : '#000'}`
                }}
              />
              <span>{val.fname} {val.lname}</span>
            </Box>
          )}
        </TableCell>
        <TableCell align="center">{val.status}</TableCell>
        <TableCell align="left">{val.email}</TableCell>
        <TableCell align="left">
          {val.city} , {val.street}
        </TableCell>
        <TableCell align="left">{val.mobile}</TableCell>
        <TableCell align="center">
          {isEditing ? (
            <>
              <IconButton onClick={handleSave}>
                <EditNoteIcon sx={{ color: darkMode ? '#fff' : '#000' }} />
              </IconButton>
              <IconButton onClick={handleCancel}>
                <CancelIcon sx={{ color: darkMode ? '#fff' : '#000' }} />
              </IconButton>
            </>
          ) : (
            <IconButton onClick={handleEditClick}>
              <EditNoteIcon sx={{ color: darkMode ? '#fff' : '#000' }} />
            </IconButton>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                More Detail:
              </Typography>
              <Typography variant="body2">User: {val.user}</Typography>
              <Typography variant="body2">Password: {val.pass}</Typography>
              <Typography variant="body2">Age: {val.age}</Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default Dashboard;