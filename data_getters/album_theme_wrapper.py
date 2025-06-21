import os
import sys
import subprocess
import glob

# This wrapper will:
# 1. Run the Spotify getter to get albums and covers
# 2. For each album cover, run album_theme_image.py to generate themed images
# 3. Optionally combine with a user-provided overlay image

ALBUM_COVER_DIR = './public/album_covers'
THEME_OUT_DIR = './public/album_themes'
SPOTIFY_GETTER = './data_getters/spotify_getter.py'
THEME_SCRIPT = './data_getters/album_theme_image.py'

os.makedirs(THEME_OUT_DIR, exist_ok=True)

def run_spotify_getter():
    print('Running Spotify getter...')
    subprocess.run([sys.executable, SPOTIFY_GETTER], check=True)

def make_themed_images(overlay_img=None, radii=[220,160], color_keys=['color1','color2']):
    # Read album/artist info from top_albums.txt
    album_txt = './public/top_albums.txt'
    album_data = {}
    with open(album_txt, 'r', encoding='utf-8') as f:
        for line in f:
            parts = line.strip().split('\t')
            if len(parts) >= 3:
                album_name, artist_name, cover_path = parts[:3]
                album_id = os.path.splitext(os.path.basename(cover_path))[0]
                album_data[album_id] = {'album': album_name, 'artist': artist_name, 'cover': cover_path}
    covers = glob.glob(f'{ALBUM_COVER_DIR}/*.jpg')
    for cover in covers:
        album_id = os.path.splitext(os.path.basename(cover))[0]
        out_path = os.path.join(THEME_OUT_DIR, f'{album_id}_theme.webp')
        album_name = album_data.get(album_id, {}).get('album', '')
        artist_name = album_data.get(album_id, {}).get('artist', '')
        cmd = [sys.executable, THEME_SCRIPT, cover, out_path, '--radii'] + list(map(str, radii)) + ['--color_keys'] + color_keys
        if overlay_img:
            cmd += ['--overlay', overlay_img]
        if album_name:
            cmd += ['--album_name', album_name]
        if artist_name:
            cmd += ['--artist_name', artist_name]
        print(' '.join(cmd))
        subprocess.run(cmd, check=True)

def main():
    import argparse
    parser = argparse.ArgumentParser(description='Run Spotify album getter and themed image generator.')
    parser.add_argument('--overlay', help='Optional overlay image path', default=None)
    parser.add_argument('--radii', nargs='+', type=int, default=[200,180], help='Circle radii (outer to inner)')
    parser.add_argument('--color_keys', nargs='+', default=['color1','color2'], help='Pywal color keys for circles')
    args = parser.parse_args()
    run_spotify_getter()
    make_themed_images(args.overlay, args.radii, args.color_keys)

if __name__ == '__main__':
    main()
