const Country = ({country}) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital {country.capital.join(', ')}</p>
      <p>Area {country.area}</p>
      <b>Languages: </b>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt='Flag'/>
    </div>
  );
};

export default Country;