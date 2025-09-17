import { 
  FlatList,
  View,
  Text,
  StyleSheet,
  TVFocusGuideView, 
} from "react-native";
import React, { 
  useState, 
  useRef, 
  useCallback, 
} from "react";

import { CategoryData, Data } from "@/components/category/data";

import { CategoryList } from "@/components/category/CategoryList";
const DISPLAY_NAME = "CATEGORY LIST";

export default function FlatListofFlatListScreen() {

  const genreRef = useRef<FlatList<any>>(null);
  const listRefs = useRef<FlatList<any>[]>([]);

  const [focusedRowIndex, setFocusedRowIndex] = useState<number>(0);

  const scrollToFocusedItem = useCallback(
    (rowIndex: number, columnIndex: number) => {
      setFocusedRowIndex(rowIndex);
      genreRef.current?.scrollToIndex({
        index: rowIndex,
        animated: false,
        viewPosition: 0.5,
      });
      const listRef = listRefs.current[rowIndex];
      if (listRef) {
        listRef.scrollToIndex({
          index: columnIndex,
          animated: false,
          viewPosition: 0.5,
        });
      }
    },
    []  
  );

  const renderItem = useCallback(
    ({ item, index }: { item: CategoryData; index: number }) => (
      <CategoryList
        listRefs={listRefs}
        item={item}
        rowIndex={index}
        scrollToFocusedItem={scrollToFocusedItem}
        focusedRowIndex={focusedRowIndex}
      />
  ), [scrollToFocusedItem, focusedRowIndex]);

  return (
    <View style={styles.container}>
      { Data && Data?.length > 0 ? (
        <TVFocusGuideView
          trapFocusLeft
          trapFocusRight
          trapFocusUp
          trapFocusDown
          autoFocus 
        >
          <FlatList
            ref={genreRef}
            data={Data}
            ListHeaderComponent={() => (
              <View style={styles.headerContainer}>
                <Text style={styles.headerText}>{DISPLAY_NAME}</Text>
              </View>
            )}
            keyExtractor={(_, index) => `genre-${index}`}
            renderItem={renderItem}
            initialNumToRender={20}
            maxToRenderPerBatch={20}
            windowSize={20}
            removeClippedSubviews={false}
          />
        </TVFocusGuideView>
      ) : (
        <View style={styles.blank} />
      )}
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252E33",
    color: "black",
  },
  blank: {
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    paddingTop: 30,
    paddingBottom: 100,
    paddingRight: 50,
    flexDirection: "row",
  },
  headerText: {
    fontSize: 80,
    color: "white",
  },
});
