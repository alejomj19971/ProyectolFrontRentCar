import { useState,useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Componentes
import RegistroUsuario from './components/RegistroUsuario'
import CambioContraseña from './components/CambioContraseña'
import Car from './components/Car'
import Login from './components/Login'
import ListaCarros from './components/ListaCarros';
import EditarCarro from './components/EditarCarro';
import RentCar from './components/RentCar';
import ListaDisponibles from './components/ListaDisponibles';
//Tabs
import Tabs from './components/Tabs';
import DevolucionCarro from './components/DevolucionCarro';
import VehiculosDisponibles from './components/VehiculosDisponibles';


export default function App() {
  const Stack= createNativeStackNavigator();

  return (
    <NavigationContainer>

    <Stack.Navigator
    initialRouteName='Home'
    >
      <Stack.Screen  options={{headerShown: false}} 
          name="Login"  component={Login} 
        />
      <Stack.Screen
            name="RegistroUsuario"
            
            component={RegistroUsuario}
            options={{ headerShown: false,title:"Registrate" }} // Puedes ocultar también la barra de navegación aquí si es necesario
        />
          <Stack.Screen
          name="CambioContraseña"
          component={CambioContraseña}
          options={{ headerShown: false ,title:"Restablecer Contraseña"}} // Puedes ocultar también la barra de navegación aquí si es necesario
        />

      <Stack.Screen
          name="Home"
          component={Tabs}
          options={{ headerShown: false,title:"Rental Car" }} // Puedes ocultar también la barra de navegación aquí si es necesario
        />

        <Stack.Screen
          name="ListaCarros"
          title="Vehiculos"
          component={ListaCarros}
          options={{ headerShown: false }} // Puedes ocultar también la barra de navegación aquí si es necesario
        />  
        
      <Stack.Screen
          name="Car"
          title="Vehiculo"
          component={Car}
          options={{ headerShown: false }} // Puedes ocultar también la barra de navegación aquí si es necesario
        />

      <Stack.Screen
          name="EditarCarro"
          title="Edición"
          component={EditarCarro}
          options={{ headerShown: false }} // Puedes ocultar también la barra de navegación aquí si es necesario
        />

          <Stack.Screen
          name="RentCar"
          title="Rentar Vehiculo"
          component={RentCar}
          options={{ headerShown: false }} // Puedes ocultar también la barra de navegación aquí si es necesario
        />

<Stack.Screen
          name="VehiculosDisponibles"
          component={VehiculosDisponibles}
          options={{ headerShown: false }} // Puedes ocultar también la barra de navegación aquí si es necesario
        />

<Stack.Screen
          name="ListaDisponibles"
          title="Vehiculos Disponibles"
          component={ListaDisponibles}
          options={{ headerShown: false }} // Puedes ocultar también la barra de navegación aquí si es necesario
        />

        
    <Stack.Screen
          name="DevolucionCarro"
          title="Devolucion"
          component={DevolucionCarro}
          options={{ headerShown: false }} // Puedes ocultar también la barra de navegación aquí si es necesario
        />











    </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
