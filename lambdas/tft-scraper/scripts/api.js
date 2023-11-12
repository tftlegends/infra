const {RiotAPI, RiotAPITypes, PlatformId} = require('@fightmegg/riot-api')
const fs = require('fs');
const path = require("path")
const cliProgress = require('cli-progress');


const apiKey = "RGAPI-9ae29474-ea7a-4646-b305-3a531945dcb0"
const rAPI = new RiotAPI(apiKey);
const region = PlatformId.TR1

const matchRegion = PlatformId.EUROPE


// participantların puuidleri kullanılarak
// Kimle kaç maç atıldığının istatistikleri tutulabilir.
// Kaç maç atılıp sonuçların ne olduğu görülebilir.

const getMatchResultsByPuuid = async (puuid) => {
    const summoner = await rAPI.tftSummoner.getByPUUID({
        region,
        puuid
    })
    const {id} = summoner
    const results = await rAPI.tftLeague.getEntriesBySummonerId({
        summonerId: id,
        region
    })
    if (results.length === 0) {
        return {
            wins: 0,
            losses: 0,
            tier: null,
            rank: null
        }
    }
    const {wins, losses, rank, tier} = results[0]

    return {
        wins,
        losses,
        tier,
        rank
    }
}

const getMatchResultsBySummonerName = async (summonerName) => {
    const summoner = await rAPI.tftSummoner.getBySummonerName({
        region,
        summonerName
    })
    const {id} = summoner
    const results = await rAPI.tftLeague.getEntriesBySummonerId({
        summonerId: id,
        region
    })
    const {wins, losses, rank, tier} = results[0]

    return {
        wins,
        losses,
        tier,
        rank
    }
}

const getPuuidFromSummonerName = async (summonerName) => {
    const summoner = await rAPI.tftSummoner.getBySummonerName({
        region,
        summonerName
    })
    const {puuid} = summoner
    return puuid
}

const getAllMatchesByPuuid = async (puuid) => {
    const maxCount = 20
    const {wins, losses} = await getMatchResultsByPuuid(puuid)
    const totalMatches = wins + losses
    const allMatches = []
    const participants = new Set()
    let start = 0
    console.log("Downloading all matches for " + puuid)
    const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

    bar1.start(totalMatches, 0);

    if (totalMatches === 0) {
        return {
            participants:[],
            matches:[]
        }
    }

    let count
    while (true) {
        if(start + maxCount > totalMatches){
            count = totalMatches - start
        }else{
            count = maxCount
        }


        const matches = await rAPI.tftMatch.getMatchIdsByPUUID({
            region: matchRegion,
            puuid,
            params: {
                start,
                count
            }
        }).catch(console.error)


        start += matches.length
        bar1.update(start)


        for (let matchId of matches) {
            const match = await rAPI.tftMatch.getById({
                region: matchRegion,
                matchId
            })
            allMatches.push(match)
            for (let participantId of match.metadata.participants) {
                participants.add(participantId)

            }
        }
        if (matches.length === 0 || totalMatches <= start) {
            bar1.stop();
            break
        }

    }
    return {
        participants: Array.from(participants),
        matches: allMatches
    }

}


const getAllMatchesBySummonerName = async (summonerName) => {
    const summoner = await rAPI.tftSummoner.getBySummonerName({
        region,
        summonerName
    })
    const {puuid} = summoner
    return await getAllMatchesByPuuid(puuid)
}

const fetchAllMatchesBySummonerName = async (summonerName) => {
    const puuid = await getPuuidFromSummonerName(summonerName)
    await fetchAllMatchesByPuuid(puuid)
}

const fetchAllMatchesByPuuid = async (puuid) => {
    const result = await getAllMatchesByPuuid(puuid)
    const data = JSON.stringify(result);
    fs.writeFileSync(path.join("players", puuid + ".json"), data);
}

const getSummonerNameByPuuid = async (puuid) => {
    const result = rAPI.tftSummoner.getByPUUID({
        region,
        puuid
    })
    const {gameName} = result
    return gameName

}


module.exports = {
    fetchAllMatchesBySummonerName,
    fetchAllMatchesByPuuid,
    getMatchResultsBySummonerName,
    getPuuidFromSummonerName,
    getAllMatchesBySummonerName,
    getMatchResultsByPuuid,
    getAllMatchesByPuuid,
    getSummonerNameByPuuid
}
