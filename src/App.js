import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./screens/Login";
import Main from "./screens/Main.jsx";
import Navbar from "./global/navbar.jsx"; // Importing Navbar component
import { Box, Toolbar } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles'; // Importing ThemeProvider
import ProfilePage from "./screens/profiles.jsx"; // Importing ProfilePage component
import Projects from "./screens/Projects.jsx"; // Importing ProfilePage component
import EpicsPage from "./screens/epics.jsx";


// Create a theme instance
const theme = createTheme();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false); // State to manage navbar open/close

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen); // Toggle the state of the navbar
  };

  return (
    <ThemeProvider theme={theme}> {/* Wrapping the app with ThemeProvider */}
      <Router>
        {isLoggedIn ? (
          <Box sx={{ display: "flex" }}>
            <Navbar isOpen={isNavOpen} toggleNav={toggleNav} /> {/* Pass isOpen and toggleNav props */}
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 2,
              }}
            >
              <Toolbar />
              <Routes>
                <Route path="/" element={<Navigate to="/main" replace />} />
                <Route path="/main" element={<Main onLogout={handleLogout} />} />
                <Route path="/profiles" element={<ProfilePage />} /> 
                <Route path="/projects" element={<Projects />} /> 
                <Route path="/epics" element={<EpicsPage />} /> 
              </Routes>
            </Box>
          </Box>
        ) : (
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;
