import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { ConfigModule } from '@nestjs/config';
import { VoiceModule } from './voice/voice.module';

@Module({
  imports: [ChatModule, VoiceModule, ConfigModule.forRoot()],
})
export class AppModule {}
