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
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// Create a default theme
const defaultTheme = createTheme();

// Main SignIn component
export const SignIn = () => {
    // Using react-router-dom hook for navigation
    const navigate = useNavigate();

    // Using react-hook-form for form handling
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema), // Using Yup for validation
    });

    // Function to handle sign in submission
    const handleSignin = (data) => {
        fetch(`${api}/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.status) {
                    localStorage.setItem("Token", data.token)
                    enqueueSnackbar("Login Successfully !!", { variant: "success" })
                    navigate('/')
                } else {
                    enqueueSnackbar(data?.message ?? "Some thing went wrong !!", { variant: "error" })

                }
            })
            .catch(err => {
                enqueueSnackbar(err?.message ?? "Internal server error !!", { variant: "error" })

            })

    };

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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(handleSignin)} noValidate sx={{ mt: 1 }}>
                        <TextField
                            required
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
                        <Box sx={{ height: "5vh" }} />
                        <TextField
                            required
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to="/sign-up" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/* Display copyright */}
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}

// Define your validation schema using Yup
const validationSchema = yup.object().shape({
    password: yup.string().required('Password is required'),
    email: yup.string().required('Email is required'),
});
