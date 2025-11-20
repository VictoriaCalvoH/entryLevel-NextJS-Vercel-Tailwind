import PostsList from "../../components/PostsList";

export default function page() {
  return (
    <div className="text-center pt-12">
      <h1 className="text-3xl capitalize font-bold mb-4">Posts List</h1>
      <PostsList />
    </div>
  );
}
