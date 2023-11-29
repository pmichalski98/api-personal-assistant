import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import {
  getTasksSchema,
  addTasksSchema,
  finishTasksSchema,
  updateTasksSchema,
} from './todoist/schemas';
import {
  addTasks,
  closeTasks,
  listUncompleted,
  updateTasks,
} from './todoist/todoist';
import { HumanMessage, SystemMessage } from 'langchain/schema';
import { currentDate, parseFunctionCall, rephrase } from './todoist/helpers';

@Injectable()
export class ChatService {
  async act(query: string) {
    const model = new ChatOpenAI({
      modelName: 'gpt-4-1106-preview',
      openAIApiKey: process.env.OPENAI_API_KEY,
    }).bind({
      functions: [
        getTasksSchema,
        addTasksSchema,
        finishTasksSchema,
        updateTasksSchema,
      ],
    });
    const tools: any = {
      getTasks: listUncompleted,
      addTasks,
      closeTasks,
      updateTasks,
    };
    const tasks = await listUncompleted();
    const converstaion = await model.invoke([
      new SystemMessage(`Fact: Today is ${currentDate()}
      Current tasks: ###${tasks.map((task) => task.content)}
      `),
      new HumanMessage(query),
    ]);
    const action = parseFunctionCall(converstaion);
    console.log(action);
    let response = '';
    if (action) {
      response = await tools[action.name](action.args.tasks);
      response = await rephrase(response, query);
    } else {
      response = converstaion.content;
    }
    return response;
  }
}
