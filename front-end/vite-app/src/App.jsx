import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import backgroundImg from './assets/wall1.jpg';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import PhoneIcon from '@mui/icons-material/Phone';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';

const LandingPage = () => {

  const getUsernameFromCookie = () => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'username') {
        return value;
      }
    }
    return null;
  };

  const username = getUsernameFromCookie();

  const handleLogout = () => {
    console.log('Logout clicked!');
  };

  return (
    <div
      style={{
        backgroundColor: '#f4f4f4',
        minHeight: '100vh',
        color: '#333',
        overflowY: 'auto',
        position: 'relative',
      }}
    >

      {/* Navigation Bar */}
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar style={{ justifyContent: 'space-between', backgroundColor: '#2c3e50', color: '#fff', display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" component="div" style={{ fontFamily: 'Playfair Display' }}>
            LegendsMovesHub
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {username && (
              <>
                <Typography variant="body1" style={{ marginRight: '8px', color: '#fff', fontWeight: 'bold', fontSize: '18px' }}>
                  {username}
                </Typography>
              </>
            )}
            <Link to="/data" style={{ textDecoration: 'none' }}>
              <IconButton color="inherit" style={{ marginLeft: '8px' }}>
                <AddIcon fontSize="large" style={{ fontWeight: 'bold', color: 'white' }} />
              </IconButton>
            </Link>
            <IconButton color="inherit" style={{ marginLeft: '8px', color: 'white' }}>
              <PhoneIcon fontSize="large" />
            </IconButton>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              {username ? (
                <IconButton color="inherit" style={{ marginLeft: '8px', color: 'white' }}>
                  <Avatar src="/path/to/profile-image.jpg" alt="Profile" />
                </IconButton>
              ) : (
                <IconButton color="inherit" style={{ marginLeft: '8px', color: 'white' }}>
                  <PersonIcon fontSize="large" />
                </IconButton>
              )}
            </Link>
            <Link to="/signout" style={{ textDecoration: 'none' }}>
              <IconButton color="inherit" onClick={handleLogout} style={{ color: 'white' }}>
                <ExitToAppIcon fontSize="large" />
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>






      {/* Background Image */}
      <div
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          filter: 'blur(5px)',
          height: '60vh',  
        }}
      ></div>

      {/* Welcome Text */}
      <Container
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 1, 
        }}
      >
        <Typography variant="h2" style={{ fontFamily: 'Bungee', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)', color: '#fff' }}>
          Welcome to LegendsMovesHub
        </Typography>
      </Container>

      {/* Main Content */}
      <Container style={{ marginTop: '2rem' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Link to="/football" style={{ textDecoration: 'none' }}>
              <Paper elevation={3} style={{ padding: '2rem', borderRadius: '12px', backgroundColor: '#fff' }}>
                <Typography variant="h4" style={{ fontFamily: 'Poppins', marginBottom: '1rem', color: '#3498db' }}>
                  Football Highlights
                </Typography>
                <Typography style={{ fontFamily: 'Montserrat', color: '#333333' }}>
                  Explore the latest football news, scores, and highlights. Stay updated with your favorite teams and players.
                </Typography>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={12} md={6}>
            <Link to="/cricket" style={{ textDecoration: 'none' }}>
              <Paper elevation={3} style={{ padding: '2rem', borderRadius: '12px', backgroundColor: '#fff' }}>
                <Typography variant="h4" style={{ fontFamily: 'Poppins', marginBottom: '1rem', color: '#3498db' }}>
                  Cricket Insights
                </Typography>
                <Typography style={{ fontFamily: 'Montserrat', color: '#333333' }}>
                  Dive into the world of cricket with in-depth analysis, match statistics, and player profiles. Your go-to source for cricket updates.
                </Typography>
              </Paper>
            </Link>
          </Grid>
        </Grid>
      </Container>

    </div>
  );
};

export default LandingPage;





