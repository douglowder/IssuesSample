import React, { 
  useState, 
  useRef, 
  useCallback,
  memo,
} from 'react';
import { 
  Text,
  Image, 
  StyleSheet, 
  TouchableOpacity, 
} from 'react-native';

import { throttle } from 'lodash';

import { Content } from "@/components/category/data";

interface CategoryCardProps {
  rowIndex: number;
  data: Content;
  index: number;
  scrollToFocusedItem: (rowIndex: number, columnIndex: number) => void;
}

const LODASH_CONSTANTS = {
  DISPLAY_TRANSITION_DELAY: 300,
  FOCUS_TRANSITION_DELAY: 100,
  TV_EVENT_DELAY: 100,
} as const;

const CategoryCard = memo(({
  rowIndex,
  data,
  index,
  scrollToFocusedItem,
}: CategoryCardProps) => {

  const [isFocused, setIsFocused] = useState(false);

  const throttledScrollToFocusedItem = useRef(
    throttle((rowIdx: number, colIdx: number) => {
      scrollToFocusedItem(rowIdx, colIdx);
    }, LODASH_CONSTANTS.FOCUS_TRANSITION_DELAY)
  ).current;

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    throttledScrollToFocusedItem(rowIndex, index);
  }, [throttledScrollToFocusedItem, index, rowIndex]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isFocused && styles.focusedCard,
      ]}
      delayPressIn={0}
      activeOpacity={1}
      onFocus={handleFocus}
      onBlur={handleBlur}
      hasTVPreferredFocus={rowIndex === 0 && index === 0}
    >
      <Image
        style={{
          width: "100%",
          height: undefined,
          aspectRatio: 16 / 9,
          resizeMode: "cover",
          alignSelf: "flex-start",
        }}
        source={{ uri: "https://oneuro.net/wp-content/uploads/2021/01/felix-lam-J7fxkhtOqt0-unsplash.jpg" }}
      />
      <Text style={styles.cardText}>{data.titleName}</Text>
    </TouchableOpacity>
  );

}, (prevProps, nextProps) => {
  return (
    prevProps.data.titleId === nextProps.data.titleId &&
    prevProps.index === nextProps.index &&
    prevProps.rowIndex === nextProps.rowIndex
  );
});

export default CategoryCard;

const styles = StyleSheet.create({
  card: {
    width: 550,
    height: 370,
    marginHorizontal: 5,
    backgroundColor: "#37474f",
    alignSelf: "center",
  },
  focusedCard: {
    width: 550 * 1.1,
    height: 370 * 1.1,
    backgroundColor: "#EB5427",
  },
  cardText: {
    fontSize: 30,
    color: "white",
    justifyContent: "center",
    alignItems: "flex-start",
    height: 70,
    paddingVertical: 20,
  },
});
