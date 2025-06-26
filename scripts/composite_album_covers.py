import os
import json
from PIL import Image
import requests
from io import BytesIO

# Paths
ALBUM_JSON = 'public/top_albums.json'
RECORD_IMAGE = 'public/record.webp'
ALBUM_COVERS_DIR = 'public/album_covers'
OUTPUT_DIR = 'public/album_composites'

os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(ALBUM_COVERS_DIR, exist_ok=True)

with open(ALBUM_JSON, 'r') as f:
    albums = json.load(f)

record = Image.open(RECORD_IMAGE).convert('RGBA')
record_w, record_h = record.size

def get_local_cover_path(album):
    # Use albumId if available, else fallback to filename or hash
    album_id = album.get('albumId')
    if album_id:
        return os.path.join(ALBUM_COVERS_DIR, f"{album_id}.webp")
    # fallback: use basename from URL
    cover_url = album.get('cover')
    if cover_url:
        return os.path.join(ALBUM_COVERS_DIR, os.path.basename(cover_url))
    return None

def download_cover(url, out_path):
    try:
        resp = requests.get(url)
        resp.raise_for_status()
        img = Image.open(BytesIO(resp.content)).convert('RGBA')
        img.save(out_path, 'WEBP', lossless=True)
        print(f"Downloaded {url} -> {out_path}")
        return out_path
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        return None

for album in albums:
    cover_url = album.get('cover')
    local_cover_path = get_local_cover_path(album)
    # Download if cover is a URL and not present locally
    if cover_url and cover_url.startswith('http'):
        if not os.path.exists(local_cover_path):
            download_cover(cover_url, local_cover_path)
    # Use local cover
    if not os.path.exists(local_cover_path):
        print(f"Missing cover: {local_cover_path}")
        continue
    cover = Image.open(local_cover_path).convert('RGBA')
    # Resize cover to fit within record (e.g., 70% of record size)
    scale = 0.2
    new_w = int(record_w * scale)
    new_h = int(record_h * scale)
    cover = cover.resize((new_w, new_h), Image.LANCZOS)
    # Center the cover on the record
    offset = ((record_w - new_w) // 2, (record_h - new_h) // 2)
    composite = record.copy()
    composite.paste(cover, offset, cover)
    # Save as transparent webp
    out_name = os.path.splitext(os.path.basename(local_cover_path))[0] + '_on_record.webp'
    out_path = os.path.join(OUTPUT_DIR, out_name)
    composite.save(out_path, 'WEBP', lossless=True)
    print(f"Saved {out_path}")
