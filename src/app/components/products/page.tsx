"use client";

import React, { useState, ChangeEvent } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  
  TextField,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  PaginationItem,
  Collapse,
  Typography,
} from "@mui/material";
import {
  ControlPoint as ControlPointIcon,

  ExpandMore as ExpandMoreIcon,
  ShoppingBag as ShoppingBagIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  EditNote as EditNoteIcon,
  DeleteOutline as DeleteOutlineIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import ResponsiveDrawer from "../ResponsiveDrawer";
import Txt2 from "../txt2";
import myContext from "../../myContext";
import { useTheme } from '../../themeContext';
import BasicStack from "../BasicStack";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: "#1a2035",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.primary,
// }));

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
const StyledButton = styled(Button)({
  backgroundColor: "#3b7ddd",
  color: "white",
  "&:hover": {
    backgroundColor: "#326abb",
  },
});

interface Product {
  id: string;
  avatar: string;
  title: string;
  brand: string;
  price: string;
  color: string;
  description: string;
}

export default function Page() {
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Product>({
    id: "",
    avatar: "",
    title: "",
    brand: "",
    price: "",
    color: "",
    description: "",
  });
  const { darkMode } = useTheme();
  const queryClient = useQueryClient();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      alert("New product added!");
      setFormData({
        id: "",
        avatar: "",
        title: "",
        brand: "",
        price: "",
        color: "",
        description: "",
      });
      setOpen(false);
    },
    onError: (error: Error) => {
      alert("New product not added: " + error.message);
    }
  });

  const handleSubmit = async () => {
    const { avatar, title, brand, price, color, description } = formData;

    if (!avatar || !title || !brand || !price || !color || !description) {
      alert("Please fill all the fields");
      return;
    }

    addProductMutation.mutate({
      avatar,
      title,
      brand,
      price,
      color,
      description
    });
  };

  return (
    <ResponsiveDrawer>
      <Box sx={{ 
        maxWidth: '90vw',
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
              <Box sx={{ 
                color: darkMode ? '#fff' : '#000',
              }}>
                <h1>
                  <ShoppingBagIcon /> Products
                </h1>
                <Box sx={{ mt: 4 }}>
                  <CollapsibleTable />
                </Box>
                <Box sx={{ 
                  display: "flex", 
                  justifyContent: "start", 
                  alignItems: "center", 
                  mt: 5, 
                  fontWeight: "bolder",
                  color: darkMode ? '#fff' : '#000',
                  backgroundColor: darkMode ? '#222e3c' : '#fff'
                }}>
                  ADD New Product
                  <ControlPointIcon
                    sx={{ 
                      cursor: "pointer", 
                      fontSize: "50px",
                      color: darkMode ? '#fff' : '#000'
                    }}
                    onClick={() => setOpen(!open)}
                  />
                </Box>
                <Accordion expanded={open} sx={{
                  backgroundColor: darkMode ? '#222e3c' : '#fff',
                  color: darkMode ? '#fff' : '#000',
                }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <h2>Add Product Details</h2>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2} sx={{ justifyContent: "flex-start" }}>
                      {["avatar", "title", "brand", "price", "color", "description"].map((field) => (
                        <Grid key={field} item xs={12} sm={8} lg={6} xl={6}>
                          <WhiteTextField
                            id={field}
                            name={field}
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={formData[field as keyof Product]}
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
                        </Grid>
                      ))}
                    </Grid>
                    <StyledButton sx={{ mt: "5%" }} variant="contained" onClick={handleSubmit}>
                      Submit
                    </StyledButton>
                  </AccordionDetails>
                </Accordion>
              </Box>
              <BasicStack/>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ResponsiveDrawer>
  );
}

function CollapsibleTable() {
  const [page, setPage] = useState<number>(1);
  const rowsPerPage = 4;
  const { darkMode } = useTheme();

  const { data = [], isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  
  if (error) return <div>Error: {error.message}</div>;

  const paginatedData = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
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
              <TableCell>Product Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((val: Product) => (
              <Row key={val.id} val={val} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(data.length / rowsPerPage)}
        page={page}
        onChange={handleChange}
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
    </>
  );
}

interface RowProps {
  val: Product;
}

function Row({ val }: RowProps) {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newData, setNewData] = useState<Product>({ ...val });
  const { darkMode } = useTheme();
  const queryClient = useQueryClient();

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      alert('Updated successfully!');
      setIsEditing(false);
    },
    onError: (error: Error) => {
      alert('Update failed: ' + error.message);
    }
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      alert('Deleted!');
    },
    onError: (error: Error) => {
      alert('Delete failed: ' + error.message);
    }
  });

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete it?")) {
      deleteProductMutation.mutate(val.id);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateProductMutation.mutate(newData);
  };

  return (
    <React.Fragment>
      <TableRow>
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
        <TableCell component="th" scope="row">
          {isEditing ? (
            <Box sx={{ display: 'flex', flexDirection:'column',gap: 1,width:{xs:'100%',lg:'60%'} }}>
            <Grid container spacing={2} sx={{ justifyContent: "flex-start" }}>
            {["avatar", "title", "brand", "price", "color", "description"].map((field) => (
              <Grid key={field} item xs={12} sm={8} lg={6} xl={6}>
                <WhiteTextField
                  id={field}
                  name={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={newData[field as keyof Product]}
                  onChange={(e) => setNewData({ ...newData, [field]: e.target.value })}
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
              </Grid>
            ))}
          </Grid>

              <IconButton 
                onClick={handleSave}
                sx={{ color: darkMode ? '#fff' : '#000' }}
              >
                <EditNoteIcon />
              </IconButton>
            </Box>
          ) : (
            <Txt2 data={val} />
          )}
        </TableCell>
        <TableCell align="left">{val.price}</TableCell>
        <TableCell align="left">{val.color}</TableCell>
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
            <DeleteOutlineIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div" sx={{ color: darkMode ? '#fff' : '#000' }}>
                More Detail:
              </Typography>
              <Typography variant="body2" sx={{ color: darkMode ? '#fff' : '#000' }}>
                description: {val.description}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.primary,
}));

const fetchProducts = async () => {
  const response = await fetch("https://66c9c31959f4350f064d5d7d.mockapi.io/enShop");
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const addProduct = async (product: Omit<Product, 'id'>) => {
  const response = await fetch("https://66c9c31959f4350f064d5d7d.mockapi.io/enShop", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error('Failed to add product');
  return response.json();
};

const updateProduct = async (product: Product) => {
  const response = await fetch(`https://66c9c31959f4350f064d5d7d.mockapi.io/enShop/${product.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error('Failed to update product');
  return response.json();
};

const deleteProduct = async (id: string) => {
  const response = await fetch(`https://66c9c31959f4350f064d5d7d.mockapi.io/enShop/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error('Failed to delete product');
  return response.json();
};
