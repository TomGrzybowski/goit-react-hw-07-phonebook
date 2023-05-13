import { useDispatch } from 'react-redux';
import css from './phonebook.module.css';
import PropTypes from 'prop-types';
import { setStatusFilter } from 'components/redux/actions.js';

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = () => {
    const filter = document.querySelector('#filter-input').value;

    dispatch(setStatusFilter(filter));
  };
  return (
    <div className={css.filter}>
      <label htmlFor="filter-input">Find contacts by name</label>
      <input
        id="filter-input"
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Filter"
        onChange={handleChange}
      />
    </div>
  );
};

Filter.propTypes = {
  handleFilterUpdate: PropTypes.func,
};

export default Filter;
