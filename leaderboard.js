import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
import {
  firebaseConfig,
  leaderboardCollectionName,
  leaderboardLimit
} from "./firebase-config.js";

let firebaseApp = null;
let firestoreDatabase = null;

export const Leaderboard = {
  async load() {
    const database = getDatabase();
    const leaderboardQuery = query(
      collection(database, leaderboardCollectionName),
      orderBy("errors", "asc"),
      limit(leaderboardLimit)
    );
    const snapshot = await getDocs(leaderboardQuery);
    const entries = snapshot.docs.map(documentSnapshot => {
      return this.normalizeEntry({
        id: documentSnapshot.id,
        ...documentSnapshot.data()
      });
    });

    return this.sort(entries);
  },

  async add(playerName, errors, word) {
    const database = getDatabase();
    const entry = {
      playerName: this.cleanPlayerName(playerName),
      errors: Number(errors) || 0,
      word: String(word || ""),
      playedAt: new Date().toISOString(),
      createdAt: serverTimestamp()
    };

    await addDoc(collection(database, leaderboardCollectionName), entry);
    return this.load();
  },

  sort(entries) {
    return [...entries].filter(entry => {
      return entry && typeof entry.playerName === "string" && Number.isFinite(Number(entry.errors));
    }).sort((firstEntry, secondEntry) => {
      if (firstEntry.errors !== secondEntry.errors) {
        return firstEntry.errors - secondEntry.errors;
      }

      return new Date(firstEntry.playedAt) - new Date(secondEntry.playedAt);
    });
  },

  cleanPlayerName(playerName) {
    const cleanedName = String(playerName || "").trim().slice(0, 18);
    return cleanedName || "Unbekannt";
  },

  normalizeEntry(entry) {
    return {
      id: entry.id || "",
      playerName: this.cleanPlayerName(entry.playerName),
      errors: Number(entry.errors) || 0,
      word: String(entry.word || ""),
      playedAt: getPlayedAt(entry)
    };
  }
};

function getDatabase() {
  if (!hasValidFirebaseConfig()) {
    throw new Error("Firebase ist noch nicht konfiguriert. Trage deine Werte in firebase-config.js ein.");
  }

  if (!firebaseApp) {
    firebaseApp = initializeApp(firebaseConfig);
    firestoreDatabase = getFirestore(firebaseApp);
  }

  return firestoreDatabase;
}

function hasValidFirebaseConfig() {
  const requiredFields = ["apiKey", "authDomain", "projectId", "appId"];

  return requiredFields.every(fieldName => {
    const value = firebaseConfig[fieldName];
    return typeof value === "string" && value.trim() && !value.includes("DEIN");
  });
}

function getPlayedAt(entry) {
  if (entry.createdAt && typeof entry.createdAt.toDate === "function") {
    return entry.createdAt.toDate().toISOString();
  }

  return entry.playedAt || new Date(0).toISOString();
}
