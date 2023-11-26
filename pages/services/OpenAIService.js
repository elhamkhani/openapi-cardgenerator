import OpenAI from "openai";
import DALL_EModel from "./models/DALL_EModel";
import GPT3Model from "./models/GPT3Model";

class OpenAIService {
    constructor(apiKey) {
      const openai = new OpenAI({
        apiKey: apiKey,
      });

      this.textAiModel = new GPT3Model(openai);
      this.dallEModel = new DALL_EModel(openai);
    }

    async generateImage(theme, category, favourite) {
        return this.dallEModel.generateImageCompletion(theme, category, favourite);
    }
  
    async generateGreeting(category, theme) {
      return this.textAiModel.getTextCompletion(category, theme);
    }
  }

  module.exports = OpenAIService;