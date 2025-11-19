import React from "react";

export default async function page() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  const data = await response.json();
  console.log(data);

  return (
    <div className="text-center pt-12">
      <h1 className="text-3xl capitalize font-bold mb-4">Users List</h1>
      <ul>
        {data.map((user: { id: number; title: string; body: string }) => (
          <li key={user.id} className="card">
            <h5 className="text-2xl font-semibold mb-3">{user.title}</h5>
            <p className="text-body">{user.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
