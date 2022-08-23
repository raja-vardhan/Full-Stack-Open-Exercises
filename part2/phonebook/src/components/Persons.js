const Person = ({person, deletePerson}) => {
  return (
    <li>{person.name} {person.number} <button onClick={() => deletePerson(person.id, person.name)}>delete</button></li>
  );
};

const Persons = ({personsToDisplay, deletePerson}) => {
  return (
    <>
    {personsToDisplay.map(person => <Person key={person.id} person={person} deletePerson={deletePerson}/>)}
    </>
  );
};

export default Persons;