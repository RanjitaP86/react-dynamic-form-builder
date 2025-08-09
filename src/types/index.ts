export type FieldType = 'text' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date';

export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'isEmail' | 'isPassword';
  value?: any; 
  message: string;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  defaultValue?: any;
  options?: string[]; 
  validations: ValidationRule[];
  isDerived?: boolean;
  derivedFrom?: string[]; 
  derivationLogic?: string; 
  placeholder?: string; 
  dependsOn?: string;   
}

export interface FormSchema {
  id: string;
  name: string;
  createdAt: string; 
  fields: FormField[];
}