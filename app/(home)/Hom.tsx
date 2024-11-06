import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, BackHandler, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter, useFocusEffect } from 'expo-router';
import OrganismoCard from '@/components/organismos/organismo_card';
import { getUserData, getWorkSpaces } from '../../api/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IndexScreen = () => {
  const router = useRouter();
  const [workspaces, setWorkspaces] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        Alert.alert("Salir", "¿Estás seguro de que quieres salir de la aplicación?", [
          { text: "Cancelar", onPress: () => null, style: "cancel" },
          { text: "Salir", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
      return () => backHandler.remove();
    }, [])
  );

  const fetchWorkspaces = async () => {
    setRefreshing(true);
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        console.log("No se encontró el token.");
        return;
      }
      const data = await getWorkSpaces(token);
      setWorkspaces(data);
    } catch (error) {
      console.log("Error fetching workspaces:", error);
      setWorkspaces([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchUser = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        console.log("No se encontró el token.");
        return;
      }
      const data = await getUserData(token);
      console.log("cosas del usuario",data);
      setUser(data.user);
    } catch (error) {
      console.log("Error fetching user:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchWorkspaces();
    fetchUser();
  }, []);

  const onRefresh = useCallback(() => {
    fetchWorkspaces();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Cargando áreas de trabajo...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {user && (
        <View style={styles.header}>
          <Icon name="person-circle" size={50} color="white" />
          <View style={styles.headerTextContainer}>
            <Text style={styles.welcomeText}>Bienvenido de nuevo</Text>
            <Text style={styles.userName}>{`${user.name} ${user.lastName}`}</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/Notifications')}>
            <Icon name="notifications" size={30} color="white" style={styles.bellIcon} />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.mainContent}>
        <Text style={styles.workAreasText}>Áreas de trabajo</Text>

        <FlatList
          data={workspaces}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <OrganismoCard workspace={item} userLogged={user.email} />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  );
};

export default IndexScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 15,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  welcomeText: {
    color: 'white',
    fontSize: 16,
  },
  userName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bellIcon: {
    marginRight: 10,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  workAreasText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    marginBottom: 15,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
