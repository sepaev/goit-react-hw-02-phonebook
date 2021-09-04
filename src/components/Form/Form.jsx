import React, { Component } from 'react';
import { FormButton, FormLabel, PhonebookForm } from './Form.styled';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import css from './Form.module.css';

export class Form extends Component {
  render() {
    const { onSubmit } = this.props;
    return (
      <PhonebookForm onSubmit={onSubmit}>
        <FormLabel>
          <span>Name</span>
          <InputMask
            key='nameKey'
            className={css.inputNumber}
            type='text'
            name='name'
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            placeholder='Arnold Schwarzenegger'
            maxLength='20'
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
          />
        </FormLabel>
        <FormLabel>
          <span>Number</span>
          <InputMask
            key='numberKey'
            className={css.inputNumber}
            type='tel'
            name='number'
            pattern='\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}'
            placeholder='+38 (099) 999-99-99'
            mask='+38 (099) 999-99-99'
            title='Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +'
            required
          />
        </FormLabel>
        <FormButton type='submit'>Add contact</FormButton>
      </PhonebookForm>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
