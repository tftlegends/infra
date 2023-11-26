
export const botMapping = {
  notification: {
    apiKey: 'TFTLEGENDS_BOT_MESSAGE_HANDLER_TELEGRAM_BOT_API_TOKEN',
    chatId: 'TFTLEGENDS_BOT_MESSAGE_HANDLER_TELEGRAM_CHAT_ID',
  },
  error: {
    apiKey: 'TFTLEGENDS_BOT_ERROR_HANDLER_TELEGRAM_BOT_API_TOKEN',
    chatId: 'TFTLEGENDS_BOT_ERROR_HANDLER_TELEGRAM_CHAT_ID',
  }

} as BotMappingType;

export interface BotMappingType {
  [key: string]: {
    apiKey: string;
    chatId: string;
  };
}
