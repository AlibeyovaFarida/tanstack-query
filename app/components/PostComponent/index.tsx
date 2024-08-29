"use client";
import { getPost } from "@/utils/getPost";
import { useQuery } from "@/node_modules/@tanstack/react-query/build/legacy/useQuery";
import { PostItem } from "@/types/PostItem";
import { updatePost } from "@/utils/updatePost";

const PostComponent = () => {

    const handleClick = async() => {
        await updatePost(3, { title: "Salam" });
    }
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: getPost,
  });

  if (query?.isPending) {
    return <div>Loading...</div>;
  }

  if (query?.isError) {
    return <div>{query?.error.message}</div>;
  }
//   console.log(query?.data);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pt-10 px-5 pb-5">
      <button onClick={handleClick}>hello</button>
      {query?.data?.map((item: PostItem, index: Number) => {
        return (
          <div
            key={item?.id}
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
