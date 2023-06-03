"use client";

export default function GlobalError({ error, reset }) {
  error ? console.error("Global Error:", error) : null;
  return (
    <html>
      <body className="text-lg flex flex-col ready">
        <main id="main" role="main" className="main flex flex-col items-center">
          <h2>It&rsquo;s not you, it&rsquo;s me.</h2>
          <button onClick={() => reset()}>Try again</button>
        </main>
      </body>
    </html>
  );
}
