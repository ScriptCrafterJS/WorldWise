import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesProvider";
CountryList.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
};
export default function CountryList() {
  const { isLoading, cities } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first country by clicking on a city on the map" />
    );
  // its better to me here to derive countries out of cities, so if this list appear then derive other wise we wont do the operation at all
  console.log(cities);
  const countries = cities.reduce((countries, city) => {
    if (!countries.some((country) => country.country === city.country))
      countries.push({ country: city.country, emoji: city.emoji });
    console.log(countries);
    return countries;
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.id} country={country} />
      ))}
    </ul>
  );
}
