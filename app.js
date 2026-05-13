const { createApp } = Vue;

createApp({
  data() {
    return {
      maxErrors: 6,
      selectedWord: "",
      guessedLetters: [],
      inputLetter: "",
      feedback: "",
      feedbackType: "",
      errorCount: 0,
      // Wortliste für Hangman (einfach erweiterbar)
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
        .map(letter => 
          this.guessedLetters.includes(letter) ? letter : "_"
        )
        .join(" ");
    },
    hasWon() {
      if (!this.selectedWord) return false;
      return this.selectedWord
        .split("")
        .every(letter => this.guessedLetters.includes(letter));
    },
    isGameOver() {
      return this.errorCount >= this.maxErrors;
    },
    isGameFinished() {
      return this.hasWon || this.isGameOver;
    },
    hangmanImage() {
      return `pictures/hangman_${this.errorCount}.png`;
    }
  },
  mounted() {
    this.selectRandomWord();
  },
  methods: {
    selectRandomWord() {
      const randomIndex = Math.floor(Math.random() * this.words.length);
      this.selectedWord = this.words[randomIndex];
      this.guessedLetters = [];
      this.inputLetter = "";
      this.feedback = "";
      this.feedbackType = "";
      this.errorCount = 0;
    },
    guessLetter() {
      if (this.isGameFinished) {
        this.feedback = this.hasWon
          ? "Du hast schon gewonnen! Starte ein neues Wort."
          : "Spiel vorbei! Starte ein neues Wort.";
        this.feedbackType = "info";
        this.inputLetter = "";
        return;
      }

      const letter = this.inputLetter.toLowerCase().trim();
      this.inputLetter = "";
      
      // Prüfungen
      if (!letter) {
        this.feedback = "Bitte gib einen Buchstaben ein!";
        this.feedbackType = "error";
        return;
      }
      
      if (letter.length > 1) {
        this.feedback = "Nur ein Buchstabe bitte!";
        this.feedbackType = "error";
        return;
      }
      
      if (this.guessedLetters.includes(letter)) {
        this.feedback = "Diesen Buchstaben hast du schon geraten!";
        this.feedbackType = "info";
        return;
      }
      
      // Buchstabe hinzufügen
      this.guessedLetters.push(letter);
      
      // Feedback geben
      if (this.selectedWord.includes(letter)) {
        if (this.hasWon) {
          this.feedback = "Du hast das Wort erraten!";
          this.feedbackType = "success";
        } else {
          this.feedback = `Richtig! '${letter}' ist im Wort!`;
          this.feedbackType = "success";
        }
      } else {
        this.errorCount += 1;
        if (this.isGameOver) {
          this.feedback = `Spiel vorbei! Das Wort war '${this.selectedWord}'.`;
          this.feedbackType = "error";
        } else {
          this.feedback = `Falsch! '${letter}' ist nicht im Wort!`;
          this.feedbackType = "error";
        }
      }
    }
  }
}).mount("#app");
