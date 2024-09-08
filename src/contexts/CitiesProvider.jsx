import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
const CitiesContext = createContext();
const BASE_URL = "http://localhost:4000";

CitiesProvider.propTypes = {
  children: PropTypes.node,
};
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const cities = await response.json();
        setCities(cities);
      } catch (err) {
        console.log(err.message());
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(cityId) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities/${cityId}`);
      const city = await response.json();
      setCurrentCity(city);
    } catch (err) {
      console.log(err.message());
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const city = await response.json();
      setCities((cities) => [...cities, city]); //to make the local in sync with the remote
    } catch (err) {
      console.log(err.message());
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("useCities must be used within a CitiesProvider");

  return context;
}

export { CitiesProvider, useCities };
