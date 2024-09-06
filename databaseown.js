const fsPromise = require('fs').promises;
const fs = require('fs');
const filePath = './db.txt';
const crypto = require("crypto")
const path = require('path');

const folderPath = path.join(__dirname, 'folder_db');

if(fs.existsSync(folderPath)){
    console.log("folder istnieje")
}else{
    console.log("tworze folder...")
    fs.mkdirSync("./folder_db")
}

async function searchTroughDirectory(link){
    try{
        let md5 = await hashToMd5(link)
        const files = await fsPromise.readdir(folderPath)
        if (files.includes(`${md5}.txt`)){
            return true
        }
        else{
            console.log('nowy link wpisuje do bazy danych...')
            await createFile(md5,link)

        }
    }catch(err){
        console.log("error searchTroughDirectory ",err)
    }
}
async function hashToMd5(string){
    var hash = crypto.createHash('md5').update(string).digest('hex');
    return hash
}

async function createFile(md5,link){
    try{
        await fsPromise.writeFile(`./folder_db/${md5}.txt`,link,'utf-8')
    }catch(err){
        console.error("błąd podczas tworzenia ",err)
    }
}
const run = async()=>{
    await searchTroughDirectory("https://olx.pl/d/oferta/mieszkanie-do-wynajecia-rzeszow-CID3-ID11JGTS.html")
}

module.exports = searchTroughDirectory;
