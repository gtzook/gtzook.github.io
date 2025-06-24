
import React from 'react';

const BAG_ITEMS = [
  { src: '/tamogotchi.svg', alt: 'Tamagotchi' },
  { src: '/camera.svg', alt: 'Camera' },
  { src: '/pickleball.svg', alt: 'Pickleball' },
];

const BAG_ITEM_POPUPS = [
  "This is my Tamagotchi! It kept me company during long study sessions.",
  "Some photos I took: https://www.instagram.com/gabetakesphotos111/",
  "Pickleball paddle – for when it's time to play!",
];

interface BagCycleButtonProps {
  position: React.CSSProperties;
  scale?: number;
  itemOffset?: { x: number; y: number };
  itemSize?: number;
  bagSize?: number;
}

const BagCycleButton: React.FC<BagCycleButtonProps> = ({ 
  position, scale = 1, itemOffset = { x: 60, y: -140 }, itemSize = 80, bagSize = 330 
}) => {
  const [itemIndex, setItemIndex] = React.useState(0);
  const [hovered, setHovered] = React.useState(false);
  const [itemHovered, setItemHovered] = React.useState(false);
  const [popupHovered, setPopupHovered] = React.useState(false);
  const [shakeAnimation, setShakeAnimation] = React.useState(false);

  const handleClick = () => {
    setItemIndex((prev) => {
      setShakeAnimation(true);
      setTimeout(() => setShakeAnimation(false), 400);
      return (prev + 1) % BAG_ITEMS.length;
    });
  };

  const showPopup = itemHovered || popupHovered;

  return (
    <div
      style={{ position: 'relative', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${scale})` }}
      onClick={handleClick}
    >
      <img
        src="/tote_bag.svg"
        alt="Bag"
        style={{
          width: bagSize,
          marginBottom: 8,
          filter: hovered ? 'drop-shadow(0 2px 8px rgba(0,0,0,0.18)) brightness(0.7)' : 'drop-shadow(0 2px 8px rgba(0,0,0,0.18))',
          transition: 'filter 0.2s',
          zIndex: 1,
          animation: shakeAnimation ? 'bag-shake 0.4s cubic-bezier(.36,.07,.19,.97) both' : undefined,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
      <div
        style={{
          position: 'absolute',
          left: itemOffset.x,
          top: itemOffset.y,
          width: itemSize,
          height: itemSize,
          zIndex: 2,
        }}
        onMouseEnter={() => setItemHovered(true)}
        onMouseLeave={() => setItemHovered(false)}
      >
        <img
          src={BAG_ITEMS[itemIndex].src}
          alt={BAG_ITEMS[itemIndex].alt}
          style={{ width: itemSize, height: itemSize, display: 'block', pointerEvents: 'none' }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: itemSize,
            height: itemSize,
            cursor: 'pointer',
            background: 'transparent',
            pointerEvents: 'auto',
          }}
          onMouseEnter={() => setItemHovered(true)}
          onMouseLeave={() => setItemHovered(false)}
        >
          {showPopup && (
            <div
              style={{
                position: 'absolute',
                left: itemSize + 10,
                top: 0,
                zIndex: 10,
                background: 'rgba(255,255,255,0.98)',
                borderRadius: 14,
                boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)',
                padding: 18,
                minWidth: 180,
                fontFamily: "'Indie Flower', cursive",
                fontSize: 18,
                color: '#333',
                textAlign: 'center',
                pointerEvents: 'auto',
                whiteSpace: 'pre-line',
              }}
              onMouseEnter={() => setPopupHovered(true)}
              onMouseLeave={() => setPopupHovered(false)}
            >
              {BAG_ITEM_POPUPS[itemIndex]}
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes bag-shake {
          10%, 90% { transform: translateX(-2px) rotate(-2deg); }
          20%, 80% { transform: translateX(4px) rotate(2deg); }
          30%, 50%, 70% { transform: translateX(-8px) rotate(-4deg);  }
          40%, 60% { transform: translateX(8px) rotate(4deg); }
        }
      `}</style>
    </div>
  );
};

export default BagCycleButton;
