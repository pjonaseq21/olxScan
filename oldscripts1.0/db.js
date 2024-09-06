const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Ścieżka do pliku bazy danych
const dbPath = path.join(__dirname, 'mydatabase.db');

async function checkDatabaseRecord(link){
  if(link){
  const db = new sqlite3.Database(dbPath);
  return new Promise((resolve,reject)=>{
    db.get("SELECT * FROM mieszkania where link=?",[link.trim()],(err,row)=>{
      if(err){
        console.log(err, " test22")
      }
      if(row){
        console.log("rekord istnieje")
        reject(false)
      }
      else{
        console.log('rekord nie istnieje')
        db.run(`INSERT INTO mieszkania(link, cena, data) VALUES (?, ?, ?)`, [link, 'test', 'test'], (err) => {
          if (err) {
              console.error("Error inserting data:", err);
          } else {
              console.log("Data inserted successfully");
          }
      });
      resolve(true)
      }
    })
  })
  }
}



// Funkcja do utworzenia bazy danych i tabeli
function createDatabase() {
  // Sprawdzenie, czy baza danych już istnieje
  if (fs.existsSync(dbPath)) {
    console.log('Baza danych już istnieje. Nic nie robię.');
    return;
  }

  // Tworzenie połączenia z bazą danych (w tym przypadku utworzy nową, jeśli nie istnieje)
  const db = new sqlite3.Database(dbPath);

  // Ustawienie trybu serializacji, aby operacje były wykonywane sekwencyjnie
  db.serialize(() => {
    // Tworzenie tabeli
    db.run(`CREATE TABLE IF NOT EXISTS mieszkania (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      link TEXT,
      cena TEXT,
      data TEXT
    )`);

    console.log('Tabela została utworzona.');
  });

  // Zamknięcie połączenia z bazą danych
  db.close();
}

// Wywołanie funkcji
//createDatabase();
module.exports = checkDatabaseRecord;