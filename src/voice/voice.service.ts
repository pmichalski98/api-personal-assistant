import { BadGatewayException, Injectable } from '@nestjs/common';
import { OpenAIWhisperAudio } from 'langchain/document_loaders/fs/openai_whisper_audio';

@Injectable()
export class VoiceService {
  async handleAudio() {
    const whisper = new OpenAIWhisperAudio('./uploads/audio/audio.wav');
    const res = await whisper.load();
    const whisperAnswer = res[0].pageContent;
    if (!whisperAnswer) throw new BadGatewayException('Whisper didnt work');
    return whisperAnswer;
  }
}
