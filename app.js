import { Leaderboard } from "./leaderboard.js";

const { createApp } = window.Vue;

createApp({
  data() {
    return {
      currentView: "game",
      selectedWord: "",
      guessedLetters: [],
      inputLetter: "",
      feedback: "",
      feedbackType: "",
      errorCount: 0,
      maxErrors: 7,
      gameStatus: "playing",
      playerName: "",
      leaderboard: [],
      leaderboardEntrySaved: false,
      leaderboardMessage: "",
      leaderboardError: "",
      leaderboardLoading: false,
      leaderboardSaving: false,
      words: (typeof window !== "undefined" && window.WORDS && window.WORDS.length)
        ? window.WORDS
        : [
            "javascript",
            "programmierung",
            "entwicklung",
            "algorithmus",
            "datenbank",
            "verschluesselung",
            "netzwerk",
            "kompilieren",
            "debugging",
            "framework"
          ],
    };
  },
  computed: {
    displayWord() {
      if (!this.selectedWord) return "";

      return this.selectedWord
        .split("")
        .map(letter => this.guessedLetters.includes(letter) ? letter : "_")
        .join(" ");
    },
    hangmanImage() {
      const imageNumber = Math.min(this.errorCount, 6);
      return `pictures/hangman_${imageNumber}.png`;
    },
    modalTitle() {
      return this.gameStatus === "won" ? "Gewonnen!" : "Verloren!";
    },
    modalText() {
      if (this.gameStatus === "won") {
        return `Super! Das Wort war "${this.selectedWord}".`;
      }

      return `Das Wort war "${this.selectedWord}".`;
    },
    isGameFinished() {
      return this.gameStatus !== "playing";
    }
  },
  mounted() {
    this.selectRandomWord();
    this.loadLeaderboard();
  },
  methods: {
    async loadLeaderboard() {
      this.leaderboardLoading = true;
      this.leaderboardError = "";

      try {
        this.leaderboard = await Leaderboard.load();
      } catch (error) {
        console.error(error);
        this.leaderboard = [];
        this.leaderboardError = error.message || "Bestenliste konnte nicht geladen werden.";
      } finally {
        this.leaderboardLoading = false;
      }
    },
    selectRandomWord() {
      const randomIndex = Math.floor(Math.random() * this.words.length);
      this.selectedWord = this.words[randomIndex];
      this.guessedLetters = [];
      this.inputLetter = "";
      this.feedback = "";
      this.feedbackType = "";
      this.errorCount = 0;
      this.gameStatus = "playing";
      this.playerName = "";
      this.leaderboardEntrySaved = false;
      this.leaderboardMessage = "";
      this.currentView = "game";
    },
    async showLeaderboard() {
      this.currentView = "leaderboard";
      await this.loadLeaderboard();
    },
    async saveWinner() {
      if (this.gameStatus !== "won" || this.leaderboardEntrySaved || this.leaderboardSaving) return;

      this.leaderboardSaving = true;
      this.leaderboardMessage = "";
      this.leaderboardError = "";

      try {
        this.leaderboard = await Leaderboard.add(
          this.playerName,
          this.errorCount,
          this.selectedWord
        );
        this.leaderboardEntrySaved = true;
        this.playerName = "";
        this.leaderboardMessage = "Dein Ergebnis wurde gespeichert.";
      } catch (error) {
        console.error(error);
        this.leaderboardMessage = error.message || "Ergebnis konnte nicht gespeichert werden.";
      } finally {
        this.leaderboardSaving = false;
      }
    },
    guessLetter() {
      if (this.gameStatus !== "playing") return;

      const letter = this.inputLetter.toLowerCase().trim();
      this.inputLetter = "";

      if (!letter) {
        this.feedback = "Bitte gib einen Buchstaben ein.";
        this.feedbackType = "error";
        return;
      }

      if (letter.length > 1) {
        this.feedback = "Nur ein Buchstabe.";
        this.feedbackType = "error";
        return;
      }

      if (this.guessedLetters.includes(letter)) {
        this.feedback = "Schon versucht.";
        this.feedbackType = "info";
        return;
      }

      this.guessedLetters.push(letter);

      if (this.selectedWord.includes(letter)) {
        this.feedback = `Richtig: ${letter.toUpperCase()}`;
        this.feedbackType = "success";

        const isSolved = this.selectedWord
          .split("")
          .every(wordLetter => this.guessedLetters.includes(wordLetter));

        if (isSolved) {
          this.gameStatus = "won";
        }

        return;
      }

      this.errorCount += 1;
      this.feedback = `Falsch: ${letter.toUpperCase()}`;
      this.feedbackType = "error";

      if (this.errorCount >= this.maxErrors) {
        this.gameStatus = "lost";
      }
    }
  }
}).mount("#app");
