import CONST from "@live-util/constant";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: CONST.BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-hasura-admin-secret": `${CONST.BASE_KEY}`,
  },
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const user_id = "token"; // Dapatkan user_id dari cookie atau penyimpanan lokal di sini

//     if (user_id) {
//       // Memeriksa jenis permintaan
//       if (
//         config.method === "get" ||
//         config.method === "delete" ||
//         config.method === "put"
//       ) {
//         // Menambahkan user_id ke parameter query atau body
//         config.params = {
//           ...config.params,
//           user_id: user_id,
//         };
//       }
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
