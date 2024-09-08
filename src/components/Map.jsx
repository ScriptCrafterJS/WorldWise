import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesProvider";
import PropTypes from "prop-types";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useURLPosition } from "../hooks/useURLPosition";

Map.propTypes = {
  position: PropTypes.array,
};
export default function Map() {
  const navigate = useNavigate();
  const { cities } = useCities();

  const [mapPosition, setMapPosition] = useState([40, 0]); // [lat, lng], this position is where the map will be placed once its reloaded
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const [lat, lng] = useURLPosition();

  // we want to synchronize the lat, and lng with the mapPosition
  useEffect(
    function () {
      if (lat && lng) setMapPosition([lat, lng]);
    },
    [lat, lng]
  );

  // synchronize the mapPosition with the geolocationPosition
  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  // now to add the cities markers in the map
  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>
        {isLoadingPosition ? "Loading..." : `Your position`}
      </Button>
      <MapContainer
        // center={mapPosition}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true} //to enable zoom using mouse wheel
        className={styles.mapContainer}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span> {city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <DetectClick navigate={navigate} />
        <ChangeCenter position={mapPosition} />
      </MapContainer>
    </div>
  );
}
ChangeCenter.propTypes = {
  position: PropTypes.array,
};
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick({ navigate }) {
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
