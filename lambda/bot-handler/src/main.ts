import EnvironmentProvider from "@/common/environmentProvider";
import { SQSEvent } from "@/common/sqsEvent";
import { Parameters } from "@/common/parameters";

export const handler = async (event: SQSEvent | object, context: object) => {

  const [telegramBotToken, telegramChatId,] = await Promise.all([EnvironmentProvider.get(Parameters.TELEGRAM_BOT_API_TOKEN), EnvironmentProvider.get(Parameters.TELEGRAM_CHAT_ID),]);

  // Fetch message parameter from event.
  let message;
  let parsedBody;
  const body = JSON.stringify((event as SQSEvent).Records[0].body);
  if (body) {
    parsedBody = JSON.parse(body);
    message = parsedBody.message;
    if(!message) {
      message = JSON.parse(parsedBody).message;
    }
  } else {
    throw new Error('No body found in SQS event. Event: ' + JSON.stringify(event) + '.');
  }

  if (message) {
    // Send message to Telegram chat.
    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${telegramChatId}&text=${message}`;
    await fetch(url);
  } else {
    throw new Error('No message found in SQS event. Event: ' + JSON.stringify(event) + '.');
  }

}

