import React from 'react';

const BAG_ITEMS = [
  { src: '/chess_piece.svg', alt: 'Chess Piece', link: 'https://www.chess.com/member/gzook' },
  { src: '/camera.svg', alt: 'Camera', link: 'https://www.instagram.com/gabetakesphotos111/' },
  { src: '/pickleball.svg', alt: 'Pickleball', link: null }
];

interface BagCycleButtonProps {
  position: React.CSSProperties;
  scale?: number;
  itemOffset?: { x: number; y: number };
  itemSize?: number;
  bagSize?: number;
}

const BagCycleButton: React.FC<BagCycleButtonProps> = ({
  position,
  scale = 1,
  itemOffset = { x: 4, y: -12 },
  itemSize = 6, // in vw
  bagSize = 22 // in vw
}) => {
  const [itemIndex, setItemIndex] = React.useState(0);
  const [hasStarted, setHasStarted] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const [itemHovered, setItemHovered] = React.useState(false);
  const [shakeAnimation, setShakeAnimation] = React.useState(false);

  const handleClick = () => {
    if (!hasStarted) {
      setHasStarted(true);
      setItemIndex(0);
      setShakeAnimation(true);
      setTimeout(() => setShakeAnimation(false), 400);
    } else {
      setItemIndex((prev) => {
        setShakeAnimation(true);
        setTimeout(() => setShakeAnimation(false), 400);
        return (prev + 1) % BAG_ITEMS.length;
      });
    }
  };

  const currentItem = BAG_ITEMS[itemIndex];
  const showTooltip = currentItem.alt === 'Camera' && itemHovered;
  const showChessTooltip = currentItem.alt === 'Chess Piece' && itemHovered;
  const showPickleTooltip = currentItem.alt === 'Pickleball' && itemHovered;

  const [chessData, setChessData] = React.useState<{
    rating?: number;
    lastOnline?: number;
    opening?: string;
    result?: string;
  } | null>(null);

  const getLastGameData = async (): Promise<{ endTime: number; result: string; opening: string } | null> => {
    try {
      const archiveRes = await fetch('https://api.chess.com/pub/player/gzook/games/archives');
      const archives = await archiveRes.json();
      const latestArchiveUrl = archives.archives?.slice(-1)[0];
      if (!latestArchiveUrl) return null;

      const gamesRes = await fetch(latestArchiveUrl);
      const gamesData = await gamesRes.json();
      const latestGame = gamesData.games?.sort((a: any, b: any) => b.end_time - a.end_time)[0];
      if (!latestGame) return null;

      const pgn = latestGame.pgn || '';
      const openingMatch = pgn.match(/^\[Opening "(.*?)"\]/m);
      const opening = openingMatch ? openingMatch[1] : 'Unknown Opening';

      const isWhite = latestGame.white.username.toLowerCase() === 'gzook';
      const result = isWhite ? latestGame.white.result : latestGame.black.result;

      return {
        endTime: latestGame.end_time,
        result,
        opening
      };
    } catch (error) {
      console.error('Error fetching last game data:', error);
      return null;
    }
  };

  React.useEffect(() => {
    if (hasStarted && currentItem.alt === 'Chess Piece' && !chessData) {
      const fetchData = async () => {
        try {
          const statsRes = await fetch('https://api.chess.com/pub/player/gzook/stats');
          const stats = await statsRes.json();
          const rapidRating = stats?.chess_rapid?.last?.rating ?? null;
          const lastGame = await getLastGameData();

          setChessData({
            rating: rapidRating,
            lastOnline: lastGame?.endTime ?? null,
            opening: lastGame?.opening ?? '',
            result: lastGame?.result ?? ''
          });
        } catch (error) {
          console.error('Error fetching chess data:', error);
        }
      };
      fetchData();
    }
  }, [itemIndex, hasStarted, currentItem, chessData]);

  const formatResult = (result: string): { label: string; color: string } => {
    const lower = result.toLowerCase();
    if (lower === 'win') return { label: 'Win', color: 'limegreen' };
    if (lower === 'stalemate') return { label: 'Draw', color: '#facc15' };
    return { label: 'Loss', color: '#ef4444' };
  };

  return (
    <div
      style={{
        position: 'absolute',
        transform: `scale(${scale})`,
        ...position,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer'
      }}
      onClick={handleClick}
    >
      <img
        src="/tote_bag.svg"
        alt="Bag"
        style={{
          width: `${bagSize}vw`,
          marginBottom: '1vh',
          filter: hovered ? 'drop-shadow(0 0.5vh 1.5vh rgba(0,0,0,0.18)) brightness(0.7)' : 'drop-shadow(0 0.5vh 1.5vh rgba(0,0,0,0.18))',
          transition: 'filter 0.2s ease',
          animation: shakeAnimation ? 'bag-shake 0.4s ease-in-out' : undefined,
          zIndex: 1
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />

      {hasStarted && (
        <div
          style={{
            position: 'absolute',
            left: `${itemOffset.x}vw`,
            top: `${itemOffset.y}vw`,
            width: `${itemSize}vw`,
            height: 'auto',
            zIndex: 2
          }}
        >
          <div
            onMouseEnter={() => setItemHovered(true)}
            onMouseLeave={() => setItemHovered(false)}
            style={{ position: 'relative', width: '100%', height: '100%' }}
          >
            <img
              src={currentItem.src}
              alt={currentItem.alt}
              style={{ width: '100%', height: 'auto', cursor: currentItem.link ? 'pointer' : 'default' }}
              onClick={(e) => {
                e.stopPropagation();
                if (currentItem.link) window.open(currentItem.link, '_blank');
              }}
            />

            {(showChessTooltip || showPickleTooltip || showTooltip) && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '9vw',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'black',
                  color: 'white',
                  padding: '0.8vw 1vw',
                  borderRadius: '0.6vw',
                  boxShadow: '0 0.3vw 1vw rgba(0,0,0,0.4)',
                  fontSize: '1.2vw',
                  zIndex: 10,
                  whiteSpace: 'nowrap',
                  textAlign: 'center',
                  maxWidth: '50vw'
                }}
              >
                {showChessTooltip ? (
                  chessData ? (
                    <>
                      <strong>Rapid Rating:</strong> {chessData.rating ?? 'N/A'}
                      <br />
                      <strong>Last Played:</strong>{' '}
                      {new Date(chessData.lastOnline * 1000).toLocaleDateString()}
                      <br />
                      {chessData.result && (() => {
                        const formatted = formatResult(chessData.result);
                        return (
                          <div>
                            <strong>Result:</strong>{' '}
                            <span style={{ color: formatted.color }}>{formatted.label}</span>
                          </div>
                        );
                      })()}
                    </>
                  ) : (
                    'Loading chess stats...'
                  )
                ) : showPickleTooltip ? (
                  'Coming soon.'
                ) : (
                  <>
                    <img
                      src="/optimized/melon-400.webp"
                      alt="Melon"
                      style={{
                        width: '20vw',
                        height: 'auto',
                        borderRadius: '0.4vw',
                        objectFit: 'cover',
                        border: '1px solid #333',
                        marginBottom: '0.5vw'
                      }}
                      srcSet="/optimized/melon-400.webp 400w, /optimized/melon-800.webp 800w, /optimized/melon-1200.webp 1200w"
                      sizes="(max-width: 600px) 100vw, 50vw"
                    />
                    I take photos!
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes bag-shake {
          10%, 90% { transform: translateX(-0.2vw) rotate(-2deg); }
          20%, 80% { transform: translateX(0.4vw) rotate(2deg); }
          30%, 50%, 70% { transform: translateX(-0.6vw) rotate(-4deg); }
          40%, 60% { transform: translateX(0.6vw) rotate(4deg); }
        }
      `}</style>
    </div>
  );
};

export default BagCycleButton;
