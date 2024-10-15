import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { VerifyQuestion, sendEmail } from '../api/index';
import { router, useLocalSearchParams } from 'expo-router'; // Importa el router de Expo Router

const VeryfyQuestion = () => {
    const  {email,key, question}  = useLocalSearchParams();
    const [answer, setAnswer] = useState(''); 

    const handleContinue = async () => {
        if (answer.trim() === '') {
            Alert.alert('Error', 'Por favor, ingrese su respuesta.');
            return;
        }
        const res = await VerifyQuestion({
            email: email,
            secret: key,
            respuestaSecreta: answer
        });
        
        if(res.success){
          const resEmail = await sendEmail({email:email});
          resEmail.success 
            ? router.push({ pathname: '/verify-email', params: {  email:email ,option: 'forgotPassword' } })
            : Alert.alert("Ah ocurrido un error");
        } else {
            Alert.alert('Error', 'La respuesta es incorrecta o hubo un error. Inténtalo de nuevo.');
        }
    };

    useEffect(()=>{
      console.log(email,key,question)
    },[])

    return (
      <View style={styles.container}>
        <View style={styles.blueBackground}>
          <Image source={require('../assets/Imagen1.png')} style={styles.logo} />
          <Text style={styles.title}>Recuperación de Contraseña</Text>
          <Text style={styles.subtitle}>
            Escriba su respuesta a la pregunta que eligió al momento de crear su cuenta
          </Text>
        </View>

        <View style={styles.whiteBox}>
          <Text style={styles.label}>Pregunta Secreta</Text>
          <Text style={styles.secretQuestion}>
            {question}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Respuesta"
            value={answer}
            onChangeText={setAnswer}
          />

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

export default VeryfyQuestion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  blueBackground: {
    backgroundColor: '#007AFF',
    paddingVertical: 70,
    alignItems: 'center',
    paddingHorizontal: 20,
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  secretQuestion: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  input: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
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
