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
      // You need to extract the actual data from the chunk,
      // assuming it has a 'data' field. Adjust this according to the actual structure.
      if (!res.writableEnded) {
        res.write(chunk.content);
      } else {
        break; // Stop if client disconnects
      }
    }
    res.end(); // End the response once the stream is complete
  }
}
