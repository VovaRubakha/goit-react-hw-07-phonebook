import { configureStore, combineReducers } from '@reduxjs/toolkit';

import contactsReducer from './contacts/contact-slice';

const rootReducer = combineReducers({
  contacts: contactsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
