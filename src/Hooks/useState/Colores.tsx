import React, { useState } from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Colores() {
  const [color, setcolor] = useState('#f2c5baff');

  const cambiarColor = () => {
    const colores = ['#a4baf6ff', '#002eabff', '#a4f4cfff', '#e7adaaff'];
    const nuevocolor = colores[Math.floor(Math.random() * colores.length)];
    setcolor(nuevocolor)
  };
  return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <Text>Cambiar color</Text>
      <TouchableOpacity onPress={cambiarColor} style={styles.saveButton}>
        <Text >Ver mas</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  button: {
    marginRight: 20,
  },
});