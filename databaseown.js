const fsPromise = require('fs').promises;
const fs = require('fs');
const filePath = './db.txt';
const crypto = require("crypto")
const path = require('path');

const folderPath = path.join(__dirname, 'folder_db');

if(fs.existsSync(filePath)){
    console.log("plik istnieje")
}else{
    console.log("tworze plik...")
    fs.openSync("db.txt","w")
}

async function searchTroughDirectory(md5){
    try{
        const files = await fsPromise.readdir(folderPath)
        console.log(files)
        if (files.includes(`${md5}.txt`)){
            console.log("link jest obecny w bazie danych")
        }
        else{
            console.log('nowy link wpisuje do bazy danych...')
        }
    }catch(err){
        console.log("error searchTroughDirectory ",err)
    }
}
async function addToDb(string) {
    try {
        await fsPromise.appendFile("db.txt", string);
        console.log("Dopisano do pliku.");
    } catch (err) {
        console.error("Wystąpił błąd podczas dopisywania do pliku:", err);
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
//main function to create files
async function createFilesMd5(link){  
    let md5 = await hashToMd5(link)
    await createFile(md5,link)
}
const run = async()=>{
    await createFilesMd5('https://olx.pl/d/oferta/nowe-komfortowe-mieszkanie-rzeszow-os-nova-graniczna-2-pokoje-36m2-CID3-IDRiEqF.html')
    await searchTroughDirectory('5b78d5920aabbb7cb30d7fe314fe6cfe')
}
run()

