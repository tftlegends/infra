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
	if(command.includes('anlat')) {
		await AnlatCommand.run(message, bot);
	}else if(command.includes('guclu')){
		const command = new GucluCommand()
		await command.run(message, bot);
	}
	else {
		await DefaultCommand.run(message, bot);
	}

}


bot.on('message', handleMessage);




