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

  // useEffect(() => {
  //   const localStorageContacts = localStorage.getItem('contacts');

  // if (localStorageContacts) {
  //   dispatch(loadContacts(JSON.parse(localStorageContacts)));
  // } else {
  //   localStorage.setItem('contacts', JSON.stringify([]));
  // }
  // }, [dispatch]);

  useEffect(() => {
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
    fetchContacts();
  });

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
