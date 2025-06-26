import os
import json
from PIL import Image

# Paths
ALBUM_JSON = 'public/top_albums.json'
RECORD_IMAGE = 'public/record.webp'
ALBUM_COVERS_DIR = 'public/album_covers'
OUTPUT_DIR = 'public/album_composites'

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Load album data
with open(ALBUM_JSON, 'r') as f:
    albums = json.load(f)

# Load record image
record = Image.open(RECORD_IMAGE).convert('RGBA')
record_w, record_h = record.size

for album in albums:
    cover_filename = album.get('image') or album.get('cover') or album.get('cover_path')
    if not cover_filename:
        continue
    cover_path = os.path.join(ALBUM_COVERS_DIR, cover_filename)
    if not os.path.exists(cover_path):
        print(f"Missing cover: {cover_path}")
        continue
    cover = Image.open(cover_path).convert('RGBA')
    # Resize cover to fit within record (e.g., 70% of record size)
    scale = 0.7
    new_w = int(record_w * scale)
    new_h = int(record_h * scale)
    cover = cover.resize((new_w, new_h), Image.LANCZOS)
    # Center the cover on the record
    offset = ((record_w - new_w) // 2, (record_h - new_h) // 2)
    composite = record.copy()
    composite.paste(cover, offset, cover)
    # Save as transparent webp
    out_name = os.path.splitext(cover_filename)[0] + '_on_record.webp'
    out_path = os.path.join(OUTPUT_DIR, out_name)
    composite.save(out_path, 'WEBP', lossless=True)
    print(f"Saved {out_path}")
