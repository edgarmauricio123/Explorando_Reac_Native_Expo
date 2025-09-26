import React, { useState, useCallback } from "react";
import { Picker } from '@react-native-picker/picker';
import {
    StyleSheet, View, Text, TextInput, Image, TouchableOpacity,
    ScrollView, ImageBackground,
    Platform,
    StatusBar
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Navbar from "./Navbar";
import { useFocusEffect } from "@react-navigation/native";

export default function Alumnos() {
    const [nuevoAlumno, setNuevoAlumno] = useState({
        nombre: "", apellido: "", semestre: "", carrera: "", telefono: "", imagenURL: ""
    });
    const [alumnos, setAlumnos] = useState<any[]>([]);
    const [editado, setEditado] = useState(false);
    const [idEditando, setIdEditando] = useState<number | null>(null);

    // Traer alumnos desde la base de datos
    const cargarAlumnos = async () => {
        try {
            const response = await fetch("http://10.91.161.168/api/getAlumnos.php");
            const data = await response.json();
            setAlumnos(data);
        } catch (error) {
            console.error(error);
            alert("Error al cargar alumnos");
        }
    };

    // Cuando la pantalla se enfoca, recargar alumnos
    useFocusEffect(
        useCallback(() => {
            cargarAlumnos();
        }, [])
    );

    // Guardar o actualizar alumno
    const guardarAlumno = async () => {
        try {
            const url = editado
                ? "http://10.91.161.168/api/actualizarAlumno.php"
                : "http://10.91.161.168/api/guardarAlumno.php";

            const bodyData = editado
                ? { ...nuevoAlumno, id: idEditando }
                : nuevoAlumno;

            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyData)
            });

            const data = await response.json();
            alert(data.message);

            if (data.success) {
                cargarAlumnos();
                setNuevoAlumno({ nombre: "", apellido: "", semestre: "", carrera: "", telefono: "", imagenURL: "" });
                setEditado(false);
                setIdEditando(null);
            }
        } catch (error) {
            console.error(error);
            alert("Error al conectar con el servidor");
        }
    };

    // Eliminar alumno
    const eliminarAlumno = async (id: number) => {
        try {
            const response = await fetch("http://10.91.161.168/api/eliminarAlumno.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });
            const data = await response.json();
            alert(data.message);
            if (data.success) cargarAlumnos();
        } catch (error) {
            console.error(error);
            alert("Error al eliminar alumno");
        }
    };

    // 🔹 Editar alumno (cargar en formulario)
    const editarAlumnos = (alumno: any) => {
        setNuevoAlumno({
            nombre: alumno.nombre,
            apellido: alumno.apellido,
            semestre: alumno.semestre,
            carrera: alumno.carrera,
            telefono: alumno.telefono,
            imagenURL: alumno.imagenURL
        });
        setEditado(true);
        setIdEditando(alumno.id);
    };

    // 🔹 Seleccionar imagen
    const seleccionarImagen = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1
        });
        if (!result.canceled) setNuevoAlumno({ ...nuevoAlumno, imagenURL: result.assets[0].uri });
    };

    return (
        <ImageBackground
            source={{ uri: "https://i.pinimg.com/736x/a5/98/eb/a598ebc359b4d5ab395b4e8c350dafeb.jpg" }}
            style={styles.background} resizeMode="cover"
        >
            <ScrollView style={styles.main}>
                <View style={styles.card}>
                    <Text style={styles.title}>Formulario Alumnos</Text>

                    <TextInput style={styles.input} placeholder="Nombre"  maxLength={20} value={nuevoAlumno.nombre}
                        onChangeText={t => setNuevoAlumno({ ...nuevoAlumno, nombre: t })} />

                    <TextInput style={styles.input} placeholder="Apellido"  maxLength={20} value={nuevoAlumno.apellido}
                        onChangeText={t => setNuevoAlumno({ ...nuevoAlumno, apellido: t })} />

                    <View style={styles.input}>
                        <Picker
                            selectedValue={nuevoAlumno.semestre}
                            onValueChange={value => setNuevoAlumno({ ...nuevoAlumno, semestre: value })}
                            style={{ height: 50 }}
                        >
                            <Picker.Item label="Selecciona semestre" value="" />
                            {[...Array(9)].map((_, i) => (
                                <Picker.Item key={i + 1} label={`${i + 1}° Semestre`} value={(i + 1).toString()} />
                            ))}
                        </Picker>
                    </View>

                    <View style={styles.input}>
                        <Picker
                            selectedValue={nuevoAlumno.carrera}
                            onValueChange={value => setNuevoAlumno({ ...nuevoAlumno, carrera: value })}
                            style={{ height: 50 }}
                        >
                            <Picker.Item label="Selecciona carrera" value="" />
                            <Picker.Item label="Ingeniería en Sistemas" value="Ingeniería en Sistemas" />
                            <Picker.Item label="Ingeniería Industrial" value="Ingeniería Industrial" />
                            <Picker.Item label="Ingeniería Civil" value="Ingeniería Civil" />
                            <Picker.Item label="Ingeniería Mecatrónica" value="Ingeniería Mecatrónica" />
                            <Picker.Item label="Administración" value="Administración" />
                            <Picker.Item label="Arquitectura" value="Arquitectura" />
                        </Picker>
                    </View>

                    <TextInput style={styles.input} placeholder="Teléfono" maxLength={10}
                        value={nuevoAlumno.telefono} keyboardType="numeric"
                        onChangeText={t => setNuevoAlumno({ ...nuevoAlumno, telefono: t })} />

                    <TouchableOpacity style={styles.imgButton} onPress={seleccionarImagen}>
                        <Text style={styles.imgButtonText}>Seleccionar Imagen</Text>
                    </TouchableOpacity>

                    {nuevoAlumno.imagenURL &&
                        <Image source={{ uri: nuevoAlumno.imagenURL }} style={styles.imgPreview} />
                    }

                    <TouchableOpacity style={styles.button} onPress={guardarAlumno}>
                        <Text style={styles.buttonText}>
                            {editado ? "Actualizar Alumno" : "Agregar Alumno"}
                        </Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.tableTitle}>Tabla de Alumnos</Text>

                {/* 🔹 Reemplazo de FlatList por map() */}
                {alumnos.map((item) => (
                    <View key={item.id} style={styles.tableRow}>
                        <Text>{item.nombre}</Text>
                        <Text>{item.apellido}</Text>
                        <Text>{item.semestre}</Text>
                        <Text>{item.carrera}</Text>
                        <Text>{item.telefono}</Text>
                        {item.imagenURL && <Image source={{ uri: item.imagenURL }} style={styles.img} />}
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity style={styles.editButton} onPress={() => editarAlumnos(item)}>
                                <Text>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => eliminarAlumno(item.id)}>
                                <Text>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <Navbar />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1 },
    main: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 44,
        paddingHorizontal: 15
    },
    card: {
        backgroundColor: '#e0daf7',
        padding: 15,
        borderRadius: 12,
        marginBottom: 20
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    input: {
        backgroundColor: '#f2ffff',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    imgButton: {
        backgroundColor: '#6c63ff',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center'
    },
    imgButtonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    imgPreview: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'center'
    },
    button: {
        backgroundColor: '#002eabff',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    tableTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color:'#ffffffff'
    },
  tableRow: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8
},

    img: {
        width: 50,
        height: 50,
        marginVertical: 5
    },
    editButton: {
        backgroundColor: '#ffc107',
        padding: 5,
        marginRight: 5,
        borderRadius: 5
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        padding: 5,
        borderRadius: 5
    },
});
