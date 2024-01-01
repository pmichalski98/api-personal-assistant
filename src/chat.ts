import { ChatOpenAI } from 'langchain/chat_models/openai';
import { HumanMessage, SystemMessage } from 'langchain/schema';

// import OpenAI from "openai";
//
// const openai = new OpenAI();
//
// async function main() {
//   const stream = await openai.chat.completions.create({
//     model: "gpt-4",
//     messages: [{ role: "user", content: "Say this is a test" }],
//     stream: true,
//   });
//   for await (const chunk of stream) {
//     process.stdout.write(chunk.choices[0]?.delta?.content || "");
//   }
// }
//
// main();
async function chat() {
  const openai = new ChatOpenAI({
    modelName: 'gpt-4-1106-preview',
    streaming: true,
  });
  const res = await openai.stream([
    new SystemMessage(
      'As a senior Node JS engineer answer to the best of your knowledge.',
    ),
    new HumanMessage(
      `I have this variable as a result from fetching data from OPENAI : const stream: IterableReadableStream<BaseMessageChunk>
How can I stream this data as a response for a post request using NESTJS ? `,
    ),
  ]);
  let message: string = '';
  for await (const chunk of res) {
    // message = message.concat(chunk.content);
    process.stdout.write(chunk.content);
    // console.log(message);
  }
}

chat();
