import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
export default function Map() {
  const [searchParams] = useSearchParams();
  const navigation = useNavigate();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigation("form");
      }}
    >
      <h1>Map</h1>
      <h1>
        Position: {lat} , {lng}
      </h1>
    </div>
  );
}
