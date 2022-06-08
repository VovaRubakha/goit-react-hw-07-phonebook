import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://62a047d0a9866630f80aab9d.mockapi.io/api/v1/contacts',
});

export const getContacts = async () => {
  const { data } = await instance.get('/');

  return data;
};

export const addContact = async contact => {
  const { data } = await instance.post('/', contact);

  return data;
};

export const deleteContact = async id => {
  const { data } = await instance.delete(`/${id}`);

  return data;
};
