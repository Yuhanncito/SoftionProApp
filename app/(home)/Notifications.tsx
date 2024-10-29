import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView, BackHandler } from 'react-native';
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';

const NotificationCard = ({ name }) => (
  <View style={styles.card}>
    <Text style={styles.cardText}>{name} te ha invitado</Text>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.acceptButton}>
        <Text style={styles.buttonText}>Aceptar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.rejectButton}>
        <Text style={styles.buttonText}>Rechazar</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const Notifications = () => {
  const router = useRouter();

  useEffect(() => {
    // Función para manejar el retroceso a la pantalla anterior
    const backAction = () => {
      router.back(); // Navegar a la pantalla anterior
      return true;   // Evitar el comportamiento por defecto de salir de la app
    };

    // Agregar el listener de retroceso
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove(); // Eliminar el listener cuando se desmonte el componente
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Barra superior azul con título centrado y botón de refresh */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notificaciones</Text>
        <TouchableOpacity style={styles.refreshButton}>
          <Text style={styles.refreshIcon}>⟳</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.notificationsContainer}>
        <NotificationCard name="Gerardo" />
        <NotificationCard name="José" />
        <NotificationCard name="Aldo" />
        <NotificationCard name="Doris" />
        <NotificationCard name="María" />
        <NotificationCard name="Carlos" />
        <NotificationCard name="Ana" />
        <NotificationCard name="Luis" />
        <NotificationCard name="Sofía" />
        <NotificationCard name="Javier" />
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
    backgroundColor: '#007AFF', // Fondo azul
    padding: 15,
    paddingTop: 70, // Añadir suficiente espacio para cubrir la barra de estado
    alignItems: 'center', // Alinear todo en el centro
    justifyContent: 'center', // Asegurar que el título esté centrado
    width: '100%', // Asegurar que el fondo azul cubre todo el ancho
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', // Texto blanco
    textAlign: 'center',
  },
  refreshButton: {
    fontSize: 25,
    position: 'absolute', // El botón de refresh estará en una posición absoluta
    right: 15, // Colocar el botón de refresh a la derecha
    top: 55,  // Alinearlo con el contenedor
  },
  refreshIcon: {
    fontSize: 30,
    color: '#fff', // Color blanco para el ícono
    fontWeight: 'bold',
  },
  notificationsContainer: {
    paddingHorizontal: 10,  // Espacio uniforme en los laterales
    paddingBottom: 20,      // Espacio extra al final
    marginTop: 20,          // Más espacio entre la barra azul y las tarjetas
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20, // Espacio entre las tarjetas
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    alignItems: 'center', // Centrar el texto de la tarjeta
    marginHorizontal: 10, // Para que no se vea pegado a los bordes de la pantalla
    maxWidth: '100%', // Limita el ancho máximo al 100% del contenedor
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', // Asegura el centrado horizontal
    marginBottom: 10,
    flexShrink: 1, // Evita que el texto se desborde
    maxWidth: '100%', // Limita el ancho máximo del texto
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Centra los botones
  },
  acceptButton: {
    backgroundColor: '#25bb23',
    paddingVertical: 8,
    paddingHorizontal: 20,  // Ajuste para igualar el tamaño del botón
    borderRadius: 5,
    marginRight: 10, // Reducido para que los botones no estén tan separados
  },
  rejectButton: {
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 20,  // Ajuste para igualar el tamaño del botón
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
