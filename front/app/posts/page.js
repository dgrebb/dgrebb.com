import Link from "next/link";

export const metadata = {
  title: "Posts - Dan Grebb",
};

export default function PostsPage() {
  return (
    <div>
      <h1>Posts</h1>
      <Link href="/post/slug">Post</Link>
    </div>
  );
}
