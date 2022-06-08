import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = {
  items: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: {
      reducer(state, { payload }) {
        const newContacts = [...state.items, payload];
        return { ...state, items: newContacts };
      },
      prepare(data) {
        const newContact = { ...data, id: nanoid() };
        return {
          payload: newContact,
        };
      },
    },
    deleteContact: {
      reducer(state, { payload }) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== payload),
        };
      },
    },
    setFilter: {
      reducer(state, { payload }) {
        return {
          ...state,
          filter: payload,
        };
      },
    },
  },
});

export const { actions } = contactsSlice;
export default contactsSlice.reducer;
