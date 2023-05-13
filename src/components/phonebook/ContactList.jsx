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
    dispatch(deleteContact(id));
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
