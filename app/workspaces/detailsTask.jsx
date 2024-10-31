import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { router } from 'expo-router';

const ProjectInfoScreen = () => {
  const [description, setDescription] = useState("Diseño de pantallas que contendrá la app de SoftionPro para entornos WEBs que funcionen de manera responsiva y sean accesibles para cualquier dispositivo.");
  const [status, setStatus] = useState("Pendiente");
  const [hours, setHours] = useState(28); // Horas dedicadas
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
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Diseño del mapa</Text>
      </View>

      {/* Descripción */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descripción</Text>
        <TouchableOpacity style={styles.editIcon}>
          <Icon name="pencil" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.sectionContent}>{description}</Text>
      </View>

      {/* Horas dedicadas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Horas Dedicadas</Text>
        <TouchableOpacity style={styles.editIcon}>
          <Icon name="pencil" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.sectionContent}>{hours}</Text>
      </View>

      {/* Responsables */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Responsables</Text>
        <TouchableOpacity style={styles.addIcon}>
          <Icon name="person-add" size={24} color="black" />
        </TouchableOpacity>
        <FlatList
          data={participants}
          keyExtractor={(item) => item.id}
          renderItem={renderParticipant}
          contentContainerStyle={styles.participantsList}
        />
      </View>

      {/* Estado */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estado</Text>
        <TouchableOpacity style={styles.editIcon}>
          <Icon name="pencil" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.sectionContent}>{status}</Text>
      </View>

      {/* Proyecto */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Proyecto</Text>
        <Text style={styles.sectionContent}>Desarrollo WEB SoftionPro</Text>
      </View>

      {/* Área de trabajo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Área de trabajo</Text>
        <Text style={styles.sectionContent}>WorkSpace de Gize</Text>
      </View>

      {/* Botón Guardar */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    paddingVertical: 20,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 10,
    paddingTop: 43,
    paddingHorizontal: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  section: {
    top: 25,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    position: 'relative',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionContent: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  editIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  addIcon: {
    position: 'absolute',
    right: 10,
    top: 5,
  },
  participantsList: {
    paddingBottom: 20,
  },
  participantCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  participantInfo: {
    flex: 1,
    marginLeft: 10,
  },
  participantName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  participantEmail: {
    fontSize: 14,
    color: '#555',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProjectInfoScreen;
