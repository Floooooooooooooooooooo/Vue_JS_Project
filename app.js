const { createApp } = Vue;

createApp({
  data() {
    return {
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
        this.feedback = `Richtig! '${letter}' ist im Wort!`;
        this.feedbackType = "success";
      } else {
        this.errorCount += 1;
        this.feedback = `Falsch! '${letter}' ist nicht im Wort!`;
        this.feedbackType = "error";
      }
    }
  }
}).mount("#app");
