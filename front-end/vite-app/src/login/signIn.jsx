import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import bgimg from '../assets/stadium.jpg';

const LoginForm = () => {
    const [formData, setFormData] = useState({
      username: '',
      password: '',
    });
  
    const [loginError, setLoginError] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
  
    const handleChange = (prop) => (event) => {
      setFormData({ ...formData, [prop]: event.target.value });
    };
  
    const handleLogin = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          credentials: 'include',
        });
  
        const data = await response.json();
        console.log(data);
  
        if (data.success) {
          console.log('User logged in successfully');

          document.cookie = `username=${formData.username}; SameSite=None; Secure`;
          document.cookie = `password=${formData.password}; SameSite=None; Secure`;
  
          setLoginSuccess(true);
          window.location.href = '/';
  

        } else {
          setLoginSuccess(false);
          setLoginError(data.message || 'Invalid username or password. Please try again.');
        }
      } catch (error) {
        console.error('Error logging in:', error);
        setLoginSuccess(false);
        setLoginError('An error occurred while logging in. Please try again.');
      }
    };
  
    return (
      <div style={{ height: '100vh', backgroundImage: `url(${bgimg})`, backgroundSize: 'cover' }}>
        <Container component="main" maxWidth="sm" sx={{ paddingTop: '50px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              boxSizing: 'border-box',
              background: 'rgba(0, 0, 0, 0.5)',
              height: '100%',
            }}
          >
            <Typography variant="h4" component="div" sx={{ color: '#fff', marginBottom: '20px' }}>
              Log In
            </Typography>
            <FormControl fullWidth variant="outlined" sx={{ marginBottom: '20px' }}>
              <InputLabel htmlFor="outlined-username" sx={{ color: '#fff' }}>
                Username
              </InputLabel>
              <OutlinedInput
                id="outlined-username"
                label="Username"
                value={formData.username}
                onChange={handleChange('username')}
                sx={{ color: '#fff' }}
              />
            </FormControl>
            <FormControl fullWidth variant="outlined" sx={{ marginBottom: '20px' }}>
              <InputLabel htmlFor="outlined-password" sx={{ color: '#fff' }}>
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-password"
                type="password"
                label="Password"
                value={formData.password}
                onChange={handleChange('password')}
                sx={{ color: '#fff' }}
              />
            </FormControl>
            {loginSuccess && (
              <Typography variant="body2" sx={{ color: 'success.main', marginBottom: '20px' }}>
                Login successful!
              </Typography>
            )}
            {loginError && (
              <Typography variant="body2" sx={{ color: 'error.main', marginBottom: '20px' }}>
                {loginError}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              sx={{ marginBottom: '20px' }}
            >
              Log In
            </Button>
            <Typography variant="body2" sx={{ color: '#fff' }}>
              Don't have an account? <Link to="/user">Sign up</Link>
            </Typography>
          </div>
        </Container>
      </div>
    );
  };
  
  export default LoginForm;