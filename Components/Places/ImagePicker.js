import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  launchCameraAsync,
  PermissionStatus,
  getCameraPermissionsAsync,
  requestCameraPermissionsAsync,
} from "expo-image-picker";
import { Colors } from "../../constants/styles/colors";
import OutlinedButton from "../UI/OutlinedButton";

const ImagePicker = ({onImagePickHandler}) => {
  const [pickedImageUri, setPickedImageUri] = useState();

  let imageComponent = <Text style={styles.placeholderText}>No image taken yet</Text>;

  if(pickedImageUri) {
    imageComponent = <Image source={{uri: pickedImageUri}} style={styles.image}/>
  }

  return (
    <View>
      <View style={styles.imageContainer}>{imageComponent}</View>
      <OutlinedButton name={'camera'} onPress={captureImageHandler}>Take Image</OutlinedButton>
    </View>
  );

  async function captureImageHandler() {
    const isPermitted = await checkPermission();

    if (!isPermitted) return;

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    const imageUri = image.assets[0].uri;
    setPickedImageUri(imageUri);
    onImagePickHandler(imageUri)
  }

  async function checkPermission() {
    const {status: currentPermissionStatus} = await getCameraPermissionsAsync();
    console.log('status', currentPermissionStatus)

    if (currentPermissionStatus === undefined) return false;

    if ((PermissionStatus.UNDETERMINED, PermissionStatus.DENIED).includes(currentPermissionStatus)) {
      const newPermissionStatus = await requestCameraPermissionsAsync();
      console.log('new status', newPermissionStatus)

      if(!newPermissionStatus.granted) {
        Alert.alert(
          "Insufficient Permissions",
          "Further operations cannot be proceeded without providing access to the device camera."
        );
      } 

      return newPermissionStatus.granted;
    }

    return true;
  }
};

export default ImagePicker;

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary500,
    marginVertical: 12
  },
  image: {
    width: '100%',
    height: 200
  },
  placeholderText: {
    fontSize: 18,
    color: '#FFFFFF'
  }
});
