import React, { useCallback, useLayoutEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import IconButton from "../Components/UI/IconButton";

export default function Map({ navigation, route }) {
  const initialCoordinate = route.params && route.params.initialCoordinate
  const [selectedCoordinate, setSelectedCoordinate] = useState(initialCoordinate);

  const initialRegion = {
    latitude: initialCoordinate?.latitude || 37.78825,
    longitude: initialCoordinate?.longitude || -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const onSaveCallback = useCallback(onSaveHandler, [
    navigation,
    selectedCoordinate,
  ]);

  useLayoutEffect(() => {
    if(!selectedCoordinate || initialCoordinate) return;
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          color={tintColor}
          size={24}
          icon={"save"}
          onPress={onSaveCallback}
        />
      ),
    });
  }, [navigation, selectedCoordinate, onSaveHandler]);

  return (
    <View style={styles.container}>
      <MapView
        region={initialRegion}
        style={styles.map}
        onPress={onMapPressHandler}
      >
        {selectedCoordinate && <Marker coordinate={selectedCoordinate} />}
      </MapView>
    </View>
  );

  function onMapPressHandler(event) {
    if(initialCoordinate) return;
    setSelectedCoordinate(event.nativeEvent.coordinate);
  }

  function onSaveHandler() {
    navigation.navigate("AddPlace", {
      selectedCoordinate: {
        lat: selectedCoordinate.latitude,
        lng: selectedCoordinate.longitude,
      },
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});


