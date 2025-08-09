import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { FormField, ValidationRule } from '../../types';
import { TextField, Checkbox, FormControlLabel, RadioGroup, Radio, Select, MenuItem, FormControl, FormLabel, FormHelperText } from '@mui/material';

interface RenderedFieldProps {
  field: FormField;
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

// Helper to convert our validation rules into a format react-hook-form understands
const generateValidationRules = (validations: ValidationRule[]) => {
  const rules: any = {};
  validations.forEach(rule => {
    if (rule.type === 'required') {
      rules.required = rule.message || 'This field is required';
    }
    if (rule.type === 'minLength') {
      rules.minLength = { value: rule.value, message: rule.message || `Minimum length is ${rule.value}` };
    }
    if (rule.type === 'maxLength') {
      rules.maxLength = { value: rule.value, message: rule.message || `Maximum length is ${rule.value}` };
    }
    if (rule.type === 'isEmail') {
      rules.pattern = { value: /^\S+@\S+\.\S+$/, message: rule.message || 'Invalid email address' };
    }
    // Add custom password rule logic here
    if (rule.type === 'isPassword') {
        rules.pattern = { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: rule.message || 'Password must be 8+ characters with a number.'}
    }
  });
  return rules;
};

const RenderedField: React.FC<RenderedFieldProps> = ({ field, register, errors }) => {
  const validationRules = generateValidationRules(field.validations);
  const error = errors[field.id];

  switch (field.type) {
    case 'text':
    case 'number':
    case 'textarea':
    case 'date':
      return (
        <TextField
          type={field.type === 'textarea' ? 'text' : field.type}
          label={field.label}
          fullWidth
          multiline={field.type === 'textarea'}
          rows={field.type === 'textarea' ? 4 : 1}
          defaultValue={field.defaultValue}
          InputLabelProps={field.type === 'date' ? { shrink: true } : {}}
          disabled={field.isDerived}
          {...register(field.id, validationRules)}
          error={!!error}
          helperText={error?.message as string}
        />
      );

    case 'checkbox':
      return (
        <FormControl error={!!error}>
            <FormControlLabel
                control={<Checkbox defaultChecked={field.defaultValue} {...register(field.id, validationRules)} />}
                label={field.label}
            />
            {error && <FormHelperText>{error.message as string}</FormHelperText>}
        </FormControl>
      );

    case 'radio':
      return (
        <FormControl component="fieldset" error={!!error}>
          <FormLabel component="legend">{field.label}</FormLabel>
          <RadioGroup defaultValue={field.defaultValue}>
            {(field.options || []).map(option => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio {...register(field.id, validationRules)} />}
                label={option}
              />
            ))}
          </RadioGroup>
          {error && <FormHelperText>{error.message as string}</FormHelperText>}
        </FormControl>
      );

    case 'select':
        return (
            <FormControl fullWidth error={!!error}>
                <FormLabel component="legend" sx={{ mb: 1 }}>{field.label}</FormLabel>
                <Select
                    defaultValue={field.defaultValue || ''}
                    {...register(field.id, validationRules)}
                >
                    {(field.options || []).map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                </Select>
                {error && <FormHelperText>{error.message as string}</FormHelperText>}
            </FormControl>
        );

    default:
      return null;
  }
};

export default RenderedField;