import * as SQLite from "expo-sqlite";
import { Alert } from "react-native";
import Place from "../Models/Place";

export async function initDb(successHandler, errorHandler) {
  try {
    const database = await SQLite.openDatabaseAsync("places.db");
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS places(
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL);
    `);
    successHandler(database);
  } catch (error) {
    errorHandler(error);
  }
}

export async function insertPlaceIntoDb(database, place) {
  try {
    const result = await database.runAsync(
      "INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?,?,?,?,?)",
      place.title,
      place.imageUri,
      place.address,
      place.coordinate.lat,
      place.coordinate.lng
    );
    console.log("db insert result", result.lastInsertRowId, result.changes);
  } catch (error) {
    console.log("error", error);
  }
}

export async function getPlacesFromDb(database) {
  try {
    const places = await database.getAllAsync("SELECT * FROM places",[]);
    const retPlaces = places.map((place) => Place.FromDb(place));
    return retPlaces;
  } catch (error) {
    console.log("error", error);
  }
}

export async function getPlaceByIdFromDb(database,id) {
  try {
    const place = await database.getFirstAsync("SELECT * FROM places WHERE id = ?",[id]);
    return Place.FromDb(place);
  } catch (error) {
    console.log("error", error);
  }
}

