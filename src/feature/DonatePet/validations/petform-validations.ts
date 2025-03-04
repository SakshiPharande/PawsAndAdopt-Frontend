import * as Yup from 'yup';

export const petFormValidationSchema = Yup.object().shape({
  category_id: Yup.number()
    .required('Category is required*')
    .positive('Please select a valid category*'),
  
  breed_id: Yup.number()
    .required('Breed is required*')
    .positive('Please select a valid breed*'),
  
  age: Yup.number()
    .required('Age is required*')
    .positive('Age must be a positive number*'),
  
  gender: Yup.number()
    .required('Gender is required*')
    .oneOf([1, 2], 'Invalid gender selection*'),
  
  temperament: Yup.string()
    .max(100, 'Temperament description too long*'),
  
  status: Yup.number()
    .required('Status is required*')
    .oneOf([0, 1], 'Invalid status selection*'),
  
  vaccination_status: Yup.boolean(),
  
  medical_history: Yup.string()
    .max(500, 'Medical history too long*'),
  
  recommended_food: Yup.string()
    .max(200, 'Recommended food description too long*'),
  
  common_health_issues: Yup.string()
    .max(300, 'Health issues description too long*')
});