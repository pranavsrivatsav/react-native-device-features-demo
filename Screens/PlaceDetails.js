import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import OutlinedButton from "../Components/UI/OutlinedButton";
import { Colors } from "../constants/styles/colors";
import { getPlaceByIdFromDb } from "../util/database";
import { DatabaseContext } from "../store/context/DatabaseContext";

const PlaceDetails = ({ route, navigation }) => {
  const databaseCtx = useContext(DatabaseContext);
  const [place, setPlace] = useState();
  useEffect(() => {
    (async () => {
      const placeId = route.params?.id;
      const place = await getPlaceByIdFromDb(databaseCtx.database, placeId);
      navigation.setOptions({
        title: place.title,
      });
      setPlace(place);
    })();
  }, [route]);

  if (!place) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>{place.address}</Text>
        </View>
        <OutlinedButton
          name={"map"}
          onPress={showOnMapHandler}
          style={styles.ViewOnMapBtn}
        >
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );

  function showOnMapHandler() {
    navigation.navigate("LocateOnMap", {
      initialCoordinate: { latitude: place.coordinate.lat, longitude: place.coordinate.lng },
    });
  }
};

export default PlaceDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
  },
  image: {
    height: "30%",
    minHeight: 300,
    borderRadius: 5,
    marginBottom: 12,
  },
  locationContainer: {
    alignItems: "center",
  },
  addressContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  addressText: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.primary200,
  },
  ViewOnMapBtn: {
    width: 200,
  },
});
