import React, { useState } from "react";
import { StyleSheet, View, Button, FlatList } from "react-native";

import BeerItem from "./components/BeerItem";
import BeerInput from "./components/BeerInput";
import Header from "./components/header";

export default function App() {
  const [Beers, setBeers] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addBeerHandler = beerTitle => {
    setBeers(() => [
      ...Beers,
      {
        id: Math.random().toString(),
        value: beerTitle
      }
    ]);
    setIsAddMode(false);
  };

  const removeBeerHandler = beerId => {
    setBeers(currentBeers => {
      return currentBeers.filter(beer => beer.id != beerId);
    });
  };

  const cancelBeerAdditionHandler = () => {
    setIsAddMode(false);
  };

  return (
    <View>
      <Header title={"PokéBeer"} />
      <View style={styles.screen}>
      <Button title="Add New Brew" onPress={() => setIsAddMode(true)} />
      <BeerInput
        visible={isAddMode}
        onPouredBeer={addBeerHandler}
        onCancel={cancelBeerAdditionHandler}
      />
      <FlatList
        data={Beers}
        renderItem={itemData => (
          <BeerItem
            id={itemData.item.id}
            onDelete={removeBeerHandler}
            title={itemData.item.value}
          />
        )}
      />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 25,
    paddingTop: 50
  }
});