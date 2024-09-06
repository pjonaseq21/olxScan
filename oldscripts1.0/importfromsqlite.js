const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Ścieżka do bazy danych SQLite
const dbPath = './mydatabase.db'; // zmień na właściwą ścieżkę do bazy danych

// Otwórz połączenie z bazą danych SQLite
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.error('Błąd połączenia z bazą danych:', err.message);
        return;
    }
    console.log('Połączono z bazą danych SQLite.');
});

// Funkcja do zapisania wyników zapytania do pliku txt
function exportLinksToTxt() {
    const query = "SELECT link FROM mieszkania"; // zmień "links" i "link" na odpowiednie nazwy tabeli i kolumny

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Błąd podczas wykonywania zapytania:', err.message);
            return;
        }

        // Otwórz plik do zapisu
        const writeStream = fs.createWriteStream('links.txt', { flags: 'w' });

        // Iteracja po wynikach i zapis linków do pliku
        rows.forEach((row) => {
            writeStream.write(row.link + '\n');
        });

        writeStream.end(() => {
            console.log('Zapisano linki do pliku links.txt.');
        });
    });
}

// Wywołanie funkcji do eksportowania linków
exportLinksToTxt();

// Zamknij połączenie z bazą danych po zakończeniu pracy
db.close((err) => {
    if (err) {
        console.error('Błąd podczas zamykania połączenia z bazą danych:', err.message);
        return;
    }
    console.log('Połączenie z bazą danych zamknięte.');
});
