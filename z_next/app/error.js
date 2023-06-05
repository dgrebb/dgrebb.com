'use client'; // Error components must be Client Components
 
import { useEffect } from 'react';
 
export default function Error({ error, reset }) {
  useEffect(() => {
    error ? console.error("Error:", error) : null;
  }, [error]);
 
  return (
    <div className='flex flex-col items-center'>
      <h2>It&rsquo;s not you, it&rsquo;s me.</h2>
      <button
        onClick={
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}