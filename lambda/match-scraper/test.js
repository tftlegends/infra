const { config } = require('dotenv');
config();
const tftLegendsMatchService = require('./src/services/match');
const matchService = new tftLegendsMatchService(process.env.RIOT_API_KEY, "TR1");
const main = async () => {
	const matchId = "TR1_1431115536";
	const summoner = await matchService.fetchMatch(matchId);
	c = 3;

}

main();
