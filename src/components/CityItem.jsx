import styles from "./CityItem.module.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesProvider";
CityItem.propTypes = {
  city: PropTypes.object,
};
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
export default function CityItem({ city }) {
  const { cityName, emoji, date, id, position } = city;
  const { currentCity } = useCities();
  function handleDeleteCity(e) {
    e.preventDefault();
    console.log("TEST");
  }
  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleDeleteCity}>
          &times;
        </button>
      </Link>
    </li>
  );
}
