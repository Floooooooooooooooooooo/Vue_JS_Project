const { createApp } = Vue;

createApp({
  data() {
    return {
      message: "Schritt 3: Ein zufaelliges Wort wird ausgewaehlt.",
      selectedWord: "",
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
  mounted() {
    this.selectRandomWord();
  },
  methods: {
    selectRandomWord() {
      const randomIndex = Math.floor(Math.random() * this.words.length);
      this.selectedWord = this.words[randomIndex];
    }
  }
}).mount("#app");
