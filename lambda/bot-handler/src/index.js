const TelegramBot = require('node-telegram-bot-api');
const {config} = require('dotenv');
const AnlatCommand = require('./commands/anlat');
const DefaultCommand = require('./commands/default');
const GucluCommand = require('./commands/guclu');
const TftMatchRepository = require("./repositories/tft-match");
const TftLegendsSummonerService = require("./services/summoner");
const TftLegendsMatchService = require("./services/match");
config();
const token = process.env.TELEGRAM_BOT_API_TOKEN;
const bot = new TelegramBot(token, {polling: true});

const handleMessage = async (message) => {
	const command = message.text;
	try{
			const gucluCommand = new GucluCommand()
			await gucluCommand.run(message, bot, command);
	}catch (e) {
		console.error(e);
		await bot.sendMessage(message.chat.id, "Wiz waz wuz");

	}


}


bot.on('message', handleMessage);
console.info('Agam ben başladım.')



