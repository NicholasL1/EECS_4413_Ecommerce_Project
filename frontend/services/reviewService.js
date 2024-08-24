import axios from "axios";
axios.defaults.withCredentials = true;

export default class ReviewServices {
  static DB = axios.create({ baseURL: "http://localhost:3001/" });
}
