import React, { useEffect, useState } from 'react';

interface Book {
  title: string;
  author: string;
  isbn: string;
  cover: string;
}

// Utility to parse the books_openlibrary.txt file
function parseBooks(text: string): Book[] {
  return text.split('\n')
    .map(line => line.trim())
    .filter(line => line)
    .map(line => {
      const [title, author, isbn, cover] = line.split('\t');
      return { title, author, isbn, cover };
    })
    .filter(book => book.cover); // allow both local and remote covers
}

const BookGallery: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    fetch('/books_openlibrary.txt')
      .then(res => res.text())
      .then(text => setBooks(parseBooks(text)));
  }, []);

  // Preload all book cover images
  useEffect(() => {
    books.forEach(book => {
      if (book.cover) {
        const img = new window.Image();
        img.src = book.cover;
      }
    });
  }, [books]);

  const showPrev = () => setIndex(i => (i === 0 ? books.length - 1 : i - 1));
  const showNext = () => setIndex(i => (i === books.length - 1 ? 0 : i + 1));

  // Helper to get the background image path for a book
  function getBookBgPath(cover: string) {
    // cover: '/book_covers/BOOKID.jpg' => '/book_bgs/BOOKID_bg.webp'
    const match = cover.match(/\/book_covers\/(.+)\.jpg$/);
    if (match) {
      return `/book_bgs/${match[1]}_bg.webp`;
    }
    return undefined;
  }

  // Helper to scale text down if it exceeds max width
  function getScaledFontSize(text: string, maxWidth: number, baseSize: number, fontWeight = '600', fontFamily = 'Indie Flower, cursive') {
    if (typeof window === 'undefined') return baseSize;
    const span = document.createElement('span');
    span.style.visibility = 'hidden';
    span.style.position = 'absolute';
    span.style.fontWeight = fontWeight;
    span.style.fontFamily = fontFamily;
    span.style.fontSize = baseSize + 'px';
    span.innerText = text;
    document.body.appendChild(span);
    let size = baseSize;
    while (span.offsetWidth > maxWidth && size > 10) {
      size -= 1;
      span.style.fontSize = size + 'px';
    }
    document.body.removeChild(span);
    return size;
  }

  if (!books.length) return null;

  const book = books[index];
  const bookBg = getBookBgPath(book.cover);

  // In the render, set max width for title/author
  const maxTextWidth = 110;
  const titleFontSize = getScaledFontSize(book.title, maxTextWidth, 16, '600');
  const authorFontSize = getScaledFontSize(book.author, maxTextWidth, 15, '400');

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div
        className={`bookgallery-tilt${hovered ? ' bookgallery-tilt-hover' : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          transform: 'scale(1.7) translate(-350px, -40px)',
          transformOrigin: 'top left',
          width: 0,
        }}
      >
        <div style={{ position: 'relative', width: 120, height: 180 }}>
          {bookBg && (
            <img
              src={bookBg}
              alt="Book background"
              style={{
                position: 'absolute',
                left: 120,
                top: 80,
                zIndex: 0,
                borderRadius: 10,
                transform: 'rotate(20deg) scale(1.1)',
                objectFit: 'cover',
              }}
            />
          )}
          {/* Book holder frame */}
          <img
            src="/book_holder.webp"
            alt="Book holder"
            style={{
              position: 'absolute',
              left: 150,
              top: 140,
              transform: 'scale(3)',
              zIndex: 2,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
            draggable={false}
          />
          <button
            onClick={showNext}
            className="text-white bg-black/40 rounded-full w-8 h-8 flex items-center justify-center ml-2 hover:bg-black/80"
            aria-label="Next book"
            style={{
              position: 'absolute',
              left: 250,
              top: 200,
              transform: 'rotate(22deg)',
              zIndex: 10,
              border: 'none',
              boxShadow: 'none',
            }}
          >
            &#8594;
          </button>
        </div>
        <div className="flex flex-row items-center justify-center mt-2">
          <div className="text-center" style={{
            minWidth: 110,
            position: 'absolute',
            left: 90,
            top: 235,
            zIndex: 5,
            transform: 'rotate(22deg)',
          }}>
            <div style={{ fontWeight: 600, color: 'black', fontSize: titleFontSize, fontFamily: 'Indie Flower, cursive', maxWidth: maxTextWidth, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{book.title}</div>
            <div style={{ color: '#444', fontSize: authorFontSize, fontFamily: 'Indie Flower, cursive', maxWidth: maxTextWidth, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{book.author}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookGallery;
