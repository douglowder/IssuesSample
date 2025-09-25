import React, { useCallback } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  HWEvent,
  StyleSheet,
  TVEventHandler,
  useTVEventHandler,
} from 'react-native';
import { scale } from 'react-native-size-matters';
// import { useRouter } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useFocusEffect } from 'expo-router';

// import { useScopedTVHandler } from '@/components/ScopedTVHandler';

export default function MenuDetectScreen() {
  // const router = useRouter();

  const tvhandler = useCallback((evt: HWEvent) => {
    if (evt && evt.eventType) {
      switch (evt.eventType) {
        case 'right':
          console.log(`Right button pressed in menudetect screen`);
          break;
        case 'left':
          console.log(`Left button pressed in menudetect screen`);
          break;
        case 'menu':
          console.log(`Menu button pressed in menudetect screen`);
          break;
        default:
          break;
      }
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      console.log(`MenuDetectScreen focused`);
      const subscription = TVEventHandler.addListener(tvhandler);
      return () => {
        console.log(`MenuDetectScreen unfocused`);
        subscription?.remove();
      };
    }, [tvhandler]),
  );

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
