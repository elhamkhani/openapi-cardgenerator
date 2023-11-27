import Head from "next/head";
import Loading from "./components/loading";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home({apiService}) {
  const [categoryInput, setCategoryInput] = useState("");
  const [themeInput, setThemeInput] = useState("");
  const [favouriteInput, setFavouriteInput] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const {message, image} = await apiService.generateCard(categoryInput, themeInput, favouriteInput);
      setMessage(message);
      setImage(image);
    } catch(error) {
      alert(error.message);
    }
    setLoading(false);
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
        {loading && <Loading/>}
        {message &&<div className={styles.result}>
          <div className={styles.text}>{message}</div>
          <img className={styles.image} src={image}/>
        </div>}
      </main>
    </div>
  );
}
