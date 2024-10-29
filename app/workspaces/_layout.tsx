import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function WorkspacesLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} initialRouteName="[workspaceId]">
        <Stack.Screen name="[workspaceId]" />
        <Stack.Screen name="ProjectDetails" />
        <Stack.Screen name="BoardView" />
      </Stack>
    </GestureHandlerRootView>
  );
}
