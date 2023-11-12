const fs = require("fs")
const path = require("path")
const os = require("os")

const participantsPath = "participants.json"


const main = () => {

    let participants = new Set()
    if(fs.existsSync(participantsPath )){
        const participantsContent = fs.readFileSync(participantsPath )
        const data = JSON.parse(participantsContent.toString())
        data.forEach(item => participants.add(item))

    }
    const files = fs.readdirSync("players")
    files.forEach((fileBasename) => {
        const filePath = path.join("players",fileBasename)
        const content = fs.readFileSync(filePath)
        const data = JSON.parse(content.toString())
        data.participants.forEach(item => participants.add(item))
    })
    fs.writeFileSync(participantsPath , JSON.stringify(Array.from(participants)));
}

main()
