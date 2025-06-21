import os
from PIL import Image
import pywal as wal
import random

def get_pywal_primary_color(image_path):
    colors = wal.colors.get(image_path)
    return colors['colors']['color1']

def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def make_book_bg(cover_path, out_path, size=(220, 320)):
    color = get_pywal_primary_color(cover_path)
    rgb = hex_to_rgb(color)
    bg = Image.new('RGB', size, rgb)
    # Add the book cover with a random small rotation
    cover = Image.open(cover_path).convert('RGBA')
    # Resize cover to fit nicely inside bg
    cover_w = int(size[0] * 0.8)
    cover_h = int(size[1] * 0.8)
    cover = cover.resize((cover_w, cover_h), Image.LANCZOS)
    # Random rotation between -7 and +7 degrees
    angle = random.uniform(-7, 7)
    cover = cover.rotate(angle, resample=Image.BICUBIC, expand=True)
    # Center the rotated cover on the bg
    cover_x = (size[0] - cover.width) // 2
    cover_y = (size[1] - cover.height) // 2
    bg = bg.convert('RGBA')
    bg.alpha_composite(cover, (cover_x, cover_y))
    bg = bg.convert('RGB')
    bg.save(out_path, 'WEBP')
    print(f"Saved background for {cover_path} to {out_path} with rotation {angle:.2f} degrees")

def main():
    import glob
    import argparse
    parser = argparse.ArgumentParser(description='Generate book backgrounds using pywal primary color.')
    parser.add_argument('--covers_dir', default='./public/book_covers', help='Directory with book covers')
    parser.add_argument('--out_dir', default='./public/book_bgs', help='Directory to save backgrounds')
    parser.add_argument('--size', nargs=2, type=int, default=[220,320], help='Background size (width height)')
    args = parser.parse_args()
    os.makedirs(args.out_dir, exist_ok=True)
    for cover in glob.glob(os.path.join(args.covers_dir, '*.jpg')):
        book_id = os.path.splitext(os.path.basename(cover))[0]
        out_path = os.path.join(args.out_dir, f'{book_id}_bg.webp')
        make_book_bg(cover, out_path, tuple(args.size))

if __name__ == '__main__':
    main()
