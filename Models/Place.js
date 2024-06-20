import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

class Place {
  constructor() {}

  static FromApp(title, imageUri, location) {
    const newPlace = new Place();
    newPlace.title = title;
    newPlace.imageUri = imageUri;
    newPlace.address = location.address;
    newPlace.coordinate = { lat: location.lat, lng: location.lng }; //{lat: 0.1414 lng:124.123}
    return newPlace;
  }

  static FromDb(place) {
    const newPlace = new Place();
    newPlace.id = place.id;
    newPlace.title = place.title;
    newPlace.imageUri = place.imageUri;
    newPlace.address = place.address;
    newPlace.coordinate = { lat: place.lat, lng: place.lng };

    return newPlace;
  }
}

export default Place;
