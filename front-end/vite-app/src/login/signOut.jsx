import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Signout = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const handleLogout = () => {
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure';
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure';
    window.location.href = '/signup';
  };
  

  const darkModeIconStyle = {
    marginRight: '8px',
    color: prefersDarkMode ? '#fff' : '#333',
  };

  return (
    <div>
      <Typography variant="h4" component="div" style={{ marginBottom: '20px' }}>
        {document.cookie.includes('username') && (
          `Hi, ${document.cookie.split('username=')[1].split(';')[0]}!`
        )}
      </Typography>
      <Typography variant="h4" component="div" style={{ marginBottom: '20px' }}>
        Logout
      </Typography>
      <Button
        variant="contained"
        color="error"
        startIcon={<ExitToAppIcon style={darkModeIconStyle} />}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
};

export default Signout;
