import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ModelContainer from "../../containers/Model/ModelContainer";
const ModelStack = createNativeStackNavigator();

const ModelNavigation = () => (
  <ModelStack.Navigator screenOptions={{ headerShown: false }}>
    <ModelStack.Screen name="Model" component={ModelContainer} />
  </ModelStack.Navigator>
);

export default ModelNavigation;
