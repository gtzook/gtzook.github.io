import React, { useEffect, useState } from 'react';

interface Book {
  title: string;
  author: string;
  isbn: string;
  cover: string;
  url: string;
}

const BookGallery: React.FC = () => {
  const [stack, setStack] = useState<Book[]>([]);
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    fetch('/books_openlibrary.txt')
      .then((res) => res.text())
      .then((text) => {
        const parsed = text
          .split('\n')
          .map((l) => l.trim())
          .filter(Boolean)
          .map((line) => {
            const [title, author, isbn, cover, url] = line.split('\t');
            return { title, author, isbn, cover, url };
          });

        setStack(parsed);
      });
  }, []);

  const cycle = () => {
    if (animating || stack.length === 0) return;

    setAnimating(true);
    setLeavingIndex(0);

    // After slide-left animation
    setTimeout(() => {
      setStack((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });

      setLeavingIndex(null);

      // allow reflow before ending animation
      setTimeout(() => {
        setAnimating(false);
      }, 50);
    }, 300);
  };

  return (
    <div style={{ position: 'relative', width: 240, height: 320 }}>
      {stack.map((book, i) => {
        const isLeaving = i === leavingIndex;

        return (
          <a
            key={book.isbn + i}
            href={book.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',

              transform: isLeaving
                ? 'translateX(-160px) rotate(-10deg) scale(${1 - i * 0.03})'
                : `translateX(${i * 6}px) translateY(${i * 6}px) rotate(${i * 2}deg)`,

              zIndex: isLeaving
                ? 0
                : stack.length - i,

              transition: 'transform 0.3s ease, opacity 0.3s ease',
              pointerEvents: i === 0 ? 'auto' : 'none',
            }}
          >
            <img
              src={book.cover}
              alt={book.title}
              style={{
                width: '280px',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
                background: 'white',
              }}
            />
          </a>
        );
      })}

      {/* Button */}
      <button
            onClick={cycle}
            style={{
              width: '80px',
              height: '80px',
              fontSize: '36px',
              marginRight: '120px',
              background: 'rgba(0,0,0,0.4)',
              color: 'white',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = 'rgba(0,0,0,0.8)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = 'rgba(0,0,0,0.4)')
            }
            aria-label="Next album"
          >
            ↻
          </button>
    </div>
  );
};

export default BookGallery;
