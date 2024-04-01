import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import * as yup from 'yup';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';

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


const defaultTheme = createTheme();

export const SignUp = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema), // Using Yup for validation
  });


  const handleSignup = (data) => {
    console.log("data", data)
    fetch(`http://localhost:4000/signup`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok', response.massage);
        }
        return response.json();
      })
      .then(data => {
        if (data.status) {
          enqueueSnackbar("Sign Up Successfully !!", { variant: "success" })
        } else {
          enqueueSnackbar(data.massage, { variant: "error" })
        }
        navigate("/sign-in")
      })
      .catch(error => enqueueSnackbar(error.message, { variant: "error" }));
  }

  // console.log("register", register)
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
            // onSubmit={handleSignup}
            sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                    required
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
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
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

