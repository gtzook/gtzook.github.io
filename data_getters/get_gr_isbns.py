import csv
import requests
import time
import os

# Change this to your exported Goodreads CSV filename
CSV_FILENAME = "goodreads_library_export.csv"

# Output file
OUTPUT_FILENAME = "books_openlibrary.txt"

# Only include books from this shelf
TARGET_SHELF = "good-books"

OPENLIBRARY_COVER_URL = "https://covers.openlibrary.org/b/isbn/{isbn}-L.jpg"
OPENLIBRARY_API_URL = "https://openlibrary.org/api/books?bibkeys=ISBN:{isbn}&format=json&jscmd=data"
OPENLIBRARY_SEARCH_URL = "https://openlibrary.org/search.json?title={title}&author={author}"
OPENLIBRARY_COVERID_URL = "https://covers.openlibrary.org/b/id/{cover_id}-L.jpg"
OPENLIBRARY_OLID_URL = "https://covers.openlibrary.org/b/olid/{olid}-L.jpg"

# Columns in the Goodreads export
# 'Title', 'Author', 'ISBN13', 'ISBN', 'Image URL', etc.
def get_books_from_csv(filename):
    books = []
    with open(filename, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            # Check if the book is on the target shelf
            shelves = row.get('Bookshelves', '').split(',')
            shelves = [s.strip() for s in shelves]
            if TARGET_SHELF not in shelves:
                continue
            title = row.get('Title', '').strip()
            author = row.get('Author', '').strip()
            isbn = row.get('ISBN13', '').strip() or row.get('ISBN', '').strip()
            if title and author:
                books.append({
                    'title': title,
                    'author': author,
                    'isbn': isbn
                })
    return books

def clean_isbn(isbn):
    # Remove any leading =, quotes, or whitespace
    return isbn.replace('=', '').replace('"', '').replace("'", '').strip()

def get_openlibrary_data(isbn, title=None, author=None):
    isbn_clean = clean_isbn(isbn) if isbn else ''
    # Try ISBN first
    if isbn_clean:
        url = OPENLIBRARY_API_URL.format(isbn=isbn_clean)
        resp = requests.get(url)
        if resp.status_code == 200:
            data = resp.json()
            key = f"ISBN:{isbn_clean}"
            if key in data:
                book = data[key]
                cover = book.get('cover', {}).get('large') or book.get('cover', {}).get('medium')
                ol_title = book.get('title')
                if cover:
                    return ol_title, cover
        # Always use the ISBN cover URL if ISBN is present
        cover = OPENLIBRARY_COVER_URL.format(isbn=isbn_clean)
        return title, cover
    # If no valid ISBN cover, search by title/author
    if title:
        search_url = OPENLIBRARY_SEARCH_URL.format(title=requests.utils.quote(title), author=requests.utils.quote(author or ''))
        resp = requests.get(search_url)
        if resp.status_code == 200:
            data = resp.json()
            docs = data.get('docs', [])
            if docs:
                doc = docs[0]
                # Try cover_i first
                cover_id = doc.get('cover_i')
                if cover_id:
                    cover = OPENLIBRARY_COVERID_URL.format(cover_id=cover_id)
                    return doc.get('title', title), cover
                # Try OLID
                olid_list = doc.get('edition_key')
                if olid_list:
                    cover = OPENLIBRARY_OLID_URL.format(olid=olid_list[0])
                    return doc.get('title', title), cover
    return title, None

BOOK_COVER_DIR = "public/book_covers"
os.makedirs(BOOK_COVER_DIR, exist_ok=True)

def sanitize_filename(name):
    return "".join(c for c in name if c.isalnum() or c in (' ', '_', '-')).rstrip().replace(' ', '_')

if __name__ == "__main__":
    books = get_books_from_csv(CSV_FILENAME)
    results = []
    for book in books:
        ol_title, cover = get_openlibrary_data(book['isbn'], book['title'], book['author'])
        isbn_clean = clean_isbn(book['isbn'])
        # Determine local filename
        if isbn_clean:
            local_filename = f"{isbn_clean}.jpg"
        else:
            local_filename = f"{sanitize_filename(book['title'])}.jpg"
        local_path = os.path.join(BOOK_COVER_DIR, local_filename)
        local_url = f"/book_covers/{local_filename}"
        # Download image if not already present and cover exists
        if cover and not os.path.exists(local_path):
            try:
                resp = requests.get(cover, timeout=10)
                if resp.status_code == 200:
                    with open(local_path, 'wb') as imgf:
                        imgf.write(resp.content)
            except Exception as e:
                print(f"Failed to download {cover}: {e}")
                local_url = cover  # fallback to remote if download fails
        elif not cover:
            local_url = ''
        results.append({
            'title': ol_title or book['title'],
            'author': book['author'],
            'cover': local_url,
            'isbn': isbn_clean
        })
        print(f"{ol_title or book['title']} by {book['author']}\n{local_url}\n")
        time.sleep(0.2)  # Be nice to the API
    print(f"Total books found: {len(results)}")
    # Save to file
    with open(OUTPUT_FILENAME, "w", encoding='utf-8') as f:
        for book in results:
            f.write(f"{book['title']}\t{book['author']}\t{book['isbn']}\t{book['cover'] or ''}\n")
    print(f"Book data with local covers saved to {OUTPUT_FILENAME}")
    print("Done.")
    print("You can now run the script to get the book details from Goodreads shelf HTML.")
    print("Make sure to have the requests, bs4, and lxml libraries installed.")