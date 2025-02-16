import "./gesture-handler";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ChatNavigation from "./src/UI/navigation/Chat/ChatNavigation";
import ModelNavigation from "./src/UI/navigation/Model/ModelNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type RootStackParamList = {
  ChatNavigation: undefined;
  ModelNavigation: undefined;
};

const RootStack = createNativeStackNavigator();

const App = () => {
  const [modelExist, setModelExist] = useState<Boolean | undefined>(undefined);

  useEffect(() => {
    const checkModelArchive = async () => {
      const exist = await AsyncStorage.getItem("modelExist");
      setModelExist(exist === "true");
    };

    checkModelArchive();
  }, []);

  if (modelExist === undefined) {
    return (
      <View style={{ flex: 1, backgroundColor: "black" }}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={modelExist ? "ChatNavigation" : "ModelNavigation"}
        screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen name="ChatNavigation" component={ChatNavigation} />
        {!modelExist && (
          <RootStack.Screen
            name="ModelNavigation"
            component={ModelNavigation}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
