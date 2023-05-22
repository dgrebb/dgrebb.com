import Link from "next/link";

export const metadata = {
  title: "Posts - Dan Grebb",
};

export default function PostsPage() {
  return (
    <section className="posts">
      <h1>Posts</h1>
      <Link href="/post/slug">Post</Link>
    </section>
  );
}
