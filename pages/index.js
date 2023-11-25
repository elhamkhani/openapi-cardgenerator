import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [categoryInput, setCategoryInput] = useState("");
  const [themeInput, setThemeInput] = useState("");
  const [favouriteInput, setFavouriteInput] = useState("");
  const [message, setMessage] = useState();
  const [image, setImage] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category: categoryInput, theme: themeInput, favourite: favouriteInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setMessage(data.message.content);
      setImage(data.image_data.data[0].url);
      // setCategoryInput("");
      // setThemeInput("");
      // setFavouriteInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Card generator</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Create a card</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="category"
            placeholder="What's the occasion? Birthday, wedding, ..."
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
          />
          <input
            type="text"
            name="theme"
            placeholder="and the theme: funny, serious, sad,..."
            value={themeInput}
            onChange={(e) => setThemeInput(e.target.value)}
          />

          <input
            type="text"
            name="favourite"
            placeholder="What do they love?"
            value={favouriteInput}
            onChange={(e) => setFavouriteInput(e.target.value)}
          />
          <input type="submit" value="Generate" />
        </form>
        <div className={styles.result}>
          <div className={styles.text}>{message}</div>
          <img className={styles.image} src={image}/>
        </div>
      </main>
    </div>
  );
}
