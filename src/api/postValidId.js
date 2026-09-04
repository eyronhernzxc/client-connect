import {apiImage} from './api-image';

export const postValidId = async (formData) => {
  const response = await apiImage.post('/valid-ids', formData);
  return response.data;
  
};