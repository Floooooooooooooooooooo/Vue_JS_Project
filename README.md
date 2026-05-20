# Retro Standman - Vue.js Hangman Game

Ein Klassiker Hangman-Spiel mit Retro-Pixel-Design, gebaut mit Vue.js 3 und nes.css UI Framework.

## Features
- 🎮 Interaktives Hangman-Spiel mit 10 deutschen Wörtern
- 👾 Retro Pixel-Art Design
- 📊 Bestenliste mit Google Sheets Integration (geräteübergreifend)
- 📱 Responsive Design (Desktop & Mobile)
- ⚡ Keine Abhängigkeiten außer Vue.js

## Spielweise
1. Öffne die App im Browser
2. Rate Buchstaben um das versteckte Wort zu erraten
3. Du hast 6 Versuche bis du verlierst
4. Nach jedem Spiel kannst du dich in die Bestenliste eintragen

## Bestenliste Setup
Damit die Bestenliste funktioniert, musst du Google Apps Script einrichten:
→ Siehe [GOOGLE_APPS_SCRIPT_ANLEITUNG.md](GOOGLE_APPS_SCRIPT_ANLEITUNG.md)

Nach dem Setup:
- Ergebnisse werden in Google Sheets gespeichert
- Bestenliste ist auf allen Geräten verfügbar
- Sortierung nach besten Ergebnissen (weniger Versuche = besser)

## Installation
1. Clone das Repository
2. Öffne `index.html` in einem Browser
3. (Optional) Richte Google Apps Script für die Bestenliste ein

## Technologie Stack
- **Frontend**: Vue.js 3 (CDN)
- **Styling**: nes.css + Custom CSS
- **Fonts**: Press Start 2P, VT323 (Google Fonts)
- **Backend für Bestenliste**: Google Apps Script + Google Sheets

## Projektstruktur
```
├── index.html                          # Haupt-HTML mit Vue-Container
├── app.js                             # Vue.js App Logic
├── style.css                          # Custom Styling
├── words.js                           # Wortliste
├── README.md                          # Diese Datei
└── GOOGLE_APPS_SCRIPT_ANLEITUNG.md   # Setup für Bestenliste
└── pictures/                          # Hangman-Bilder (hangman_0.png - hangman_6.png)
```

## Wörter hinzufügen
Öffne `words.js` und ergänze deine Wörter im Array:
```javascript
const WORDS = [
  "dein_wort_hier",
  // ... weitere Wörter
];
```
