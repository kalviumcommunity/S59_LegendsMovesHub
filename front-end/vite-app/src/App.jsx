import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div style={{ backgroundColor: '#f4f4f4', minHeight: '100vh', color: '#333' }}>

      {/* Navigation Bar */}
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar style={{ justifyContent: 'space-between', backgroundColor: '#2c3e50', color: '#fff' }}>
          <Typography variant="h6" component="div" style={{ fontFamily: 'Playfair Display' }}>
          LegendsMovesHub
          </Typography>
          <div>
            <Button color="inherit">Football</Button>
            <Button color="inherit">Cricket</Button>
            <Button color="inherit">About</Button>
            <Button color="inherit">Contact</Button>
          </div>
        </Toolbar>
      </AppBar>

      {/* Centre Section */}
      <Container
        maxWidth="xl"
        style={{
          background: 'linear-gradient(to right, #3498db, #1abc9c)',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          textAlign: 'center',
          marginBottom: '2rem',
        }}
      >
        <Typography variant="h2" style={{ fontFamily: 'Bungee', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)', background: '-webkit-linear-gradient(#3498db, #1abc9c)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
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


      {/* Action */}
      <Container style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom style={{ fontFamily: 'Playfair Display', color: '#333333' }}>
          Ready to experience the excitement?
        </Typography>
        <Button variant="contained" color="primary" style={{ borderRadius: '24px', fontFamily: 'Roboto', backgroundColor: '#3498db' }}>
          Get Started
        </Button>
      </Container>
    </div>
  );
};

export default LandingPage;