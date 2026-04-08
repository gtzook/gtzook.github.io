import React, { useEffect, useState } from 'react';

interface Book {
  title: string;
  author: string;
  isbn: string;
  cover: string;
  url: string;
}

const BookGallery: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch('/books_openlibrary.txt')
      .then((res) => {
        if (!res.ok) throw new Error('File not found');
        return res.text();
      })
      .then((text) => {
        const parsed = text
          .split('\n')
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => {
            const [title, author, isbn, cover, url] = line.split('\t');
            return { title, author, isbn, cover, url };
          })
          .filter((book) => book.cover && book.url);

        setBooks(parsed);
      });
  }, []);

  useEffect(() => {
    books.forEach((book) => {
      const img = new Image();
      img.src = book.cover;
    });
  }, [books]);

  const showNext = () => setIndex((i) => (i + 1) % books.length);

  const book = books[index];

  if (!book) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        paddingLeft: '20px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
        {/* Book Column */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '220px',
          }}
        >
          {/* Book Display */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '3 / 4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Clickable Area */}
            <a
              href={book.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '12px',
                zIndex: 40,
              }}
            >
              <img
                src={book.cover}
                alt={book.title}
                style={{
                  width: '120px',
                  height: 'auto',
                  marginLeft: '-40px',
                  marginTop: '-40px',
                  objectFit: 'contain',
                }}
              />
            </a>

            {/* Book Holder */}
            <img
              src="/optimized/book_holder-400.webp"
              alt="Book holder"
              style={{
                position: 'absolute',
                zIndex: 30,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                transform: 'rotate(-22deg) scale(2)',
                transformOrigin: 'center',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Text */}
          <div
            style={{
              marginLeft: '-60px',
              marginTop: '-80px',
              height: '60px',
              textAlign: 'center',
              zIndex: 40,
            }}
          >
            <div
              style={{
                fontWeight: 'bold',
                fontSize: book.title.length > 15 ? '12px' : '14px',
                lineHeight: '1.2',
                maxWidth: '150px',
                overflow: 'hidden',
                margin: '0 auto',
              }}
            >
              {book.title}
            </div>

            <div
              style={{
                color: '#666',
                fontSize: '12px',
                marginTop: '6px',
              }}
            >
              {book.author}
            </div>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={showNext}
          style={{
            width: '40px',
            height: '40px',
            fontSize: '18px',
            marginTop: '120px',
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
          aria-label="Next book"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default BookGallery;
