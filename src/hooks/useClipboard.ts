import { useState, useCallback } from 'react';

interface UseClipboardOptions {
  timeout?: number;
}

export function useClipboard({ timeout = 2000 }: UseClipboardOptions = {}) {
  const [hasCopied, setHasCopied] = useState(false);
  const [hasRead, setHasRead] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setHasCopied(true);
        setError(null);

        if (timeout > 0) {
          setTimeout(() => {
            setHasCopied(false);
          }, timeout);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to copy'));
      }
    },
    [timeout]
  );

  const read = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setHasRead(true);
      setError(null);

      if (timeout > 0) {
        setTimeout(() => {
          setHasRead(false);
        }, timeout);
      }

      return text;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to read clipboard'));
      return null;
    }
  }, [timeout]);

  const readImage = useCallback(async () => {
    try {
      const items = await navigator.clipboard.read();
      const imageItem = items.find((item) => item.types.includes('image/png'));

      if (imageItem) {
        const blob = await imageItem.getType('image/png');
        setHasRead(true);
        setError(null);

        if (timeout > 0) {
          setTimeout(() => {
            setHasRead(false);
          }, timeout);
        }

        return blob;
      }

      return null;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to read image from clipboard'));
      return null;
    }
  }, [timeout]);

  const clear = useCallback(() => {
    setHasCopied(false);
    setHasRead(false);
    setError(null);
  }, []);

  return {
    copy,
    read,
    readImage,
    clear,
    hasCopied,
    hasRead,
    error
  };
}

// Example usage:
// const {
//   copy,
//   read,
//   readImage,
//   hasCopied,
//   hasRead,
//   error
// } = useClipboard({
//   timeout: 2000
// });
//
// // Copy text
// const handleCopy = () => {
//   copy('Hello, world!');
// };
//
// // Read text
// const handleRead = async () => {
//   const text = await read();
//   console.log('Clipboard text:', text);
// };
//
// // Read image
// const handleReadImage = async () => {
//   const image = await readImage();
//   if (image) {
//     const url = URL.createObjectURL(image);
//     // Use the image URL
//   }
// };
//
// return (
//   <div>
//     <button onClick={handleCopy}>
//       {hasCopied ? 'Copied!' : 'Copy'}
//     </button>
//     <button onClick={handleRead}>
//       {hasRead ? 'Read!' : 'Read'}
//     </button>
//     {error && <p>Error: {error.message}</p>}
//   </div>
// ); 