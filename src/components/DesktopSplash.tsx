const DESIGN_WIDTH = 1900;
const DESIGN_HEIGHT = 1200; // pick your fixed design height

const DesktopSplash: React.FC = () => {
  // ...your state hooks

  return (
    <div
      className="w-screen overflow-x-auto overflow-y-auto relative"
      style={{
        minHeight: `${DESIGN_HEIGHT}px`, // ensures minimum height
      }}
    >
      <div
        className="relative"
        style={{
          width: `${DESIGN_WIDTH}px`,
          minWidth: `${DESIGN_WIDTH}px`,
          minHeight: `${DESIGN_HEIGHT}px`,
          margin: '0 auto',
          zIndex: 1,
          position: 'relative',
        }}
      >
        {/* background image */}
        <div
          className="absolute top-0 left-0 w-full h-full z-0"
          style={{
            backgroundImage: 'url(/splash_bg.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top left',
            backgroundSize: 'cover',
          }}
        />

        {/* Content container */}
        <section
          className="relative"
          style={{
            width: `${DESIGN_WIDTH}px`,
            minWidth: `${DESIGN_WIDTH}px`,
            minHeight: `${DESIGN_HEIGHT}px`,
            margin: '0 auto',
            zIndex: 1,
          }}
        >
          {/* ...all your content, titles, buttons, galleries */}
        </section>
      </div>
    </div>
  );
};
