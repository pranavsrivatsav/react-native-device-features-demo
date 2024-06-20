import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  Accuracy,
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions,
} from "expo-location";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/styles/colors";
import { getGoogleMapsUri } from "../../api/googleMaps";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomButton from "../UI/CustomButton";

const LocationPicker = ({onLocationPickHandler}) => {
  const navigation = useNavigation();
  const route = useRoute();

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  const [coord, setCoord] = useState();
  const getCoordFromRouteCallback = useCallback(getCoordFromRoute, [route, onLocationPickHandler]);

  useEffect(()=>{
    (async function(){
      getCoordFromRouteCallback();
    })()
  },[route])

  let locationPreview = (
    <Text style={styles.placeholderText}>No Location added yet</Text>
  )

  if(coord) {
    locationPreview = (
      <Image
          style={styles.previewImage}
          source={{ uri: getGoogleMapsUri(coord) }}
        ></Image>
    )
  }

  return (
    <View>
      <View style={styles.mapContainer}>{locationPreview}</View>
      <View style={styles.actionsContainer}>
        <OutlinedButton
          name={"location"}
          style={styles.action}
          onPress={captureLocationHandler}
        >
          Locate User
        </OutlinedButton>
        <OutlinedButton name={"map"} style={styles.action} onPress={locateOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );

  async function captureLocationHandler() {
    const isPermitted = await verifyPermissions();

    if (!isPermitted) return;

    const locationInformation = await getCurrentPositionAsync({
      accuracy: Accuracy.Highest,
    });
    console.log(locationInformation);
    const selectedCoordinate = {
      lat: locationInformation.coords.latitude,
      lng: locationInformation.coords.longitude,
    };
    setCoord(selectedCoordinate)
    await onLocationPickHandler(selectedCoordinate)
  }

  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app."
      );
      return false;
    }

    return true;
  }

  function locateOnMapHandler() {
    navigation.navigate('LocateOnMap');
  }

  async function getCoordFromRoute() {
    const selectedCoordinate = route.params?.selectedCoordinate;

    if(selectedCoordinate) {
      setCoord(selectedCoordinate);
      await onLocationPickHandler(selectedCoordinate)
    }
  }
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapContainer: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary500,
    marginVertical: 12,
  },
  previewImage: {
    width: '100%',
    height: '100%'
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  action: {
    flex: 1,
  },
  placeholderText: {
    fontSize: 18,
    color: '#FFFFFF'
  }
});
