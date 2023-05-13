import { addContact, loadContacts } from 'components/redux/actions.js';
import css from './phonebook.module.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { getStatusContacts } from 'components/redux/selectors.js';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(getStatusContacts);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    const id = nanoid();
    e.preventDefault();
    // dispatch(addContact({  name, number }));
    // dispatch(addContact({ name, number }));
    setName('');
    setNumber('');

    async function createContact({ name, number }) {
      async function fetchContacts() {
        try {
          const response = await fetch(
            'https://645edbd59d35038e2d18dbec.mockapi.io/contacts'
          );
          const data = await response.json();
          console.log(data);
          // setContacts(data);

          if (data) {
            dispatch(loadContacts(data));
          }
        } catch (error) {
          console.error('Error fetching contacts:', error);
        }
      }
      try {
        const response = await fetch(
          'https://645edbd59d35038e2d18dbec.mockapi.io/contacts',
          {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ name, number }),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to create contact: ${response.statusText}`);
        } else {
          fetchContacts();
        }

        console.log('Contact created successfully');
      } catch (error) {
        console.error('Error creating contact:', error);
      }
    }

    createContact({ name, number });
    // localStorage.setItem(
    //   'contacts',
    //   JSON.stringify([...contacts, { id, name, number }])
    // );
  };

  return (
    <form className={css['contact-form']} onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        name="name"
        value={name}
        onChange={e => setName(e.target.value)}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label htmlFor="number">Number</label>
      <input
        id="number"
        type="tel"
        name="number"
        value={number}
        onChange={e => setNumber(e.target.value)}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button type="submit">Add contact</button>
    </form>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func,
};

export default ContactForm;
