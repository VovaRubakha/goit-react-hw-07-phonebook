// import { useState, useCallback } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import {actions} from "./redux/contacts/contact-slice";
import { getContacts } from "./redux/contacts/contact-selector";
import { setFilter } from "./redux/contacts/contact-selector";

import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import Filter from "./Filter";

import styles from './App.module.css'

const App = () => {
  // const [filter, setFilter] = useState('')
  const contacts = useSelector(getContacts, shallowEqual);
  const filter = useSelector(setFilter, shallowEqual);
  const dispatch = useDispatch();

  const addContact = (data) => {
    const action = actions.addContact(data);
    console.log(data);
    const dublicate = contacts.find(item => item.name === data.name);
    if(dublicate){
          alert(`${data.name} is already in contacts list`);
          return;
    }
    dispatch(action)
  };

  const deleteContact = (id) => {
    dispatch(actions.deleteContact(id))
  };

  const changeFilter = ({ target }) => { 
    dispatch(actions.setFilter(target.value));
  };

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts
    }
    const filterText = filter.toLowerCase();
    const filteredContacts = contacts.filter(({name}) => name.toLowerCase().includes(filterText));
    return filteredContacts;
  }

  const filteredContacts = getFilteredContacts();
  return (
      <div className={styles.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} changeFilter={changeFilter} />
        <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
      </div>
  );
}

export default App;