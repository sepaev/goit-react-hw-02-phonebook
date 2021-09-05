import { Component, Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Section } from './components/Section/Section';

import { Notify } from 'notiflix';
Notify.init({ position: 'center-top' });

class App extends Component {
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
  };
  doAddContact = (name, number) => {
    Notify.success('Well Done! Added ' + name);
    this.setState(({ contacts, filter }) => {
      const newArr = [...contacts, { id: uuidv4(), name, number }];
      return { contacts: newArr, filter };
    });
  };

  makeSearch = e => {
    const searchQuery = e.target.value.toLocaleLowerCase();
    this.setState({ filter: searchQuery });
  };

  doDeleteContact = id => {
    const { contacts, filter } = this.state;
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
      return { contacts: newArr, filter };
    });

    Notify.success(`Contact ${reportName} was errased successfully`);
  };

  render() {
    return (
      <Fragment>
        <Section
          title='Phonebook'
          component='Form'
          data={this.state}
          doAddContact={this.doAddContact}
        />
        <hr />
        <Section
          title='Contacts'
          component='Contacts'
          data={this.state}
          searchFunc={this.makeSearch}
          deleteFunc={this.doDeleteContact}
        />
      </Fragment>
    );
  }
}

export default App;
