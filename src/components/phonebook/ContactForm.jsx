import { addContact } from 'components/redux/actions.js';
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
    dispatch(addContact({ id, name, number }));
    setName('');
    setNumber('');
    localStorage.setItem(
      'contacts',
      JSON.stringify([...contacts, { id, name, number }])
    );
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
