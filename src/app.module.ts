import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ChatModule, ConfigModule.forRoot()],
})
export class AppModule {}
