import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import { updatePassword } from '../api/index'; // Ajuste de la ruta si es necesario
import { router, useLocalSearchParams } from 'expo-router'; // Importa expo-router

const RestorePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Obtiene los parámetros de la ruta
  const { email, token } = useLocalSearchParams();

  const handleContinue = async () => {
    if (newPassword === confirmPassword) {
      const res = await updatePassword(token, {
        email: email,
        password: confirmPassword,
      });
      
      if (res.success) {
        router.push({ pathname: '/(home)', params: { token: res.token } }); // Redirige a la pantalla Home
      } else {
        Alert.alert('Ah ocurrido un error');
        router.replace('/'); // Vuelve al inicio si hay un error
      }
    } else {
      Alert.alert('Las contraseñas no coinciden');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.blueBackground}>
        <Image source={require('../assets/Imagen1.png')} style={styles.logo} />
        <Text style={styles.title}>Restablecer contraseña</Text>
        <Text style={styles.subtitle}>
          Escriba una nueva contraseña para poder iniciar sesión nuevamente
        </Text>
      </View>

      <View style={styles.whiteBox}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nueva contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Nueva contraseña"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirmar contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RestorePassword;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  blueBackground: {
    backgroundColor: '#007AFF',
    paddingVertical: 60,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  whiteBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    marginTop: -30,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  input: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  continueText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
