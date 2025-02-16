import { initLlama, LlamaContext } from "llama.rn";
import * as FileSystem from "expo-file-system";

export const loadModel = async () => {
  const modelPath = FileSystem.documentDirectory + "model.gguf";

  console.log("modelPath", modelPath);

  try {
    const context = await initLlama({
      model:modelPath,
      use_mlock: true,
      n_ctx: 131072,
      n_gpu_layers: 0, // > 0: enable Metal on iOS
      //embedding: true, // use embedding
    });
    console.log("created context");

    return context;
  } catch (e) {
    console.log("error", e);
    return null;
  }
};
