import { Property } from "./property";

export type RootStackParamList = {
  Home: undefined;
  PropertyDetail: { property: Property };
};
