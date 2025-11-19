"use client";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function PostsList() {
  const { data, error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/posts",
    fetcher
  );
  if (isLoading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <ul>
        {data.map((post: { id: number; title: string; body: string }) => (
          <li key={post.id} className="card">
            <h5 className="text-2xl font-semibold mb-3">{post.title}</h5>
            <p className="text-body">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
