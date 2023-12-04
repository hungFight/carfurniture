import axios, { AxiosInstance } from "axios";

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: "https://localhost:7028/api/",
      headers: {
        // "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }
}
export default new Http().instance;
