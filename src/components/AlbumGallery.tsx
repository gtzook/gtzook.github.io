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

  const showNext = () =>
    setIndex((i) => (i === albums.length - 1 ? 0 : i + 1));

  const hasAlbums = albums.length > 0;
  const album = hasAlbums ? albums[index] : null;
  const compositeImg =
    hasAlbums && album ? getCompositeImagePath(album) : '/record.webp';
  const recordAlt = hasAlbums ? album.album : 'Record';
  const recordLink = hasAlbums ? album.url : undefined;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {hasAlbums && (
          <button
            onClick={showNext}
            style={{
              width: '40px',
              height: '40px',
              fontSize: '18px',
              marginRight: '8px',
              background: 'rgba(0,0,0,0.4)',
              color: 'white',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = 'rgba(0,0,0,0.8)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = 'rgba(0,0,0,0.4)')
            }
            aria-label="Next album"
          >
            ↻
          </button>
        )}

        {/* Record Player Container */}
        <div
          style={{
            position: 'relative',
            width: '260px',
            height: '260px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Player base */}
          <img
            src="/record_player.svg"
            alt="Record Player"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* Spinning record */}
          {hasAlbums && (
            <a
              href={recordLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'translateX(-30px)', // replaces vw offset
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                src={compositeImg}
                alt={recordAlt}
                style={{
                  width: '85%',
                  objectFit: 'contain',
                  transform: `rotate(${angle}deg)`,
                  transition: 'transform 0.3s ease-in-out',
                  filter: isHovered ? 'brightness(0.5)' : 'none',
                }}
              />
            </a>
          )}

          {/* Needle */}
          <img
            src="/optimized/needle-400.webp"
            alt="Needle"
            style={{
              position: 'absolute',
              right: '50px',
              top: '40px',
              width: '60px',
              height: '90px',
              transform: 'scale(1.5)',
              transformOrigin: '20% 10%',
              pointerEvents: 'none',
              zIndex: 20,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AlbumGallery;
