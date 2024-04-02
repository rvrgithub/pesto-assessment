import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { api } from '../App';

// Function to display copyright information
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="https://www.pesto.tech/">
        Pesto Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// Create a default theme
const defaultTheme = createTheme();

// Main SignUp component
export const SignUp = () => {
  // Using react-router-dom hook for navigation
  const navigate = useNavigate();

  // Using react-hook-form for form handling
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema), // Using Yup for validation
  });

  // Function to handle sign up submission
  const handleSignup = (data) => {
    fetch(`${api}/signup`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.status) {
          navigate("/sign-in")

          enqueueSnackbar("Sign Up Successfully !!", { variant: "success" })
        } else {
          enqueueSnackbar(data?.message ?? "Something went wrong !!", { variant: "error" })
        }
      })
      .catch(error => enqueueSnackbar(error?.message ?? "Internal server error !!", { variant: "error" }));
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form"
            onSubmit={handleSubmit(handleSignup)}
            sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  {...register('firstName')}
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={!!errors.firstName} // Checking for errors
                  helperText={errors.firstName ? errors.firstName.message : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  type="Text"
                  autoComplete="family-name"
                  {...register('lastName')}
                  error={!!errors.lastName} // Checking for errors
                  helperText={errors.lastName ? errors.lastName.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type='email'
                  autoComplete="email"
                  {...register('email')}
                  error={!!errors.email} // Checking for errors
                  helperText={errors.email ? errors.email.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Enter 8 Digit Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register('password')}
                  error={!!errors.password} // Checking for errors
                  helperText={errors.password ? errors.password.message : ''}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/sign-in" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* Display copyright */}
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider >
  );
}

// Define your validation schema using Yup
const validationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  password: yup.string().required('Password is required').length(8, 'Password must be exactly 8 characters long'),
  email: yup.string().required('Email is required').email().required('Invalid email address'),
});
