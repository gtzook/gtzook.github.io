import os
import sys
from PIL import Image, ImageDraw, ImageFont
import pywal as wal
import argparse

# Helper to extract pywal colors from an image
def get_pywal_colors(image_path):
    colors = wal.colors.get(image_path)
    # pywal returns a dict with 'colors' key containing color hexes
    # We'll use color0 (background), color1 (primary), color2 (secondary), etc.
    return colors['colors']

# Create a new image with album cover in center and colored circles
# overlay_img_path: optional, if provided, overlays this image on top
# circle_radii: list of radii for each color circle
# color_keys: list of pywal color keys to use for circles (e.g. ['color1', 'color2'])
def make_album_theme_image(album_cover_path, output_path, circle_radii, color_keys, overlay_img_path=None, album_name=None, artist_name=None):
    cover = Image.open(album_cover_path).convert('RGBA')
    COVER_SIZE = (250, 250)  # Constant album cover size
    # Canvas size: enough for largest circle + margin and text
    largest_radius = max(circle_radii)
    margin = 40
    text_height = 60  # Space for two lines of text
    size = (largest_radius + margin) * 2
    canvas = Image.new('RGBA', (size, size + text_height), (0,0,0,0))
    center = (size // 2, size // 2)

    # Get theme colors
    colors = get_pywal_colors(album_cover_path)
    
    # Draw circles (largest first)
    draw = ImageDraw.Draw(canvas)
    for i, (radius, key) in enumerate(zip(circle_radii, color_keys)):
        color = colors[key]
        xy = [center[0]-radius, center[1]-radius, center[0]+radius, center[1]+radius]
        draw.ellipse(xy, fill=color)

    # Paste album cover in center (fixed size)
    cover_resized = cover.resize(COVER_SIZE, Image.LANCZOS)
    cover_pos = (center[0]-COVER_SIZE[0]//2, center[1]-COVER_SIZE[1]//2)
    canvas.paste(cover_resized, cover_pos, cover_resized)

    # Add album and artist text (album above, artist below the cover)
    if album_name and artist_name:
        min_radius = min(circle_radii)
        # Calculate available width for album title at its vertical offset (chord length)
        # y_offset: distance from center to the baseline of the album title
        album_h = 0
        album_y = center[1] - COVER_SIZE[1]//2 - album_h - 10
        y_offset = abs(album_y + album_h//2 - center[1])
        # If y_offset > min_radius, restrict to 0 (shouldn't happen)
        if y_offset >= min_radius:
            max_album_width = 0
        else:
            from math import sqrt
            max_album_width = 2 * ( (min_radius**2 - y_offset**2) ** 0.5 ) - 80  # 10px margin each side
        # For artist name, use full diameter minus margin
        max_artist_width = min_radius * 2 - 20
        font_size = 32
        try:
            font_regular = ImageFont.truetype("DejaVuSans-Bold.ttf", font_size)
            font_italic = ImageFont.truetype("DejaVuSans-Oblique.ttf", font_size)
        except:
            font_regular = ImageFont.load_default()
            font_italic = ImageFont.load_default()
        from PIL import ImageColor
        def luminance(hex_color):
            rgb = ImageColor.getrgb(hex_color)
            return 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]
        inner_circle_color = colors.get(color_keys[-1], '#ffffff')
        lum = luminance(inner_circle_color)
        text_color = '#000000' if lum > 100 else '#ffffff'
        def get_text_size(text, font):
            try:
                bbox = font.getbbox(text)
                width = bbox[2] - bbox[0]
                height = bbox[3] - bbox[1]
                return width, height
            except AttributeError:
                return font.getsize(text)
        # Improved: Split album title into two lines for best balance and fit
        max_font_size = 40
        min_font_size = 10
        def best_split_title(title, font, max_width):
            words = title.split()
            if len(words) < 2:
                return [title]
            best = [title]
            min_diff = float('inf')
            for i in range(1, len(words)):
                line1 = ' '.join(words[:i])
                line2 = ' '.join(words[i:])
                w1, _ = get_text_size(line1, font)
                w2, _ = get_text_size(line2, font)
                if w1 <= max_width and w2 <= max_width:
                    diff = abs(w1 - w2)
                    if diff < min_diff:
                        min_diff = diff
                        best = [line1, line2]
            return best
        # Find largest font size where both lines fit
        for test_size in range(max_font_size, min_font_size-1, -2):
            try:
                font_regular = ImageFont.truetype("DejaVuSans-Bold.ttf", test_size)
                font_italic = ImageFont.truetype("DejaVuSans-Oblique.ttf", test_size)
            except:
                font_regular = ImageFont.load_default()
                font_italic = ImageFont.load_default()
            album_lines = best_split_title(album_name, font_regular, max_album_width)
            album_line_sizes = [get_text_size(line, font_regular) for line in album_lines]
            if all(w <= max_album_width for w, h in album_line_sizes):
                artist_w, artist_h = get_text_size(artist_name, font_italic)
                if artist_w <= max_artist_width:
                    font_size = test_size
                    break
        # Draw album title (possibly two lines) above the cover
        total_album_height = sum(h for w, h in album_line_sizes) + (len(album_lines)-1)*2
        album_y = center[1] - COVER_SIZE[1]//2 - total_album_height - 10
        text_x = size // 2
        y = album_y
        for i, line in enumerate(album_lines):
            w, h = get_text_size(line, font_regular)
            #draw.text((text_x - w//2, y), line, fill=text_color, font=font_regular)
            y += h + 2
        # Draw artist name below the cover
        artist_w, artist_h = get_text_size(artist_name, font_italic)
        artist_y = center[1] + COVER_SIZE[1]//2 + 10
        #draw.text((text_x - artist_w//2, artist_y), artist_name, fill=text_color, font=font_italic)

    # Overlay another image if provided
    if overlay_img_path:
        overlay = Image.open(overlay_img_path).convert('RGBA').resize(canvas.size, Image.LANCZOS)
        canvas = Image.alpha_composite(canvas, overlay)

    # Overlay the result on top of record.webp (not record.png)
    record_path = os.path.join(os.path.dirname(__file__), '../public/record.webp')
    if os.path.exists(record_path):
        record_img = Image.open(record_path).convert('RGBA')
        # Downsize the record image to 800x800
        record_img = record_img.resize((800, 800), Image.LANCZOS)
        rec_w, rec_h = record_img.size
        can_w, can_h = canvas.size
        spaghetti_offset = 60  # Offset to center the canvas vertically on the record
        # Create a new image the size of the record
        combined = record_img.copy()
        # Calculate top-left position to center the canvas
        offset = ((rec_w - can_w) // 2, (rec_h - can_h + spaghetti_offset) // 2)
        combined.alpha_composite(canvas, dest=offset)
        combined.save(output_path, 'WEBP')
        print(f"Saved themed album image over record to {output_path}")
    else:
        canvas.save(output_path, 'WEBP')
        print(f"Saved themed album image to {output_path}")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Create themed album image with pywal colors and overlay.')
    parser.add_argument('album_cover', help='Path to album cover image')
    parser.add_argument('output', help='Output image path')
    parser.add_argument('--overlay', help='Optional overlay image path', default=None)
    parser.add_argument('--radii', nargs='+', type=int, default=[220, 160], help='Circle radii (outer to inner)')
    parser.add_argument('--color_keys', nargs='+', default=['color1','color2'], help='Pywal color keys for circles')
    parser.add_argument('--album_name', help='Album name for text', default=None)
    parser.add_argument('--artist_name', help='Artist name for text', default=None)
    args = parser.parse_args()
    make_album_theme_image(args.album_cover, args.output, args.radii, args.color_keys, args.overlay, args.album_name, args.artist_name)
