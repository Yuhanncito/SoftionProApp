import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function RootLayout() {
  const [loading, setLoading] = useState(true); // Indica si se está cargando el token
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Define si el usuario está autenticado

  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('authToken'); // Verifica si el token está en AsyncStorage
        if (storedToken) {
          setIsAuthenticated(true); // Indica que el usuario está autenticado
        }
      } catch (error) {
        console.log('Error al verificar el token:', error);
      } finally {
        setLoading(false); // Indica que la carga inicial ha terminado
      }
    };

    checkToken();
  }, []);

  // Muestra un indicador de carga mientras se verifica el token
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        // Pantalla de inicio para usuarios autenticados
        <Stack.Screen name="(home)/Hom" options={{ headerShown: false }} />
      ) : (
        // Pantallas públicas
        <>
          <Stack.Screen name="index" />
          <Stack.Screen
            name="verify-email"
            options={{ headerShown: true, headerTitle: 'Verificar Email', headerStyle: { backgroundColor: '#007AFF' }, headerTintColor: '#fff' }}
          />
          <Stack.Screen
            name="register"
            options={{ headerShown: true, headerTitle: 'Registro', headerStyle: { backgroundColor: '#007AFF' }, headerTintColor: '#fff' }}
          />
          <Stack.Screen name="ForgotPassword" />
          <Stack.Screen name="VeryfyQuestion" />
          <Stack.Screen name="RestorePassword" />
        </>
      )}
    </Stack>
  );
}