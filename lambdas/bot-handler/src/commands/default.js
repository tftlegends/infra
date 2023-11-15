

class DefaultCommand {
	static async run(message, bot)
{
	const chatId = message.chat.id;
		await bot.sendMessage(chatId,'Anlamadım agam :/')
	}
}

module.exports = DefaultCommand;
