import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="propertyDetail"
          options={{ title: "Property Details" }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
