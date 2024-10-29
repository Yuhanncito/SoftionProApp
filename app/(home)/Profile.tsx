import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Modal, Alert, BackHandler } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router'; // Importamos Expo Router
import AsyncStorage from '@react-native-async-storage/async-storage';
const Profile = () => {
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const [profileImage, setProfileImage] = useState('https://image.cdn2.seaart.ai/2023-06-29/39615905747013/4c7b80cbc5afe7b10d0a6d39ec94b73798b652d7_high.webp'); // Imagen de perfil

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

  // Función para abrir la cámara o galería
  const handleImagePick = async (option) => {
    setModalVisible(false); // Cerrar modal

    if (option === 'camera') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status === 'granted') {
        let result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.canceled) {
          setProfileImage(result.assets[0].uri); // Actualiza la imagen con la seleccionada
        }
      } else {
        Alert.alert('Permiso de cámara denegado');
      }
    } else if (option === 'gallery') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status === 'granted') {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.canceled) {
          setProfileImage(result.assets[0].uri); // Actualiza la imagen con la seleccionada
        }
      } else {
        Alert.alert('Permiso de galería denegado');
      }
    } else if (option === 'remove') {
      setProfileImage('https://via.placeholder.com/100'); // Restablecer imagen a un placeholder
    }
  };

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authToken'); // Eliminar el token de sesión
      router.replace('/'); // Redirigir al login
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al cerrar sesión');
    }
  };

  return (
    <View style={styles.container}>
      {/* Modal para seleccionar opciones */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Seleccionar opción</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleImagePick('camera')}
            >
              <Text style={styles.modalButtonText}>Cámara</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleImagePick('gallery')}
            >
              <Text style={styles.modalButtonText}>Galería</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.removeButton]}
              onPress={() => handleImagePick('remove')}
            >
              <Text style={[styles.modalButtonText, styles.removeButtonText]}>Eliminar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Encabezado con imagen de perfil */}
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: profileImage }} // Imagen de perfil seleccionada
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.cameraIcon} onPress={() => setModalVisible(true)}>
            <Icon name="camera" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>Gize Yuhann Martinez</Text>
      </View>

      {/* Información de perfil */}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Nombre</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} value="Gize" editable={false} />
            <TouchableOpacity>
              <Icon name="pencil" size={20} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Apellidos</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} value="Yuhann Martinez" editable={false} />
            <TouchableOpacity>
              <Icon name="pencil" size={20} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Correo</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} value="gera73.372@gmail.com" editable={false} />
            <TouchableOpacity>
              <Icon name="pencil" size={20} color="gray" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Botón de cerrar sesión */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="log-out-outline" size={20} color="white" />
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 70, // Espacio en la parte superior para el header
    backgroundColor: '#007AFF',
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
  },
  userName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 10,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalButton: {
    width: '100%',
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: '#ff4d4d',
  },
  removeButtonText: {
    color: 'white',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
});
