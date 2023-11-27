import ImageAIModel from "./ImageAIModel";

class DALL_E2Model extends ImageAIModel {
  
  async generateImageCompletion(theme, category, favourite) {
    const image_data = await this.openai.images.generate({
      model: "dall-e-2",
      prompt: `white background ${theme} ${category} ${favourite}`,
      n: 1,
      size: "1024x1024",
    });
    return image_data;
  }
  }
export default DALL_E2Model;
