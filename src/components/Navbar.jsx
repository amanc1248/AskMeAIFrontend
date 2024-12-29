import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext.jsx';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function Navbar() {
  const { currentUser, logout } = useAuth() ?? {};
  const theme = useTheme() ?? {};
  const { darkMode, toggleDarkMode } = theme;
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleTitleClick = () => {
    navigate(currentUser ? '/dashboard' : '/');
  };

  return (
    <AppBar 
      position="static" 
      elevation={1}
      sx={{ 
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 64 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              flexGrow: 1,
              cursor: 'pointer' 
            }}
            onClick={handleTitleClick}
          >
            <SmartToyIcon sx={{ color: 'primary.main', mr: 1 }} />
            <Typography
              variant="h6"
              sx={{
                color: 'primary.main',
                fontWeight: 500,
              }}
            >
              Your AI Agent
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {toggleDarkMode && (
              <IconButton 
                onClick={toggleDarkMode} 
                color="primary"
                sx={{ mr: 1 }}
              >
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            )}

            {!currentUser ? (
              <Button
                component={RouterLink}
                to="/"
                color="primary"
              >
                Sign In
              </Button>
            ) : (
              <>
                <Button
                  component={RouterLink}
                  to="/dashboard"
                  color="primary"
                >
                  Dashboard
                </Button>
                <Button
                  onClick={handleLogout}
                  color="primary"
                >
                  Sign Out
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar; 