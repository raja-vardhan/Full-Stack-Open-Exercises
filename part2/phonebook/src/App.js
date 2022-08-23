import { useEffect, useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    if(persons.find(person => person.name.toLowerCase() === newName.toLowerCase()) !== undefined){
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
        const matchingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());
        const updatedPerson = {...matchingPerson};
        updatedPerson.number = newNumber;
        personService
          .update(updatedPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson));
            setNewName('');
            setNewNumber('');
          })
      }
      return;
    }

    const newPerson = {name: newName, number: newNumber, id: persons.length+1};

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      })
  };

  const deletePerson = (id, name) => {

    if(!window.confirm(`Delete ${name} ?`))
      return;

    personService
      .deleteReq(id)
      .then(response => {
        const updatedPersons = persons.filter(person => person.id !== id);
        setPersons(updatedPersons);
      });
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilterText(event.target.value);

  const personsToDisplay = persons.filter(person => person.name.toLowerCase().includes(filterText.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterText={filterText} handleFilterChange={handleFilterChange}/>

      <h2>Add a new</h2>

      <PersonForm newName={newName} newNumber={newNumber} 
      handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson}/>

      <h2>Numbers</h2>

      <Persons personsToDisplay={personsToDisplay} deletePerson={deletePerson}/>

    </div>
  );
};

export default App;
