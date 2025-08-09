import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../app/store';
import { setFormName, resetBuilder } from '../features/formBuilder/formBuilderSlice';
import { saveFormToStorage } from '../utils/localStorage';

import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import FieldPalette from '../components/form-builder/FieldPalette';
import FormCanvas from '../components/form-builder/FormCanvas';

const CreatePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const currentForm = useSelector((state: RootState) => state.formBuilder.currentForm);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [formNameInput, setFormNameInput] = useState('');

  const handleOpenDialog = () => {
    setFormNameInput(currentForm.name === 'Untitled Form' ? '' : currentForm.name);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSaveForm = () => {
    if (!formNameInput.trim()) {
      alert('Form name is required.');
      return;
    }
    dispatch(setFormName(formNameInput));
    
    const finalFormState = {
        ...currentForm,
        name: formNameInput,
        createdAt: new Date().toISOString(),
    };

    saveFormToStorage(finalFormState);
    alert('Form saved successfully!');
    handleCloseDialog();
    dispatch(resetBuilder());
    navigate('/myforms');
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <FieldPalette />
        </Grid>

        <Grid size={{ xs: 12, md: 9 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <h2>{currentForm.name}</h2>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleOpenDialog} 
              disabled={currentForm.fields.length === 0}
            >
              Save Form
            </Button>
          </Box>
          <FormCanvas />
        </Grid>
      </Grid>

      {/* Save Form Dialog (no changes needed here) */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Save Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your form. This will be used to identify it later.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Form Name"
            type="text"
            fullWidth
            variant="standard"
            value={formNameInput}
            onChange={(e) => setFormNameInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveForm}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CreatePage;