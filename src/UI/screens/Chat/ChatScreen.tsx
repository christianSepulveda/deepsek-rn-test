import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Message } from "../../../domain/entities/message";
import IonIcons from "react-native-vector-icons/Ionicons";
import { useEffect, useRef } from "react";

type Props = {
  messages: Message[];
  message: string;
  setMessage: (message: string) => void;
  onSendMessage: (message: string) => void;
};

const ChatScreen = (props: Props) => {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [props.messages]);

  const ChatBublle = (message: Message) => {
    const isAi = message.isAi;

    return (
      <View
        style={{
          padding: 10,
          backgroundColor: isAi ? "black" : "#1e1e1f",
          margin: 10,
          borderRadius: 10,
          maxWidth: "80%",
          minWidth: "30%",
          borderBottomEndRadius: isAi ? 10 : 0,
          borderBottomStartRadius: isAi ? 0 : 10,
          alignSelf: isAi ? "flex-start" : "flex-end",
        }}
      >
        <Text style={{ color: "white" }}>{message.text}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "black", paddingTop: 20 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style="light" />

      <View style={{ height: "85%" }}>
        <FlatList
          ref={flatListRef}
          data={props.messages}
          renderItem={({ item }) => <ChatBublle {...item} />}
          keyExtractor={(item) => item.createdAt.toString()}
        />
      </View>

      <View
        style={{
          width: "100%",
          height: "15%",
          borderTopEndRadius: 15,
          borderTopStartRadius: 15,
          flexDirection: "row",
          backgroundColor: "#1e1e1f",
          alignItems: "center",
        }}
      >
        <TextInput
          style={{
            flex: 10,
            height: 40,
            borderRadius: 10,
            paddingHorizontal: 20,
            color: "white",
          }}
          placeholder="Envía un mensaje..."
          placeholderTextColor="gray"
          value={props.message}
          onChangeText={(text) => props.setMessage(text)}
        />

        <TouchableOpacity
          style={{
            width: 35,
            height: 35,
            margin: 10,
            borderRadius: 100,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            props.onSendMessage(props.message);
          }}
        >
          <IonIcons name="send" size={18} color="black" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
