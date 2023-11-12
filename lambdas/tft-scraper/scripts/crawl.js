const fs = require("fs")
const path = require("path")
const api = require("./api");

participantsPath = "participants.json"

const readParticipantsFromFile = () => {
    let participants = new Set()
    if (fs.existsSync(participantsPath)) {
        const participantsContent = fs.readFileSync(participantsPath)
        const data = JSON.parse(participantsContent.toString())
        data.forEach(item => participants.add(item))

    }
    return participants
}

const writeParticipants = (participants) => {
    fs.writeFileSync(participantsPath, JSON.stringify(Array.from(participants)));
}

const main = async () => {
    // Read participants
    let participants = readParticipantsFromFile()
    let queue = new Set()
    participants.forEach(item => queue.add(item))


    while (queue.size > 0) {
        const puuid = Array.from(queue).pop()
        queue.delete(puuid)

        if (fs.existsSync(path.join("players", puuid + ".json")))
            continue

        const result = await api.getAllMatchesByPuuid(puuid)

        result.participants.forEach(item => {
            participants.add(item)
            queue.add(item)
        })
        writeParticipants(participants)

        const data = JSON.stringify(result);
        fs.writeFileSync(path.join("players", puuid + ".json"), data);
    }
}

main()
