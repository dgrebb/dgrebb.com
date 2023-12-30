export async function handleError({ error, event }) {
  return {
    message: 'Client error.',
    error,
    event,
  };
}
