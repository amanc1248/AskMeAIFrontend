import { useNavigate } from 'react-router-dom';
import { Container, Paper, Button, Typography, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      if (!auth?.googleSignIn) {
        throw new Error('Google Sign In not available');
      }
      await auth.googleSignIn();
      toast.success('Successfully signed in!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error('Failed to sign in with Google');
    }
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: 'center',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              color: 'text.primary',
              mb: 1,
            }}
          >
            Welcome to AI Agent
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 4,
              color: 'text.secondary',
            }}
          >
            Create your personal AI assistant and start chatting
          </Typography>
          
          <Button
            variant="outlined"
            fullWidth
            size="large"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleSignIn}
            sx={{ 
              height: 44,
              borderColor: 'divider',
              '&:hover': {
                backgroundColor: 'action.hover',
                borderColor: 'primary.main',
              }
            }}
          >
            Sign in with Google
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}

export default Home; 