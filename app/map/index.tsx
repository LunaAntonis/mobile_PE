import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import useLocation from "@/hooks/useLocation";

const UserLocationMap: React.FC = () => {
  const { latitude, longitude, error } = useLocation();

  useEffect(() => {
    if (!latitude || !longitude) {
      console.log("Waiting for coordinates...");
    }
  }, [latitude, longitude]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Current Location</Text>
      <View style={styles.mapContainer}>
        {latitude && longitude ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
              latitudeDelta: 0.01, // Zoom level
              longitudeDelta: 0.01, // Zoom level
            }}
          >
            <Marker
              coordinate={{
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
              }}
              title="You are here"
              description={`Latitude: ${latitude}, Longitude: ${longitude}`}
            />
          </MapView>
        ) : (
          <View style={styles.loadingContainer}>
            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : (
              <ActivityIndicator size="large" color="#6B46C1" />
            )}
          </View>
        )}
      </View>
      <Text style={styles.note}>
        Note: Please ensure location permissions are enabled for accurate
        results.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  mapContainer: {
    width: "90%",
    height: "60%",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  note: {
    fontSize: 14,
    color: "#666",
    marginTop: 16,
    textAlign: "center",
  },
});

export default UserLocationMap;
