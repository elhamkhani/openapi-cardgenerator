import OpenAI from "openai";
import ImageModel from "./models/DALL_E3Model";
import TextModel from "./models/GPT3Model";

class OpenAIService {
    constructor(apiKey) {
      const openai = new OpenAI({
        apiKey: apiKey,
      });

      this.textAiModel = new TextModel(openai);
      this.imageAiModel = new ImageModel(openai);
    }

    async generateImage(theme, category, favourite) {
        return this.imageAiModel.generateImageCompletion(theme, category, favourite);
    }
  
    async generateGreeting(category, theme) {
      return this.textAiModel.getTextCompletion(category, theme);
    }
  }

  module.exports = OpenAIService;