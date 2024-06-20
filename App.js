import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import AllPlaces from "./Screens/AllPlaces";
import AddPlace from "./Screens/AddPlace";
import IconButton from "./Components/UI/IconButton";
import { Colors } from "./constants/styles/colors";
import Map from "./Screens/Map";
import DatabaseContextProvider from "./store/context/DatabaseContext";
import PlaceDetails from "./Screens/PlaceDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <ExpoStatusBar style="dark" />
      <DatabaseContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: Colors.primary500 },
              headerTintColor: Colors.gray700,
              contentStyle: { backgroundColor: Colors.gray700 },
            }}
          >
            <Stack.Screen
              name="AllPlaces"
              component={AllPlaces}
              options={({ navigation }) => ({
                title: "Your Favorite Places",
                headerRight: ({ tintColor }) => (
                  <IconButton
                    color={tintColor}
                    size={24}
                    icon={"add"}
                    onPress={() => {
                      navigation.navigate("AddPlace");
                    }}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="AddPlace"
              component={AddPlace}
              options={{ title: "Add a Place" }}
            />
            <Stack.Screen
              name="LocateOnMap"
              component={Map}
              options={{ title: "Locate on Map" }}
            />
            <Stack.Screen
              name="PlaceDetails"
              component={PlaceDetails}
              options={{ title: "Place Detail" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </DatabaseContextProvider>
    </>
  );
}

const styles = StyleSheet.create({});
