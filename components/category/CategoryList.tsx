import React, { useCallback } from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TVFocusGuideView 
} from 'react-native';
import { Content, CategoryData } from "@/components/category/data";

import CategoryCard from './CategoryCard';

interface CategoryListProps {
  listRefs: React.RefObject<FlatList<any>[]>;
  item: CategoryData;
  rowIndex: number;
  scrollToFocusedItem: (rowIndex: number, columnIndex: number) => void;
  focusedRowIndex: number;
}

export const CategoryList: React.FC<CategoryListProps> = React.memo(({ 
  listRefs, 
  item, 
  rowIndex, 
  scrollToFocusedItem, 
  focusedRowIndex
}: CategoryListProps) => {

  const renderCard = useCallback(
    ({ item, index }: { item: Content; index: number }) => (
      <CategoryCard
        rowIndex={rowIndex}
        data={item}
        index={index}
        scrollToFocusedItem={scrollToFocusedItem}
      />
    ),
    [rowIndex, scrollToFocusedItem]
  );

  const isRowFocused = focusedRowIndex === rowIndex;

  return (
    <TVFocusGuideView 
      autoFocus
      style={isRowFocused ? styles.focusedRow : styles.row}
    >
      <Text style={styles.rowTitle}>{item.categoryTitle}</Text>
      <FlatList
        ref={(ref) => {
          if (ref) listRefs.current[rowIndex] = ref;
        }}
        data={item.list}
        keyExtractor={(_, idx) => `card-${rowIndex}-${idx}`}
        horizontal
        renderItem={renderCard}
        contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={5}
        ListHeaderComponent={<View style={{ width: 100 }} />}
        ListFooterComponent={<View style={{ width: 60 }} />}
      />
    </TVFocusGuideView>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.item.id === nextProps.item.id &&
    prevProps.focusedRowIndex === nextProps.focusedRowIndex &&
    prevProps.rowIndex === nextProps.rowIndex &&
    prevProps.item.list.length === nextProps.item.list.length
  );
});

const styles = StyleSheet.create({
  row: {
    height: 500,
    opacity: 0.3,
    marginVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  focusedRow: {
    height: 500,
    opacity: 1.0,
    marginVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 10,
    shadowRadius: 7,
    elevation: 20,
  },
  rowTitle: {
    fontSize: 30,
    marginBottom: 20,
    paddingLeft: 100,
    color: "white",
    justifyContent: "center",
  },
});
