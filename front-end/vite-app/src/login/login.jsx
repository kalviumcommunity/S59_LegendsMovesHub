import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  Link,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import bgimg from '../assets/stadium.jpg';
import { Link as RouterLink } from 'react-router-dom'; 
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';


const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    showPassword: false,
    agreedTerms: false,
  });

  const [passwordRequirementsError, setPasswordRequirementsError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });

    if (prop === 'password') {
      validatePasswordRequirements(event.target.value);
    } else if (prop === 'email') {
      validateEmail(event.target.value);
    }
  };

  const handleCheckboxChange = () => {
    setFormData({ ...formData, agreedTerms: !formData.agreedTerms });
  };

  const handleClickShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validatePasswordRequirements = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasDigit) {
      setPasswordRequirementsError(
        'Password must contain at least one uppercase letter, one lowercase letter, and one digit.'
      );
    } else {
      setPasswordRequirementsError('');
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address.');
    } else {
      setEmailError('');
    }
  };

  const isFormValid = () => {
    return (
      formData.username &&
      formData.password &&
      formData.email &&
      formData.agreedTerms &&
      !passwordRequirementsError &&
      !emailError
    );
  };

  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const handleSnackbarClose = () => {
    setOpenSuccessSnackbar(false);
    setOpenErrorSnackbar(false);
  };

  const handleSignUp = async () => {
    if (isFormValid()) {
      try {
        const response = await fetch('https://s59-legendsmoveshub.onrender.com/api/signup', {
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
          console.log('User registered successfully');
          setOpenSuccessSnackbar(true);


        } else {
          console.error('User registration failed:', data.message);
          setOpenErrorSnackbar(true);
        }
      } catch (error) {
        console.error('Error registering user:', error);
        setOpenErrorSnackbar(true);
      }
    }
  };
   
 

  document.body.style.overflow = 'hidden';

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
            Sign Up
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
              type={formData.showPassword ? 'text' : 'password'}
              label="Password"
              value={formData.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    sx={{ color: '#fff' }}
                  >
                    {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              sx={{ color: '#fff' }}
            />
            {passwordRequirementsError && (
              <Typography variant="caption" sx={{ color: 'error.main', marginTop: '5px' }}>
                {passwordRequirementsError}
              </Typography>
            )}
          </FormControl>
          <FormControl fullWidth variant="outlined" sx={{ marginBottom: '20px' }}>
            <InputLabel htmlFor="outlined-email" sx={{ color: '#fff' }}>
              Email
            </InputLabel>
            <OutlinedInput
              id="outlined-email"
              label="Email"
              value={formData.email}
              onChange={handleChange('email')}
              sx={{ color: '#fff' }}
            />
            {emailError && (
              <Typography variant="caption" sx={{ color: 'error.main', marginTop: '5px' }}>
                {emailError}
              </Typography>
            )}
          </FormControl>
          <FormGroup sx={{ marginBottom: '20px' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.agreedTerms}
                  onChange={handleCheckboxChange}
                  sx={{ color: '#fff' }}
                />
              }
              label="I agree to the Terms and Conditions"
              sx={{ color: '#fff' }}
            />
          </FormGroup>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignUp}
            disabled={!isFormValid()}
            sx={{ marginBottom: '20px' }}
          >
            Sign Up
          </Button>

          <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <SnackbarContent
          sx={{ backgroundColor: 'green', color: 'white' }}
          message="User registered successfully!"
        />
      </Snackbar>

      {/* Snackbar for error */}
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <SnackbarContent
          sx={{ backgroundColor: 'red', color: 'white' }}
          message="User already exists.. Please try again."
        />
      </Snackbar>

          {/* Add Google Sign Up Button here */}
          <Link component={RouterLink} to="/signup" variant="body2" sx={{ color: '#fff' }}>
            Already have an account? Log in
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default SignUpForm;
