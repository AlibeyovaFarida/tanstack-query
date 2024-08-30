import { PostItem } from "@/types/PostItem"
import { instance } from "./index"

export const createPost = async (data: PostItem) => {
    const response = await instance.post("posts", data)
}