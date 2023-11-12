const { RiotAPI, RiotAPITypes, PlatformId } = require('@fightmegg/riot-api')
const fs = require('fs');
const path = require("path")
const cliProgress = require('cli-progress');
const {config} = require("dotenv")
const {get} = require("lodash")

config()


const apiKey = process.env.RIOT_API_KEY
const rAPI = new RiotAPI(apiKey);
const region = PlatformId.TR1

const matchRegion = PlatformId.EUROPE


// participantların puuidleri kullanılarak
// Kimle kaç maç atıldığının istatistikleri tutulabilir.
// Kaç maç atılıp sonuçların ne olduğu görülebilir.


const getCompString = (units) => {

}

const getMatchResultsByPuuid = async (puuid) => {
    const summoner = await rAPI.tftSummoner.getByPUUID({
        region,
        puuid
    })
    const {id} = summoner
    const results = await rAPI.tftLeague.getEntriesBySummonerId({
        summonerId:id,
        region
    })
    const {wins,losses,rank,tier} = results[0]

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
        summonerId:id,
        region
    })
    const {wins,losses,rank,tier} = results[0]

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
    const count = 20
    const {wins,losses} = await getMatchResultsByPuuid(puuid)
    const totalMatches = wins + losses
    const allMatches = []
    const participants = new Set()
    let start = 0

    const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

    bar1.start(totalMatches, 0);


    while(true){
        const matches = await rAPI.tftMatch.getMatchIdsByPUUID({
            region:matchRegion,
            puuid,
            params:{
                start,
                count
            }
        }).catch(console.error)


        start += matches.length
        bar1.update(start)

        if(matches.length === 0 || totalMatches <= start){
            bar1.stop();
            break
        }
        for(let matchId of matches){
            const match = await rAPI.tftMatch.getById({
                region:matchRegion,
                matchId:matches[0]
            })
            allMatches.push(match)
            for(let participantId of match.metadata.participants){
                participants.add(participantId)

            }
        }

    }
    return {
        participants:Array.from(participants),
        matches:allMatches
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

const fetchAllMatchesByPuuid =  async (puuid) => {
    const result = await getAllMatchesByPuuid(puuid)
    const data = JSON.stringify(result);
    fs.writeFileSync(path.join("players",puuid + ".json"), data);
}


const main = async () => {
    const summonerName = "ovuruska"
    await fetchAllMatchesBySummonerName(summonerName)
}

main()
