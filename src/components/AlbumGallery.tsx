import React, { useEffect, useState } from 'react';

interface Album {
  album: string;
  artist: string;
  cover: string;
  url: string;
  albumId?: string;
}

function getCompositeImagePath(album: Album) {
  // Use albumId if available, fallback to cover basename
  if (album.albumId) {
    return `/album_composites/${album.albumId}_on_record.webp`;
  }
  // fallback: use basename from cover url
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
      .then(res => res.json())
      .then(data => setAlbums(data));
  }, []);

  // Preload all composite images
  useEffect(() => {
    albums.forEach(album => {
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
        setAngle(prev => (prev + delta * 0.02));
      } else {
        lastTimestamp = timestamp;
      }
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isHovered]);

  const showNext = () => setIndex(i => (i === albums.length - 1 ? 0 : i + 1));

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
            className="text-white bg-black/40 rounded-full w-16 h-16 flex items-center justify-center text-3xl hover:bg-black/80"
            aria-label="Next album"
          >
            &#8635;
          </button>
        )}
        <div className="relative flex flex-col items-center" style={{ width: 420, height: 420 }}>
          <img
            src="/record_player.svg"
            alt="Record Player"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: 420,
              height: 420,
              zIndex: -1,
              pointerEvents: 'none',
            }}
          />
          {hasAlbums ? (
            <a
              href={recordLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                width: 340,
                height: 340,
                overflow: 'hidden',
                position: 'absolute',
                left: '36%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                src={compositeImg}
                alt={recordAlt}
                style={{
                  width: 340,
                  height: 340,
                  objectFit: 'cover',
                  transition: 'transform 0.3s, filter 0.2s',
                  transform: `rotate(${angle}deg)` ,
                  filter: isHovered ? 'brightness(0.5)' : 'none',
                }}
              />
            </a>
          ) : (
            <img
              src={compositeImg}
              alt={recordAlt}
              style={{
                width: 340,
                height: 340,
                objectFit: 'cover',
                position: 'absolute',
                left: '36%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${angle}deg)` ,
                zIndex: 1,
                transition: 'transform 0.3s, filter 0.2s',
              }}
            />
          )}
          <img
            src="/needle.webp"
            alt="Needle"
            style={{
              position: 'absolute',
              right: '20%',
              top: '20%',
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
