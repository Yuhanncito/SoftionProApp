import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // Para manejar el estado de carga
  const [count, setCount] = useState(3); // Contador de intentos
  const [countIntent, setCountIntent] = useState(0); // Contador de bloqueos
  
  const loginFunction = async () => {
    if (email && password) { // Validar que el email y la contraseña no estén vacíos
      setIsSubmitting(true);
      try {
        const res = await fetch('https://proto-api2-0.vercel.app/api', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }), // Enviar email y contraseña
        });

        const json = await res.json();
        
        if (json.message === 'correcto' || json.message === 'Tienes un Código Activo') {
          // Redirigir a la pantalla correcta según el mensaje
          Alert.alert(
            'Inicio de sesión exitoso',
            json.message,
            [{ text: 'OK', onPress: () => console.log("Navegar a otra pantalla") }],
          );
        } else {
          console.log(json.message);
          Alert.alert('Error', `${json.message} \nTienes ${count} intentos restantes`);
          setCount(count - 1); // Reducir el contador
        }
      } catch (err) {
        Alert.alert('Error', `Error interno: ${err}`);
      } finally {
        setIsSubmitting(false);
      }

      if (count === 0 && countIntent < 4) {
        setIsSubmitting(true);
        setTimeout(() => {
          setCount(3); // Restablecer intentos después de bloqueo
          setCountIntent(countIntent + 1);
        }, countIntent * 0.2 * 60 * 1000); // Bloqueo temporal
      }
    } else {
      Alert.alert('Error', 'Por favor, complete todos los campos');
    }
  };

  return (
    <View style={styles.container}>
      {/* Fondo azul */}
      <View style={styles.blueBackground}>
        <Image source={require('../assets/Imagen1.png')} style={styles.logo} />
        <Text style={styles.title}>Inicie sesión con su cuenta</Text>
        <Text style={styles.subtitle}>Introduce tu email y contraseña para iniciar sesión</Text>
      </View>

      {/* Contenedor blanco con sombra */}
      <View style={styles.whiteBox}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Correo</Text>
          <TextInput
            style={styles.input}
            placeholder="Correo"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contraseña</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secureTextEntry}
            />
            <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
              <Icon
                name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color="gray"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={loginFunction} disabled={isSubmitting}>
          <Text style={styles.buttonText}>
            {isSubmitting ? 'Iniciando...' : 'Iniciar Sesión'}
          </Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text>No tienes una cuenta? </Text>
          <TouchableOpacity>
            <Text style={styles.link}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

export default login;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff',
  },
  blueBackground: {
    width: width * 2,
    height: height * 0.4,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  whiteBox: {
    position: 'absolute',
    top: height * 0.3,
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
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  icon: {
    marginLeft: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  link: {
    color: '#0066cc',
  },
  button: {
    backgroundColor: '#0066cc',
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});
