import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import { getWorkSpacesById, createNewProject } from '@/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WorkSpaceProjects = () => {
  const { workspaceId } = useLocalSearchParams();
  const [Workspace, setWorkspace] = useState(null);
  const [newProjectName, setNewProjectName] = useState('');
  const [projectsSuccess, setProjectsSuccess] = useState(false);
  const [loading, setLoading] = useState(true); // Estado de carga

  const fetchWorkspaces = async () => {
    setLoading(true); // Iniciar el estado de carga
    const token = await AsyncStorage.getItem('authToken');
    const workspaces = await getWorkSpacesById(token, workspaceId);
    setWorkspace(workspaces);
    setLoading(false); // Terminar el estado de carga
  };

  const handleAddProject = async () => {
    if (newProjectName.trim()) {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const newProjectData = { nameProject: newProjectName, workspaceid: workspaceId };
        const result = await createNewProject(token, newProjectData);

        if (result.message !== 'ok') {
          Alert.alert('Error', 'Ocurrió un error al crear el proyecto');
          setProjectsSuccess(false);
          return;
        }

        setProjectsSuccess(true);
        Alert.alert('Proyecto creado', 'Se ha creado el proyecto exitosamente');
        setNewProjectName('');
      } catch (error) {
        Alert.alert('Error', 'Ocurrió un error al crear el proyecto');
      }
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const result = await deleteProject(token, projectId);

      if (result.message === 'ok') {
        Alert.alert('Proyecto eliminado', 'El proyecto ha sido eliminado exitosamente');
        setProjectsSuccess((prev) => !prev);
      } else {
        Alert.alert('Error', 'Ocurrió un error al eliminar el proyecto');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al eliminar el proyecto');
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, [projectsSuccess]);

  // Mostrar indicador de carga si los datos aún están cargando
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.workspaceTitle}>WorkSpace de {Workspace?.propetaryUser.name}</Text>
        <TouchableOpacity onPress={() => router.push('/workspaces/detailsWorkspace')} style={styles.infoButton}>
          <Icon name="information-circle-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Proyectos: {Workspace?.projects.length}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Crea un nuevo proyecto"
          value={newProjectName}
          onChangeText={setNewProjectName}
          onSubmitEditing={handleAddProject}
        />
      </View>

      <FlatList
        data={Workspace?.projects}
        keyExtractor={(item) => item._id || item.nameProject}
        renderItem={({ item }) => (
          <View style={styles.projectCard}>
            <TouchableOpacity
              style={styles.projectInfoContainer}
              onPress={() =>
                router.push({
                  pathname: '/workspaces/ProjectDetails',
                  params: { projectId: item._id },
                })
              }
            >
              <View style={styles.projectInfo}>
                <Text style={styles.projectName}>{item.nameProject}</Text>
                <View style={styles.projectDetails}>
                  <Text style={styles.projectTasks}>Tareas: {item.tasks.length}</Text>
                  <Text style={styles.projectStatus}>{item.status}</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleDeleteProject(item._id)}>
              <Icon name="close-circle" size={24} color="red" style={styles.deleteIcon} />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddProject}>
        <Icon name="add-circle" size={48} color="#007AFF" />
      </TouchableOpacity>
    </View>
  );
};

export default WorkSpaceProjects;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 15,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 5,
  },
  workspaceTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  infoButton: {
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    marginLeft: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  projectCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginHorizontal: 20,
  },
  projectInfoContainer: {
    flex: 1,
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  projectDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  projectTasks: {
    fontSize: 16,
    color: '#888',
  },
  projectStatus: {
    fontSize: 16,
    color: '#555',
    textAlign: 'right',
  },
  deleteIcon: {
    marginLeft: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'transparent',
  },
});
