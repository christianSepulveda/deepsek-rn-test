import { LlamaContext } from "llama.rn";

export const sendMessage = async (context: LlamaContext, message: string) => {
  console.log("context", context);

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

  return msgResult.text;
};
