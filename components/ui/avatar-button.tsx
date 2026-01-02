import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import SocialSvg from './social-svg';

export default function AvatarButton({ size = 36 }: { size?: number }) {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push('/Profile')}
      style={[styles.wrap, { width: size, height: size, borderRadius: size / 2 }]}
      accessibilityRole="button"
      accessibilityLabel="Open profile"
    >
      <View style={[styles.inner, { borderRadius: (size - 8) / 2, width: size - 8, height: size - 8 }]}> 
        <SocialSvg source={require('../../assets/images/profile.svg')} size={Math.max(16, size - 16)} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    backgroundColor: '#d7efe6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});