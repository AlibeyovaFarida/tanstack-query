import axios from "@/node_modules/axios/index";

export const instance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    headers: {"Content-Type" : "application/json"}
})