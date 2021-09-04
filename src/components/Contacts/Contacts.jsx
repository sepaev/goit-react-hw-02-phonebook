import { Component, Fragment } from 'react';
import { Notification } from '../Notification/Notification';
import PropTypes from 'prop-types';
import {
  ContactsItem,
  ContactsList,
  DeleteButton,
  NumberSpan,
  SearchInput,
} from './Contacts.styled';

export class Contacts extends Component {
  renderName = ({ id, name, number }, deleteFunc) => {
    return (
      <ContactsItem key={id}>
        • {name}:{' '}
        <NumberSpan>
          {number}
          <DeleteButton id={id} onClick={() => deleteFunc(id)}>
            X
          </DeleteButton>
        </NumberSpan>
      </ContactsItem>
    );
  };
  renderAllContacts(contacts, deleteFunc) {
    const result = [];
    for (let contact of contacts) {
      result.push(this.renderName(contact, deleteFunc));
    }
    return result;
  }

  render() {
    const { contacts, searchFunc, deleteFunc, title, countContacts } = this.props;
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
          {this.renderAllContacts(contacts, deleteFunc)}
        </ContactsList>
        {countContacts ? (
          <Fragment /> //пустой фрагмент
        ) : (
          <Notification title={title}></Notification>
        )}
      </Fragment>
    );
  }
}

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
  title: PropTypes.string.isRequired,
  countContacts: PropTypes.number.isRequired,
};
