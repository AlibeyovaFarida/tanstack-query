"use client";
import { getPost } from "@/utils/getPost";
import { useQuery } from "@/node_modules/@tanstack/react-query/build/legacy/useQuery";
import { PostItem } from "@/types/PostItem";
import { useMutation } from "@/node_modules/@tanstack/react-query/build/legacy/useMutation";
import { create } from "domain";
import { createPost } from "@/utils/createPost";
import { randomInt } from "crypto";
import { HtmlHTMLAttributes, useState } from "react";
import { HtmlContext } from "@/node_modules/next/dist/server/future/route-modules/app-page/vendored/contexts/entrypoints";
import { useQueryClient } from "@/node_modules/@tanstack/react-query/build/legacy/QueryClientProvider";

const PostComponent = () => {
  const [data, setData] = useState({title: "", body: ""})
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["posts"],
    queryFn: getPost,
  });

  const mutation = useMutation({
    mutationFn: async(data: PostItem) => {
      await createPost(data)
    },
    onSuccess: () => {
      // mutation baş verənnən sonra təzdən posts çağırır
      queryClient.invalidateQueries({queryKey: ["posts"]})
    }
  })

  if (query?.isPending) {
    return <div>Loading...</div>;
  }

  if (query?.isError) {
    return <div>{query?.error.message}</div>;
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({...prev, [e.target.name]: e.target.value}))
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(data)
    setData({title: "", body: ""})
  }
//   console.log(query?.data);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pt-10 px-5 pb-5">
      <form action="" className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          className="border mb-2 border-blue-900 rounded-lg outline-none pl-2"
          type="text"
          name="title"
          value={data.title}
          onChange={handleChange}
        />
        <label htmlFor="body">Body</label>
        <input
          className="border mb-2 border-blue-900 rounded-lg outline-none pl-2"
          type="text"
          name="body"
          id=""
          value={data.body}
          onChange={handleChange}
        />
        <button type="submit" className="border bg-purple-700 text-white h-9 rounded-md">Create Post</button>
      </form>
      {query?.data?.map((item: PostItem, index: Number) => {
        return (
          <div
            key={item?.id?.valueOf()}
            className="border border-green-700 p-3 rounded-lg"
          >
            <h1 className="text-purple-700 font-bold uppercase">
              {item?.title}
            </h1>
            <p className="capitalize">{item?.body}</p>
          </div>
        );
      })}
    </div>
  );
};

export default PostComponent;
