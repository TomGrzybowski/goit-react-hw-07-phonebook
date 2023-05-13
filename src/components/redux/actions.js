// export const addContact = contact => {
// }

const { createAction } = require('@reduxjs/toolkit');

export const addContact = createAction(
  'contacts/addContact',
  ({ id, name, number }) => {
    return {
      payload: [
        {
          id,
          name,
          number,
        },
      ],
    };
  }
);

export const loadContacts = createAction('contacts/loadContacts');

export const deleteContact = createAction('contacts/deleteContact');

export const setStatusFilter = createAction('filter/setStatusFilter');
