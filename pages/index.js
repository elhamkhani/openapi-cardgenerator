import Head from "next/head";
import Home from "./home";
import APIService from "./services/APIService.js";

export default function Index() {
  const apiService = new APIService();
  return (
    <div>
      <Head>
        <title>Card generator</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      <Home apiService={apiService}/>
    </div>
  );
}
