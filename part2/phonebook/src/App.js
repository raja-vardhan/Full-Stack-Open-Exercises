import { useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterText, setFilterText] = useState('');

  const addPerson = (event) => {
    event.preventDefault();

    if(persons.find(person => person.name.toLowerCase() === newName.toLowerCase()) !== undefined){
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat({name: newName, number: newNumber, id: persons.length+1}));
    setNewName('');
    setNewNumber('');
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

      <Persons personsToDisplay={personsToDisplay}/>

    </div>
  );
};

export default App;
