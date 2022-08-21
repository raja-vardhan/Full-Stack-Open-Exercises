const Person = ({person}) => {
  return (
    <li>{person.name} {person.number}</li>
  );
};

const Persons = ({personsToDisplay}) => {
  return (
    <>
    {personsToDisplay.map(person => <Person key={person.id} person={person}/>)}
    </>
  );
};

export default Persons;