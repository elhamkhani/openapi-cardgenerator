class TextAIModel {
    constructor(openai) {
       this.openai = openai;
      }
    async getTextCompletion(category, theme) {
      throw new Error("Method not implemented");
    }
  }
  export default TextAIModel;