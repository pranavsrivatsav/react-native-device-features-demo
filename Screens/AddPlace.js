import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import PlaceForm from "../Components/Places/PlaceForm";
import ImagePicker from "../Components/Places/ImagePicker";
import { insertPlaceIntoDb } from "../util/database";
import { DatabaseContext } from "../store/context/DatabaseContext";

const AddPlace = ({navigation}) => {
  const databaseCtx = useContext(DatabaseContext);

  return (
    <>
      <PlaceForm onSavePlaceHandler={onSavePlaceHandler}/>
    </>
  );

  async function onSavePlaceHandler(place) {
    await insertPlaceIntoDb(databaseCtx.database, place); 
    navigation.navigate('AllPlaces', {place});
  }
};

export default AddPlace;

const styles = StyleSheet.create({});
