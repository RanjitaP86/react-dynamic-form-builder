import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { AddCircleOutline as CreateIcon, ListAlt as FormsIcon } from '@mui/icons-material';

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo/Title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Dynamic Form Builder
          </NavLink>
        </Typography>

        {/* Navigation Links */}
        <Box>
          <Button
            component={NavLink}
            to="/create"
            color="inherit"
            startIcon={<CreateIcon />}
            sx={{
              mr: 1,
              borderRadius: '4px',
              '&.active': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              '&.active:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            Create Form
          </Button>
          <Button
            component={NavLink}
            to="/myforms"
            color="inherit"
            startIcon={<FormsIcon />}
            sx={{
              borderRadius: '4px',
              '&.active': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              '&.active:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            My Forms
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
