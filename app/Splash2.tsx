import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function Splash2() {
  const router = useRouter();
  const handleNext = () => {
    router.replace('/Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.treeContainer}>
        <Image
          source={require('../assets/images/tree.png')}
          style={styles.tree}
        />
      </View>
      <View style={styles.centerContent}>
        <Text style={styles.mottoLabel}>OUR MOTTO</Text>
        <Text style={styles.mottoText}>
          <Text style={styles.mottoGreen}>
            "Honoring Memories{"\n"}Embracing Peace"
          </Text>
        </Text>
      </View>
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
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  treeContainer: {
    width: width,
    height: 300,
    position: 'absolute',
    top: 90,
    right: 0,
    alignItems: 'flex-end',
    zIndex: 1,
    overflow: 'hidden',
  },
  tree: {
    width: width * 1.25,
    height: 370,
    resizeMode: 'cover',
    marginRight: -width * 0.12,
    marginTop: 0,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    zIndex: 2,
    paddingHorizontal: 24,
    marginTop: 40,
  },
  mottoLabel: {
    fontSize: 11,
    color: '#222',
    fontWeight: 'bold',
    marginBottom: 18,
    letterSpacing: 1,
  },
  mottoText: {
    fontSize: 22,
    color: '#0a3d3d',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 32,
  },
  mottoGreen: {
    color: '#0a3d3d',
    fontWeight: 'bold',
    fontSize: 22,
  },
  button: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    backgroundColor: '#0a3d3d',
    borderRadius: 25,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
}); 