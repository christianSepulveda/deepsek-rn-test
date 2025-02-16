import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = {
  downloadProgress: number;
  downloading: boolean;
  onDownload: () => void;
};

const DownloadIndicator = (props: Props) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "white",
        padding: 12,
        borderRadius: 5,
        width: "60%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={props.downloading ? undefined : props.onDownload}
    >
      <Text style={{ fontSize: 16, fontWeight: "600" }}>
        {props.downloading
          ? `Descargando ${props.downloadProgress.toFixed(1)}%`
          : "Iniciar Descarga"}
      </Text>

      <View style={{ marginHorizontal: "2%" }} />

      {props.downloading ? (
        <ActivityIndicator size={20} color="black" />
      ) : (
        <Ionicons name="download" size={20} color="black" />
      )}
    </TouchableOpacity>
  );
};

export default DownloadIndicator;
