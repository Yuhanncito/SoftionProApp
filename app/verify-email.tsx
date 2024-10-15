import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { Modal, Portal, Provider } from 'react-native-paper';
import { BASEURL } from '../api';
import { router, useLocalSearchParams } from 'expo-router';

export const VerifyEmail = async (data : any) => {
  try {
    const action = (data.option === "register") ? 'signup' : (data.option === "Login") ? 'signin' : 'forgotPassword';
    const response = await fetch(`${BASEURL}/auth/${action}/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return { error: 'Error al realizar la verificación' };
  }
};

const VerificationScreen = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const data = useLocalSearchParams();

  const showModal = (title : string , message : string ) => {
    setModalTitle(title);
    setModalMessage(message);
    setVisible(true);
  };

  const hideModal = () => setVisible(false);

  const handleVerification = async () => {
    if (verificationCode.trim() === '') {
      showModal('Error', 'El código de verificación no puede estar vacío');
      return;
    }

    setLoading(true);

    const dataBody = {
      secretCode: verificationCode,
      ...data
    };

    const result = await VerifyEmail(dataBody);

    setLoading(false);

    if (result.error || result.message !== 'ok') {
      showModal('Error', result.error || result.message);
    } else {
      data.option !== 'Login' ?
      [router.push('/restore-password'), router.setParams({ email: data.email, token: result.token })]:
      [router.push('/(home)'), router.setParams({ email: data.email, token: result.token })]
    }
  };

  return (
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalTitle}>{modalTitle}</Text>
          <Text style={styles.modalMessage}>{modalMessage}</Text>
          <TouchableOpacity style={styles.modalButton} onPress={hideModal}>
            <Text style={styles.modalButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </Modal>
      </Portal>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Fondo azul */}
        <View style={styles.blueBackground}>
          <Image source={require('../assets/images/Logo.png')} style={styles.logo} />
          <Text style={styles.headline}>Verificación de cuenta</Text>
          <Text style={styles.description}>
            Se envió un correo electrónico a tu bandeja de entrada con el código de verificación.
          </Text>
        </View>

        {/* Contenedor blanco con sombra */}
        <View style={styles.whiteBox}>
          <Text style={styles.verificationCodeText}>Ingresa el código de verificación</Text>
          <TextInput
            style={styles.input}
            placeholder="Ejemplo: abc123def"
            value={verificationCode}
            onChangeText={setVerificationCode}
            autoCapitalize="none"
          />

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => router.back()} // Redirigir a la pantalla anterior
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleVerification} // Acción para el botón de continuar
              disabled={loading} // Deshabilitar el botón mientras está cargando
            >
              <Text style={styles.continueButtonText}>
                {loading ? 'Verificando...' : 'Continuar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <StatusBar style="auto" />
      </KeyboardAvoidingView>
    </Provider>
  );
};

export default VerificationScreen;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  blueBackground: {
    width: width,
    height: height * 0.40,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  headline: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  whiteBox: {
    position: 'absolute',
    top: height * 0.35,
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingTop: '12%',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '10%',
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 15,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%', // Reduce el ancho del modal
    alignSelf: 'center', // Centra el modal en la pantalla
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  verificationCodeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
