import { differenceInYears } from 'date-fns';

export const calculateAge = (dob: string | Date): number | string => {
  if (!dob) return '';
  try {
    const birthDate = new Date(dob);

    if (isNaN(birthDate.getTime())) return '';
    return differenceInYears(new Date(), birthDate);
  } catch (error) {
    return ''; 
  }
};