import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormField, FormSchema } from '../../types';
import { v4 as uuidv4 } from 'uuid';

interface FormBuilderState {
  currentForm: FormSchema;
}

const initialState: FormBuilderState = {
  currentForm: {
    id: uuidv4(),
    name: 'Untitled Form',
    createdAt: new Date().toISOString(),
    fields: [],
  },
};

const formBuilderSlice = createSlice({
  name: 'formBuilder',
  initialState,
  reducers: {
    setFormName: (state, action: PayloadAction<string>) => {
      state.currentForm.name = action.payload;
    },
    addField: (state, action: PayloadAction<Omit<FormField, 'id' | 'validations'>>) => {
      const newField: FormField = {
        id: uuidv4(),
        ...action.payload,
        validations: [], // Start with no validations
      };
      state.currentForm.fields.push(newField);
    },
    updateField: (state, action: PayloadAction<FormField>) => {
      const index = state.currentForm.fields.findIndex(f => f.id === action.payload.id);
      if (index !== -1) {
        state.currentForm.fields[index] = action.payload;
      }
    },
    removeField: (state, action: PayloadAction<string>) => {
      state.currentForm.fields = state.currentForm.fields.filter(f => f.id !== action.payload);
    },
    reorderFields: (state, action: PayloadAction<{ startIndex: number; endIndex: number }>) => {
        const [removed] = state.currentForm.fields.splice(action.payload.startIndex, 1);
        state.currentForm.fields.splice(action.payload.endIndex, 0, removed);
    },
    resetBuilder: (state) => {
      state.currentForm = {
        ...initialState.currentForm, 
        fields: [], 
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      };
    },
    loadFormForEditing: (state, action: PayloadAction<FormSchema>) => {
        state.currentForm = action.payload;
    }
  },
});

export const {
  setFormName,
  addField,
  updateField,
  removeField,
  reorderFields,
  resetBuilder,
  loadFormForEditing,
} = formBuilderSlice.actions;

export default formBuilderSlice.reducer;