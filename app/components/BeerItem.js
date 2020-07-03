import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from 'react-native-elements';

const BeerItem = props => {
  return (
    <TouchableOpacity
      onPress={props.onTouch.bind(this, props.id)}
      activeOpacity={0.7}
    >
      <View style={styles.beerList}>
        <Image
          source={{ uri: 'https://cdn2.vectorstock.com/i/thumb-large/73/86/mug-with-beer-icon-cartoon-style-vector-24217386.jpg' }}
          style={{ width: 150, height: 100 }}
        />
        <Text>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  beerList: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#ccc",
    borderColor: "black",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default BeerItem;
