import OpenAI from "openai";
import DALL_EModel from "./models/DALL_EModel";
import GPT3Model from "./models/GPT3Model";

class OpenAIService {
    constructor(apiKey) {
      this.openai = new OpenAI({
        apiKey: apiKey,
      });
    }
  
    async generateImage(theme, category, favourite) {
      const dallEModel = new DALL_EModel(this.openai);
        return dallEModel.generateImageCompletion(theme, category, favourite);
    }
  
    async generateGreeting(category, theme) {
      const textAiModel = new GPT3Model(this.openai);
      return textAiModel.getTextCompletion(category, theme);
    }
  }

  module.exports = OpenAIService;