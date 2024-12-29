import { useState, useEffect } from 'react';
import { Container, Paper, TextField, Button, Typography, Box, Card, CardContent, CircularProgress } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import toast from 'react-hot-toast';
import axios from '../utils/axios';

function Dashboard() {
  const [personalData, setPersonalData] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [shareableLink, setShareableLink] = useState('');
  const userId = localStorage.getItem('userId');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        const baseUrl = window.location.origin;
        setShareableLink(`${baseUrl}/share/${response.data.shareableLink}`);
      } catch (error) {
        toast.error('Error fetching user data');
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleAddData = async () => {
    try {
      // Validate personal data
      const trimmedData = personalData.trim();
      if (!trimmedData) {
        toast.error('Please enter some personal data');
        return;
      }

      await axios.post('/api/personal-data', {
        userId,
        content: trimmedData
      });
      toast.success('Personal data added successfully!');
      setPersonalData('');
    } catch (error) {
      toast.error('Error adding personal data');
    }
  };

  const handleAskQuestion = async () => {
    try {
      // Validate question
      const trimmedQuestion = question.trim();
      if (!trimmedQuestion) {
        toast.error('Please enter a question');
        return;
      }

      setIsLoading(true);
      const response = await axios.post(`/api/personal-data/ask/${shareableLink.split('/').pop()}`, {
        question: trimmedQuestion
      });
      setAnswer(response.data.answer);
    } catch (error) {
      toast.error('Error getting answer');
    } finally {
      setIsLoading(false);
    }
  };

  const copyShareableLink = () => {
    if (!shareableLink) {
      toast.error('Shareable link not available');
      return;
    }
    navigator.clipboard.writeText(shareableLink);
    toast.success('Link copied to clipboard!');
  };

  // Handle enter key press for both inputs
  const handleKeyPress = (event, action) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      action();
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your AI Agent Dashboard
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Add Personal Data
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Enter your personal data"
            value={personalData}
            onChange={(e) => setPersonalData(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, handleAddData)}
            margin="normal"
            error={personalData.trim() === '' && personalData !== ''}
            helperText={personalData.trim() === '' && personalData !== '' ? 'Personal data cannot be empty' : ''}
          />
          <Button
            variant="contained"
            onClick={handleAddData}
            sx={{ mt: 1 }}
            disabled={!personalData.trim()}
          >
            Add Data
          </Button>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Test Your AI Agent
          </Typography>
          <TextField
            fullWidth
            label="Ask a question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, handleAskQuestion)}
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

          {answer && !isLoading && (
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="body1">{answer}</Typography>
              </CardContent>
            </Card>
          )}
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Share this link with your friends. This will help them get to know you better.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              fullWidth
              value={shareableLink}
              InputProps={{ 
                readOnly: true,
                placeholder: 'Loading shareable link...'
              }}
            />
            <Button
              variant="contained"
              onClick={copyShareableLink}
              startIcon={<ContentCopyIcon />}
              disabled={!shareableLink}
            >
              Copy
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Dashboard; 