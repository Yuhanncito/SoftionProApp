import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Alert, Image } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { StatusBar } from 'react-native';
import { useUserContext } from '../context/UserContext'; // Importa el contexto
import { getUser, sendEmail } from '../api/index';
import { router } from 'expo-router'; // Importa el router de Expo Router



const ForgotPassword = () => { // Usa el contexto para obtener y actualizar el email
    const [recoveryOption, setRecoveryOption] = useState('token'); // Opción de recuperación
    const [email, setEmailLocal] = useState(''); // Email local
    const handleContinue = async () => {
      if (email) {
        const res = await getUser(email);
        const question = res.data.questionKey[0]
        const user = res.data 

        if (res.success) {   
          if (recoveryOption === 'token') {
            const resEmail = await sendEmail({ email: email });
            resEmail.success 
              ? router.push({ pathname: '/verify-email', params: { email:email, option: 'forgotPassword' } })
              : Alert.alert("Ah ocurrido un error");
          } else if (recoveryOption === 'pregunta') {
             router.push({ pathname: '/VeryfyQuestion', params: { ...question, ...user } });
            console.log(user,question)
          }
        } else {
          Alert.alert('Error', res.message);
        }
      } else {
        Alert.alert('Error', 'Por favor, ingrese su correo electrónico.');
    }
    };

    return (
      <View style={styles.container}>
        <View style={styles.blueBackground}>
          <Image source={require('../assets/Imagen1.png')} style={styles.logo} />
          <Text style={styles.title}>Recuperación de Contraseña</Text>
          <Text style={styles.subtitle}>
            Seleccione cómo desea recuperar su contraseña: mediante token o pregunta secreta.
          </Text>
        </View>

        <View style={styles.whiteBox}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email} // Usa el valor del estado local
            onChangeText={setEmailLocal} // Actualiza el email localmente
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.radioContainer}>
            <CheckBox
              title="Token"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={recoveryOption === 'token'}
              onPress={() => setRecoveryOption('token')}
              containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
              textStyle={styles.radioText}
            />
            <CheckBox
              title="Pregunta Secreta"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={recoveryOption === 'pregunta'}
              onPress={() => setRecoveryOption('pregunta')}
              containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
              textStyle={styles.radioText}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
              <Text style={styles.continueText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <StatusBar barStyle="dark-content" />
      </View>
    );
};

export default ForgotPassword;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  blueBackground: {
    width: width,
    height: height * 0.4,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 10,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  whiteBox: {
    position: 'absolute',
    top: height * 0.32,
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  radioText: {
    fontSize: 16,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  cancelText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  continueText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
