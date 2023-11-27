import TextAIModel from "./TextAIModel";

class GPT3Model extends TextAIModel {
  async getTextCompletion(category, theme) {
    const completion = await this.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: `Write a ${theme} ${category} message less than 200 characters long.` },
      ],
    });
    return completion.choices[0].message;
  }
}

export default GPT3Model;

