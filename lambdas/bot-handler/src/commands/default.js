

class DefaultCommand {
	static async run(message, bot)
{
	const chatId = message.chat.id;
		await bot.sendMessage(chatId,'Ne demek istediğini anlamadım, ama belki de birisinin uyuma vakti gelmiştir. ???????????? https://www.youtube.com/watch?v=5MuIMqhT8DM')
	}
}

module.exports = DefaultCommand;
