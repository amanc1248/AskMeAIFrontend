import { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Container, Paper, TextField, Button, Typography, Box, Card, CardContent, Divider, CircularProgress } from '@mui/material';
import toast from 'react-hot-toast';
import axios from '../utils/axios';

function ShareablePage() {
  const { shareableLink } = useParams();
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState(null);
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const result = await axios.get(`/api/users/link/${shareableLink}`);
        setUserName(result.data.name);
      } catch (error) {
        toast.error('Error fetching user information');
      }
    };

    fetchUserName();
  }, [shareableLink]);

  const handleAskQuestion = async () => {
    try {
      const trimmedQuestion = question.trim();
      if (!trimmedQuestion) {
        toast.error('Please enter a question');
        return;
      }

      setIsLoading(true);
      const result = await axios.post(`/api/personal-data/ask/${shareableLink}`, {
        question: trimmedQuestion
      });
      setResponse(result.data);
      setQuestion('');
    } catch (error) {
      toast.error('Error getting answer');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAskQuestion();
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Ask Questions
            {userName && ` about ${userName}`}
          </Typography>
          <TextField
            fullWidth
            label="Your question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={handleKeyPress}
            margin="normal"
            error={question.trim() === '' && question !== ''}
            helperText={question.trim() === '' && question !== '' ? 'Question cannot be empty' : ''}
            disabled={isLoading}
          />
          <Button
            variant="contained"
            onClick={handleAskQuestion}
            sx={{ mt: 1 }}
            disabled={!question.trim() || isLoading}
          >
            {isLoading ? 'Thinking...' : 'Ask Question'}
          </Button>

          {isLoading && (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              mt: 3,
              p: 2,
              bgcolor: 'background.default',
              borderRadius: 1,
            }}>
              <CircularProgress size={20} />
              <Typography color="text.secondary">
                AI is thinking about your question...
              </Typography>
            </Box>
          )}

          {response && !isLoading && (
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Question: {response.question}
                </Typography>
                <Typography variant="body1">
                  {response.answer}
                </Typography>
              </CardContent>
            </Card>
          )}

          <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" gutterBottom align="center">
              Want to Create Your Own AI Agent?
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 2 }}>
              Sign in to create your personal AI agent and get your own shareable link.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                component={RouterLink}
                to="/"
                variant="contained"
                color="primary"
                sx={{ 
                  minWidth: 200,
                  height: 48,
                }}
              >
                Get Started
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default ShareablePage; 