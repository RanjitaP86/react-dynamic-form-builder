import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { reorderFields } from '../../features/formBuilder/formBuilderSlice';
import { Box, Paper, Typography } from '@mui/material';
import EditableField from './EditableField';

// Import from dnd-kit
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Sortable wrapper for each field
const SortableItem = ({
  field,
  allFields
}: {
  field: any;
  allFields: any[];
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <EditableField
        field={field}
        allFields={allFields} // ✅ Pass full fields array like in your old version
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
};

const FormCanvas: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const fields = useSelector(
    (state: RootState) => state.formBuilder.currentForm.fields
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over.id);

      dispatch(reorderFields({ startIndex: oldIndex, endIndex: newIndex }));
    }
  };

  if (fields.length === 0) {
    return (
      <Paper
        variant="outlined"
        sx={{ p: 4, textAlign: 'center', borderStyle: 'dashed' }}
      >
        <Typography color="textSecondary">
          Drop fields here from the palette on the left.
        </Typography>
      </Paper>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={fields.map((f) => f.id)}
        strategy={verticalListSortingStrategy}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {fields.map((field) => (
            <SortableItem key={field.id} field={field} allFields={fields} />
          ))}
        </Box>
      </SortableContext>
    </DndContext>
  );
};

export default FormCanvas;
