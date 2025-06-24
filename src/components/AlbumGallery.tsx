import React, { useEffect, useState } from 'react';

interface Album {
  album: string;
  artist: string;
  cover: string;
  url: string;
}

function parseAlbums(text: string): Album[] {
  return text.split('\n')
    .map(line => line.trim())
    .filter(line => line)
    .map(line => {
      const [album, artist, cover, url] = line.split('\t');
      return { album, artist, cover, url };
    })
    .filter(album => album.cover);
}

function getThemedImagePath(cover: string) {
  // cover: '/album_covers/ALBUMID.jpg' => '/album_themes/ALBUMID_theme.webp'
  const match = cover.match(/\/album_covers\/(.+)\.jpg$/);
  if (match) {
    return `/album_themes/${match[1]}_theme.webp`;
  }
  return cover;
}

const AlbumGallery: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [index, setIndex] = useState(0);
  const [angle, setAngle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetch('/top_albums.txt')
      .then(res => res.text())
      .then(text => setAlbums(parseAlbums(text)));
  }, []);

  // Preload all themed images
  useEffect(() => {
    albums.forEach(album => {
      const themed = getThemedImagePath(album.cover);
      const img = new window.Image();
      img.src = themed;
    });
  }, [albums]);

  // Smoothly rotate the image, pause on hover
  useEffect(() => {
    let animationFrame: number;
    let lastTimestamp = performance.now();
    const animate = (timestamp: number) => {
      if (!isHovered) {
        const delta = timestamp - lastTimestamp;
        lastTimestamp = timestamp;
        setAngle(prev => (prev + delta * 0.02)); // 0.02 deg/ms
      } else {
        lastTimestamp = timestamp;
      }
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isHovered]);

  const showNext = () => setIndex(i => (i === albums.length - 1 ? 0 : i + 1));

  if (!albums.length) return null;
  const album = albums[index];
  const themedImg = getThemedImagePath(album.cover);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex items-center">
        <button
          onClick={showNext}
          className="text-white bg-black/40 rounded-full w-16 h-16 flex items-center justify-center text-3xl hover:bg-black/80"
          aria-label="Next album"
        >
          &#8635;
        </button>
        <div className="relative flex flex-col items-center" style={{ width: 420, height: 420 }}>
          {/* Themed album image (already includes record) */}
          <a
            href={album.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              width: 420,
              height: 420,
              borderRadius: '50%',
              overflow: 'hidden',
              position: 'absolute',
              left: 20,
              top: 10,
              zIndex: 1,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={themedImg}
              alt={album.album}
              style={{
                width: 420,
                height: 420,
                objectFit: 'cover',
                transition: 'transform 0.3s, filter 0.2s',
                transform: `rotate(${angle}deg)` ,
                filter: isHovered ? 'brightness(0.5)' : 'none',
                borderRadius: '50%',
              }}
            />
          </a>
          {/* Needle overlay */}
          <img
            src="/needle.webp"
            alt="Needle"
            style={{
              position: 'absolute',
              left: 285,
              top: 85,
              width: 120,
              height: 180,
              zIndex: 2,
              pointerEvents: 'none',
              transform: 'scale(150%)',
              transformOrigin: '20% 10%',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AlbumGallery;
