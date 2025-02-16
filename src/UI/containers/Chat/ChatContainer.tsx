import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import ChatScreen from "../../screens/Chat/ChatScreen";
import { LlamaContext } from "llama.rn";
import { loadModel } from "../../../infraestructure/model/context";
import { sendMessage } from "../../../infraestructure/chat/sender";
import { Message } from "../../../domain/entities/message";

type Props = {};

const ChatContainer = (props: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [context, setContext] = useState<LlamaContext | null>(null);

  const handleContext = async () => {
    const newContext = await loadModel();
    setContext(newContext);
  };

  const handleAiMessage = async (message: string) => {
    let response = await sendMessage(context!, message);
    response = response.replace(/<｜end▁of▁sentence｜>/g, "").trim();

    console.log(response);

    const newMessage: Message = {
      createdAt: new Date(),
      isAi: true,
      text: response,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const onSendMessage = async (message: string) => {
    const newMessage: Message = {
      createdAt: new Date(),
      isAi: false,
      text: message,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");

    setTimeout(async () => {
      await handleAiMessage(message);
    }, 2000);
  };

  useEffect(() => {
    handleContext();
  }, []);

  return (
    <ChatScreen
      messages={messages}
      onSendMessage={onSendMessage}
      message={message}
      setMessage={setMessage}
    />
  );
};

export default ChatContainer;
