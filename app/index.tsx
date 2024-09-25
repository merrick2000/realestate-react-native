import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { router } from "expo-router";
import PropertyCard from "../components/PropertyCard";
import SearchFilters from "../components/SearchFilters";
import {
  Property,
  SearchFilters as SearchFiltersType,
} from "../types/property";
import { fetchProperties } from "../api/properties";

const { height, width } = Dimensions.get("window");

export default function HomeScreen() {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [mapRegion, setMapRegion] = useState<Region | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      try {
        const fetchedProperties = await fetchProperties();
        setAllProperties(fetchedProperties);
        setFilteredProperties(fetchedProperties);

        // Calculate the region to fit all properties
        const region = calculateRegion(fetchedProperties);
        setMapRegion(region);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const calculateRegion = (properties: Property[]): Region => {
    let minLat = Number.MAX_VALUE;
    let maxLat = Number.MIN_VALUE;
    let minLng = Number.MAX_VALUE;
    let maxLng = Number.MIN_VALUE;

    properties.forEach((property) => {
      minLat = Math.min(minLat, property.location.latitude);
      maxLat = Math.max(maxLat, property.location.latitude);
      minLng = Math.min(minLng, property.location.longitude);
      maxLng = Math.max(maxLng, property.location.longitude);
    });

    const midLat = (minLat + maxLat) / 2;
    const midLng = (minLng + maxLng) / 2;
    const deltaLat = (maxLat - minLat) * 1.1; // 10% padding
    const deltaLng = (maxLng - minLng) * 1.1; // 10% padding

    return {
      latitude: midLat,
      longitude: midLng,
      latitudeDelta: Math.max(deltaLat, 0.02),
      longitudeDelta: Math.max(deltaLng, 0.02),
    };
  };

  const handleFilterChange = (filters: SearchFiltersType) => {
    const filtered = allProperties.filter((property) => {
      if (
        filters.location &&
        !property.title.toLowerCase().includes(filters.location.toLowerCase())
      ) {
        return false;
      }
      if (filters.propertyType && property.type !== filters.propertyType) {
        return false;
      }
      if (filters.status && property.type !== filters.status) {
        return false;
      }
      if (filters.rooms) {
        const roomCount = parseInt(filters.rooms);
        if (roomCount === 3 && property.rooms < 3) {
          return false;
        } else if (roomCount !== 3 && property.rooms !== roomCount) {
          return false;
        }
      }
      // Add more filter conditions here for priceRange and area if needed
      return true;
    });

    setFilteredProperties(filtered);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Chargement des propriétés...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {mapRegion && (
        <MapView style={styles.map} initialRegion={mapRegion}>
          {allProperties.map((property) => (
            <Marker
              key={property.id}
              coordinate={property.location}
              title={property.title}
              description={`${property.price} - ${property.type}`}
            />
          ))}
        </MapView>
      )}
      <View style={styles.content}>
        <SearchFilters onFilterChange={handleFilterChange} />
        <Text style={styles.resultCount}>
          {filteredProperties.length} Propriétés
        </Text>
        <FlatList
          data={filteredProperties}
          renderItem={({ item }) => (
            <PropertyCard
              property={item}
              onPress={() =>
                router.push({
                  pathname: "/propertyDetails",
                  params: { property: JSON.stringify(item) },
                })
              }
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.propertyList}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  contentContainer: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  map: {
    height: height * 0.3,
    width: width,
    marginBottom: 15,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  resultCount: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  propertyList: {
    paddingBottom: 20,
  },
});
