import { useEffect, useState } from "react";
import * as Location from 'expo-location';


// Define a custom hook to fetch user location
const useLocation = () => {
  const [error, setError] = useState<string>(''); // State for errors
  const [longitude, setLongitude] = useState<string>(''); // State for longitude
  const [latitude, setLatitude] = useState<string>(''); // State for latitude

  const getUserLocation = async (): Promise<void> => {
    try {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }

      // Get the user's current location
      const location = await Location.getCurrentPositionAsync({});
      setLongitude(location.coords.longitude.toString());
      setLatitude(location.coords.latitude.toString());

      // Reverse geocoding to get address (example)
      const response = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      console.log("Reverse Geocoding Response:", response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    }
  };

  // useEffect to trigger location fetching on component mount
  useEffect(() => {
    getUserLocation();
  }, []); // Empty dependency array to run only once

  // Return state variables and functions
  return { latitude, longitude, error };
};

export default useLocation;
