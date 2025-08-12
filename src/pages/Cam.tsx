import React, { useState, useEffect, useRef } from "react";

const piUrl = "https://caesarpi.duckdns.org"; // updated to HTTPS and no port
const PASSWORD = "cocosister";

export default function Cam() {
  const [unlocked, setUnlocked] = useState(false);
  const [showFeed, setShowFeed] = useState(true);
  const [plotError, setPlotError] = useState(false);
  const heartbeatRef = useRef<number | null>(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    const pw = prompt("Enter the password to enter Caesar's chamber:");
    if (pw === PASSWORD) {
      setUnlocked(true);
    } else {
      alert("Access denied.");
    }
  }, []);

  useEffect(() => {
    if (!unlocked || !showFeed) return;

    // Start the stream
    fetch(`${piUrl}/start`, { method: "POST" });

    // Begin heartbeat
    heartbeatRef.current = window.setInterval(() => {
      fetch(`${piUrl}/heartbeat`, { method: "POST" });
    }, 5000);

    // Clean up on unmount
    const stopStream = () => {
      fetch(`${piUrl}/stop`, { method: "POST" });
      if (heartbeatRef.current) clearInterval(heartbeatRef.current);
    };

    window.addEventListener("beforeunload", stopStream);
    return () => {
      stopStream();
      window.removeEventListener("beforeunload", stopStream);
    };
  }, [unlocked, showFeed]);

  if (!unlocked) return null;

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>CAESAR</h1>
      
      {/* Video Feed */}
      <div style={styles.feedWrapper}>
        {showFeed ? (
          <img
            src={`${piUrl}/video_feed`}
            alt="Live feed"
            style={styles.feed}
            onError={() => {
              alert("Camera feed unavailable.");
              setShowFeed(false);
            }}
          />
        ) : (
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Seal_of_the_Lords_de_Cantilupe%3B_c.1301._Red_Wax%3B_the_National_Archives%2C_UK._PRO_23-926.png/640px-Seal_of_the_Lords_de_Cantilupe%3B_c.1301._Red_Wax%3B_the_National_Archives%2C_UK._PRO_23-926.png"
            alt="Roman seal"
            style={styles.icon}
          />
        )}
      </div>

      {/* Temperature Plot */}
      <div style={styles.plotSection}>
        <h2 style={styles.plotTitle}>TEMPERATURE READINGS</h2>
        <div style={styles.plotWrapper}>
          {!plotError ? (
            <img
              src={`${piUrl}/temp_plot`}
              alt="Temperature plot"
              style={styles.plot}
              onError={() => {
                console.error("Temperature plot unavailable");
                setPlotError(true);
              }}
            />
          ) : (
            <div style={styles.plotError}>
              <p>Temperature data unavailable</p>
              <button 
                style={styles.retryButton}
                onClick={() => setPlotError(false)}
              >
                Retry
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    backgroundColor: "#000",
    fontFamily: "'Cinzel', serif",
    color: "goldenrod",
    textAlign: "center" as const,
    minHeight: "100vh",
  },
  header: {
    fontSize: "4rem",
    letterSpacing: "0.3rem",
    color: "goldenrod",
    textShadow: "2px 2px #222",
    marginBottom: "2rem",
  },
  feedWrapper: {
    border: "6px double goldenrod",
    display: "inline-block",
    padding: "1rem",
    backgroundColor: "#111",
    boxShadow: "0 0 40px rgba(255, 215, 0, 0.2)",
    maxWidth: "90%",
    marginBottom: "3rem",
  },
  feed: {
    maxHeight: "70vh",
    border: "2px solid #ccc",
    display: "block",
  },
  icon: {
    maxHeight: "40vh",
    border: "2px solid #ccc",
    filter: "brightness(1.1)",
    opacity: 0.95,
  },
  plotSection: {
    marginTop: "2rem",
  },
  plotTitle: {
    fontSize: "2rem",
    letterSpacing: "0.2rem",
    color: "goldenrod",
    textShadow: "1px 1px #222",
    marginBottom: "1.5rem",
  },
  plotWrapper: {
    border: "4px double goldenrod",
    display: "inline-block",
    padding: "1rem",
    backgroundColor: "#111",
    boxShadow: "0 0 30px rgba(255, 215, 0, 0.15)",
    maxWidth: "90%",
  },
  plot: {
    maxWidth: "100%",
    height: "auto",
    border: "2px solid #ccc",
    display: "block",
  },
  plotError: {
    padding: "2rem",
    color: "goldenrod",
    fontSize: "1.2rem",
  },
  retryButton: {
    backgroundColor: "#b8860b",
    color: "#fff",
    border: "none",
    padding: "0.8rem 1.5rem",
    fontSize: "1rem",
    fontWeight: "bold" as const,
    borderRadius: "6px",
    cursor: "pointer",
    boxShadow: "2px 2px 6px rgba(255,215,0,0.3)",
    transition: "background-color 0.3s ease",
    marginTop: "1rem",
  },
  buttonRow: {
    marginTop: "2rem",
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    flexWrap: "wrap" as const,
  },
  button: {
    backgroundColor: "#b8860b",
    color: "#fff",
    border: "none",
    padding: "1rem 2rem",
    fontSize: "1.2rem",
    fontWeight: "bold" as const,
    borderRadius: "6px",
    cursor: "pointer",
    boxShadow: "2px 2px 6px rgba(255,215,0,0.3)",
    transition: "background-color 0.3s ease",
  },
};
