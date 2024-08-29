import { instance } from "./index"

export const getPost = async() => {
    const response = await instance.get("/posts")
    return response.data
}