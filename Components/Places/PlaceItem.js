import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/styles/colors";

const PlaceItem = ({ place, onPress }) => {
  return (
    <Pressable style={({pressed})=>[styles.container, pressed && styles.pressed]} onPress={onPress}>
      <Image style={styles.placeImage} source={{uri: place.imageUri}} />
      <View style={styles.placeDetailsContainer}>
        <Text style={styles.titleText}>{place.title}</Text>
        <Text style={styles.addressText}>{place.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: 'row',
    borderRadius: 5,
    elevation: 8,
    backgroundColor: Colors.primary200,
    gap: 5,
    overflow: "hidden",
    marginBottom: 8
  },
  pressed: {
    opacity: 0.8
  },
  placeImage: {
    width: 150
  },
  placeDetailsContainer: {
    flex: 1,
    padding: 8,
    paddingLeft: 4
  },
  titleText: {
    fontSize: 16,
    fontWeight: "600",
    fontColor: Colors.primary800
  },
  addressText: {
    fontSize: 12,
    fontWeight: "400",
    fontColor: Colors.primary800
  }
});
