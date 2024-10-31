import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';

const InviteUserScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const participants = [
    { id: '1', name: 'Usuario Anónimo', email: 'correo@correo.com' },
    { id: '2', name: 'Usuario Anónimo', email: 'correo@correo.com' },
  ];

  const renderParticipant = ({ item }) => (
    <View style={styles.participantCard}>
      <Icon name="person-circle-outline" size={40} color="#555" />
      <View style={styles.participantInfo}>
        <Text style={styles.participantName}>{item.name}</Text>
        <Text style={styles.participantEmail}>{item.email}</Text>
      </View>
      <TouchableOpacity>
        <Icon name="close-circle" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>WorkSpace de Gize</Text>
      </View>

      {/* Invite User Section */}
      <View style={styles.inviteContainer}>
        <Text style={styles.inviteTitle}>Invitar Usuario</Text>
        <Text style={styles.inviteSubtitle}>Correo</Text>

        <TextInput
          style={styles.input}
          placeholder="correo@correo.com"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.inviteButton}>
          <Text style={styles.inviteButtonText}>Invitar</Text>
        </TouchableOpacity>
      </View>

      {/* Participants List */}
      <Text style={styles.participantsTitle}>Participantes</Text>
      <FlatList
        data={participants}
        keyExtractor={(item) => item.id}
        renderItem={renderParticipant}
        contentContainerStyle={styles.participantsList}
      />
    </SafeAreaView>
  );
};

export default InviteUserScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    }, 
    header: {
      paddingTop: 60, // Espacio en la parte superior para el header
      backgroundColor: '#007AFF',
      paddingVertical: 15,
      alignItems: 'center',
      flexDirection: 'row',
    },
    backButton: {
      paddingHorizontal: 10,
      marginLeft: 10,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
      flex: 1,
      textAlign: 'center',
    },
  inviteContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  inviteSubtitle: {
    fontSize: 15,
    color: 'black',
    marginBottom: 10,
    fontWeight: 'bold',

  },
  inviteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#555',
  },
  inviteButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  inviteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  participantsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  participantsList: {
    paddingBottom: 20,
    marginHorizontal: 20,
  },
  participantCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  participantInfo: {
    flex: 1,
    marginLeft: 10,
  },
  participantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  participantEmail: {
    fontSize: 14,
    color: '#555',
  },
});
