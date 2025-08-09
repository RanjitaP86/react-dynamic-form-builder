import React, { useState } from 'react';
import {
  Drawer,
  Box,
  TextField,
  Typography,
  IconButton,
  Divider,
  FormControlLabel,
  Checkbox,
  Button,
  MenuItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { updateField } from '../../features/formBuilder/formBuilderSlice';
import { FormField, ValidationRule } from '../../types';

interface ConfigurationPanelProps {
  field: FormField;
  allFields: FormField[];
  open: boolean;
  onClose: () => void;
}

const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({
  field,
  allFields,
  open,
  onClose,
}) => {
  const dispatch = useDispatch();
  const [localField, setLocalField] = useState<FormField>(field);

  const handleChange = (key: keyof FormField, value: any) => {
    setLocalField((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleValidationChange = (
  validationType: ValidationRule['type'],
  checked: boolean
) => {
  setLocalField((prev) => {
    const updatedValidations: ValidationRule[] = checked
      ? [
          ...prev.validations,
          { type: validationType, message: `${validationType} validation failed` }
        ]
      : prev.validations.filter((v) => v.type !== validationType);

    return { ...prev, validations: updatedValidations };
  });
};


  const handleSave = () => {
    dispatch(updateField(localField));
    onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 350, p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">Edit Field</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Label */}
        <TextField
          label="Label"
          fullWidth
          value={localField.label}
          onChange={(e) => handleChange('label', e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Placeholder */}
        <TextField
          label="Placeholder"
          fullWidth
          value={localField.placeholder || ''}
          onChange={(e) => handleChange('placeholder', e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Type */}
        <TextField
          label="Field Type"
          fullWidth
          select
          value={localField.type}
          onChange={(e) => handleChange('type', e.target.value)}
          sx={{ mb: 2 }}
        >
          <MenuItem value="text">Text</MenuItem>
          <MenuItem value="number">Number</MenuItem>
          <MenuItem value="email">Email</MenuItem>
          <MenuItem value="select">Select</MenuItem>
          <MenuItem value="checkbox">Checkbox</MenuItem>
        </TextField>

        {/* Validations */}
        <Typography variant="subtitle2" sx={{ mt: 1, mb: 1 }}>
          Validations
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={localField.validations.some((v) => v.type === 'required')}
              onChange={(e) => handleValidationChange('required', e.target.checked)}
            />
          }
          label="Required"
        />

        {/* Example of using allFields for conditional logic */}
        {allFields.length > 1 && (
          <>
            <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
              Show this field if...
            </Typography>
            <TextField
              label="Depends on Field"
              fullWidth
              select
              value={localField.dependsOn || ''}
              onChange={(e) => handleChange('dependsOn', e.target.value)}
              sx={{ mb: 2 }}
            >
              <MenuItem value="">(None)</MenuItem>
              {allFields
                .filter((f) => f.id !== localField.id)
                .map((f) => (
                  <MenuItem key={f.id} value={f.id}>
                    {f.label}
                  </MenuItem>
                ))}
            </TextField>
          </>
        )}

        <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ConfigurationPanel;
