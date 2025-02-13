"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, ChangeEvent } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Box, Button, FormControl, InputAdornment, TextField, Paper, IconButton, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, PaginationItem, Collapse, Grid } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditNoteIcon from '@mui/icons-material/EditNote';

import PeopleIcon from '@mui/icons-material/People';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { styled } from '@mui/material/styles';

import ResponsiveDrawer from '../ResponsiveDrawer';

import { useTheme } from '../../themeContext';
import StyledPaper from '../StyledPaper';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import BasicStack from '../BasicStack';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { getCookie } from 'cookies-next';

interface FormData {
  img: string;
  fname: string;
  lname: string;
  street: string;
  status: string;
  user: string;
  age: string;
  pass: string;
  city: string;
  email: string;
  mobile: string;
}

// Define the type for the row data
interface RowData {
  id: number;
  img: string;
  fname: string;
  lname: string;
  street: string;
  status: string;
  user: string;
  age: string;
  pass: string;
  city: string;
  email: string;
  mobile: string;
}

// تعریف interface برای props کامپوننت Row
interface RowProps {
  val: RowData;
}

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: '#1a2035',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.primary,
// }));
interface WhiteTextFieldProps {
  darkMode?: boolean;
}
const WhiteTextField = styled(TextField)<WhiteTextFieldProps>(({ darkMode = false }) => ({
  backgroundColor: darkMode ? '#2c3b4f' : '#fff',
  '& .MuiInputBase-input': {
    color: darkMode ? '#fff !important' : '#000 !important',
  },
  '& .MuiInputLabel-root': {
    color: darkMode ? '#fff' : '#000',
    borderColor: darkMode ? '#fff !important' : '#000 !important',
  },
  '& label.Mui-focused': {
    color: darkMode ? '#fff' : '#000',
    borderColor: darkMode ? '#fff !important' : '#000 !important',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'black',
    },
    '&:hover fieldset': {
      borderColor: darkMode ? '#fff !important' : '#000 !important',
    },
    '&.Mui-focused fieldset': {
      borderColor: darkMode ? '#fff !important' : '#000 !important',
    },
  },
  '& .MuiInputBase-root': {
    '&.Mui-focused .MuiInputBase-input': {
      color: 'black',
    },
  },
}));
const StyledButton = styled(Button)({
  backgroundColor: "#3b7ddd",
  color: "white",
  "&:hover": {
    backgroundColor: "#326abb",
  },
});

// Main component
const Page: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    img: '',
    fname: '',
    lname: '',
    street: '',
    status: '',
    user: '',
    age: '',
    pass: '',
    city: '',
    email: '',
    mobile: '',
  });
  const { darkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<RowData | null>(null);
  const queryClient = useQueryClient();
  const rowsPerPage = 5;


  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('https://66b9e0c8fa763ff550f9f4a9.mockapi.io/admin', {
        headers: {
          'Authorization': `Bearer ${getCookie('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      return response.json();
    }
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addUserMutation = useMutation({
    mutationFn: async (userData: FormData) => {
      const response = await fetch('https://66b9e0c8fa763ff550f9f4a9.mockapi.io/admin', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getCookie('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error('Failed to add user');
      return response.json();
    },
    onSuccess: (newUser) => {
      queryClient.setQueryData(['users'], (oldData: RowData[] | undefined) => {
        if (!oldData) return [newUser];
        return [...oldData, newUser];

      }
      );
      alert('New User Added!');
      setFormData({
        img: '',
        fname: '',
        lname: '',
        street: '',
        status: '',
        user: '',
        age: '',
        pass: '',
        city: '',
        email: '',
        mobile: '',
      });
      setOpen(false);
    },
   
  });

  const handleSubmit = () => {
    const { img, fname, lname, street, status, user, age, pass, city, email, mobile } = formData;
    if (!img || !fname || !lname || !street || !status || !user || !age || !pass || !city || !email || !mobile) {
      alert("Please fill all the fields");
      return;
    }
    addUserMutation.mutate(formData);
  };

  // اصلاح mutation برای update
  const updateMutation = useMutation({
    mutationFn: async (user: RowData) => {
      const response = await fetch(`https://66b9e0c8fa763ff550f9f4a9.mockapi.io/admin/${user.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${getCookie('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) throw new Error('Failed to update user');
      return response.json();
    },

    onSuccess: (updatedUser) => {
    
      // آپدیت مستقیم کش
      queryClient.setQueryData(['users'], (oldData: RowData[] | undefined) => {
        if (!oldData) return [updatedUser];
        return oldData.map(user => user.id === updatedUser.id ? updatedUser : user);
       
      });
     
      setEditingId(null);
      setEditFormData(null);
    
    },
    
  });

  // اصلاح mutation برای delete
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`https://66b9e0c8fa763ff550f9f4a9.mockapi.io/admin/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getCookie('token')}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Failed to delete user');
      return id; // فقط ID رو برگردون
    },
    onSuccess: (deletedId) => {
      // حذف مستقیم از کش
      queryClient.setQueryData(['users'], (oldData: RowData[] | undefined) => {
        if (!oldData) return [];
        return oldData.filter(user => user.id !== deletedId);
      });
    },
  });

  // const handleEditClick = (user: RowData) => {
  //   setEditingId(user.id.toString());
  //   setEditFormData(user);
  // };

  // const handleCancelEdit = () => {
  //   setEditingId(null);
  //   setEditFormData(null);
  // };

  // const handleSaveEdit = () => {
  //   if (editFormData) {
  //     updateMutation.mutate(editFormData);
  //   }
  // };

  // const handleDelete = (id: number) => {
  //   if (window.confirm('Are you sure you want to delete this user?')) {
  //     deleteMutation.mutate(id);
  //   }
  // };

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (editFormData) {
  //     setEditFormData({
  //       ...editFormData,
  //       [e.target.name]: e.target.value,
  //     });
  //   }
  // };



  // const paginatedUsers = users.slice((page - 1) * rowsPerPage, page * rowsPerPage);

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
              <Box sx={{ color: darkMode ? '#fff' : '#000' }}>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 4,
                  flexDirection: {sm: 'row' },
                  gap: { xs: 2, sm: 0 }
                }}>
                  <h1>
                    <PeopleIcon /> Users
                  </h1>

                  <WhiteTextField
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{
                      width: { xs: '100%', sm: '300px' },
                      backgroundColor: darkMode ? '#2c3b4f' : '#fff',
                      '& .MuiInputBase-input': {
                        color: darkMode ? '#fff !important' : '#000 !important',
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: darkMode ? '#fff' : '#000',
                        },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: darkMode ? '#fff' : '#000' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <CollapsibleTable searchTerm={searchTerm} />

                <Box sx={{
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                  mt: 5,
                  fontWeight: 'bolder',
                  color: darkMode ? '#fff' : '#000',
                  backgroundColor: darkMode ? '#222e3c' : '#fff',
                }}>
                  ADD New Users
                  <ControlPointIcon
                    sx={{
                      cursor: 'pointer',
                      fontSize: '50px',
                      color: darkMode ? '#fff' : '#000',
                      backgroundColor: darkMode ? '#222e3c' : '#fff',
                    }}
                    onClick={() => setOpen(!open)}
                  />
                </Box>
                <Accordion
                  expanded={open}
                  sx={{
                    backgroundColor: darkMode ? '#222e3c' : '#fff',
                    color: darkMode ? '#fff' : '#000',
                  }}
                >
                  <AccordionSummary sx={{ backgroundColor: darkMode ? '#222e3c' : '#fff', }} expandIcon={
                    <ExpandMoreIcon sx={{ color: darkMode ? '#fff' : '#000', backgroundColor: darkMode ? '#222e3c' : '#fff', }} />
                  }>
                    <h2>Add Users Details</h2>
                  </AccordionSummary>
                  <AccordionDetails >
                    <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
                      <Grid item xs={6} sm={8} lg={12}>
                        {([
                          { name: 'img' as keyof FormData, label: 'Image' },
                          { name: 'fname' as keyof FormData, label: 'First Name' },
                          { name: 'lname' as keyof FormData, label: 'Last Name' },
                          { name: 'street' as keyof FormData, label: 'Street' },
                          { name: 'status' as keyof FormData, label: 'Status' },
                          { name: 'user' as keyof FormData, label: 'User' },
                          { name: 'age' as keyof FormData, label: 'Age' },
                          { name: 'pass' as keyof FormData, label: 'Password' },
                          { name: 'city' as keyof FormData, label: 'City' },
                          { name: 'email' as keyof FormData, label: 'Email' },
                          { name: 'mobile' as keyof FormData, label: 'Mobile' }
                        ]).map((field) => (
                          <WhiteTextField
                            key={field.name}
                            id={field.name}
                            name={field.name}
                            label={field.label}
                            value={formData[field.name]}
                            onChange={handleInputChange}
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
                                  borderColor: darkMode ? '#fff' : '#000',
                                },
                              },
                              '& label.Mui-focused': {
                                color: darkMode ? '#fff' : '#000',
                              },
                            }}
                          />
                        ))}
                        <StyledButton variant="contained" onClick={handleSubmit}>Submit</StyledButton>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Box>
              <BasicStack />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ResponsiveDrawer>
  );
};

// CollapsibleTable component
const CollapsibleTable: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const { darkMode } = useTheme();
  const [page, setPage] = useState<number>(1);
  const rowsPerPage = 4;

  // اصلاح query
  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('https://66b9e0c8fa763ff550f9f4a9.mockapi.io/admin', {
        headers: {
          'Authorization': `Bearer ${getCookie('token')}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Failed to fetch users');
      return response.json();
    }
  });

  // Filter data based on search
  const filteredData = users.filter((user: RowData) =>
    user.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // تنظیم خودکار صفحه به 1 وقتی جستجو انجام می‌شود
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  // محاسبه داده‌های صفحه‌بندی شده
  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => { // Use '_' to indicate unused parameter
    setPage(value);
  };

  return (
    <>
      <TableContainer component={StyledPaper} sx={{
        backgroundColor: darkMode ? '#222e3c' : '#fff',
      }}>
        <Table aria-label="collapsible table" sx={{
          '& .MuiTableCell-root': {
            color: darkMode ? '#fff' : '#000',
            borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
          },
          '& .MuiTableHead-root': {
            backgroundColor: darkMode ? '#222e3c' : '#fff',
          },
          '& .MuiTableBody-root': {
            '& .MuiTableRow-root': {
              backgroundColor: darkMode ? '#222e3c' : '#fff',
              '&:hover': {
                backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
              },
            },
          },
        }}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((val: RowData) => (
                <Row key={val.id} val={val} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" sx={{ color: darkMode ? '#fff' : '#000' }}>
                    {searchTerm ? 'No users found matching your search' : 'No users available'}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {filteredData.length > rowsPerPage && (
        <Pagination
          count={Math.ceil(filteredData.length / rowsPerPage)}
          page={page}
          onChange={handleChange}
          sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
              sx={{
                color: darkMode ? '#fff' : '#000',
                '&.Mui-selected': {
                  backgroundColor: darkMode ? '#3269ba' : '#1976d2',
                  color: '#fff',
                },
              }}
            />
          )}
        />
      )}
    </>
  );
};


const Row: React.FC<RowProps> = ({ val }) => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newData, setNewData] = useState<RowData>(val);
  const { darkMode } = useTheme();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async (user: RowData) => {
      const response = await fetch(`https://66b9e0c8fa763ff550f9f4a9.mockapi.io/admin/${user.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${getCookie('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) throw new Error('Failed to update user');
      return response.json();
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['users'], (oldData: RowData[] | undefined) => {
        if (!oldData) return [updatedUser];
        return oldData.map(user => user.id === updatedUser.id ? updatedUser : user);
      });
      setIsEditing(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`https://66b9e0c8fa763ff550f9f4a9.mockapi.io/admin/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getCookie('token')}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Failed to delete user');
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData(['users'], (oldData: RowData[] | undefined) => {
        if (!oldData) return [];
        return oldData.filter(user => user.id !== deletedId);
      });
    },
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    if (window.confirm('Are You Sure You Want To Delete This User?')) {
      deleteMutation.mutate(val.id);
    }
  };

  const handleSave = () => {
    if (!newData) return;
    updateMutation.mutate(newData);
  };

  return (
    <React.Fragment>
      <TableRow sx={{
        '& > *': { borderBottom: 'unset' },
        backgroundColor: darkMode ? '#222e3c' : '#fff'
      }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            sx={{ color: darkMode ? '#fff' : '#000' }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{val.id}</TableCell>
        <TableCell>
          <Avatar
            alt={`${val.fname} ${val.lname}`}
            src={val.img}
            sx={{
              width: 40,
              height: 40,
              border: darkMode ? '2px solid #fff' : '2px solid #000'
            }}
          />
        </TableCell>
        <TableCell component="th" scope="row">
          {isEditing ? (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', width: { xs: '200px', lg: '250px' } }}>
              <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
                <Grid item xs={6} sm={8} lg={12}>
                  {([
                    { name: 'img' as keyof RowData, label: 'Image' },
                    { name: 'fname' as keyof RowData, label: 'First Name' },
                    { name: 'lname' as keyof RowData, label: 'Last Name' },
                    { name: 'street' as keyof RowData, label: 'Street' },
                    { name: 'status' as keyof RowData, label: 'Status' },
                    { name: 'user' as keyof RowData, label: 'User' },
                    { name: 'age' as keyof RowData, label: 'Age' },
                    { name: 'pass' as keyof RowData, label: 'Password' },
                    { name: 'city' as keyof RowData, label: 'City' },
                    { name: 'email' as keyof RowData, label: 'Email' },
                    { name: 'mobile' as keyof RowData, label: 'Mobile' }
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
                            borderColor: darkMode ? '#fff' : '#000',
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
            </Box>
          ) : (
            `${val.fname} ${val.lname}`
          )}
        </TableCell>
        <TableCell align="left">{val.status}</TableCell>
        <TableCell align="left">{val.email}</TableCell>
        <TableCell align="left">{val.city}, {val.street}</TableCell>
        <TableCell align="left">{val.mobile}</TableCell>
        <TableCell align="center">
          <IconButton
            onClick={handleEditClick}
            sx={{ color: darkMode ? '#fff' : '#000' }}
          >
            <EditNoteIcon />
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <IconButton
            onClick={handleDelete}
            sx={{ color: darkMode ? '#fff' : '#000' }}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      {/* Collapsible Detail Row */}
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={8}
          sx={{
            backgroundColor: darkMode ? '#222e3c' : '#fff',
          }}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{
              margin: 1,
              color: darkMode ? '#fff' : '#000',
            }}>
              <Typography variant="h6" gutterBottom component="div">
                More Details
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar
                  alt={`${val.fname} ${val.lname}`}
                  src={val.img}
                  sx={{
                    width: 80,
                    height: 80,
                    border: darkMode ? '2px solid #fff' : '2px solid #000'
                  }}
                />
                <Box>
                  <Typography variant="body1">ID: {val.id}</Typography>
                  <Typography variant="body2">User: {val.user}</Typography>
                  <Typography variant="body2">Age: {val.age}</Typography>
                  <Typography variant="body2">Status: {val.status}</Typography>
                  <Typography variant="body2">Email: {val.email}</Typography>
                  <Typography variant="body2">Phone: {val.mobile}</Typography>
                  <Typography variant="body2">Address: {val.city}, {val.street}</Typography>
                </Box>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default Page;
