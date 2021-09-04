import { Component, Fragment } from 'react';
import { Form } from './components/Form/Form';
import { Contacts } from './components/Contacts/Contacts';
import { Section } from './components/Section/Section';
import { v4 as uuidv4 } from 'uuid';
import { Notify } from 'notiflix';
Notify.init({ position: 'center-top' });

export class App extends Component {
  state = {
    contacts: [
      { id: uuidv4(), name: 'Rosie Simpson', number: '+38 (050) 459-12-56' },
      { id: uuidv4(), name: 'Hermione Kline', number: '+38 (095) 443-89-12' },
      { id: uuidv4(), name: 'Eden Clements', number: '+38 (073) 645-17-79' },
      { id: uuidv4(), name: 'Annie Copeland', number: '+38 (068) 227-91-26' },
      { id: uuidv4(), name: 'Bellie Cuper', number: '+38 (063) 207-00-99' },
      { id: uuidv4(), name: 'Joan Stratfild', number: '+38 (099) 428-21-66' },
    ],
    filter: '',
    name: '',
    number: '',
  };
  doAddContact = (name, number) => {
    Notify.success('Well Done!');
    this.setState(({ contacts }) => {
      const newArr = [...contacts, { id: uuidv4(), name, number }];
      return { contacts: newArr, name, number };
    });
  };

  doDeleteContact = id => {
    const { contacts, name, number } = this.state;
    const newArr = [];
    let reportName;
    if (!id) return;

    contacts.forEach(contact => {
      if (contact.id !== id) {
        newArr.push(contact);
      } else {
        reportName = contact.name;
      }
    });

    if (newArr.length === contacts.length) {
      Notify.failure('Oh, no!');
      return;
    }

    this.setState(() => {
      return { contacts: newArr, name, number };
    });

    Notify.success(`Contact ${reportName} was errased successfully`);
  };

  checkNumber(inputNumber) {
    const clearNumber = this.doClearNumber(inputNumber);
    if (clearNumber === this.doClearNumber(this.state.number) || inputNumber === '') return false;
    this.state.contacts.forEach(({ number }) => {
      if (clearNumber === this.doClearNumber(number)) return false;
    });

    return true;
  }
  checkName(inputName) {
    const clearName = this.doClearName(inputName);
    if (clearName === this.doClearName(this.state.name) || clearName === '') return false;
    this.state.contacts.forEach(({ name }) => {
      if (clearName === this.doClearName(name)) return false;
    });
    return true;
  }
  onSubmit = e => {
    e.preventDefault();
    const inputName = e.target.children[0].children[1].value.trim();
    const inputNumber = e.target.children[1].children[1].value;
    if (!this.checkNumber(inputNumber)) {
      if (inputNumber) Notify.warning('Sorry. This NUMBER already exists.');
      return;
    }
    if (!this.checkName(inputName)) {
      if (inputName) Notify.warning('Sorry. This NAME already exists.');
      return;
    }
    this.doAddContact(inputName, inputNumber);
  };

  countContacts = (target = this.state.contacts) => {
    return target.length;
  };

  makeSearch = e => {
    const searchQuery = e.target.value.toLocaleLowerCase();

    this.setState({ filter: searchQuery });
  };

  doClearNumber = number => {
    const noSpace = number.split(' ').join('');
    const noBracket = noSpace.split('(').join('').split(')').join('');
    const noSign = noBracket.split('-').join('').split('+').join('');
    return noSign;
  };

  doClearName(name) {
    return name.split(' ').join('').toLowerCase();
  }

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
  getContacts = () => {
    const { searchQueryText, searchQueryNumber } = this.parseSearchQuery(this.state.filter);
    if (searchQueryText.length > 0 || searchQueryNumber.length > 0) {
      let filtredArray = [];
      //поиск по номеру
      if (searchQueryNumber.length > 0) {
        filtredArray = this.state.contacts.filter(({ number }) => {
          const clearNumberText = this.doClearNumber(number);
          return clearNumberText.includes(searchQueryNumber);
        });
        //комбинированый поиск
        if (searchQueryText.length > 0) {
          const namesArray = this.state.contacts.filter(({ name }) =>
            name.toLowerCase().includes(searchQueryText),
          );
          return filtredArray.length > 0 ? filtredArray.concat(namesArray) : namesArray;
        }
        return filtredArray;
      } else {
        //Поиск по имени
        filtredArray = this.state.contacts.filter(({ name }) =>
          name.toLowerCase().includes(searchQueryText),
        );
        return filtredArray;
      }
    }
    return this.state.contacts;
  };

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

  getContactsComponent(contacts) {
    return (
      <Contacts
        contacts={contacts}
        searchFunc={this.makeSearch}
        deleteFunc={this.doDeleteContact}
        countContacts={this.countContacts(contacts)}
        title={
          this.countContacts() ? 'Sorrry, no contacts found.' : 'Sorrry, you have no contacts yet.'
        }
      />
    );
  }

  getFormComponent() {
    return <Form onSubmit={this.onSubmit} />;
  }

  render() {
    const contacts = this.checkForDoubleID(this.getContacts());
    return (
      <Fragment>
        <Section title='Phonebook' component={this.getFormComponent()} />
        <hr />
        <Section title='Contacts' component={this.getContactsComponent(contacts)} />
      </Fragment>
    );
  }
}
