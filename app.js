const { createApp } = Vue;

createApp({
  data() {
    return {
      message: "Schritt 1: Das Retro-Grundgerüst steht.",
      hintVisible: false
    };
  },
  methods: {
    showHint() {
      this.hintVisible = true;
    }
  }
}).mount("#app");
