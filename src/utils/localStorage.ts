import { FormSchema } from "../types";

const FORMS_KEY = 'dynamic_forms';

export const getFormsFromStorage = (): FormSchema[] => {
  const formsJson = localStorage.getItem(FORMS_KEY);
  if (!formsJson) {
    return [];
  }
  try {
    // We sort by creation date, newest first.
    const forms: FormSchema[] = JSON.parse(formsJson);
    return forms.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.error("Error parsing forms from localStorage", error);
    return [];
  }
};

export const saveFormToStorage = (formToSave: FormSchema) => {
  const forms = getFormsFromStorage();
  const existingIndex = forms.findIndex(f => f.id === formToSave.id);

  if (existingIndex > -1) {
    forms[existingIndex] = formToSave;
  } else {
    forms.push(formToSave);
  }
  localStorage.setItem(FORMS_KEY, JSON.stringify(forms));
};

export const getFormById = (formId: string): FormSchema | undefined => {
    const forms = getFormsFromStorage();
    return forms.find(form => form.id === formId);
}
