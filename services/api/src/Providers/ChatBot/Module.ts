import { Module } from "@nestjs/common";
import { ChatBotService } from "@TftLegends/Providers/ChatBot/Services/ChatBot";


@Module({
  providers:[ChatBotService],
  exports:[ChatBotService],
})
export class ChatBotModule {}
