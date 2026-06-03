# Retro Standman - Vue.js Hangman Game

Ein Hangman-Spiel mit Retro-Pixel-Design, gebaut mit Vue.js 3, nes.css und Firebase Firestore.

## Features

- Interaktives Hangman-Spiel mit deutscher Wortliste
- Bestenliste ueber Firebase Firestore
- Browser- und geraeteuebergreifende Speicherung
- Responsive Retro-Oberflaeche
- Kein Build-Schritt notwendig

## Start

1. Firebase-Projekt erstellen und Firestore aktivieren.
2. Firebase-Web-App registrieren.
3. Firebase-Konfigurationswerte in `firebase-config.js` eintragen.
4. `index.html` ueber einen lokalen Webserver oeffnen.

Eine genaue Schritt-fuer-Schritt-Anleitung steht in `FIREBASE_SETUP.md`.

Wichtig: Weil die App JavaScript-Module nutzt, sollte sie ueber `http://localhost/...` laufen. Unter XAMPP ist das zum Beispiel:

```text
http://localhost/Vue/project/Vue_JS_Project/
```

## Firebase

Die Bestenliste liegt in der Firestore-Collection:

```text
leaderboardEntries
```

Jeder Eintrag enthaelt:

```text
playerName
errors
word
playedAt
createdAt
```

Die App sortiert nach den wenigsten Fehlern und zeigt die besten 10 Eintraege.

## Projektstruktur

```text
index.html          Haupt-HTML mit Vue-Container
app.js              Vue-App und Spiellogik
leaderboard.js      Firestore-Zugriff fuer die Bestenliste
firebase-config.js  Firebase-Konfiguration
FIREBASE_SETUP.md   Firebase-Einrichtung und Firestore-Regeln
style.css           Styling
words.js            Wortliste
pictures/           Hangman-Bilder
```

## Woerter hinzufuegen

Neue Woerter koennen in `words.js` im globalen `WORDS`-Array ergaenzt werden.
