import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { VoiceService } from './voice.service';
import { ChatController } from '../chat/chat.controller';
import { ChatService } from '../chat/chat.service';

@Controller('voice')
export class VoiceController {
  constructor(
    private readonly voiceService: VoiceService,
    private readonly chatService: ChatService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/audio',
        filename: (req, file, callback) => {
          callback(null, `audio.wav`);
        },
      }),
    }),
  )
  async test(@UploadedFile() file: File) {
    console.log('Received voice message');
    const answer = await this.voiceService.handleAudio();
    console.log('Parsed voice message and forwarded to chat');
    const res = await this.chatService.act(answer);
    return res;
  }
}
