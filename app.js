const { createApp } = Vue;

createApp({
  data() {
    return {
      message: "Schritt 1: Das Retro-Grundgerüst steht.",
      hintVisible: false,
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
  methods: {
    showHint() {
      this.hintVisible = true;
    }
  }
}).mount("#app");
