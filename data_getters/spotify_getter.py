import spotipy
from spotipy.oauth2 import SpotifyOAuth
import requests
import os

# Set your credentials and redirect URI here
CLIENT_ID = 'c3d52a92377a4245a8ac4666c50f1bfa'
CLIENT_SECRET = 'e8b9ef0925fd438b9cb649eb48ea8a1b'
REDIRECT_URI = 'http://127.0.0.1:8000/callback'

# Output folder for images
IMAGE_DIR = 'public/album_covers'
os.makedirs(IMAGE_DIR, exist_ok=True)

# Authenticate and get token
sp = spotipy.Spotify(auth_manager=SpotifyOAuth(
    client_id=CLIENT_ID,
    client_secret=CLIENT_SECRET,
    redirect_uri=REDIRECT_URI,
    scope='user-top-read'
))

# Get top albums from top tracks (Spotify API does not provide top albums directly)
results = sp.current_user_top_tracks(limit=50, time_range='long_term')
albums = []
artists_seen = set()

for item in results['items']:
    album = item['album']
    artist_name = album['artists'][0]['name']
    album_name = album['name']
    album_id = album['id']
    album_url = album['external_urls']['spotify']
    image_url = album['images'][0]['url'] if album['images'] else None

    # Only add if artist not already seen
    if artist_name not in artists_seen:
        artists_seen.add(artist_name)
        albums.append({
            'album_name': album_name,
            'artist_name': artist_name,
            'album_url': album_url,
            'image_url': image_url,
            'album_id': album_id
        })
    if len(albums) == 5:
        break

# Download images and write output
with open('public/top_albums.txt', 'w', encoding='utf-8') as f:
    for album in albums:
        img_path = f"{IMAGE_DIR}/{album['album_id']}.jpg"
        # Download image if not already present
        if album['image_url'] and not os.path.exists(img_path):
            r = requests.get(album['image_url'])
            with open(img_path, 'wb') as imgf:
                imgf.write(r.content)
        # Write album info: album_name, artist_name, local_img_path, album_url
        f.write(f"{album['album_name']}\t{album['artist_name']}\t/album_covers/{album['album_id']}.jpg\t{album['album_url']}\n")

print("Done! Check public/top_albums.txt and public/album_covers/")