class APIService{
    async generateCard(category, theme, favourite){
        try {
            
        const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ category, theme, favourite }),
          });
        const data = await response.json();
        
        if (response.status !== 200) {
            throw data.error || new Error(`Request failed with status ${response.status}`);
        }
        return {message : data.message.content, image : data.image_data.data[0].url};
        }catch(error){
            throw new Error(`API request failed : ${error.message}`);
        }
    }
}
export default APIService;