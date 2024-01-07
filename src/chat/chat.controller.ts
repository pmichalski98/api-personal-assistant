import { Body, Controller, Post, Res } from '@nestjs/common';
import { ChatService } from './chat.service';
import type { Response } from 'express';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post()
  async getPrompt(@Body() body: IGetPrompt, @Res() res: Response) {
    const stream = await this.chatService.act(body.query);
    for await (const chunk of stream) {
      if (!res.writableEnded) {
        res.write(chunk.content);
      } else {
        break;
      }
    }
    res.end();
  }
}
