import React, { useCallback } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { HWEvent, StyleSheet, useTVEventHandler } from 'react-native';
import { scale } from 'react-native-size-matters';
// import { useRouter } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// import { useScopedTVHandler } from '@/components/ScopedTVHandler';

export default function MenuDetectScreen() {
  // const router = useRouter();

  const tvhandler = useCallback((evt: HWEvent) => {
    if (evt && evt.eventType) {
      switch (evt.eventType) {
        case 'right':
          console.log(`Right button pressed Detected`);
          break;
        case 'left':
          console.log(`Left button pressed Detected`);
          break;
        case 'menu':
          console.log(`Menu button pressed Detected`);
          break;
        default:
          break;
      }
    }
  }, []);

  // useScopedTVHandler(true, "menuDetect", tvhandler);
  useTVEventHandler(tvhandler);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Ionicons
          size={scale(200)}
          name="code-slash"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Menu Detect Screen</ThemedText>
      </ThemedView>
      <ThemedText>Screen for menu presses detection.</ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: scale(-30),
    left: 0,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: scale(8),
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
