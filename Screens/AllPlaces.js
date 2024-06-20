import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import PlaceList from "../Components/Places/PlaceList";
import { getPlacesFromDb } from "../util/database";
import { DatabaseContext } from "../store/context/DatabaseContext";
import { useIsFocused } from "@react-navigation/native";

const AllPlaces = ({ route }) => {
  const databaseCtx = useContext(DatabaseContext);
  const isFocused = useIsFocused();
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  useEffect(() => {
    if (!isFocused) return;
    (async () => {
      const placesFromDb = await getPlacesFromDb(databaseCtx.database);
      console.log("places", placesFromDb);
      setLoadedPlaces(placesFromDb);
    })();
  }, [isFocused]);

  if (!loadedPlaces || loadedPlaces.length === 0) {
    return (
      <View>
        <Text>No Places added yet - Start adding some!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PlaceList places={loadedPlaces} />
    </View>
  );
};

export default AllPlaces;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
