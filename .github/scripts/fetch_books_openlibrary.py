import requests
import time
import os

INPUT_FILE = 'books_from_export.txt'
OUTPUT_FILE = 'public/books_openlibrary.txt'
COVERS_DIR = 'public/book_covers'
OPENLIBRARY_API = 'https://openlibrary.org/api/books?bibkeys=ISBN:{}&format=json&jscmd=data'

os.makedirs(COVERS_DIR, exist_ok=True)

lines = []
with open(INPUT_FILE, 'r') as f:
    for line in f:
        parts = line.strip().split('\t')
        if len(parts) < 3:
            print(f"Skipping malformed line: {line.strip()}")
            continue
        title, author, isbn_raw = parts[:3]
        isbn = isbn_raw.replace('="', '').replace('"', '').replace('=', '').strip()

        cover_path = ''
        openlibrary_url = ''
        found_data = False

        # === Try ISBN lookup IF ISBN is present ===
        if isbn:
            try:
                print(f"Trying ISBN lookup: {isbn}")
                url = OPENLIBRARY_API.format(isbn)
                resp = requests.get(url)
                data = resp.json()
                key = f'ISBN:{isbn}'
                if key in data:
                    book = data[key]
                    cover_url = book.get('cover', {}).get('large') or book.get('cover', {}).get('medium') or book.get('cover', {}).get('small')
                    openlibrary_url = book.get('url') or f'https://openlibrary.org{book.get("key", "")}'
                    if cover_url:
                        ext = os.path.splitext(cover_url)[1].split('?')[0] or '.jpg'
                        cover_path = f'/book_covers/{isbn}{ext}'
                        local_path = os.path.join(COVERS_DIR, f'{isbn}{ext}')
                        if not os.path.exists(local_path):
                            img_resp = requests.get(cover_url)
                            if img_resp.ok:
                                with open(local_path, 'wb') as imgf:
                                    imgf.write(img_resp.content)
                    found_data = True
            except Exception as e:
                print(f'Error fetching ISBN {isbn}: {e}')

        # === Try title search IF ISBN missing or returned no data ===
        if not found_data:
            try:
                print(f"Falling back to title search for: {title}")
                search_url = f'https://openlibrary.org/search.json?title={requests.utils.quote(title)}'
                search_resp = requests.get(search_url)
                search_data = search_resp.json()
                docs = search_data.get('docs', [])
                if docs:
                    doc = docs[0]
                    cover_id = doc.get('cover_i')
                    key = doc.get('key')
                    if cover_id:
                        cover_url = f'https://covers.openlibrary.org/b/id/{cover_id}-L.jpg'
                        ext = '.jpg'
                        cover_path = f'/book_covers/{isbn or key.replace("/works/", "")}{ext}'
                        local_path = os.path.join(COVERS_DIR, os.path.basename(cover_path))
                        if not os.path.exists(local_path):
                            img_resp = requests.get(cover_url)
                            if img_resp.ok:
                                with open(local_path, 'wb') as imgf:
                                    imgf.write(img_resp.content)
                    if key:
                        openlibrary_url = f'https://openlibrary.org{key}'
            except Exception as e:
                print(f"Error in title search for {title}: {e}")

        lines.append(f"{title}\t{author}\t{isbn}\t{cover_path}\t{openlibrary_url}")
        time.sleep(1)

# Write output
with open(OUTPUT_FILE, 'w') as f:
    f.write('\n'.join(lines) + '\n')

print(f'Wrote {len(lines)} books to {OUTPUT_FILE}')
