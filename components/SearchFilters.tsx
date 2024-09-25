import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  FlatList,
} from "react-native";
import { SearchFilters as SearchFiltersType } from "../types/property";

interface SearchFiltersProps {
  onFilterChange: (filters: SearchFiltersType) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onFilterChange }) => {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [status, setStatus] = useState("");
  const [rooms, setRooms] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [priceRange, setPriceRange] = useState("");
  const [area, setArea] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPicker, setCurrentPicker] = useState<
    keyof SearchFiltersType | null
  >(null);

  const applyFilters = () => {
    const filters: SearchFiltersType = {
      location: location.trim(),
      propertyType,
      status,
      rooms,
      priceRange,
      area,
    };

    // Only include non-empty filters
    const appliedFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== "")
    );

    onFilterChange(appliedFilters as SearchFiltersType);
  };

  const openPicker = (picker: keyof SearchFiltersType) => {
    setCurrentPicker(picker);
    setModalVisible(true);
  };

  const renderPickerItems = () => {
    switch (currentPicker) {
      case "propertyType":
        return ["", "Appartement", "Maison", "Villa"];
      case "status":
        return ["", "À louer", "À vendre"];
      case "rooms":
        return ["", "1", "2", "3+"];
      case "priceRange":
        return [
          "",
          "0 - 50,000 F CFA",
          "50,000 - 100,000 F CFA",
          "100,000+ F CFA",
        ];
      case "area":
        return ["", "0 - 50 m²", "50 - 100 m²", "100+ m²"];
      default:
        return [];
    }
  };

  const selectItem = (item: string) => {
    if (currentPicker) {
      switch (currentPicker) {
        case "propertyType":
          setPropertyType(item);
          break;
        case "status":
          setStatus(item);
          break;
        case "rooms":
          setRooms(item);
          break;
        case "priceRange":
          setPriceRange(item);
          break;
        case "area":
          setArea(item);
          break;
      }
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => openPicker("propertyType")}
      >
        <Text>{propertyType || "Type de biens"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => openPicker("status")}
      >
        <Text>{status || "Status du biens"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => openPicker("rooms")}
      >
        <Text>{rooms || "Chambres"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.advancedButton}
        onPress={() => setShowAdvanced(!showAdvanced)}
      >
        <Text style={styles.advancedButtonText}>
          {showAdvanced ? "Moins d'options" : "Plus d'options de recherche"}
        </Text>
      </TouchableOpacity>
      {showAdvanced && (
        <View>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => openPicker("priceRange")}
          >
            <Text>{priceRange || "Fourchette de prix"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => openPicker("area")}
          >
            <Text>{area || "Surface"}</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={applyFilters}>
        <Text style={styles.buttonText}>Appliquer les filtres</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <FlatList
            data={renderPickerItems()}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => selectItem(item)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  pickerButton: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  advancedButton: {
    marginVertical: 10,
    alignItems: "center",
  },
  advancedButtonText: {
    color: "#007AFF",
    fontSize: 14,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: "80%",
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    width: "100%",
  },
  closeButton: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
    minWidth: 100,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default SearchFilters;
