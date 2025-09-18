import React from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TVEventControl } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
    const timer = setTimeout(() => {
      console.log('EnableMenuKey()');
      TVEventControl.enableTVPanGesture();
      TVEventControl.enableTVMenuKey();
    }, 1000);
    return () => {
      console.log('Cleaning up...in _layout.tsx');
      clearTimeout(timer);
      TVEventControl.disableTVPanGesture();
      TVEventControl.disableTVMenuKey();
    };
  }, []);

  return <Stack screenOptions={{ headerShown: false }}></Stack>;
}
