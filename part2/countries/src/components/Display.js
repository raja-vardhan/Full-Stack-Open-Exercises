import Country from "./Country";
import Weather from "./Weather";


const Display = ({matches, searchText, handleShowClick}) => {
  if(matches.length === 0 || searchText === ''){
    return <></>;
  }
  else if(matches.length > 10){
    return <p>Too many countries, specify another filter</p>;
  }
  else if(matches.length > 1 && matches.length <= 10){
    return (
      matches.map(match => 
        <li key={match.country.name.common}>
          {match.country.name.common} <button onClick={() => handleShowClick(match.country.name.common)}>show</button>
          {match.show ? <Country country={match.country}/> : <></>}
        </li>
      )
    );
  }
  else{
    return (
      <div>
        <Country country={matches[0].country}/>
        <Weather location={matches[0].country.capital}/>
      </div>
    );
  }
}

export default Display;