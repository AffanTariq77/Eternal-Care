import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Splash2 from './Splash2';

export default function SplashScreen({ navigation }: any) {
  const [showSecond, setShowSecond] = useState(false);

  if (showSecond) {
    return <Splash2 />;
  }

  const handleNext = () => {
    setShowSecond(true);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Eternal Care logo black.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Ionicons name="arrow-forward" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 320,
    height: 320,
    marginBottom: 60,
  },
  button: {
    position: 'absolute',
    bottom: 60,
    backgroundColor: '#0a3d3d',
    borderRadius: 25,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 