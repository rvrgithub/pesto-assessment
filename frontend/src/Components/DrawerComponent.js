import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { Link, useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { api, token } from '../App';

const drawerWidth = 240;

// Styling AppBar to handle the open state for drawer
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

// Styling for DrawerHeader
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export const DrawerComponent = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [profileData, setProfileData] = React.useState([]);
  let navigate = useNavigate();

  // Function to open drawer
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // Function to close drawer
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Fetching profile data from the server
  const getProfile = () => {
    fetch(`${api}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => {
        console.log("Get Profile Data Successfully:", responseData.userId);
        setProfileData(responseData.userId);
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  // Fetch profile data when component mounts
  React.useEffect(() => {
    getProfile();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* Main AppBar */}
      <AppBar open={open} style={{ background: "transparent", border: "transparent" }}>
        <Toolbar>
          <Typography variant="h6" color={'gray'} noWrap sx={{ flexGrow: 1 }} component="div">
            Todo List
          </Typography>
          {/* Menu Icon for opening the drawer */}
          <IconButton
            color="gray"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* Placeholder for the AppBar */}
      <DrawerHeader />

      {/* Main Drawer Component */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        {/* Drawer Header with close button */}
        <DrawerHeader >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        {/* Divider */}
        <Divider />

        {/* Profile Section */}
        <AppBar position="static" style={{ background: "transparent", padding: "20px 10px" }}>
          <Toolbar variant="dense">
            {/* Grid to align items */}
            <Grid container alignItems="center" justifyContent="center" spacing={2}>
              {/* Profile Image */}
              <Grid item>
                <img width={"80px"} height={"80px"} src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png" />
              </Grid>
              {/* Profile Text */}
              <Grid item style={{ textAlign: 'center' }}>
                <Typography variant="h6" color="black" component="div">
                  {profileData.firstName} {profileData.lastName}
                </Typography>
                <Typography variant="h6" color="gray" component="div">
                  {profileData.email}
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        {/* Divider */}
        <Divider />

        {/* List of items */}
        <List>
          {['Sign In', 'Log Out'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {/* Conditional rendering of icons */}
                  {index % 2 === 0 ? <Link to="/sign-in"><LoginIcon /></Link> : <LogoutIcon onClick={() => {
                    localStorage.clear();
                    navigate("/sign-in");
                  }} />}
                </ListItemIcon>
                {/* Text for each item */}
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
