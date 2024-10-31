import React, { useEffect, useState } from "react";  // Asegúrate de importar React
import { StyleSheet, Text, View, TouchableOpacity, Alert, BackHandler, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Para los iconos
import { useRouter, useFocusEffect } from 'expo-router'; // Importar el hook useRouter y useFocusEffect
import OrganismoCard from '@/components/organismos/organismo_card';
import { getUserData, getWorkSpaces } from '../../api/index'; // Importar la función que realiza la llamada a la API
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para recuperar el token

const IndexScreen = () => {
  const router = useRouter(); // Usar el hook de Expo Router

  // Estado para almacenar los workspaces obtenidos desde la API
  const [workspaces, setWorkspaces] = useState([]); // Cambiar null a []
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para el indicador de carga

  // Manejar el evento de retroceso
  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        Alert.alert("Salir", "¿Estás seguro de que quieres salir de la aplicación?", [
          {
            text: "Cancelar",
            onPress: () => null,
            style: "cancel"
          },
          { text: "Salir", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

      // Cleanup function: Eliminar el listener cuando la pantalla pierda el foco
      return () => backHandler.remove();
    }, [])
  );

  // useEffect para llamar a la API cuando el componente se monta
  useEffect(() => {
    // Función asíncrona para obtener los datos de workspaces  // Función asíncrona para obtener los datos de workspaces
    const fetchWorkspaces = async () => {
      try {
        // Recupera el token desde AsyncStorage
        const token = await AsyncStorage.getItem('authToken');
        
        if (!token) {
          console.log("No se encontró el token.");
          return;
        }
        
        // Llamada a la API usando el token recuperado
        const data = await getWorkSpaces(token); 
        console.log("data",data[0].projects);
        setWorkspaces(data);
      
      } catch (error) {
        console.log("Error fetching workspaces:", error);
        setWorkspaces([]); // Setear a un array vacío en caso de error
      } finally {
        setLoading(false); // Dejar de mostrar el indicador de carga
      }
    };

    const fetchUser = async () => {
      try {
        // Recupera el token desde AsyncStorage
        const token = await AsyncStorage.getItem('authToken');
        
        if (!token) {
          console.log("No se encontró el token.");
          return;
        }
        
        // Llamada a la API usando el token recuperado
        const data = await getUserData(token); 

        console.log("usuario encotnrado",data.user);
        setUser(data.user);
      
      } catch (error) {
        console.log("Error fetching workspaces:", error);
        setWorkspaces([]); // Setear a un array vacío en caso de error
      } finally {
        setLoading(false); // Dejar de mostrar el indicador de carga
      }
    };
  
    fetchWorkspaces(); // Ejecutar la función para obtener los workspaces
    fetchUser();
  }, []);

  

  // Si aún está cargando, mostrar un indicador de carga
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Cargando áreas de trabajo...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header personalizado */}
     { user && <View style={styles.header}>
        <Icon name="person-circle" size={50} color="white" />
        <View style={styles.headerTextContainer}>
          <Text style={styles.welcomeText}>Bienvenido de nuevo</Text>
          <Text style={styles.userName}>{`${user.name} ${user.lastName}`}</Text>
        </View>
  
        {/* Botón de notificaciones con navegación */}
        <TouchableOpacity onPress={() => router.push('/Notifications')}>
          <Icon name="notifications" size={30} color="white" style={styles.bellIcon} />
        </TouchableOpacity>
      </View>}
  
      {/* Contenido principal */}
      { workspaces && <View style={styles.mainContent}>
        <Text style={styles.workAreasText}>Áreas de trabajo</Text>
  
        {/* Organismos de trabajo */}
        

        {workspaces && user && workspaces.map((workspace, index) => (
          <OrganismoCard key={index} workspace={workspace} userLogged={user.email} />
        ))}
      
      </View>}
    </View>
  );  
};

export default IndexScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF', // Fondo azul
    padding: 15,
    paddingTop: 60, // Espacio en la parte superior para el header
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  welcomeText: {
    color: 'white',
    fontSize: 16,
  },
  userName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bellIcon: {
    marginRight: 10,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20, // Añadir padding para la consistencia en todo el contenido
    backgroundColor: '#f5f5f5',
  },
  workAreasText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20, // Ajusta el margen superior para que se vea mejor
    marginBottom: 15, // Espacio debajo del título
    textAlign: 'left', // Alinear a la izquierda
    alignSelf: 'flex-start', // Mantener el título a la izquierda
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
