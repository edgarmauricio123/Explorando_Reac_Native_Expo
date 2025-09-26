import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from '@react-navigation/stack';

// Define your stack param list
type RootStackParamList = {
  Principal: undefined;
  Alumnos: undefined;
  Mensaje: undefined;
  Colores: undefined;
};

export default function Navbar() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Principal")}>
        <Ionicons name="home-sharp" size={28} color="#000" />
        <Text style={styles.navText}>Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Alumnos")}>
        <Ionicons name="people-circle-outline" size={28} color="#000" />
        <Text style={styles.navText}>Alumnos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Mensaje")}>
        <Ionicons name="chevron-collapse-outline" size={28} color="#000" />
        <Text style={styles.navText}>Contador</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Colores")}>
        <Ionicons name="color-palette-sharp" size={28} color="#000" />
        <Text style={styles.navText}>Colores</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    position: "absolute",
    bottom: 20,
    left: 10,
    right: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 15,
  },
  navItem: { alignItems: "center" },
  navText: { fontSize: 12, color: "#000", marginTop: 4 },
});
