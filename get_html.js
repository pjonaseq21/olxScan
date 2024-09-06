const axios = require('axios');
const cheerio = require('cheerio');
const process = require("process")
const searchTroughDirectory= require("./databaseown")



async function sendToWebhook(item){
  const webhookUrl = 'webhook_url';
  const userId = '435800869896847360'
  const message = {
    content: `${item[0]}\n${item[1]}\n${item[2]}\n${item[3]} <@${userId}>`
  }
  axios.post(webhookUrl, message)
    .then(response => {
        console.log('Powiadomienie wysłane:', response.data);
    })
    .catch(error => {
        console.error('Błąd podczas wysyłania powiadomienia:', error);
    });
}



function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

async function fetchAndProcessPage(url) {
    try {
        const response = await axios.get(url);
        const html = response.data;
        
        const $ = cheerio.load(html);
        
        // Przykład: Wydobywanie tytułu strony
        tableForAll = []
        const pageTitle = $('title').text();
        console.log(`Title: ${pageTitle}`);
        $(".css-1sw7q4x").each((index,element)=>{

            table_temporary_for_one = []
            //linki do mieszkan
            $(element).find('.css-z3gu2d').each((subIndex, subElement) => {
                if(table_temporary_for_one.includes(subElement.attribs['href'])){
                }else{
                    table_temporary_for_one.push(subElement.attribs['href'])
                }
            });
            //ceny
            $(element).find('.css-13afqrm').each((subIndex, subElement) => {
                cena = subElement.children[0].data
                table_temporary_for_one.push(cena)
            }); 
            //data
            $(element).find('.css-1mwdrlh').each((subIndex, subElement) => {
                dataDodania = subElement.children[subElement.children.length-1].data
                table_temporary_for_one.push(dataDodania)
            }); 

            tableForAll.push(table_temporary_for_one)
        })
        return tableForAll
    } catch (error) {
        console.error(`Could not fetch or process page: ${error}`);
    }
}
//czynsz otodom css-z3xj2a e1w5xgvx5
//czynsz olx  css-b5m1rv




async function sprawdzCzynsz(mainArray){
  if (typeof myArray !== undefined && Array.isArray(mainArray)&&mainArray) {
    for (const item of mainArray) {
        let index = 0
        if (item[0]){
        if (item[0].startsWith("https://www.otodom.pl")) {
          try {
            const response = await axios.get(item[0]);
            console.log(response)
            const html = response.data;
            const $ = cheerio.load(html);
    
            $('.css-z3xj2a.e1w5xgvx5').each((subIndex, subElement) => {
              console.log(subElement, " @@@@@@@@@@");
            });
          } catch (error) {
            console.error(`Error fetching the link: ${item}[0] @@@@@`, error);
          }
        }else{
            try {
                item[0] = `https://olx.pl${item[0]}`
                let link = item[0]
                const response = await axios.get(link);
                const html = response.data;
                const $ = cheerio.load(html);
        
                $('.css-b5m1rv').each((subIndex, subElement) => {
                  let variabletemp = subElement.children[0].data
                  let czynsz = "Czynsz"

                  if(variabletemp){

                    if (variabletemp.startsWith(czynsz)){
                    let czynsz = variabletemp
                    item.push(czynsz)
                    }

                }
                });
              } catch (error) {
                console.log(error)
                console.error(`Error fetching the link: olx.pl${item[0]} ######`, error);
              }
        }
        }
        if(item[0]){
          try {
            console.log(`Analizowanie linku: ${item[0]}`);
            
            let present = await searchTroughDirectory(item[0]);
            if (present) {
                console.log("Link jest już w bazie danych");
            } else {
                console.log("Dodano link do bazy danych:", item[0]);
                console.log(item)
                console.log("Wysłano do webhooka:", item[0]);
            }
            console.log('---');
        }catch(error){
          console.log(error)
        }
      }
        index = index++
        await sleep(5000)
      }
  }
}

const run = async () => {
  try {
      let tablica_z_ogloszeniami = await fetchAndProcessPage('https://www.olx.pl/nieruchomosci/mieszkania/wynajem/q-Rzesz%C3%B3w/?search%5Bprivate_business%5D=private&search%5Border%5D=created_at:desc&search%5Bfilter_float_price:to%5D=2500&search%5Bfilter_enum_rooms%5D%5B0%5D=three&search%5Bfilter_enum_rooms%5D%5B1%5D=two');
      sprawdzCzynsz(tablica_z_ogloszeniami);
  } catch (error) {
      console.error('Błąd podczas wykonywania funkcji:', error);
  }
};

setInterval(run, 300000);
//a jebac to dziala
// poprawic date jezeli jest ze dzisiaj dodane to niech doda dzisiejsza date
// dodac sumowanie kaski
// zintegrowac baze danych ze skryptem
// dodac wysylanie webhookiem na dc
// odpalic na jakiejs vm czy cos

