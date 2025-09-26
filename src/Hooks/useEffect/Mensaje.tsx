import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  ImageBackground,
} from "react-native";
import Navbar from "../../Pages/Navbar";

export default function Mensaje() {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    console.log("El contador cambió:", contador);
  }, [contador]);

  return (
    <SafeAreaView style={styles.main}>
      <ImageBackground
        source={{
          uri: "https://i.pinimg.com/736x/93/83/59/938359e19ab1532ba2b52e8e3d4820e3.jpg", 
        }}
        style={styles.background}
      >
        <View style={styles.container}>
          {/* Card con el contador */}
          <View style={styles.card}>
            <Text style={styles.title}>Contador</Text>
            <Text style={styles.counter}>{contador}</Text>

            <TouchableOpacity
              onPress={() => setContador(contador + 1)}
              style={styles.saveButton}
            >
              <Ionicons name="arrow-up-circle" size={30} color="#fff" />
              <Text style={styles.buttonText}>Incrementar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Navbar />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 44,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "85%",
    backgroundColor: "#4e6cef",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  counter: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#002eab",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 10,
  },
});
