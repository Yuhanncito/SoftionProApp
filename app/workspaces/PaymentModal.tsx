// screens/PaymentScreen.js

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';

const PaymentScreen = () => {
  const router = useRouter();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  // Aquí inicializamos el PaymentSheet utilizando el client_secret de prueba
  const initializePaymentSheet = async () => {
    const clientSecret = 'sk_test_51QKVmjP1oykOtShyug92Sc0ZNEggk9njS0lu9FhV2t2olKI1i7u02rycz3vtRyJmPYJiFx4CqYjgRNAZmTujPJzf00vel352gj'; // Ejemplo de client_secret de prueba

    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: 'Mi Tienda',
    });

    if (!error) {
      setLoading(true);
    } else {
      Alert.alert('Error', 'No se pudo inicializar el pago');
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const handlePayment = async () => {
    if (!loading) return;

    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert('Error', `Pago fallido: ${error.message}`);
    } else {
      Alert.alert('Pago realizado con éxito', '¡Gracias por tu compra!');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        
        <Image
          source={{ uri: 'https://images.teamtailor-cdn.com/images/s3/teamtailor-production/gallery_picture-v6/image_uploads/5b06eef7-7560-46d5-92be-c57c2c5748bd/original.png' }}
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>Datos de Pago</Text>

      <View style={styles.planDetails}>
        <Text style={styles.planText}>Plan anual - Ilimitado</Text>
        <Text style={styles.planSubtext}>Acceso a espacios ilimitados y más funcionalidades</Text>
        <Text style={styles.price}>$20 MXN / mes</Text>
      </View>

      <View style={styles.additionalInfo}>
        <Text style={styles.infoText}>Suscripción anual: Renueva automáticamente cada año por solo $20 MXN al mes.</Text>
        <Text style={styles.infoText}>✓ Acceso a espacios ilimitados</Text>
        <Text style={styles.infoText}>✓ Acceso a campos personalizados</Text>
        <Text style={styles.infoText}>✓ Soporte 24/7</Text>
      </View>

      <TouchableOpacity style={styles.subscribeButton} onPress={handlePayment} disabled={!loading}>
        <Text style={styles.subscribeButtonText}>Suscribirme</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default function PaymentWrapper() {
  return (
    <StripeProvider publishableKey="pk_test_51QKVmjP1oykOtShycfNq7CBob1oMYiBGfONHSdtnFLnfTD67u0IAecrX5MS1odjTzEAUzZQVMzoJQwGZw7RpVz0600unbsuYKB">
      <PaymentScreen />
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
    top: 10,
    marginTop: 20,
  },
  backButton: {
    marginRight: 10,
  },
  logo: {
    width: 150,
    height: 40,
    resizeMode: 'contain',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 10,
  },
  planDetails: {
    backgroundColor: '#E6E6FA',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  planText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  planSubtext: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
    textAlign: 'center',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  additionalInfo: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
  },
  infoText: {
    color: '#555',
    fontSize: 14,
    marginBottom: 5,
  },
  subscribeButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  subscribeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
