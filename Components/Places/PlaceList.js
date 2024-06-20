import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/styles/colors";
import { useNavigation } from "@react-navigation/native";

const PlaceList = ({ places }) => {
  const navigation = useNavigation();

  if (!places || places.length === 0) {
    return renderFallback();
  }
  return (
    <FlatList
      style={styles.placeListContainer}
      data={places}
      keyExtractor={(place) => place.id}
      renderItem={({ item: place }) => (
        <PlaceItem
          place={place}
          onPress={onPlacePressHandler.bind(this, place)}
        />
      )}
    />
  );

  function renderFallback() {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No Images Added.</Text>
      </View>
    );
  }

  function onPlacePressHandler(place) {
    navigation.navigate("PlaceDetails", { id: place.id });
  }
};

export default PlaceList;

const styles = StyleSheet.create({
  placeListContainer: {
    padding: 12,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 18,
    color: Colors.primary200,
  },
});
