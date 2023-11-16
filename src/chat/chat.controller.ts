import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get()
  test() {
    return 'test, halo halo';
  }
  @Post()
  async getPrompt(@Body() body: IGetPrompt) {
    const chatResponse = await this.chatService.act(body.query);
    return {
      chatResponse,
    };
  }
}
