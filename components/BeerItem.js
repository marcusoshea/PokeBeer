import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const BeerItem = props => {
  return (
    <TouchableOpacity
    onPress={props.onDelete.bind(this, props.id)}
    activeOpacity={0.7}
    >
      <View style={styles.beerList}>
        <Text>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    beerList: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#ccc",
    borderColor: "black",
    borderWidth: 1
  }
});

export default BeerItem;