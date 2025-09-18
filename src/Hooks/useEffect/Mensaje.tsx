import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect  } from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Mensaje() {
    const [contador, setContador]= useState(0);

    useEffect(() =>{
        console.log("Elcontador cambio:", contador);
    }, [contador]);
 
  return (
    <View style={styles.container}>
    <Text style={styles.text}>Contador:{contador}</Text>
    <TouchableOpacity onPress={() => setContador(contador + 1)} style={styles.saveButton}>
            <Ionicons name='arrow-up-circle' size={30} />
            <Text >Contador</Text>
          </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#b0bfe8ff',
    padding: 50,
    alignItems: 'center',
    justifyContent: 'center',

  },
  saveButton: {
    backgroundColor: '#a4baf6ff',
    marginTop: 30,
    paddingVertical: 6,
    borderRadius: 40,
    padding: 15

  },
  text:{
    fontSize:40,
  },
  
});