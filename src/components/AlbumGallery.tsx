import React, { useEffect, useState } from 'react';

interface Album {
  album: string;
  artist: string;
  cover: string;
  url: string;
  albumId?: string;
}

function getCompositeImagePath(album: Album) {
  if (album.albumId) {
    return `/album_composites/${album.albumId}_on_record.webp`;
  }
  const coverName = album.cover.split('/').pop()?.split('.')[0] || 'unknown';
  return `/album_composites/${coverName}_on_record.webp`;
}

const AlbumGallery: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [index, setIndex] = useState(0);
  const [angle, setAngle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetch('/top_albums.json')
      .then((res) => res.json())
      .then((data) => setAlbums(data));
  }, []);

  useEffect(() => {
    albums.forEach((album) => {
      const composite = getCompositeImagePath(album);
      const img = new window.Image();
      img.src = composite;
    });
  }, [albums]);

  useEffect(() => {
    let animationFrame: number;
    let lastTimestamp = performance.now();
    const animate = (timestamp: number) => {
      if (!isHovered) {
        const delta = timestamp - lastTimestamp;
        lastTimestamp = timestamp;
        setAngle((prev) => prev + delta * 0.02);
      } else {
        lastTimestamp = timestamp;
      }
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isHovered]);

  const showNext = () => setIndex((i) => (i === albums.length - 1 ? 0 : i + 1));

  const hasAlbums = albums.length > 0;
  const album = hasAlbums ? albums[index] : null;
  const compositeImg = hasAlbums && album ? getCompositeImagePath(album) : '/record.webp';
  const recordAlt = hasAlbums ? album.album : 'Record';
  const recordLink = hasAlbums ? album.url : undefined;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex items-center">
        {hasAlbums && (
          <button
            onClick={showNext}
            className="text-white bg-black/40 rounded-full flex items-center justify-center -ml-3 hover:bg-black/80"
            style={{ width: '4vw', height: '4vw', fontSize: '2vw', left: '-4vw', top: '0vh', position: 'relative' }}
            aria-label="Next album"
          >
            &#8635;
          </button>
        )}

        <div className="relative w-[25vw] aspect-square flex items-center justify-center">
          <img
            src="/record_player.svg"
            alt="Record Player"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none z-0"
          />

          {hasAlbums && (
            <a
              href={recordLink}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-10 flex items-center justify-center translate-x-[-3.2vw]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                src={compositeImg}
                alt={recordAlt}
                className="w-[90%] object-contain transition-transform duration-300 ease-in-out"
                style={{
                  transform: `rotate(${angle}deg)`,
                  filter: isHovered ? 'brightness(0.5)' : 'none'
                }}
              />
            </a>
          )}

          <img
            src="/optimized/needle-400.webp"
            alt="Needle"
            className="absolute z-20 pointer-events-none"
            style={{
              right: '20%',
              top: '20%',
              width: '7vw',
              height: '10vw',
              transform: 'scale(1.5)',
              transformOrigin: '20% 10%'
            }}
            srcSet="/optimized/needle-400.webp 400w, /optimized/needle-800.webp 800w, /optimized/needle-1200.webp 1200w"
            sizes="(max-width: 600px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
};

export default AlbumGallery;
