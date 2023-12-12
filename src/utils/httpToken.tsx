"use client";
import axios, { AxiosInstance } from "axios";
import https from "https";
import { jwtDecode } from "jwt-decode";
import http from "./http";
const instanceAxios = axios.create({
  baseURL: "https://localhost:7028/api/",
  headers: {
    // "Content-Type": "application/json",
    Accept: "application/json",
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});
class HttpToken {
  axiosJWTs(token: string, refreshToken: string) {
    console.log("token here", token);
    let i = 0;
    let tokenN: string = token;

    instanceAxios.interceptors.request.use(
      async (config) => {
        return await new Promise(async (resolve, reject) => {
          try {
            console.log("all right", i++);
            const date = new Date();
            const decodeToken: any = await jwtDecode(tokenN);
            console.log(
              decodeToken.exp,
              "expiration",
              date.getTime() / 1000 + 5
            );

            if (decodeToken.exp < date.getTime() / 1000 + 5) {
              // faster 50 second
              console.log(
                decodeToken.exp,
                date.getTime() / 1000 + 2,
                token,
                "hhhh"
              );

              const data = await http.post("User/RefreshToken", {
                accessToken: token,
                refreshToken,
              });
              // if (data.accessToken) console.log(data, "newAccessToken");

              // if (data?.newAccessToken) {
              //   const newToken = "Bearer " + data.newAccessToken;
              //   tokenN = newToken;
              //   Cookies.set("tks", newToken, {
              //     path: "/",
              //     secure: false,
              //     sameSite: "strict",
              //     expires: new Date(new Date().getTime() + 30 * 86409000),
              //   });
              // }
            }
            resolve(config);
          } catch (error) {
            reject(error);
          }
        });
      },
      (err) => {
        console.log("error Axios");
        return Promise.reject(err);
      }
    );
    return instanceAxios;
  }
}
export default new HttpToken().axiosJWTs;
