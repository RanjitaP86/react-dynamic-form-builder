import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';


import CreatePage from './pages/CreatePage';
import MyFormsPage from './pages/MyFormsPage';
import PreviewPage from './pages/PreviewPage';


import Header from './components/Header';


const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', 
    },
    secondary: {
      main: '#dc004e', 
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <Router>
        <Header />
        <main>
          <Routes>
            
            <Route path="/create" element={<CreatePage />} />
            <Route path="/myforms" element={<MyFormsPage />} />
            <Route path="/preview/:formId" element={<PreviewPage />} />

            
            <Route path="/" element={<Navigate replace to="/myforms" />} />
            
            <Route path="*" element={
              <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h2>404 - Page Not Found</h2>
              </div>
            } />
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  );
}

export default App;