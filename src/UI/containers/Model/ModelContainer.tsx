import React, { useState } from "react";
import { Alert } from "react-native";
import * as FileSystem from "expo-file-system";

import { loadModel } from "../../../infraestructure/model/context";
import { LlamaContext } from "llama.rn";

import ModelScreen from "../../screens/Model/ModelScreen";
import ModelDownload from "../../../infraestructure/model/download";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../App";

type Props = {};

const ModelContainer = (props: Props) => {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [context, setContext] = useState<LlamaContext | null | undefined>(null);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const checkModelArchive = async () => {
    return (
      await FileSystem.getInfoAsync(FileSystem.documentDirectory + "model.gguf")
    ).exists;
  };

  const handleLoadModel = async (uri: string) => {
    const context = await loadModel();
    setContext(context);
  };

  const downloadModel = async () => {
    setDownloading(true);

    const modelExists = await checkModelArchive();
    const modelPath = FileSystem.documentDirectory + "model.gguf";

    if (modelExists) {
      navigation.reset({
        index: 0,
        routes: [{ name: "ChatNavigation" }],
      });
      setDownloading(false);
      return;
    }

    const response = await ModelDownload({ setDownloadProgress });

    if (!response?.uri) {
      Alert.alert("Error", "No se pudo descargar el modelo");
      setDownloading(false);
      return;
    }

    await AsyncStorage.setItem("modelPath", modelPath);
    await AsyncStorage.setItem("modelExist", "true");

    handleLoadModel(response.uri);
    navigation.reset({
      index: 0,
      routes: [{ name: "ChatNavigation" }],
    });
    setDownloading(false);
  };

  return (
    <ModelScreen
      downloadProgress={downloadProgress}
      downloading={downloading}
      onDownload={() => downloadModel()}
    />
  );
};

export default ModelContainer;
