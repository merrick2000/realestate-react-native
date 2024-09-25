import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import MapView, { Marker } from "react-native-maps";
import { Property } from "../types/property";

const { width } = Dimensions.get("window");

export default function PropertyDetailScreen() {
  const { property } = useLocalSearchParams();
  const propertyData: Property = JSON.parse(property as string);

  const mapRegion = {
    latitude: propertyData.location.latitude,
    longitude: propertyData.location.longitude,
    latitudeDelta: 0.005, // Higher zoom level
    longitudeDelta: 0.005,
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: propertyData.imageUrl ?? "https://via.placeholder.com/400x200",
        }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{propertyData.title}</Text>
        <Text style={styles.price}>{propertyData.price}</Text>
        <Text style={styles.type}>{propertyData.type}</Text>
        <Text style={styles.details}>
          {propertyData.rooms} Chambres • {propertyData.bathrooms} Salles de
          bain • {propertyData.area} m²
        </Text>
        <Text style={styles.description}>
          Description détaillée de la propriété...
        </Text>
      </View>
      <MapView style={styles.map} initialRegion={mapRegion}>
        <Marker
          coordinate={propertyData.location}
          title={propertyData.title}
          description={`${propertyData.price} - ${propertyData.type}`}
        />
      </MapView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  image: {
    width: "100%",
    height: 250,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 5,
  },
  type: {
    fontSize: 18,
    color: "#666",
    marginBottom: 5,
  },
  details: {
    fontSize: 16,
    color: "#444",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    marginBottom: 20,
  },
  map: {
    width: width,
    height: 300,
    marginTop: 20,
  },
});
