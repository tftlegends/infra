import { Injectable } from "@nestjs/common";
import { BotMessage } from "@TftLegends/Common/Types/BotMessage";
import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';
import { EnvironmentProvider } from "@TftLegends/Providers/Environment/EnvironmentProvider";

@Injectable()
export class ChatBotService {
  private sqsQueueUrl: string | undefined
  private sqsClient: SQSClient;

  constructor() {
    this.sqsClient = new SQSClient();
    this.initialize();
  }

  private async initialize() {
    this.sqsQueueUrl = await EnvironmentProvider.get('SQS_QUEUE_URL') as string;
  }

  public async sendMessage(message: BotMessage) {
    const command = new SendMessageCommand({
      QueueUrl: this.sqsQueueUrl, MessageBody: JSON.stringify(message),
    });
    return this.sqsClient.send(command);
  }
}
