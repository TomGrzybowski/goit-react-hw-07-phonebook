import { deleteContact } from 'components/redux/actions.js';
import {
  getStatusContacts,
  getStatusFilter,
} from 'components/redux/selectors.js';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

const ContactList = () => {
  const contacts = useSelector(getStatusContacts);
  const filter = useSelector(getStatusFilter);
  const shownContacts = contacts.filter(person => person.name.includes(filter));

  const dispatch = useDispatch();

  const handleDelete = id => {
    fetch(`https://645edbd59d35038e2d18dbec.mockapi.io/contacts/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (res.ok) {
          dispatch(deleteContact(id));
          return res.json();
        }
      })
      .then(contact => {
        console.log(`${contact} has been deleted`);
      })
      .catch(error => {
        console.log(`contact has NOT been deleted`);
      });
  };
  return (
    <ul>
      {shownContacts.map(contact => {
        return (
          <li key={contact.id}>
            {contact.name} {contact.number}{' '}
            <button
              type="button"
              id={contact.id}
              onClick={() => handleDelete(contact.id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array,
  deleteContact: PropTypes.func,
  filter: PropTypes.string,
};

export default ContactList;
