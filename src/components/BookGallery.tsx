import React, { useEffect, useState } from 'react';

interface Book {
  title: string;
  author: string;
  isbn: string;
  cover: string;
}

// Fallback books data in case the file can't be loaded
const FALLBACK_BOOKS: Book[] = [
{
  title: "House of Leaves",
  author: "Mark Z. Danielewski",
  isbn: "House_of_Leaves",
  cover: "/book_covers/House_of_Leaves.jpg"
},
{
  title: "Infinite Jest",
  author: "David Foster Wallace",
  isbn: "Infinite_Jest",
  cover: "/book_covers/Infinite_Jest.jpg"
},
{
  title: "One Hundred Years of Solitude",
  author: "Gabriel García Márquez",
  isbn: "One_Hundred_Years_of_Solitude",
  cover: "/book_covers/One_Hundred_Years_of_Solitude.jpg"
},
{
  title: "If on a Winter's Night a Traveler",
  author: "Italo Calvino",
  isbn: "If_on_a_Winters_Night_a_Traveler",
  cover: "/book_covers/If_on_a_Winters_Night_a_Traveler.jpg"
}];


// Utility to parse the books_openlibrary.txt file
function parseBooks(text: string): Book[] {
  return text.split('\n').
  map((line) => line.trim()).
  filter((line) => line).
  map((line) => {
    const [title, author, isbn, cover] = line.split('\t');
    return { title, author, isbn, cover };
  }).
  filter((book) => book.cover); // allow both local and remote covers
}

const BookGallery: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);

  useEffect(() => {
    fetch('/books_openlibrary.txt').
    then((res) => {
      if (!res.ok) {
        throw new Error('File not found');
      }
      return res.text();
    }).
    then((text) => setBooks(parseBooks(text))).
    catch((error) => {
      console.log('Using fallback books data:', error.message);
      setBooks(FALLBACK_BOOKS);
    });
  }, []);

  // Preload all book cover images
  useEffect(() => {
    books.forEach((book) => {
      if (book.cover) {
        const img = new window.Image();
        img.src = book.cover;
      }
    });
  }, [books]);

  const showPrev = () => setIndex((i) => i === 0 ? books.length - 1 : i - 1);
  const showNext = () => setIndex((i) => i === books.length - 1 ? 0 : i + 1);

  // Helper to get the background image path for a book
  function getBookBgPath(cover: string) {
    // cover: '/book_covers/BOOKID.jpg' => '/book_bgs/BOOKID_bg.webp'
    const match = cover.match(/\/book_covers\/(.+)\.jpg$/);
    if (match) {
      return `/book_bgs/${match[1]}_bg.webp`;
    }
    return undefined;
  }

  // Helper to scale text down if it exceeds max width, but not below minSize
  function getScaledFontSize(text: string, maxWidth: number, baseSize: number, minSize: number, fontWeight = '600', fontFamily = 'Indie Flower, cursive') {
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
    while (span.offsetWidth > maxWidth && size > minSize) {
      size -= 1;
      span.style.fontSize = size + 'px';
    }
    document.body.removeChild(span);
    return Math.max(size, minSize);
  }

  if (!books.length) return null;

  const book = books[index];
  const bookBg = getBookBgPath(book.cover);

  // In the render, set max width for title/author
  const maxTextWidth = 8 * window.innerWidth / 100;
  const titleFontSize = getScaledFontSize(book.title, maxTextWidth, 2.5 * window.innerWidth / 100, 18, '600');
  const authorFontSize = getScaledFontSize(book.author, maxTextWidth, 1 * window.innerWidth / 100, 14, '400');

  // Add shake animation on hover (but not when hovering the button)
  const galleryClass = `bookgallery-tilt${hovered && !buttonHovered ? ' bookgallery-shake' : ''}`;

  const handleGalleryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIndex((i) => i === books.length - 1 ? 0 : i + 1);
  };

  return (
    <div className="relative w-0 h-0">
      <div
        className={galleryClass}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'absolute',
          left: '-10vw',
          top: '-8vh',
          transform: 'scale(1.2)',
          transformOrigin: 'top left',
          width: '10vw',
          height: '13vh',
          zIndex: 10,
          cursor: 'pointer'
        }}>

        <a
          href={`https://openlibrary.org/isbn/${book.isbn}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', display: 'block' }}>

          <div style={{ position: 'relative', width: '10vw' }}>
            {bookBg &&
            <img
              src={bookBg}
              alt="Book background"
              style={{
                position: 'absolute',
                left: '6.5vw',
                top: '0vh',
                zIndex: 0,
                borderRadius: '1vw',
                transform: 'scale(1.1)',
                objectFit: 'cover'
              }} />

            }
            {/* Book holder frame */}
            <img
              src="/optimized/book_holder-400.webp"
              alt="Book holder"
              style={{
                position: 'absolute',
                left: '10vw',
                top: '6vh',
                scale: '3',
                zIndex: 2,
                pointerEvents: 'none',
                transform: 'rotate(-22deg)',
                userSelect: 'none'
              }}
              draggable={false} srcSet="/optimized/book_holder-400.webp 400w, /optimized/book_holder-800.webp 800w, /optimized/book_holder-1200.webp 1200w" sizes="(max-width: 600px) 100vw, 50vw" />

          </div>
          <div className="flex flex-row items-center justify-center mt-2">
            <div className="text-center" style={{
              minWidth: '7vw',
              position: 'absolute',
              left: '8vw',
              top: '23.5vh',
              zIndex: 5,
              maxWidth: maxTextWidth
            }}>
              <div style={{ fontWeight: 600, color: 'black', fontSize: titleFontSize, fontFamily: 'Indie Flower, cursive', maxWidth: maxTextWidth, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{book.title}</div>
              <div style={{ color: '#444', fontSize: authorFontSize, fontFamily: 'Indie Flower, cursive', maxWidth: maxTextWidth, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{book.author}</div>
            </div>
          </div>
        </a>
        <button
          onClick={showNext}
          className="text-white bg-black/40 rounded-full flex items-center justify-center ml-3 hover:bg-black/80"
          aria-label="Next book"
          style={{
            position: 'absolute',
            left: '19vw',
            top: '15vh',
            width: '4vw',
            height: '4vw',
            fontSize: '2vw',
            zIndex: 10
          }}
          onMouseEnter={() => setButtonHovered(true)}
          onMouseLeave={() => setButtonHovered(false)}>

          &#8594;
        </button>
      </div>
      <style>{`
        .bookgallery-shake {
          animation: bookgallery-shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes bookgallery-shake {
          10%, 90% { transform: scale(1.2) translateX(-0.5px) rotate(-1deg); }
          20%, 80% { transform: scale(1.2) translateX(1px) rotate(1deg); }
          30%, 50%, 70% { transform: scale(1.2) translateX(-2px) rotate(-1deg);  }
          40%, 60% { transform: scale(1.2) translateX(2px) rotate(1deg); }
        }
      `}</style>
    </div>);

};

export default BookGallery;