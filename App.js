import React, { useState } from "react";
import { StyleSheet, View, Button, FlatList, Text } from "react-native";
import { Icon } from 'react-native-elements'

import BeerItem from "./components/BeerItem";
import BeerInput from "./components/BeerInput";

import Colors from "./constants/colors";

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
      <View style={styles.header}>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitleText}>PokéBeer</Text>
        </View>
        <View style={styles.headerIconContainer}>
          <Icon
            raised
            name='beer'
            type='font-awesome'
            color='#f28e1c'
            onPress={() => setIsAddMode(true)}
            style={styles.iconBeer} />
        </View>
      </View>
      <View style={styles.screen} >
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
    paddingTop: 50,
    paddingBottom: 35
  },
  header: {
    width: "100%",
    height: 100,
    paddingTop: 36,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  headerTitleText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold"
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'flex-start'
  },
  headerIconContainer: {
    alignItems: 'flex-end'
  }
});
