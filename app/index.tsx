import React, { useEffect } from "react";
import { Image, StyleSheet, Pressable, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { scale } from 'react-native-size-matters';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView>
        <Pressable
          onPress={() => {
            router.push({ pathname: '/menudetect' });
          }}
          style={({ pressed, focused }) => [
            styles.button,
            pressed || focused ? { backgroundColor: 'blue' } : {},
          ]}
        >
          <Text style={styles.buttonText}>To menudetect</Text>
        </Pressable>
      </ThemedView>
      <ThemedView>
        <Pressable
          onPress={() => {
            router.push({ pathname: '/flatListofFlatList' });
          }}
          style={({ pressed, focused }) => [
            styles.button,
            pressed || focused ? { backgroundColor: 'blue' } : {},
          ]}
        >
          <Text style={styles.buttonText}>To FlatListofFlatList</Text>
        </Pressable>
      </ThemedView>
      <ThemedView>
        <Pressable
          onPress={() => {
            router.push({ pathname: '/anotherList' });
          }}
          style={({ pressed, focused }) => [
            styles.button,
            pressed || focused ? { backgroundColor: 'blue' } : {},
          ]}
        >
          <Text style={styles.buttonText}>To anotherList</Text>
        </Pressable>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  stepContainer: {
    gap: scale(8),
    marginBottom: scale(8),
  },
  reactLogo: {
    height: scale(75),
    width: scale(150),
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  button: {
    backgroundColor: 'darkblue',
    margin: scale(5),
    borderRadius: scale(2),
    padding: scale(5),
  },
  buttonText: {
    color: 'white',
    fontSize: scale(8),
  },
});
