import TelegramBot from 'node-telegram-bot-api';

const token = '6931978539:AAEEft7R5SZOsDqHxL2F3ukhHxU8xFHAEXs'; // Replace with the token from BotFather
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (message) => {
  const chatId = message.chat.id;
  console.log(chatId);
  const response = `Hello, ${message.from?.first_name}!`; // Custom response logic
  bot.sendMessage(chatId, response);
});
