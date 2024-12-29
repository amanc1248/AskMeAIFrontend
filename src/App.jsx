import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ShareablePage from './pages/ShareablePage';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './contexts/AuthContext';
import getTheme from './theme';

// Create a wrapper component for the home route
function HomeRoute() {
  const { currentUser } = useAuth() ?? {};
  return currentUser ? <Navigate to="/dashboard" /> : <Home />;
}

// Create a wrapper component for MUI theme
function ThemedApp({ children }) {
  const { darkMode } = useTheme() ?? {};
  const theme = getTheme(darkMode ? 'dark' : 'light');

  return (
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ThemedApp>
          <Router>
            <Toaster position="top-right" />
            <Navbar />
            <Routes>
              <Route path="/" element={<HomeRoute />} />
              <Route 
                path="/dashboard" 
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } 
              />
              <Route path="/share/:shareableLink" element={<ShareablePage />} />
            </Routes>
          </Router>
        </ThemedApp>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App; 