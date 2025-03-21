import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../data/database';

const Header = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    const checkAdmin = async () => {
      const adminStatus = await authAPI.isAdmin();
      setIsAdmin(adminStatus);
    };
    checkAdmin();
  }, []);

  const handleProfileClick = () => {
    navigate(isAdmin ? '/admin-page' : '/profile');
  };

  const handleLogoClick = () => {
    navigate(isAdmin ? '/admin-page' : '/dashboard');
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: 'black',
        zIndex: 1000
      }}
    >
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div"
          sx={{ 
            flexGrow: 1,
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.8
            }
          }}
          onClick={handleLogoClick}
        >
          GraphSolver
        </Typography>
        <IconButton 
          color="inherit"
          onClick={handleProfileClick}
          size="large"
          edge="end"
        >
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
          >
            <g fill="rgb(255,255,255)">
              <path d="m16 14a6.5 6.5 0 1 0 -6.5-6.5 6.508 6.508 0 0 0 6.5 6.5zm0-11a4.5 4.5 0 1 1 -4.5 4.5 4.505 4.505 0 0 1 4.5-4.5z"/>
              <path d="m15.991 15a13.005 13.005 0 0 0 -12.991 12.99v2.01a1 1 0 0 0 2 0v-2.01a10.991 10.991 0 0 1 21.981 0v1.01h-18.981a1 1 0 0 0 0 2h19.981a1 1 0 0 0 1-1v-2.01a13 13 0 0 0 -12.99-12.99z"/>
            </g>
          </svg>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 