# Google Apps Script Setup für die Bestenliste

Damit die Bestenliste funktioniert, musst du folgende Schritte durchführen:

## 1. Google Sheet erstellen
- Gehe zu https://sheets.google.com
- Erstelle ein neues Sheet mit dem Namen "Retro Standman Leaderboard"
- Bennenne das erste Sheet "Eintraege"
- Erstelle folgende Spalten in der ersten Zeile:
  - A1: `name`
  - B1: `attempts`
  - C1: `date`
  - D1: `won`

## 2. Google Apps Script erstellen
- Öffne dein Sheet
- Gehe zu **Tools** → **Script editor**
- Es öffnet sich eine neue Registerkarte mit der Google Apps Script IDE
- Lösche den ganzen Code und ersetze ihn mit dem folgenden Code:

```javascript
const SHEET_ID = "YOUR_SHEET_ID"; // Ersetze mit deiner Sheet ID
const SHEET_NAME = "Eintraege";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    // Neue Zeile hinzufügen
    sheet.appendRow([
      data.name,
      data.attempts,
      data.date,
      data.won ? "Ja" : "Nein"
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    
    // Header überspringen und JSON formatieren
    const leaderboard = [];
    for (let i = 1; i < data.length; i++) {
      leaderboard.push({
        name: data[i][0],
        attempts: data[i][1],
        date: data[i][2],
        won: data[i][3] === "Ja"
      });
    }
    
    return ContentService.createTextOutput(JSON.stringify(leaderboard))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify([]))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## 3. Sheet ID finden
- Öffne dein Google Sheet
- Die URL sieht so aus: `https://docs.google.com/spreadsheets/d/SHEET_ID_HIER/edit`
- Kopiere die `SHEET_ID_HIER` (lange Nummer zwischen `/d/` und `/edit`)
- Ersetze in dem obigen Script `"YOUR_SHEET_ID"` durch deine Sheet ID (mit Anführungszeichen)

## 4. Script deployen
- Klicke auf **Deploy** → **New deployment**
- Wähle **Type**: "Web app"
- Setze **Execute as**: dein Google-Account
- Setze **Who has access**: "Anyone"
- Klicke auf **Deploy**
- Kopiere die URL die angezeigt wird (so etwas wie: `https://script.google.com/macros/s/SCRIPT_ID/usercallback`)

## 5. URL in app.js eintragen
- Öffne `app.js`
- Finde diese Zeile (Zeile ca. 17):
  ```javascript
  googleScriptUrl: "https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercallback",
  ```
- Ersetze die komplette URL durch die URL die du in Schritt 4 kopiert hast

## 6. Permissions erteilen
- Beim ersten Aufruf wird Google dich fragen, ob die App auf dein Sheet zugreifen darf
- Klicke auf "Genehmigen"

## Fertig! 🎉
Die Bestenliste sollte jetzt funktionieren. Nach jedem Spiel können Spieler ihren Namen eintragen und ihre Ergebnisse werden gespeichert.

---

### Tipps:
- Die Bestenliste ist bei jedem Gerät verfügbar (weil sie in Google Sheets gespeichert ist)
- Der Code sortiert automatisch nach weniger Versuchen (besser = weniger Versuche)
- Du kannst die Daten direkt in Google Sheets anschauen und editieren
- Bei GitHub wird nur der Code gespeichert, die Bestenliste bleibt privat in Google Sheets
