import axios from "axios";
import { URL } from "../App";

const instance = axios.create({
    //baseURL: URL,
    //credentials: "include",
    //mode: "cors",
    //withCredentials: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //"Access-Control-Allow-Credentials": true,
        //"Access-Control-Allow-Origin": "https://recommendations-sggu.onrender.com/",
    },
});

export const usersAPI = {
    isAuth() {
        return instance.get(`${URL}/api/user/login/success`).then((response) => {
            console.log(response);
            if (response.status === 200) return response.data;
            throw new Error("authentication has been failed");
        });
    },
};
