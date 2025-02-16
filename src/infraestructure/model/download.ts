import * as FileSystem from "expo-file-system";

type props = {
  setDownloadProgress: (progress: number) => void;
};

const downloadLink =
  "https://huggingface.co/unsloth/DeepSeek-R1-Distill-Qwen-1.5B-GGUF/resolve/main/DeepSeek-R1-Distill-Qwen-1.5B-Q5_K_M.gguf";

export default async function ModelDownload(props: props) {
  const downloadProgressCallback = (
    downloadProgress: FileSystem.DownloadProgressData
  ) => {
    const progress = downloadProgress.totalBytesWritten;
    const total = downloadProgress.totalBytesExpectedToWrite;

    const progressPercent = (progress / total) * 100;

    props.setDownloadProgress(progressPercent);
  };

  const downloadResumable = FileSystem.createDownloadResumable(
    downloadLink,
    FileSystem.documentDirectory + "model.gguf",
    {},
    downloadProgressCallback
  );

  const res = await downloadResumable.downloadAsync();
  return res;
}
