import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TVFocusGuideView,
  View,
} from "react-native";
import React, { useState } from "react";

type SimpleListItem = {
  title: string;
  column: number;
  row: number;
};

const SimpleKeywords: Array<SimpleListItem> = [
  { title: "A", column: 0, row: 0 },
  { title: "B", column: 1, row: 0 },
  { title: "C", column: 2, row: 0 },
  { title: "D", column: 3, row: 0 },
  { title: "E", column: 4, row: 0 },
  { title: "F", column: 5, row: 0 },
  { title: "G", column: 0, row: 1 },
  { title: "F", column: 1, row: 1 },
  { title: "G", column: 2, row: 1 },
  { title: "H", column: 3, row: 1 },
  { title: "I", column: 4, row: 1 },
  { title: "J", column: 5, row: 1 },
  { title: "K", column: 0, row: 2 },
  { title: "L", column: 1, row: 2 },
  { title: "M", column: 2, row: 2 },
  { title: "N", column: 3, row: 2 },
  { title: "O", column: 4, row: 2 },
  { title: "P", column: 5, row: 2 },
  { title: "S", column: 0, row: 3 },
  { title: "T", column: 1, row: 3 },
  { title: "U", column: 2, row: 3 },
  { title: "V", column: 3, row: 3 },
  { title: "W", column: 4, row: 3 },
  { title: "X", column: 5, row: 3 },
];


export default function anotheristScreen() {

  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const columnCount = 6;

  const renderItem = ({
    item,
    index,
  }: {
    item: { title: string; column: number; row: number };
    index: number;
  }) => {
    return (
      <TouchableOpacity
        style={[styles.item, focusedIndex === index ? styles.focused : null]}
        onFocus={() => setFocusedIndex(index)}
        activeOpacity={1}
        hasTVPreferredFocus={index === 0}
      >
        <Text style={styles.text}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <TVFocusGuideView style={styles.viewContainer}>
      <View style={styles.viewPageTitle}>
        <Text style={styles.pageTitle}>{"Simple List"}</Text>
      </View>
      <View style={styles.viewFlatList}>
        <FlatList
          data={SimpleKeywords}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.column}-${item.row}`}
          numColumns={columnCount}
        />
      </View>
    </TVFocusGuideView>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: "#252E33",
  },
  viewPageTitle: {
    paddingTop: 81,
    paddingRight: 144,
  },
  pageTitle: {
    fontSize: 96,
    color: "#FFFFFF",
  },
  viewFlatList: {
    flex: 1,
    marginTop: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    backgroundColor: "#37474f",
    borderRadius: 3,
    width: 162,
    height: 96,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    marginBottom: 8,
  },
  focused: {
    backgroundColor: "#EB5427",
  },
  text: {
    fontSize: 50,
    color: "#FFFFFF",
  },
});
