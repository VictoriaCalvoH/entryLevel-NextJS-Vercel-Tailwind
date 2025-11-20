"use client";
import { useState } from "react";
import useSWR from "swr";
import PostsFilter from "./PostsFilter";
import fetcher from "@/lib/fetcher";
import { Post } from "@/types/Post";

export default function PostsList() {
  const [filteredPosts, setFilteredPosts] = useState<Post[] | null>(null);

  const { data, error, isLoading } = useSWR<Post[]>(
    "https://jsonplaceholder.typicode.com/posts",
    fetcher
  );

  const posts = filteredPosts ?? data ?? [];

  if (isLoading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <PostsFilter onData={setFilteredPosts} />
      <ul>
        {posts.map((post: { id: number; title: string; body: string }) => (
          <li key={post.id} className="card">
            <h5 className="text-2xl font-semibold mb-3">{post.title}</h5>
            <p className="text-body">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
