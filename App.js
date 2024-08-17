import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Feed from "./views/Feed";
import { StyleSheet } from "react-native";

export default function App() {
  Stack = createNativeStackNavigator();
  const [loaded, error] = useFonts({
    "Kameron-Regular": require("./assets/fonts/Kameron-Regular.ttf"),
    "Kameron-Bold": require("./assets/fonts/Kameron-Bold.ttf"),
    "Kameron-SemiBold": require("./assets/fonts/Kameron-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: "Cadastro" }}
        />
        <Stack.Screen
          name="Feed"
          component={Feed}
          options={{ title: "Feed" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
