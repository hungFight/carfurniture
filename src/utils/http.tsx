import axios, { AxiosInstance } from "axios";
import https from "https";

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: "https://localhost:7028/api/",
      headers: {
        // "Content-Type": "application/json",
        Accept: "application/json",
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
  }
}
export default new Http().instance;
