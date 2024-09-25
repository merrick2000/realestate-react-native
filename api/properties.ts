import { Property } from "../types/property";

const mockProperties: Property[] = [
  {
    id: "1",
    title: "Appart 12",
    rooms: 1,
    bathrooms: 1,
    area: 100,
    price: "100000 F CFA",
    type: "À louer",
    location: { latitude: 6.1352, longitude: 1.2217 },
  },
  {
    id: "2",
    title: "Villa 5",
    rooms: 3,
    bathrooms: 2,
    area: 150,
    price: "200000 F CFA",
    type: "À vendre",
    location: { latitude: 6.1375, longitude: 1.224 },
  },
  {
    id: "3",
    title: "Studio 7",
    rooms: 1,
    bathrooms: 1,
    area: 50,
    price: "75000 F CFA",
    type: "À louer",
    location: { latitude: 6.133, longitude: 1.22 },
  },
  {
    id: "4",
    title: "Maison 23",
    rooms: 4,
    bathrooms: 3,
    area: 200,
    price: "300000 F CFA",
    type: "À vendre",
    location: { latitude: 6.136, longitude: 1.223 },
  },
  {
    id: "5",
    title: "Duplex 8",
    rooms: 2,
    bathrooms: 2,
    area: 120,
    price: "150000 F CFA",
    type: "À louer",
    location: { latitude: 6.134, longitude: 1.221 },
  },
];

export const fetchProperties = (): Promise<Property[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProperties);
    }, 1000); // Simulate network delay
  });
};

export const fetchPropertyById = (
  id: string
): Promise<Property | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const property = mockProperties.find((p) => p.id === id);
      resolve(property);
    }, 500); // Simulate network delay
  });
};

export const searchProperties = (query: string): Promise<Property[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredProperties = mockProperties.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.type.toLowerCase().includes(query.toLowerCase())
      );
      resolve(filteredProperties);
    }, 800); // Simulate network delay
  });
};
