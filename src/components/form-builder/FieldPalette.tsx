import React from 'react';
import { useDispatch } from 'react-redux';
import { addField } from '../../features/formBuilder/formBuilderSlice';
import { FieldType } from '../../types';
import { Box, Button, Paper, Typography, Divider } from '@mui/material';
import {
  TextFields as TextIcon,
  Numbers as NumberIcon,
  Notes as TextareaIcon,
  CalendarToday as DateIcon,
  CheckBox as CheckboxIcon,
  RadioButtonChecked as RadioIcon,
  ArrowDropDownCircle as SelectIcon
} from '@mui/icons-material';

const fieldOptions: { type: FieldType; label: string; icon: React.ReactElement }[] = [
  { type: 'text', label: 'Text', icon: <TextIcon /> },
  { type: 'number', label: 'Number', icon: <NumberIcon /> },
  { type: 'textarea', label: 'Text Area', icon: <TextareaIcon /> },
  { type: 'date', label: 'Date', icon: <DateIcon /> },
  { type: 'checkbox', label: 'Checkbox', icon: <CheckboxIcon /> },
  { type: 'radio', label: 'Radio', icon: <RadioIcon /> },
  { type: 'select', label: 'Select', icon: <SelectIcon /> },
];

const FieldPalette: React.FC = () => {
  const dispatch = useDispatch();

  const handleAddField = (type: FieldType) => {
    const baseField = {
      type,
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      defaultValue: '',
      options: type === 'select' || type === 'radio' ? ['Option 1'] : undefined,
    };
    dispatch(addField(baseField));
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Add Fields
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box display="flex" flexDirection="column" gap={1.5}>
        {fieldOptions.map(option => (
          <Button
            key={option.type}
            variant="outlined"
            startIcon={option.icon}
            onClick={() => handleAddField(option.type)}
          >
            {option.label}
          </Button>
        ))}
      </Box>
    </Paper>
  );
};

export default FieldPalette;