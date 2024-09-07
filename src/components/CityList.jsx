import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesProvider";

CityList.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
};
export default function CityList() {
  const { isLoading, cities } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}
