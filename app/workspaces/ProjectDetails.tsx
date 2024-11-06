import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useLocalSearchParams, router } from "expo-router";
import BoardView from "./BoardView"; // Importa la vista del Tablero
import { getProjects } from "@/api";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Para recuperar el token

const ProjectDetails = () => {
  const { projectId, WorkUser } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState("Lista"); // Estado para la pestaña activa
  const [Task, setTask] = useState(null);

  const fetchTasks = async () => {
    const token = await AsyncStorage.getItem("authToken");
    console.log("token", token);
    const Task = await getProjects(token, projectId);
    setTask(Task);
    console.log("datos ts", Task);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const toggleTaskExpansion = (taskId) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };

  return (
    <View style={styles.container}>
      {/* Header con el nombre del proyecto y flecha de regreso */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{Task?.nameProject}</Text>
        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => 
            router.push({
              pathname: "/workspaces/detailsproject",
              params: { projectId: projectId, WorkUser: WorkUser },
            })
          }          
        >
          <Icon name="information-circle-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Pestañas (Lista y Tablero) */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Lista" ? styles.activeTab : null]}
          onPress={() => setActiveTab("Lista")}
        >
          <Text
            style={
              activeTab === "Lista"
                ? styles.activeTabText
                : styles.inactiveTabText
            }
          >
            Lista
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "Tablero" ? styles.activeTab : null,
          ]}
          onPress={() => setActiveTab("Tablero")}
        >
          <Text
            style={
              activeTab === "Tablero"
                ? styles.activeTabText
                : styles.inactiveTabText
            }
          >
            Tablero
          </Text>
        </TouchableOpacity>
      </View>

      {/* Contenido dinámico según la pestaña seleccionada */}
      {activeTab === "Lista" ? (
        <>
          {/* Campo de entrada para crear nueva tarea */}

          {/* Lista de tareas */}
          <Text style={styles.title}>Tareas: {Task?.tasks.length}</Text>
          <TextInput
            style={styles.newTaskInput}
            placeholder="Crea una nueva tarea"
            placeholderTextColor="#888"
          />
          <FlatList
            data={Task?.tasks}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
              <View style={styles.taskCard}>
                <TouchableOpacity onPress={() => toggleTaskExpansion(item.id)}>
                  <View style={styles.taskHeader}>
                    <Text style={styles.taskTitle}>{item.nameTask}</Text>
                    <Text style={styles.taskInfo}>
                      Horas: {item.timeHoursTaks}
                    </Text>
                    <Text style={styles.taskStatus}>{item.status}</Text>
                    <Icon
                      name={
                        expandedTaskId === item.id
                          ? "chevron-up"
                          : "chevron-down"
                      }
                      size={24}
                      color="#007AFF"
                    />
                  </View>
                </TouchableOpacity>
                {expandedTaskId === item.id && (
                  <View style={styles.expandedContent}>
                    <Text style={styles.taskDescription}>
                      Descripción: {item.descriptionTask}
                    </Text>
                    <View style={styles.actionButtons}>
                      <TouchableOpacity onPress={() => router.push('/workspaces/detailsTask')} style={styles.editButton}>
                        <Icon name="pencil" size={20} color="white" />
                        <Text style={styles.buttonText}>Editar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.deleteButton}>
                        <Icon name="trash" size={20} color="white" />
                        <Text style={styles.buttonText}>Eliminar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            )}
          />
        </>
      ) : (
        <BoardView tareas={Task?.tasks} /> // Mostrar la vista del Tablero
      )}

      {/* Botón para agregar nueva tarea */}
      <TouchableOpacity style={styles.addButton}>
        <Icon name="add-circle" size={48} color="#007AFF" />
      </TouchableOpacity>
    </View>
  );
};

export default ProjectDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#007AFF",
    padding: 15,
    paddingTop: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  infoButton: {
    marginLeft: 10,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
  },
  tab: {
    marginHorizontal: 20,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#007AFF",
    paddingBottom: 5,
  },
  activeTabText: {
    color: "#007AFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  inactiveTabText: {
    color: "#888",
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 15,
  },
  newTaskInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  taskCard: {
    backgroundColor: "#fff",
    padding: 20,
    marginHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  taskInfo: {
    fontSize: 16,
    color: "#555",
  },
  taskStatus: {
    fontSize: 14,
    color: "#007AFF",
    marginLeft: 10,
  },
  expandedContent: {
    marginTop: 10,
  },
  taskDescription: {
    fontSize: 14,
    color: "#777",
    marginBottom: 10,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    flexDirection: "row",
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  deleteButton: {
    flexDirection: "row",
    backgroundColor: "#FF3B30",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    marginLeft: 5,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
