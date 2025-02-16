import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import DownloadIndicator from "../../components/DownloadIndicator";

type Props = {
  downloadProgress: number;
  downloading: boolean;
  onDownload: () => void;
};

const ModelScreen = (props: Props) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        padding: 16,
      }}
    >
      <StatusBar style="light" />

      <Text style={{ color: "white", fontSize: 30, fontWeight: "500" }}>
        ¡Bienvenido!
      </Text>

      <View style={{ marginVertical: "1%" }} />

      <Text
        style={{
          color: "white",
          fontSize: 18,
          fontWeight: "300",
          textAlign: "center",
          width: "90%",
        }}
      >
        Experimenta la inteligencia artificial donde sea sin conexión a
        internet.
      </Text>

      <View style={{ marginVertical: "5%" }} />

      <DownloadIndicator
        downloadProgress={props.downloadProgress}
        downloading={props.downloading}
        onDownload={props.onDownload}
      />
    </View>
  );
};

export default ModelScreen;
