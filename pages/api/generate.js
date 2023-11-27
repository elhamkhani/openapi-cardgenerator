import OpenAIService from "../services/OpenAIService";

export default async function (req, res) {
  const category = req.body.category || "";
  if (category.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid category",
      },
    });
    return;
  }

  const theme = req.body.theme || "";
  if (theme.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid theme",
      },
    });
    return;
  }

  const favourite = req.body.favourite || "";

  try {
    const openaiService = new OpenAIService(process.env.OPENAI_API_KEY);

    const message = await openaiService.generateGreeting(category, theme);
    const image_data = await openaiService.generateImage(
      theme,
      category,
      favourite
    );

    res.status(200).json({
      message,
      image_data,
    });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}