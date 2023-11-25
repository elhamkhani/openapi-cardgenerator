import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function (req, res) {
  const category = req.body.category || '';
  if (category.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid category",
      }
    });
    return;
  }
    const theme = req.body.theme || '';
    if (theme.trim().length === 0) {
      res.status(400).json({
        error: {
          message: "Please enter a valid theme",
        }
      });

    return;
  }

  const favourite = req.body.favourite || '';

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": generatePrompt(category, theme)}]
    });

    const message = completion.choices[0].message;

    // const image_data = await openai.images.generate({
    //   model: "dall-e-3",
    //   prompt: `white background ${theme} ${category} ${favourite}`,
    //   n: 1,
    //   size: "1024x1024",
    // });
    

    res.status(200).json({ 
      message,
     // image_data
     });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(category, theme) {
   const capitalizedCategory =
    category[0].toUpperCase() + category.slice(1).toLowerCase();
    const capitalizedTheme =
    theme[0].toUpperCase() + theme.slice(1).toLowerCase();
  return `Write a short ${capitalizedTheme} ${capitalizedCategory} message`;
}

