export interface Property {
  id: string;
  title: string;
  rooms: number;
  bathrooms: number;
  area: number;
  price: string;
  type: string;
  location: {
    latitude: number;
    longitude: number;
  };
  imageUrl?: string; // New field for property image
}

// ... rest of the file remains the same

export interface SearchFilters {
  location: string;
  propertyType: string;
  status: string;
  rooms: string;
  priceRange: string;
  area: string;
}
