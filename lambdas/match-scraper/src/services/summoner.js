const {RiotAPI} = require('@fightmegg/riot-api');
const {RiotAPITypes: {TFTCluster}} = require("@fightmegg/riot-api");


class TftLegendsSummonerService {

	constructor(apiKey, region){
		this.rAPI = new RiotAPI(apiKey);
		this.region = region;
	}

	async fetchUser(puuid) {
		return this.rAPI.tftSummoner.getByPUUID({
			region:this.region,
			puuid:puuid
		}).catch(console.error)
	}

	getUserFromSummonerName(summonerName) {
		return this.rAPI.tftSummoner.getBySummonerName({
			region:this.region,
			summonerName:summonerName
		}).catch(console.error)
	}

	getPuuidFromSummonerName(summonerName) {
		return this.getUserFromSummonerName(summonerName).then((user) => {
			return user.puuid;
		}).catch(console.error);
	}


}

module.exports = TftLegendsSummonerService;
