import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatContainer from '../../containers/Chat/ChatContainer';
const ChatStack = createNativeStackNavigator();

const ChatNavigation = () => (
  <ChatStack.Navigator screenOptions={{ headerShown: false }}>
    <ChatStack.Screen name="Chat" component={ChatContainer} />
  </ChatStack.Navigator>
)

export default ChatNavigation
