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
import * as process from 'process';

@Injectable()
export class ChatService {
  async act(query: string) {
    const model = new ChatOpenAI({
      modelName: 'gpt-4-1106-preview',
      openAIApiKey: process.env.OPENAI_API_KEY,
      streaming: true,
    });
    const stream = await model.stream([new HumanMessage(query)]);
    return stream;
  }
}
