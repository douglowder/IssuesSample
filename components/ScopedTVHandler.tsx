import React from "react";
import { useFocusEffect } from '@react-navigation/native';
import { TVEventHandler }  from "react-native";

export const useScopedTVHandler = (enabled: boolean, page: string, handlerFn: (evt) => void) => {
  const handlerRef = React.useRef<any>(null);

  useFocusEffect(
    React.useCallback(() => {
      if (!enabled) return;

      console.log(`TVEventHandler.addListener - ScopedTVHandler ${page}`);
      handlerRef.current = TVEventHandler.addListener(handlerFn);

      return () => {
        console.log(`TVEventHandler.removeListener - ScopedTVHandler ${page}`);
        handlerRef.current?.remove();
        handlerRef.current = null;
      };
    }, [enabled, handlerFn])
  );
};
