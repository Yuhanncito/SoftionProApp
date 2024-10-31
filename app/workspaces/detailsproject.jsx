import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { router } from 'expo-router';

const ProjectInfoScreen = () => {
  const [description, setDescription] = useState("Diseño de pantallas que contendrá la app de SoftionPro para entornos WEBs que funcionen de manera responsiva y sean accesibles para cualquier dispositivo.");
  const [status, setStatus] = useState("Pendiente");
  const tasks = [
    { id: '1', name: 'Diseño del mapa de Navegación', hours: 5, status: 'Pendiente' },
    { id: '2', name: 'Diseño del mapa de Navegación', hours: 5, status: 'Pendiente' }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Proyecto 22</Text>
      </View>

      {/* Descripción */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gera</Text>
        <TouchableOpacity style={styles.editIcon}>
          <Icon name="pencil" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.sectionContent}>{description}</Text>
      </View>

      {/* Tareas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tareas</Text>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskCard}>
              <Text style={styles.taskTitle}>{item.name}</Text>
              <Text style={styles.taskInfo}>Horas: {item.hours}</Text>
              <Text style={styles.taskStatus}>{item.status}</Text>
              <TouchableOpacity style={styles.deleteIcon}>
                <Icon name="close-circle-outline" size={20} color="red" />
              </TouchableOpacity>
            </View>
          )}
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

      {/* Área de trabajo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Área de trabajo</Text>
        <Text style={styles.sectionContent}>WorkSpace de Gize</Text>
      </View>

      {/* Botón Guardar */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#333',
  },
  section: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionContent: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  editIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  taskCard: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
  },
  taskInfo: {
    fontSize: 12,
    color: '#555',
  },
  taskStatus: {
    fontSize: 12,
    color: '#007AFF',
  },
  deleteIcon: {
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProjectInfoScreen;
