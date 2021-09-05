import { Fragment } from 'react';
import Notification from '../Notification/Notification';
import PropTypes from 'prop-types';
import {
  ContactsItem,
  ContactsList,
  DeleteButton,
  NumberSpan,
  SearchInput,
} from './Contacts.styled';

const Contacts = ({ contacts, searchFunc, deleteFunc, message }) => {
  return (
    <Fragment>
      <ContactsList>
        <SearchInput
          type='text'
          name='search'
          title='Введите имя или телефон'
          placeholder='Search contact'
          onInput={searchFunc}
        />
        {contacts.map(({ id, name, number }) => (
          <ContactsItem key={id}>
            {'• ' + name + ': '}
            <NumberSpan>
              {number}
              <DeleteButton id={id} onClick={() => deleteFunc(id)}>
                X
              </DeleteButton>
            </NumberSpan>
          </ContactsItem>
        ))}
      </ContactsList>
      {!contacts.length && <Notification message={message}></Notification>}
    </Fragment>
  );
};
export default Contacts;

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ).isRequired,
  searchFunc: PropTypes.func.isRequired,
  deleteFunc: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};
