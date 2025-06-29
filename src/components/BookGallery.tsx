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
        const parsed = text.split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const [title, author, isbn, cover, url] = line.split('\t');
          return { title, author, isbn, cover, url };
        })
        .filter((book) => book.cover && book.url);
        setBooks(parsed);
      })
  }, []);

  useEffect(() => {
    books.forEach((book) => {
      const img = new Image();
      img.src = book.cover;
    });
  }, [books]);

  const showNext = () => setIndex((i) => (i + 1) % books.length);

  const book = books[index];
  const getBookBgPath = (cover: string) => {
    const match = cover.match(/\/book_covers\/(.+)\.jpg$/);
    return match ? `/book_bgs/${match[1]}_bg.webp` : undefined;
  };

  if (!book) return null;

  const bookBg = getBookBgPath(book.cover);

  return (
  <div className="flex flex-col items-start justify-center h-full w-full pl-[5vw]">
  {/* Book and metadata block */}
  <div className="flex items-start gap-[2vw]">
    {/* Book + Text Column */}
    <div className="flex flex-col items-center w-[20vw]">
      {/* Book Display */}
      <div className="relative w-full aspect-[3/4] flex items-center justify-center group pointer-events-none">
        {/* Clickable background region */}
        <div className="absolute z-0 ml-[-5vw] scale-[0.7 ] origin-top-left w-full h-full rounded-xl group relative pointer-events-auto">
        {/* White Background */}
        <div className="absolute inset-0 rounded-xl bg-white z-0 scale-[0.9] ml-[-5vw] non" />

        {/* Darken on hover */}
        <div className="absolute inset-0 rounded-xl bg-black/0 grou p-hover:bg-black/20 z-21 transition-colors" />

        {/* Clickable link (same bounds) */}
        <a
          href={book.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-40 flex items-center justify-center rounded-xl"
        >
          <img
            src={book.cover}
            alt={book.title}
            className="object-contain transition-transform duration-300 ml-[-5vw] mt-[-5vh] ease-in-out w-[10vw] h-auto"
          />
        </a>
      </div>



        {/* Book Holder */}
        <img
          src="/optimized/book_holder-400.webp"
          alt="Book holder"
          className="absolute z-30 pointer-events-none w-full h-full object-contain"
          style={{
            transform: 'rotate(-22deg) scale(2)',
            transformOrigin: 'center'
          }}
          srcSet="/optimized/book_holder-400.webp 400w, /optimized/book_holder-800.webp 800w, /optimized/book_holder-1200.webp 1200w"
          sizes="(max-width: 600px) 100vw, 50vw"
        />
      </div>


      {/* Text Block (Always below book, consistently aligned) */}
      <div
        className="flex flex-col items-center justify-center ml-[-8vw] z-40"
        style={{ marginTop: '-7vw', height: '4.5vw' }}
      >
        <div className="w-full text-center">
          <div
            className="font-bold text-black leading-snug max-h-[2.5em] max-w-[15em] z-40 overflow-hidden text-balance mx-auto"
            style={{
              fontSize: book.title.length > 15 ? '1vw' : '1.3vw',
              lineHeight: '1.2',
              wordWrap: 'break-word',
            }}
          >
            {book.title}
          </div>
          <div className="text-gray-600 text-[1vw] mt-[0.5vw] z-40 truncate">
            {book.author}
          </div>
        </div>
      </div>
    </div>
    {/* Navigation Button */}
    <button
      onClick={showNext}
      className="text-white bg-black/40 rounded-full flex items-center justify-center hover:bg-black/80 ml-[-4vw] mt-[20vh]"
      style={{
        width: '4vw',
        height: '4vw',
        fontSize: '2vw'
      }}
      aria-label="Next book"
    >
      &#8594;
    </button>
  </div>
</div>
  );
}

export
  default BookGallery;