import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getFormById } from '../utils/localStorage';
import { FormSchema} from '../types';
import { Container, Typography, Button, Paper, Grid } from '@mui/material';
import RenderedField from '../components/form-runner/RenderedField';
import { calculateAge } from '../utils/calculators';

type FormValues = {
  [key: string]: any;
};

const PreviewPage: React.FC = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const [formSchema, setFormSchema] = useState<FormSchema | null>(null);

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<FormValues>();

  useEffect(() => {
    if (formId) {
      const foundForm = getFormById(formId);
      if (foundForm) {
        setFormSchema(foundForm);
      } else {
        navigate('/myforms'); 
      }
    }
  }, [formId, navigate]);

  useEffect(() => {
    if (!formSchema) return;

    const derivedFields = formSchema.fields.filter(f => f.isDerived && f.derivedFrom);

    derivedFields.forEach(derivedField => {
      const parentValues = derivedField.derivedFrom!.map(parentId => watch(parentId));
    
      if (derivedField.derivationLogic === 'ageFromDOB' && parentValues[0]) {
        const age = calculateAge(parentValues[0]);
        setValue(derivedField.id, age, { shouldValidate: false });
      }
      
      
    });

  }, [formSchema, watch, setValue]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('Form Submitted Data:', data);
    alert('Form submitted successfully! Check the console for the data.');
  };

  if (!formSchema) {
    return <Container><Typography>Loading form...</Typography></Container>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {formSchema.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          This is a preview of your form.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={3}>
            {formSchema.fields.map((field) => (
              <Grid size={12} key={field.id}>
                <RenderedField
                  field={field}
                  register={register}
                  errors={errors}
                />
              </Grid>
            ))}
            <Grid size={12}>
              <Button type="submit" variant="contained" color="primary" size="large">
                Submit Form
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default PreviewPage;
