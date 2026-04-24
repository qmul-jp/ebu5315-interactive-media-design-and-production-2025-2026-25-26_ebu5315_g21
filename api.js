const api = {
  baseUrl: "/api",

  async startQuiz(moduleName) {
    console.log("startQuiz:", moduleName);
    return Promise.resolve({ success: true, moduleName });
  },

  async saveAttempt(payload) {
    console.log("saveAttempt:", payload);
    return Promise.resolve({ success: true, payload });
  },

  async fetchPastAttempt(moduleName, type) {
    console.log("fetchPastAttempt:", moduleName, type);
    return Promise.resolve({ success: true, moduleName, type, data: [] });
  },

  async saveErrors(payload) {
    console.log("saveErrors:", payload);
    return Promise.resolve({ success: true, payload });
  },

  async submitAnswer(payload) {
    console.log("submitAnswer:", payload);
    return Promise.resolve({ success: true, payload });
  }
};

window.api = api;
