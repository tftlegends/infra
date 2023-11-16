
const funnySentences = [
	"Malı Arap Faik'ten alırdık. Arap Faik malı bizden alırdı. Arap Faik malı bizden alırken biz Arap Faik'ten mal alırdık.",
	"Ne sen sor, ne ben söyleyeyim, gir izle kardeşim; https://www.youtube.com/watch?v=1MobY_vR7-g",
	"A"
];

class AnlatCommand {

	static run(message, bot) {
		const chatId = message.chat.id;
		const randomSentence = funnySentences[Math.floor(Math.random() * funnySentences.length)];
		bot.sendMessage(chatId, randomSentence);
	}
}

module.exports = AnlatCommand;
