import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-mail-mate.cloudfunctions.net/api",
});

export default instance;
// baseURL: "http://localhost:5001/mail-mate/us-central1/api", //THE API (cloud function) URL

