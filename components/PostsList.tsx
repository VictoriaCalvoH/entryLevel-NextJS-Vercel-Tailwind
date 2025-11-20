"use client";
import { useState } from "react";
import useSWR from "swr";
import PostsFilter from "./PostsFilter";
import fetcher from "@/lib/fetcher";
import { Post } from "@/types/Post";

export default function PostsList() {
  const [filteredPosts, setFilteredPosts] = useState<Post[] | null>(null);
  const [slow, setSlow] = useState(false);

  const { data, error, isLoading } = useSWR<Post[]>(
    "https://jsonplaceholder.typicode.com/posts",
    fetcher,
    {
      loadingTimeout: 5000,
      onLoadingSlow: () => setSlow(true),
      onSuccess: () => setSlow(false),
      onError: () => setSlow(false),
    }
  );

  const posts = filteredPosts ?? data ?? [];

  if (isLoading) return <div>Loading posts...</div>;
  if (slow) return <div>Slow connection...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-xl">
        <PostsFilter onData={setFilteredPosts} />
      </div>
      <div className="w-full max-w-xl">
        {posts.map((post: { id: number; title: string; body: string }) => (
          <div
            key={post.id}
            className="flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg"
          >
            <div className="p-4">
              <h5 className="text-xl font-semibold mb-3">{post.title}</h5>
              <p className="text-body">{post.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
