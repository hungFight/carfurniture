import axios, { AxiosInstance } from "axios";
import https from "https";
import { jwtDecode } from "jwt-decode";
import http from "./http";
import { Cookies } from "next-client-cookies";

const instanceAxios = axios.create({
  baseURL: process.env.DB_URL,
  headers: {
    // "Content-Type": "application/json",
    Accept: "application/json",
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});
let tokenN = "";
class HttpToken {
  axiosJWTs(token: string, refreshToken: string, cookies: Cookies) {
    console.log("token here", token, tokenN);
    let i = 0;
    let tokenNc = token;

    instanceAxios.interceptors.request.use(
      async (config) => {
        return await new Promise(async (resolve, reject) => {
          try {
            console.log("all right", i++);
            const date = new Date();
            if (!tokenN) tokenN = tokenNc;
            if (tokenNc === tokenN) {
              const decodeToken: any = await jwtDecode(tokenNc);
              // if (refreshTokenT.exp < date.getTime() / 1000 + 5) {
              // } else
              if (decodeToken.exp < date.getTime() / 1000 + 5) {
                // faster 50 second
                console.log(
                  decodeToken.exp,
                  date.getTime() / 1000 + 2,
                  token,
                  "hhhh"
                );

                const res = await http.post("User/RefreshToken", {
                  accessToken: token,
                  refreshToken,
                });

                tokenN = res.data.accessToken;
                cookies.set("token", res.data.accessToken, {
                  path: "/",
                  secure: false,
                  sameSite: "strict",
                });
                cookies.set("refreshToken", res.data.refreshToken, {
                  path: "/",
                  secure: false,
                  sameSite: "strict",
                });
              }
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
