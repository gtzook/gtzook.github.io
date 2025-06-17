import csv
import requests
import time

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

def get_openlibrary_data(isbn, title=None, author=None):
    # Try ISBN first
    if isbn and isbn != '':
        url = OPENLIBRARY_API_URL.format(isbn=isbn)
        resp = requests.get(url)
        if resp.status_code == 200:
            data = resp.json()
            key = f"ISBN:{isbn}"
            if key in data:
                book = data[key]
                cover = book.get('cover', {}).get('large') or book.get('cover', {}).get('medium')
                ol_title = book.get('title')
                if cover:
                    return ol_title, cover
        # Fallback to cover URL pattern if API fails
        cover = OPENLIBRARY_COVER_URL.format(isbn=isbn)
        # Test if the cover actually exists (OpenLibrary returns a 1x1 gif if not found)
        test = requests.get(cover)
        if test.status_code == 200 and test.headers.get('Content-Type', '').startswith('image') and test.content and len(test.content) > 1000:
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

if __name__ == "__main__":
    books = get_books_from_csv(CSV_FILENAME)
    results = []
    for book in books:
        ol_title, cover = get_openlibrary_data(book['isbn'], book['title'], book['author'])
        results.append({
            'title': ol_title or book['title'],
            'author': book['author'],
            'cover': cover,
            'isbn': book['isbn']
        })
        print(f"{ol_title or book['title']} by {book['author']}\n{cover}\n")
        time.sleep(0.2)  # Be nice to the API
    print(f"Total books found: {len(results)}")
    # Save to file
    with open(OUTPUT_FILENAME, "w", encoding='utf-8') as f:
        for book in results:
            f.write(f"{book['title']}\t{book['author']}\t{book['isbn']}\t{book['cover'] or ''}\n")
    print(f"Book data with OpenLibrary covers saved to {OUTPUT_FILENAME}")
    print("Done.")
    print("You can now run the script to get the book details from Goodreads shelf HTML.")
    print("Make sure to have the requests, bs4, and lxml libraries installed.")