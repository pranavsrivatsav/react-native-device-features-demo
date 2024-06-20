import axios from "axios";

const API_KEY = "<<API-KEY>>";
export const getGoogleMapsUri = ({lat, lng}) =>
  `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:blue%7Clabel:S%7C${lat},${lng}&key=${API_KEY}`;

export async function getAddressFromCoordinate({lat, lng}) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;
  console.log(url)
  const {data} = await axios.get(url);
  return data?.results[0]?.formatted_address;
}
