import {
  addContact,
  deleteContact,
  loadContacts,
  setStatusFilter,
} from './actions.js';

const filterInitialState = {
  status: '',
};

export const filterReducer = (state = filterInitialState, action) => {
  switch (action.type) {
    case setStatusFilter.type:
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};

const contactsInitialState = {
  status: [],
};

export const contactsReducer = (state = contactsInitialState, action) => {
  switch (action.type) {
    case addContact.type:
      return {
        ...state,
        status: [...state.status, ...action.payload],
      };
    case deleteContact.type:
      console.log('deleteing contact');
      const updatedContacts = state.status.filter(
        contact => contact.id !== action.payload
      );

      // localStorage.setItem('contacts', JSON.stringify(updatedContacts));
      return {
        ...state,
        status: updatedContacts,
      };
    case loadContacts.type:
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};
