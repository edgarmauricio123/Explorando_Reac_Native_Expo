import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Principal from "./src/Pages/Principal";
import Alumnos from "./src/Pages/Alumnos";
import Navbar from "./src/Pages/Navbar";
import Mensaje from "./src/Hooks/useEffect/Mensaje";
import Colores from "./src/Hooks/useState/Colores";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Principal" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Principal" component={Principal} />
        <Stack.Screen name="Alumnos" component={Alumnos} />
        <Stack.Screen name="Mensaje" component={Mensaje} />
        <Stack.Screen name="Colores" component={Colores} />


        {/* Agrega aquí las demás pantallas */}
      </Stack.Navigator>
      <Navbar />
    </NavigationContainer>
  );
}