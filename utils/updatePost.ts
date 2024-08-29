import { PostItem } from "@/types/PostItem"
import { instance } from "./index"

export const updatePost = async (id: Number, myData: PostItem) => {
    const response = instance.patch(`posts/${id}`, myData)
    return response
}