import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView, BackHandler, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getInvitations, acceptInvitation } from '../../api/index';

const NotificationCard = ({ name, onAccept, onReject }) => (
  <View style={styles.card}>
    <Text style={styles.cardText}>{name} te ha invitado</Text>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.acceptButton} onPress={onAccept}>
        <Text style={styles.buttonText}>Aceptar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.rejectButton} onPress={onReject}>
        <Text style={styles.buttonText}>Rechazar</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const Notifications = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Obtener el token y el ID del usuario desde AsyncStorage, luego cargar las invitaciones
  const fetchTokenAndInvitations = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('authToken');
      const storedUserId = await AsyncStorage.getItem('userId');
      
      if (storedToken && storedUserId) {
        setToken(storedToken);
        setUserId(storedUserId);
        
        // Imprimir el token y userId en la consola de inmediato
        console.log('Token obtenido:', storedToken);
        console.log('User ID obtenido:', storedUserId);

        // Obtener las invitaciones desde la API usando el token y userId
        const result = await getInvitations(storedUserId, storedToken);
        if (result && result.invitations) {
          setNotifications(result.invitations);
        } else {
          console.log('No se encontraron invitaciones.');
        }
      } else {
        console.log('Token o User ID no encontrado en AsyncStorage.');
      }
    } catch (error) {
      console.log('Error al obtener el token o las invitaciones:', error);
    }
  };

  useEffect(() => {
    fetchTokenAndInvitations();
  }, []);

  // Manejar el evento de retroceso
  useEffect(() => {
    const backAction = () => {
      router.back();
      return true;
    };
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [router]);

  // Función para aceptar una invitación
  const handleAccept = async (notificationId) => {
    if (!token) {
      Alert.alert('Error', 'Token no disponible');
      return;
    }

    try {
      const response = await acceptInvitation(notificationId, token);
      console.log('Respuesta de la API al aceptar invitación:', response);
      Alert.alert('Invitación aceptada');

      // Actualizar la lista de notificaciones eliminando la aceptada
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification._id !== notificationId)
      );
    } catch (error) {
      console.log('Error al aceptar la invitación:', error);
      Alert.alert('Error', 'Hubo un problema al aceptar la invitación');
    }
  };

  // Función para rechazar una invitación
  const handleReject = (notificationId) => {
    Alert.alert('Invitación rechazada');
    console.log('Invitación rechazada para el ID:', notificationId);

    // Actualizar la lista de notificaciones eliminando la rechazada
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification._id !== notificationId)
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Barra superior azul con título centrado y botón de refresh */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notificaciones</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={fetchTokenAndInvitations}>
          <Text style={styles.refreshIcon}>⟳</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.notificationsContainer}>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationCard
              key={notification._id}
              name={notification.idPropietary.name}
              onAccept={() => handleAccept(notification._id)}
              onReject={() => handleReject(notification._id)}
            />
          ))
        ) : (
          <Text style={styles.noNotificationsText}>No tienes notificaciones</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 15,
    paddingTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  refreshButton: {
    fontSize: 25,
    position: 'absolute',
    right: 15,
    top: 55,
  },
  refreshIcon: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  notificationsContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    marginTop: 20,
  },
  noNotificationsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    alignItems: 'center',
    marginHorizontal: 10,
    maxWidth: '100%',
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    flexShrink: 1,
    maxWidth: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  acceptButton: {
    backgroundColor: '#25bb23',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  rejectButton: {
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
