import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Modal, Alert, BackHandler } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserData } from '../../api'; // Asegúrate de importar correctamente la función

const Profile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState('https://image.cdn2.seaart.ai/2023-06-29/39615905747013/4c7b80cbc5afe7b10d0a6d39ec94b73798b652d7_high.webp');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const backAction = () => {
      router.back();
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [router]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) {
          console.log("Token no encontrado.");
          return;
        }
        console.log("Token encontrado:", token); // Muestra el token en la consola para verificar

        // Llamada a la API para obtener los datos del usuario
        const data = await getUserData(token);
        if (data && data.user) {
          setName(data.user.name);
          setLastName(data.user.lastName);
          setEmail(data.user.email);

          console.log("Nombre:", data.user.name);
          console.log("Apellidos:", data.user.lastName);
          console.log("Correo:", data.user.email);
        }
      } catch (error) {
        console.log("Error al obtener datos del usuario:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleImagePick = async (option) => {
    setModalVisible(false);
    if (option === 'camera') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status === 'granted') {
        let result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.canceled) {
          setProfileImage(result.assets[0].uri);
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
          setProfileImage(result.assets[0].uri);
        }
      } else {
        Alert.alert('Permiso de galería denegado');
      }
    } else if (option === 'remove') {
      setProfileImage('https://via.placeholder.com/100');
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      router.replace('/');
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al cerrar sesión');
    }
  };

  return (
    <View style={styles.container}>
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
            <TouchableOpacity style={styles.modalButton} onPress={() => handleImagePick('camera')}>
              <Text style={styles.modalButtonText}>Cámara</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => handleImagePick('gallery')}>
              <Text style={styles.modalButtonText}>Galería</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.removeButton]} onPress={() => handleImagePick('remove')}>
              <Text style={[styles.modalButtonText, styles.removeButtonText]}>Eliminar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
          <TouchableOpacity style={styles.cameraIcon} onPress={() => setModalVisible(true)}>
            <Icon name="camera" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>{name} {lastName}</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Nombre</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} value={name} editable={false} />
            <TouchableOpacity>
              <Icon name="pencil" size={20} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Apellidos</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} value={lastName} editable={false} />
            <TouchableOpacity>
              <Icon name="pencil" size={20} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Correo</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={email}
              editable={false}
              numberOfLines={1}
              ellipsizeMode="tail"
            />
            <TouchableOpacity>
              <Icon name="pencil" size={20} color="gray" />
            </TouchableOpacity>
          </View>
        </View>


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
    paddingTop: 60, // Espacio en la parte superior para el header
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
  maxWidth: 180, // Ajusta este valor según sea necesario
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
