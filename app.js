const { createApp } = Vue;

createApp({
  data() {
    return {
      message: "Schritt 3: Ein zufaelliges Wort wird ausgewaehlt.",
      selectedWord: "",
      guessedLetters: [],
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
      // Alle Buchstaben des Wortes zum Anzeigen hinzufügen
      this.selectedWord.split("").forEach(letter => {
        this.guessedLetters.push(letter);
      });
    }
  }
}).mount("#app");
