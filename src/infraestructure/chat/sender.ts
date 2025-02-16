import { LlamaContext } from "llama.rn";

export const sendMessage = async (context: LlamaContext, message: string) => {
  let result = "";
  try {
    const msgResult = await context.completion(
      {
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
        n_predict: 1000,
      },
      (data) => {
        const { token } = data;
      }
    );

    // Filtrar el texto para eliminar etiquetas y procesos de "thinking"
    result = msgResult.text.replace(/<[^>]*>|thinking/gi, "").trim();
  } catch (e) {
    console.log(e);
  }

  return result;
};
