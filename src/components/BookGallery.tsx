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
    .filter(book => book.cover && book.cover.startsWith('http'));
}

const BookGallery: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch('/books_openlibrary.txt')
      .then(res => res.text())
      .then(text => setBooks(parseBooks(text)));
  }, []);

  return (
    <div className="w-full flex flex-wrap justify-center gap-6 py-8">
      {books.map((book, idx) => (
        <div key={idx} className="flex flex-col items-center w-32">
          <img
            src={book.cover}
            alt={book.title}
            className="w-28 h-40 object-cover rounded shadow-md bg-white"
            onError={e => (e.currentTarget.style.display = 'none')}
          />
          <div className="mt-2 text-center">
            <div className="text-xs font-semibold text-white truncate w-28" title={book.title}>{book.title}</div>
            <div className="text-xs text-gray-300 truncate w-28" title={book.author}>{book.author}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookGallery;
