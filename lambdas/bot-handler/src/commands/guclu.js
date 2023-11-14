const { Client } = require('pg');

const StringDistance = require('../logics/string-distance');
const TftLegendsMatchService = require("../services/match");
const TftLegendsSummonerService = require("../services/summoner");
const TftMatchRepository = require("../repositories/tft-match");

const traits = {
	"Set9_Ionia": 0,
	"Set9_Targon": 1,
	"Set9_Zaun": 2,
	"Set9_Freljord": 3,
	"Set9_ShadowIsles": 4,
	"Set9_Noxus": 5,
	"Set9_Piltover": 6,
	"Set9_Demacia": 7,
	"Set9_Shurima": 8,
	"Set9_Void": 9,
	"Set9_BandleCity": 10,
	"Set9_Marksman": 11,
	"Set9_Armorclad": 12,
	"Set9_Challenger": 13,
	"Set9_Deadeye": 14,
	"Set9_Bruiser": 15,
	"Set9_Strategist": 16,
	"Set9_Technogenius": 17,
	"Set9_Multicaster": 18,
	"Set9_Preserver": 19,
	"Set9_Bastion": 20,
	"Set9_Rogue": 21,
	"Set9_Slayer": 22,
	"Set9_Sorcerer": 23,
	"Set9_Redeemer": 24,
	"Set9_Empress": 25,
	"Set9_Wanderer": 26,
	"Set9b_Darkin": 27,
	"Set9_Ixtal": 28,
	"Set9b_Bilgewater": 29,
	"Set9b_Vanquisher": 30,
	"Set9_ReaverKing": 31,
};

const traitsTr = {
	"İonia": 0,
	"Targon": 1,
	"Zaun": 2,
	"Freljord": 3,
	"Gölge Adalar": 4,
	"Noxus": 5,
	"Piltover": 6,
	"Demacia": 7,
	"Shurima": 8,
	"Hiçlik": 9,
	"Bandle City": 10,
	"Atıcı": 11,
	"Zırh": 12,
	"Atılgan": 13,
	"Keskin Nişancı": 14,
	"Kavgacı": 15,
	"Stratejist": 16,
	"Tekno Dahi": 17,
	"Mahir": 18,
	"Müdafi": 19,
	"Kale": 20,
	"Sinsi": 21,
	"Biçici": 22,
	"Büyücü": 23,
	"Kurtarıcı": 24,
	"İmparatoriçe": 25,
	"Gezgin": 26,
	"Darkin": 27,
	"Ixtal": 28,
	"Bilgewater": 29,
	"Yenilmez": 30,
	"Reaver King": 31,
}
const numberOfTraits = Object.keys(traits).length;
class GucluCommand{

	async run (msg, bot) {
		const content = msg.text;
		const matchService = new TftLegendsMatchService(process.env.RIOT_API_KEY, process.env.MATCH_SERVICE_REGION);
		const summonerService = new TftLegendsSummonerService(process.env.RIOT_API_KEY, process.env.SUMMONER_SERVICE_REGION);
		const tftMatchRepository = new TftMatchRepository({
			port : process.env.POSTGRES_PORT,
			host : process.env.POSTGRES_HOST,
			user : process.env.POSTGRES_USER,
			password : process.env.POSTGRES_PASSWORD,
			database : process.env.POSTGRES_DATABASE,
		});
		const splittedContent = content.split(' ');
		const traitContent = splittedContent.slice(1);
		const traitContentLength = traitContent.length;
		const traitVector = new Array(numberOfTraits).fill(0);
		for(let i = 0; i < traitContentLength;i++){
			const trait = traitContent[i];
			const nearest = Object.keys(traitsTr).reduce((a, b) => {
				return StringDistance.levenshteinDistance(trait, a) < StringDistance.levenshteinDistance(trait, b) ? a : b;
			});
			// Demacia 2 Ixtal 3 Zaun 1
			const traitIndex = traitsTr[nearest];
			const traitCount = traitContent[++i];
			traitVector[traitIndex] += parseInt(traitCount);

		}

		const characterOccurences = {}

		const augmentSelections = {}
		const analyzeComposition = (composition) => {
			const {augments, units} = composition;
			augments.forEach(augment => {
				if (!augmentSelections[augment]) {
					augmentSelections[augment] = 0;
				}
				augmentSelections[augment]++;
			});
			units.forEach(unit => {
				if (!characterOccurences[unit.character_id]) {
					characterOccurences[unit.character_id] = {
						items: {},
						occurence: 1,
						level: unit.tier,
						rarity: unit.rarity,
						name: unit.character_id,
					};
				}
				characterOccurences[unit.character_id].occurence++;
				unit.itemNames.forEach(item => {
					if (!characterOccurences[unit.character_id].items[item]) {
						characterOccurences[unit.character_id].items[item] = 0;
					}
					characterOccurences[unit.character_id].items[item]++;
				});
			});
		};
		const result = await tftMatchRepository.getNearest(traitVector,100).catch(console.error);
		if(result === undefined || result.length === 0) {
			const message = `Maç bulamadım bro :/`

			const chatId = msg.chat.id;
			await bot.sendMessage(chatId, message);
			return;
		}
		result.forEach(({composition}) => analyzeComposition(composition));
		const mostImportant3Characters = Object.keys(characterOccurences).sort((a,b) => {
			const heroUtility = (hero) => {
				const {items,occurence,level,rarity} = characterOccurences[hero];
				const itemUtility = Object.keys(items).reduce((acc,curr) => {
					return acc + items[curr];
				},0);
				return itemUtility * occurence * level*(rarity+1);
			};
			return heroUtility(b) - heroUtility(a);
		}).slice(0,3);
		const mostImportant3ItemsOfMostImportantCharacters = mostImportant3Characters.map(character => {
			const {items} = characterOccurences[character];
			return Object.keys(items).sort((a,b) => {
				return items[b] - items[a];
			}).slice(0,3);
		});



		const mostImportant3Augments = Object.keys(augmentSelections).sort((a,b) => {
			return augmentSelections[b] - augmentSelections[a];
		}).slice(0,3);
		const message = `<========================>
Kardeşim senin alman gereken 3 tane karakter var.
Birincisinin adı ${mostImportant3Characters[0]}
Bu herife ${mostImportant3ItemsOfMostImportantCharacters[0]} itemleri vermen lazım.

İkincisinin adı ${mostImportant3Characters[1]}
Bu yaratığa ${mostImportant3ItemsOfMostImportantCharacters[1]} itemleri vermen lazım.

Üçüncüsünün adı ${mostImportant3Characters[2]}
Bu azmana ${mostImportant3ItemsOfMostImportantCharacters[2]} itemleri vermen lazım.

Bu arada benim bilgim dahilinde en iyi 3 augment şunlar:
1- ${mostImportant3Augments[0]}
2- ${mostImportant3Augments[1]}
3- ${mostImportant3Augments[2]}

Hadi eyvallah aslanım.
<========================>`;
			const chatId = msg.chat.id;

			await bot.sendMessage(chatId, message);

		}
}

module.exports = GucluCommand;
