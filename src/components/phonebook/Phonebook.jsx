import { useEffect } from 'react';
import ContactForm from './ContactForm.jsx';
import ContactList from './ContactList.jsx';
import Filter from './Filter.jsx';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { loadContacts } from 'components/redux/actions.js';

const Phonebook = () => {
  // const [contacts, setContacts] = useState([]);
  // const [filter, setFilter] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    const localStorageContacts = localStorage.getItem('contacts');
    if (localStorageContacts) {
      dispatch(loadContacts(JSON.parse(localStorageContacts)));
    } else {
      localStorage.setItem('contacts', JSON.stringify([]));
    }
  }, [dispatch]);

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </>
  );
};

Phonebook.propTypes = {
  contacts: PropTypes.array,
  filter: PropTypes.string,
};

export default Phonebook;
