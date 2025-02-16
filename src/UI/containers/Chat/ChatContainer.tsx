import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import ChatScreen from "../../screens/Chat/ChatScreen";
import { Message } from "@codsod/react-native-chat";
import { LlamaContext } from "llama.rn";
import { loadModel } from "../../../infraestructure/model/context";
import { sendMessage } from "../../../infraestructure/chat/sender";

type Props = {};

const ChatContainer = (props: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [context, setContext] = useState<LlamaContext | null>(null);

  const handleContext = async () => {
    const newContext = await loadModel();
    console.log("newContext", newContext);
    setContext(newContext);
  };

  const createNewMessage = (message: string) => {
    const newMessage: Message = {
      _id: messages.length + 1,
      text: message,
      createdAt: new Date(),
      user: { _id: 1, name: "John Doe" },
    };

    setMessages([...messages, newMessage]);
  };

  const onSendMessage = async (message: string) => {
    createNewMessage(message);
    const response = await sendMessage(context!, message);
    console.log('responsee',response);
    createNewMessage(response);
  };

  console.log('messages',messages);

  useEffect(() => {
    handleContext();
  }, [context]);

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <ChatScreen messages={messages} onSendMessage={onSendMessage} />
    </View>
  );
};

export default ChatContainer;
