const LEADERBOARD_STORAGE_KEY = "retro-standman-leaderboard";
const LEADERBOARD_LIMIT = 10;

window.Leaderboard = {
  load() {
    const storedLeaderboard = localStorage.getItem(LEADERBOARD_STORAGE_KEY);

    if (!storedLeaderboard) {
      return [];
    }

    try {
      const entries = JSON.parse(storedLeaderboard);
      return Array.isArray(entries) ? this.sort(entries) : [];
    } catch (error) {
      console.warn("Bestenliste konnte nicht geladen werden.", error);
      return [];
    }
  },

  add(playerName, errors, word) {
    const entry = {
      playerName: this.cleanPlayerName(playerName),
      errors: Number(errors) || 0,
      word,
      playedAt: new Date().toISOString()
    };
    const entries = this.sort([...this.load(), entry]).slice(0, LEADERBOARD_LIMIT);

    localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(entries));
    return entries;
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
  }
};
