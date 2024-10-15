import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index"  />
      <Stack.Screen name="verify-email"  />
      <Stack.Screen name="register" options={{ headerShown: true, headerTitle: "Registro", headerTitleAlign: "center", headerStyle: { backgroundColor: "#007AFF" }, headerTintColor: "#fff" }}  />

    </Stack>
  );
}
