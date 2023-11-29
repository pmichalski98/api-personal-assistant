import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post()
  async getPrompt(@Body() body: IGetPrompt) {
    console.log(body);
    const chatResponse = await this.chatService.act(body.query);
    return {
      chatResponse,
    };
  }
}
