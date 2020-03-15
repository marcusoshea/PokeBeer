import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Modal } from "react-native";

const BeerInput = props => {
  const [beerDrank, drinkBeer] = useState("");

  const beerInputHandler = pouredBeer => {
    drinkBeer(pouredBeer);
  };

  const addBeerHandler = () => {
    props.onPouredBeer(beerDrank);
    drinkBeer("");
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Pick your poison"
          style={styles.input}
          onChangeText={beerInputHandler}
          value={beerDrank}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="CANCEL" color="red" onPress={props.onCancel} />
          </View>
          <View style={styles.button}>
            <Button title="ADD" onPress={addBeerHandler} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%"
  },
  button: {
    width: "40%"
  }
});

export default BeerInput;