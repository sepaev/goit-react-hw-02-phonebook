import { Component } from 'react';
import PropTypes from 'prop-types';
import Form from '../Form/Form';
import Contacts from '../Contacts/Contacts';
import { TitleH1, SectionStyle } from './Section.styled';
import { Notify } from 'notiflix';
Notify.init({ position: 'center-top' });

export class Section extends Component {
  onSubmit = e => {
    e.preventDefault();
    const inputName = e.target.children[0].children[1].value.trim();
    const inputNumber = e.target.children[1].children[1].value;
    if (!this.checkNumber(inputNumber)) {
      if (inputNumber) Notify.warning('Sorry. This NUMBER already exists.');
      return;
    }
    if (!this.checkName(inputName)) {
      // if (inputName) Notify.warning('Sorry. This NAME already exists.');
      Notify.warning('Sorry. This NAME already exists.');
      return;
    }
    this.props.doAddContact(inputName, inputNumber);
  };

  doClearNumber = number => {
    const noSpace = number.split(' ').join('');
    const noBracket = noSpace.split('(').join('').split(')').join('');
    const noSign = noBracket.split('-').join('').split('+').join('');
    return noSign;
  };

  checkNumber(inputNumber) {
    const clearNumber = this.doClearNumber(inputNumber);
    let result = true;
    if (inputNumber === '') result = false;
    this.props.data.contacts.forEach(({ number }) => {
      if (clearNumber === this.doClearNumber(number)) result = false;
    });

    return result;
  }

  checkName(inputName) {
    let result = true;
    const clearName = this.doClearName(inputName);
    if (clearName === '') result = false;
    this.props.data.contacts.forEach(({ name }) => {
      if (clearName === this.doClearName(name)) result = false;
    });
    return result;
  }

  doClearName(name) {
    return name.split(' ').join('').toLowerCase().trim();
  }

  checkForDoubleID(contacts) {
    const ids = [];
    const checked = [];
    contacts.forEach(contact => {
      if (ids.indexOf(contact.id) < 0) {
        ids.push(contact.id);
        checked.push(contact);
      }
    });
    return checked;
  }
  getContacts = () => {
    const { filter, contacts } = this.props.data;
    const { searchQueryText, searchQueryNumber } = this.parseSearchQuery(filter.toString());
    if (searchQueryText.length > 0 || searchQueryNumber.length > 0) {
      let filtredArray = [];
      //поиск по номеру
      if (searchQueryNumber.length > 0) {
        filtredArray = contacts.filter(({ number }) => {
          const clearNumberText = this.doClearNumber(number);
          return clearNumberText.includes(searchQueryNumber);
        });
        //комбинированый поиск
        if (searchQueryText.length > 0) {
          const namesArray = contacts.filter(({ name }) =>
            name.toLowerCase().includes(searchQueryText),
          );
          return filtredArray.length > 0 ? filtredArray.concat(namesArray) : namesArray;
        }
        return filtredArray;
      } else {
        //Поиск по имени
        filtredArray = contacts.filter(({ name }) => name.toLowerCase().includes(searchQueryText));
        return filtredArray;
      }
    }
    return contacts;
  };

  parseSearchQuery(searchQuery) {
    let searchQueryText = '';
    let searchQueryNumber = '';
    if (searchQuery) {
      if (searchQuery.match(/\d+/)) {
        searchQueryNumber = searchQuery.match(/\d+/).toString();
        const queries = searchQuery.split(searchQueryNumber);
        const query = queries[0] || queries[1];
        searchQueryText = query ? query : '';
      } else {
        searchQueryText = searchQuery;
      }
    }
    return { searchQueryText, searchQueryNumber };
  }
  render = () => {
    const { title, component, searchFunc, deleteFunc, data } = this.props;
    const contacts = this.checkForDoubleID(this.getContacts());
    return (
      <SectionStyle>
        <TitleH1>{title}</TitleH1>
        {component === 'Form' && <Form onSubmit={this.onSubmit} />}
        {component === 'Contacts' && (
          <Contacts
            contacts={contacts}
            searchFunc={searchFunc}
            deleteFunc={deleteFunc}
            message={
              data.length ? 'Sorrry, no contacts found.' : 'Sorrry, you have no contacts yet.'
            }
          />
        )}
      </SectionStyle>
    );
  };
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  component: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  doAddContact: PropTypes.func,
  searchFunc: PropTypes.func,
  deleteFunc: PropTypes.func,
};
