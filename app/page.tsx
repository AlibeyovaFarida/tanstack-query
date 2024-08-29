"use client"
import { QueryClientProvider } from "@/node_modules/@tanstack/react-query/build/legacy/QueryClientProvider";
import { QueryClient } from "@/node_modules/@tanstack/react-query/build/legacy";
import PostComponent from "./components/PostComponent/index";

const queryClient = new QueryClient()

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <PostComponent/>
    </QueryClientProvider>
  );
}
