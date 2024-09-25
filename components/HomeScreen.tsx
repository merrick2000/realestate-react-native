import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import {
  Property,
  SearchFilters as SearchFiltersType,
} from "../types/property";

import PropertyCard from "./PropertyCard";
import SearchFilters from "./SearchFilters";
import { fetchProperties } from "@/api/properties";
import { RootStackParamList } from "@/types/navigation";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      const fetchedProperties = await fetchProperties();
      setProperties(fetchedProperties);
      setIsLoading(false);
    })();
  }, []);

  const handleFilterChange = (filters: SearchFiltersType) => {
    // Implement filter logic here
    console.log(filters);
  };

  if (isLoading) {
    return <Text>Chargement...</Text>;
  }

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {properties.map((property) => (
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
        <Text style={styles.resultCount}>{properties.length} Propriétés</Text>
        <FlatList
          data={properties}
          renderItem={({ item }) => (
            <PropertyCard
              property={item}
              onPress={() =>
                navigation.navigate("PropertyDetail", { property: item })
              }
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  resultCount: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
});

export default HomeScreen;
