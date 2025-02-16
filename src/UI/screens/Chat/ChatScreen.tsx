import { View, Text } from "react-native";
import React, { useState } from "react";
import Chat, { Message } from "@codsod/react-native-chat";
import { StatusBar } from "expo-status-bar";

type Props = {
  messages: Message[];
  onSendMessage: (message: string) => void;
};

const ChatScreen = (props: Props) => {
  return (
    <>
      <StatusBar style="light" />
      <Chat
        messages={props.messages}
        setMessages={props.onSendMessage}
        themeColor="#1e1e1f"
        themeTextColor="white"
        backgroundColor="black"
        inputBackgroundColor="#1e1e1f"
        inputBorderColor="#1e1e1f"
        style={{ flex: 1 }}
        inputColor="white"
        placeholder="Envía un mensaje..."
        user={{ _id: 1, name: "John Doe" }}
      />
    </>
  );
};

export default ChatScreen;
