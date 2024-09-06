const fsPromise = require('fs').promises;
const fs = require('fs');
const filePath = './db.txt';
const crypto = require("crypto")


if(fs.existsSync(filePath)){
    console.log("plik istnieje")
}else{
    console.log("tworze plik...")
    fs.openSync("db.txt","w")
}

async function searchTroughDb(string){
    console.log("przeszukuje baze danych")
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split('\n');
    const match = lines.some((line,index)=>{
        if(line.trim() === string.trim()){
            return true
            }
            return false
        })

    if (match){
        return match
    }
    else{
        return match
    }
    };

async function addToDb(string) {
    try {
        await fsPromise.appendFile("db.txt", string);
        console.log("Dopisano do pliku.");
    } catch (err) {
        console.error("Wystąpił błąd podczas dopisywania do pliku:", err);
    }
}

async function hashToMd5(string){
    var hash = crypto.createHash('md5').update(name).digest('hex');
    return hash
}

let testHash = hashToMd5('https://olx.pl/d/oferta/mieszkanie-do-wynajecia-47m-skyres-ul-lubelska-CID3-IDIfvXZ.html')
console.log(testHash)

module.exports = {searchTroughDb,addToDb};