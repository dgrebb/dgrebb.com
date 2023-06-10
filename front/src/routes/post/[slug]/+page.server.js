export async function load({ params }) {
  const slug = params.slug;
  const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);
  const post = data.json();

  if (post) {
      return {
        post
      }
  }

  throw error(404, 'Not found');
}