import React from "react";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import Navbar from "./Navbar";
export default function Principal() {
    return (
        <ImageBackground
            source={{ uri: "https://i.pinimg.com/736x/5b/75/33/5b753352a793859950c930f9909e8495.jpg" }}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay} />
            <View style={styles.container}>
                <Image style={{ width: 200, height: 200, borderRadius: 100 }} source={{ uri: 'https://imgs.search.brave.com/P0iwyPn688FcKp4RYILwKziBsn3t9mliMzdz_NeZsko/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9h/bmRyb2d5bm91cy1h/dmF0YXItbm9uLWJp/bmFyeS1xdWVlci1w/ZXJzb25fMjMtMjE1/MTEwMDIyNi5qcGc_/c2VtdD1haXNfaW5j/b21pbmcmdz03NDAm/cT04MA' }} />

                <Text style={styles.title}>Bienvenidos a Aplicaciones Móviles</Text>
            </View>
            <Navbar />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1 },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.4)"
    },
    container: {
        flex: 1, justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 24,
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center"
    },
});
