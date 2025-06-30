import React from 'react';
import ReactDOM from 'react-dom';

const BAG_ITEMS = [
  { src: '/chess_piece.svg', alt: 'Chess Piece', link: 'https://www.chess.com/member/gzook' },
  { src: '/camera.svg', alt: 'Camera', link: 'https://www.instagram.com/gabetakesphotos111/' },
  { src: '/pickleball.svg', alt: 'Pickleball', link: null }
];

interface ChessData {
  rating?: number | null;
  lastOnline?: number | null;
  opening?: string;
  result?: string;
}

interface BagCycleButtonProps {
  position?: { left: string; top: string };
  scale?: number;
  itemOffset?: { x: number; y: number };
  itemSize?: number;
  bagSize?: number;
}

const BagCycleButton: React.FC<BagCycleButtonProps> = ({
  position = { left: '0vw', top: '0vh' },
  scale = 1,
  itemOffset = { x: 4, y: -12 },
  itemSize = 6,
  bagSize = 22,
}) => {
  const [itemIndex, setItemIndex] = React.useState(0);
  const [hasStarted, setHasStarted] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const [itemHovered, setItemHovered] = React.useState(false);
  const [shakeAnimation, setShakeAnimation] = React.useState(false);
  const [chessData, setChessData] = React.useState<ChessData | null>(null);
  const [loadingChess, setLoadingChess] = React.useState(false);

  const currentItem = BAG_ITEMS[itemIndex];

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

  React.useEffect(() => {
    let isMounted = true;

    const getLastGameData = async (): Promise<{ endTime: number; result: string; opening: string } | null> => {
      try {
        const archiveRes = await fetch('https://api.chess.com/pub/player/gzook/games/archives');
        if (!archiveRes.ok) return null;
        const archives = await archiveRes.json();
        const latestArchiveUrl = archives.archives?.slice(-1)[0];
        if (!latestArchiveUrl) return null;

        const gamesRes = await fetch(latestArchiveUrl);
        if (!gamesRes.ok) return null;
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
      } catch {
        return null;
      }
    };

    const fetchChessData = async () => {
      if (hasStarted && currentItem.alt === 'Chess Piece') {
        setLoadingChess(true);
        setChessData(null);
        try {
          const statsRes = await fetch('https://api.chess.com/pub/player/gzook/stats');
          if (!statsRes.ok) throw new Error('Stats fetch failed');
          const stats = await statsRes.json();
          const rapidRating = stats?.chess_rapid?.last?.rating ?? null;

          const lastGame = await getLastGameData();

          if (isMounted) {
            setChessData({
              rating: rapidRating,
              lastOnline: lastGame?.endTime ?? null,
              opening: lastGame?.opening ?? '',
              result: lastGame?.result ?? '',
            });
          }
        } catch {
          if (isMounted) setChessData(null);
        } finally {
          if (isMounted) setLoadingChess(false);
        }
      } else {
        setChessData(null);
        setLoadingChess(false);
      }
    };

    fetchChessData();

    return () => {
      isMounted = false;
    };
  }, [itemIndex, hasStarted, currentItem]);

  const showTooltip = currentItem.alt === 'Camera' && itemHovered;
  const showChessTooltip = currentItem.alt === 'Chess Piece' && itemHovered;
  const showPickleTooltip = currentItem.alt === 'Pickleball' && itemHovered;

  const formatResult = (result: string): { label: string; color: string } => {
    const lower = result.toLowerCase();
    if (lower === 'win') return { label: 'Win', color: 'limegreen' };
    if (lower === 'stalemate') return { label: 'Draw', color: '#facc15' };
    return { label: 'Loss', color: '#ef4444' };
  };

  return (
    <div
      style={{
        position: 'relative',
        left: position.left,
        top: position.top,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: `scale(${scale})`,
        width: `${bagSize}vw`,
      }}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src="/tote_bag.svg"
        alt="Bag"
        style={{
          width: '100%',
          marginBottom: '1vh',
          filter: hovered
            ? 'drop-shadow(0 0.5vh 1.5vh rgba(0,0,0,0.18)) brightness(0.7)'
            : 'drop-shadow(0 0.5vh 1.5vh rgba(0,0,0,0.18))',
          transition: 'filter 0.2s ease',
          animation: shakeAnimation ? 'bag-shake 0.4s ease-in-out' : undefined,
          zIndex: 41,
        }}
      />

      {hasStarted && (
        <div
          style={{
            position: 'absolute',
            left: `${itemOffset.x}vw`,
            top: `${itemOffset.y}vw`,
            width: `${itemSize}vw`,
            height: 'auto',
            zIndex: 42,
          }}
          onMouseEnter={() => setItemHovered(true)}
          onMouseLeave={() => setItemHovered(false)}
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

          {(showChessTooltip || showPickleTooltip || showTooltip) &&
            ReactDOM.createPortal(
              <div
                style={{
                  position: 'fixed',
                  bottom: '50%',
                  right: '50%',
                  backgroundColor: 'rgba(0, 0, 0, 0.85)',
                  color: 'white',
                  padding: '1.5vw 2vw',
                  borderRadius: '1vw',
                  boxShadow: '0 0.5vw 1.5vw rgba(0,0,0,0.7)',
                  fontSize: '1.8vw',
                  zIndex: 9999,
                  whiteSpace: 'normal',
                  textAlign: 'center',
                  maxWidth: '60vw',
                  minWidth: '300px',
                }}
              >
                {showChessTooltip ? (
                  loadingChess ? (
                    'Loading chess stats...'
                  ) : chessData ? (
                    <>
                      <strong>Rapid Rating:</strong> {chessData.rating ?? 'N/A'}
                      <br />
                      <strong>Last Played:</strong>{' '}
                      {chessData.lastOnline
                        ? new Date(chessData.lastOnline * 1000).toLocaleDateString()
                        : 'N/A'}
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
                      <br />
                      <strong>Opening:</strong> {chessData.opening || 'N/A'}
                    </>
                  ) : (
                    'Failed to load chess stats.'
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
                        marginBottom: '0.5vw',
                      }}
                      srcSet="/optimized/melon-400.webp 400w, /optimized/melon-800.webp 800w, /optimized/melon-1200.webp 1200w"
                      sizes="(max-width: 600px) 100vw, 50vw"
                    />
                    I take photos!
                  </>
                )}
              </div>,
              document.body
            )}
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
