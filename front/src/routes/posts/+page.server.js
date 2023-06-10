export async function load({ params }) {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = data.json();

  if (posts) {
      return {
        posts
      }
  }

  throw error(404, 'Not found');
}