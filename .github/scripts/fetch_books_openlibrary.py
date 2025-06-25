import requests
import time
import os

INPUT_FILE = 'glance-resume-splash/books_from_export.txt'
OUTPUT_FILE = 'glance-resume-splash/public/books_openlibrary.txt'
COVERS_DIR = 'glance-resume-splash/public/book_covers'
OPENLIBRARY_API = 'https://openlibrary.org/api/books?bibkeys=ISBN:{}&format=json&jscmd=data'

os.makedirs(COVERS_DIR, exist_ok=True)

lines = []
with open(INPUT_FILE, 'r') as f:
    for line in f:
        parts = line.strip().split('\t')
        if len(parts) < 3:
            continue
        title, author, isbn_raw = parts[:3]
        isbn = isbn_raw.replace('="', '').replace('"', '').replace('=', '').strip()
        if not isbn:
            continue
        url = OPENLIBRARY_API.format(isbn)
        try:
            resp = requests.get(url)
            data = resp.json()
            key = f'ISBN:{isbn}'
            if key in data:
                book = data[key]
                cover_url = book.get('cover', {}).get('large') or book.get('cover', {}).get('medium') or book.get('cover', {}).get('small')
                cover_path = ''
                if cover_url:
                    ext = os.path.splitext(cover_url)[1].split('?')[0] or '.jpg'
                    cover_path = f'/book_covers/{isbn}{ext}'
                    local_path = os.path.join(COVERS_DIR, f'{isbn}{ext}')
                    if not os.path.exists(local_path):
                        img_resp = requests.get(cover_url)
                        if img_resp.ok:
                            with open(local_path, 'wb') as imgf:
                                imgf.write(img_resp.content)
                lines.append(f"{title}\t{author}\t{isbn}\t{cover_path}")
        except Exception as e:
            print(f'Error fetching {isbn}: {e}')
        time.sleep(1)  # be nice to the API

with open(OUTPUT_FILE, 'w') as f:
    f.write('\n'.join(lines) + '\n')
print(f'Wrote {len(lines)} books to {OUTPUT_FILE}')
