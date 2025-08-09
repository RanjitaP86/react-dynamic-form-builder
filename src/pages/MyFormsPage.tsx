import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { getFormsFromStorage } from '../utils/localStorage';
import { FormSchema } from '../types';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Button
} from '@mui/material';
import { format } from 'date-fns'; 

const MyFormsPage: React.FC = () => {
  const [forms, setForms] = useState<FormSchema[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedForms = getFormsFromStorage();
    setForms(savedForms);
  }, []); 

  if (forms.length === 0) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          No Forms Found
        </Typography>
        <Typography color="textSecondary" sx={{ mb: 3 }}>
          You haven't created any forms yet. Let's get started!
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/create')}
        >
          Create Your First Form
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Saved Forms
      </Typography>
      <Grid container spacing={3}>
        {forms.map((form) => (
          <Grid key={form.id} size={{ xs: 12, sm: 6, md: 4 }}>
            {/* We wrap the Card in RouterLink to make it navigable */}
            <CardActionArea component={RouterLink} to={`/preview/${form.id}`}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {form.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Created on: {format(new Date(form.createdAt), 'MMMM d, yyyy h:mm a')}
                  </Typography>
                </CardContent>
              </Card>
            </CardActionArea>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MyFormsPage;