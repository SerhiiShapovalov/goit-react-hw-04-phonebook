import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import css from './App.module.css';

function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contact')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contact', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const newContact = { id: nanoid(), name, number };

    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      window.alert(`${name} is already in the contact list.`);
      return;
    } else {
      setContacts(prevContacts => [newContact, ...prevContacts]);
    }
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = e => setFilter(e.currentTarget.value);

  const filtredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <h1 className={css.title}>Phonebook </h1>
        <ContactForm onSubmit={addContact} />

        <h2 className={css.subtitle}>Contacts</h2>
        <Filter filter={filter} changeFilter={changeFilter} />
        <ContactList
          contacts={filtredContacts()}
          onDeleteContact={deleteContact}
        />
      </div>
    </div>
  );
}

export default App;
