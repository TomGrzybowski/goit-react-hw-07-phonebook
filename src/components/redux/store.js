import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer, filterReducer } from './reducer.js';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
  },
});
