import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeField } from '../../features/formBuilder/formBuilderSlice';
import { FormField } from '../../types';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  DragIndicator as DragHandleIcon,
} from '@mui/icons-material';
import ConfigurationPanel from './ConfigurationPanel';

interface EditableFieldProps {
  field: FormField;
  allFields: FormField[]; // ✅ Added to match your old logic
  dragHandleProps: any | null | undefined;
}

const EditableField: React.FC<EditableFieldProps> = ({
  field,
  allFields,
  dragHandleProps,
}) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete the field "${field.label}"?`
      )
    ) {
      dispatch(removeField(field.id));
    }
  };

  return (
    <>
      <Paper
        elevation={2}
        sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <Box {...dragHandleProps} sx={{ cursor: 'grab' }}>
          <DragHandleIcon />
        </Box>
        <Box flexGrow={1}>
          <Typography variant="subtitle1">{field.label}</Typography>
          <Typography variant="caption" color="textSecondary">
            Type: {field.type}{' '}
            {field.validations.some((v) => v.type === 'required') &&
              '(Required)'}
          </Typography>
        </Box>
        <IconButton size="small" onClick={() => setIsEditing(true)}>
          <EditIcon />
        </IconButton>
        <IconButton size="small" onClick={handleDelete} color="error">
          <DeleteIcon />
        </IconButton>
      </Paper>
      <ConfigurationPanel
        field={field}
        allFields={allFields} // ✅ Pass full list to panel
        open={isEditing}
        onClose={() => setIsEditing(false)}
      />
    </>
  );
};

export default EditableField;
