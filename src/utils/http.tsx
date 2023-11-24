import axios, { AxiosInstance } from "axios";

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.URL_SERVER,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }
}
export default new Http();
