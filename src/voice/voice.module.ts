import { Module } from '@nestjs/common';
import { VoiceService } from './voice.service';
import { VoiceController } from './voice.controller';
import { ChatService } from '../chat/chat.service';

@Module({
  controllers: [VoiceController],
  providers: [VoiceService, ChatService],
})
export class VoiceModule {}
