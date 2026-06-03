# Firebase Setup fuer die Bestenliste

## 1. Firebase-Projekt erstellen

1. Oeffne die Firebase Console: https://console.firebase.google.com
2. Erstelle ein neues Projekt.
3. Registriere im Projekt eine Web-App.
4. Kopiere die Firebase-Konfiguration.

## 2. Firestore aktivieren

1. Oeffne im Firebase-Projekt den Bereich `Firestore Database`.
2. Erstelle eine Datenbank.
3. Waehle fuer den Start eine passende Region.
4. Starte fuer die Entwicklung im Testmodus oder nutze direkt die Regeln unten.

## 3. Konfiguration eintragen

Oeffne `firebase-config.js` und ersetze die Platzhalter:

```javascript
export const firebaseConfig = {
  apiKey: "DEINE_API_KEY",
  authDomain: "DEIN_PROJECT_ID.firebaseapp.com",
  projectId: "DEIN_PROJECT_ID",
  storageBucket: "DEIN_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "DEINE_MESSAGING_SENDER_ID",
  appId: "DEINE_APP_ID"
};
```

## 4. Firestore-Regeln

Diese Regeln erlauben Lesen fuer alle und Schreiben nur fuer plausibel formatierte Bestenlisten-Eintraege:

```text
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /leaderboardEntries/{entryId} {
      allow read: if true;
      allow create: if
        request.resource.data.keys().hasOnly([
          'playerName',
          'errors',
          'word',
          'playedAt',
          'createdAt'
        ]) &&
        request.resource.data.playerName is string &&
        request.resource.data.playerName.size() >= 1 &&
        request.resource.data.playerName.size() <= 18 &&
        request.resource.data.errors is number &&
        request.resource.data.errors >= 0 &&
        request.resource.data.errors <= 7 &&
        request.resource.data.word is string &&
        request.resource.data.word.size() >= 1 &&
        request.resource.data.word.size() <= 40 &&
        request.resource.data.playedAt is string &&
        request.resource.data.createdAt == request.time;
      allow update, delete: if false;
    }
  }
}
```

## 5. App starten

Starte XAMPP und oeffne:

```text
http://localhost/Vue/project/Vue_JS_Project/
```

Die Bestenliste ist danach fuer alle Browser und Nutzer sichtbar, die dieselbe Firebase-Datenbank verwenden.
