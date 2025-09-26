import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  ImageBackground,
} from "react-native";
import Navbar from "../../Pages/Navbar";

export default function Colores() {
  const [color, setColor] = useState("#f2c5baff");
  const [contador, setContador] = useState(0);

  const cambiarColor = () => {
    const colores = ["#a4f6b3ff", "#002eabff", "#a4f4cfff", "#e7adaaff"];
    setColor(colores[Math.floor(Math.random() * colores.length)]);
    setContador(contador + 1);
  };

  return (
    <SafeAreaView style={styles.main}>
      <ImageBackground
        source={{
          uri: "https://i.pinimg.com/736x/36/32/14/363214f17a70e1ce911a1eaca4382d7d.jpg", 
        }}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Card con el contador */}
          <View style={[styles.card, { backgroundColor: color }]}>
            <Text style={styles.title}>Contador de Colores</Text>
            <Text style={styles.counter}>{contador}</Text>
            <TouchableOpacity onPress={cambiarColor} style={styles.saveButton}>
              <Text style={styles.buttonText}>Cambiar Colores</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Navbar />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#ecfafdff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 44,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "90%",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#fff",
  },
  counter: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#4e6cef",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
