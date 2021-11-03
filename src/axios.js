import axios from "axios";

const instance = axios.create({
  baseURL: API_URL, //THE API (cloud function) URL
});

export default instance;
