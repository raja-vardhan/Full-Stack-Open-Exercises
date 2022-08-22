import { useEffect, useState } from "react";
import axios from 'axios';
import Display from "./components/Display";

const App = () => {

  const [searchText, setSearchText] = useState('');
  const [matches, setMatches] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      })
    }, []);

  const handleTextChange = (event) => {
    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value));
    const newMatches = filteredCountries.map(country => {
      return {country: country, show: false};
    });
    setMatches(newMatches);
    setSearchText(event.target.value);
  };

  const handleShowClick = (countryName) => {
    const newMatches = [...matches];
    for(let i = 0; i < newMatches.length; i++){
      if(newMatches[i].country.name.common === countryName){
        newMatches[i].show = true;
      }
    }
    setMatches(newMatches);
  };

  return (
    <div>
      find countries <input value={searchText} onChange={handleTextChange}/>
      <Display matches={matches} searchText={searchText} handleShowClick={handleShowClick}/> 
    </div>
  );
};

export default App;