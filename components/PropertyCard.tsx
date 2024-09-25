import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Property } from "../types/property";

interface PropertyCardProps {
  property: Property;
  onPress: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: "https://via.placeholder.com/150" }}
        style={styles.image}
      />
      <View style={styles.typeTag}>
        <Text style={styles.typeText}>{property.type}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{property.title}</Text>
        <Text style={styles.details}>
          {property.rooms} Chambres • {property.bathrooms} Salles de bain •{" "}
          {property.area} m²
        </Text>
        <Text style={styles.price}>{property.price}</Text>
      </View>
      <TouchableOpacity style={styles.favoriteButton}>
        <Ionicons name="heart-outline" size={20} color="#000" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 120,
  },
  typeTag: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  typeText: {
    color: "#fff",
    fontSize: 12,
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  details: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 4,
    color: "#e74c3c",
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PropertyCard;
