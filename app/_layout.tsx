import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Stack, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import '../global.css'

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null); // Mantener el token en el estado local

  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('authToken');
        if (storedToken) {
          setToken(storedToken); // Guardamos el token en el estado
          router.push('/(home)/Hom'); // Si hay token, redirigimos a home
        }
      } catch (error) {
        console.log('Error al verificar el token:', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };
  
        
    checkToken(); // Verificamos el token al inicio
  }, [token]);


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return ( token ? <StackPrivate /> : <StactPublic /> );
}

const StactPublic = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} >
      <Stack.Screen name="index" />
      <Stack.Screen name="verify-email" />
      <Stack.Screen name="register" options={{ headerShown: true, headerTitle: "Registro", headerTitleAlign: "center", headerStyle: { backgroundColor: "#007AFF" }, headerTintColor: "#fff" }} />
      <Stack.Screen name="ForgotPassword" />
      <Stack.Screen name="VeryfyQuestion" />
      <Stack.Screen name="RestorePassword" />
    </Stack>
  );
};

const StackPrivate = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="/(home)" >
      
    </Stack>
  );
};