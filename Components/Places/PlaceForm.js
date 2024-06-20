import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useCallback, useState } from "react";
import { Colors } from "../../constants/styles/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import CustomButton from "../UI/CustomButton";
import { getAddressFromCoordinate } from "../../api/googleMaps";
import Place from "../../Models/Place";

const PlaceForm = ({onSavePlaceHandler}) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredImageUri, setEnteredImageUri] = useState();
  const [enteredLocation, setEnteredLocation] = useState();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} value={enteredTitle} onChangeText={setEnteredTitle}/>
      <ImagePicker onImagePickHandler={onImagePickHandler}/>
      <LocationPicker onLocationPickHandler={onLocationPickHandler}/>
      <CustomButton style={styles.submitButton} onPress={onSubmitHandler}>Submit</CustomButton>
    </ScrollView>
  );

  function onImagePickHandler(imageUri) {
    setEnteredImageUri(imageUri)
  }

  async function onLocationPickHandler(selectedCoordinate) {
    const address = await getAddressFromCoordinate(selectedCoordinate);
    setEnteredLocation({...selectedCoordinate, address})
  }

  function onSubmitHandler() {
    const newPlace = Place.FromApp(enteredTitle, enteredImageUri, enteredLocation);
    onSavePlaceHandler(newPlace);
  }
};

export default PlaceForm;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
  submitButton: {
    marginTop: 20,
  },
});
