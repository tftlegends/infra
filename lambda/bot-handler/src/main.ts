import EnvironmentProvider from "@/common/environmentProvider";
import { SQSEvent } from "@/common/sqsEvent";
import { Parameters } from "@/common/parameters";
import { botMapping } from "@/config/botMapping";

export const handler = async (event: SQSEvent | object, context: object) => {
  const body = JSON.stringify((event as SQSEvent).Records[0].body);


  // Fetch message parameter from event.
  let message,botName,parsedBody;
  if (body) {
    parsedBody = JSON.parse(body);
    message = parsedBody.message;
    if(!message) {
      message = JSON.parse(parsedBody).message;
    }
    botName = parsedBody.botName;
    if(!botName) {
      botName = JSON.parse(parsedBody).botName;
    }
  } else {
    throw new Error('No body found in SQS event. Event: ' + JSON.stringify(event) + '.');
  }

  if (message) {
    // Send message to Telegram chat.
    if(botMapping[botName] === undefined) throw new Error('No bot found in botMapping. Bot: ' + botName + '.');
    const telegramBotApiParameter = botMapping[botName].apiKey;
    const telegramChatIdParameter = botMapping[botName].chatId;
    let [telegramBotToken, telegramChatIds,] = await Promise.all([EnvironmentProvider.get(telegramBotApiParameter), EnvironmentProvider.get(telegramChatIdParameter),]);
    if(typeof telegramChatIds === 'string'){
      telegramChatIds = [telegramChatIds];
    }
    for(const telegramChatId of telegramChatIds as string[]){
      const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${telegramChatId}&text=${message}`;
      await fetch(url);    }

  } else {
    throw new Error('No message found in SQS event. Event: ' + JSON.stringify(event) + '.');
  }

}

