import { createSlice } from '@reduxjs/toolkit';

import * as operations from '../contacts/contact-operations';

const initialState = {
  items: [
    // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: {
    // ----Fetch contacts
    [operations.getContacts.pending]: (state, _) => ({
      ...state,
      loading: true,
      error: null,
    }),
    [operations.getContacts.fulfilled]: (state, { payload }) => ({
      ...state,
      loading: false,
      items: payload,
    }),
    [operations.getContacts.rejected]: (state, { payload }) => ({
      ...state,
      loading: false,
      items: payload,
    }),
    // -----
    // ----Add contacts
    [operations.addContact.pending]: state => ({
      ...state,
      loading: true,
      error: null,
    }),
    [operations.addContact.fulfilled]: (state, { payload }) => ({
      ...state,
      loading: false,
      items: [...state.items, payload],
    }),
    [operations.addContact.rejected]: (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload,
    }),
    // -----
    // ----Delete contacts
    [operations.deleteContact.pending]: state => ({
      ...state,
      loading: true,
      error: null,
    }),
    [operations.deleteContact.fulfilled]: (state, { payload }) => ({
      ...state,
      loading: false,
      items: state.items.filter(item => item.id !== payload),
    }),
    [operations.deleteContact.rejected]: (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload,
    }),
    // -----
  },
});

export default contactsSlice.reducer;
