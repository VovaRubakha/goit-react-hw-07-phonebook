import { useState, useEffect, useCallback } from "react";

import { useSelector, shallowEqual, useDispatch } from "react-redux";

import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import Filter from "./Filter";

import {
  getContacts,
  getLoading,
  getError,
} from "../redux/contacts/contact-selector";

import * as operations from '../redux/contacts/contact-operations'

import styles from './App.module.css'

const App = () => {
  const [filter, setFilter] = useState("");
  const contacts = useSelector(getContacts, shallowEqual);
  const loading = useSelector(getLoading, shallowEqual);
  const error = useSelector(getError, shallowEqual);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(operations.getContacts());
  }, [dispatch])
  

  const addContact = (data) => {
    dispatch(operations.addContact(data))
  };

  const deleteContact = (id) => {
    dispatch(operations.deleteContact(id))
  };

  const changeFilter = useCallback(({ target }) =>  
    setFilter(target.value), [setFilter]);

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
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
      </div>
      <div>
        <h2>Contacts</h2>
        <Filter filter={filter} changeFilter={changeFilter} />
        {loading && <p>...Loading</p>}
        {error && <p>{error.message}</p>}
        {Boolean(filteredContacts.length) &&
        <ContactList contacts={filteredContacts} deleteContact={deleteContact} />}
      </div>
    </div>
  );
}

export default App;