import React, { useState, useEffect } from "react";

const tunnelUrl = "https://stream.gabezook.com";
const PASSWORD = "cocosister";

export default function Cam() {
  const [unlocked, setUnlocked] = useState(false);
  const [showFeed, setShowFeed] = useState(true);

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

  if (!unlocked) return null;

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>CAESAR</h1>

      <div style={styles.feedWrapper}>
        {showFeed ? (
          <img
            src={`${tunnelUrl}/video_feed`}
            alt="Live feed"
            style={styles.feed}
          />
        ) : (
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Seal_of_the_Lords_de_Cantilupe%3B_c.1301._Red_Wax%3B_the_National_Archives%2C_UK._PRO_23-926.png/640px-Seal_of_the_Lords_de_Cantilupe%3B_c.1301._Red_Wax%3B_the_National_Archives%2C_UK._PRO_23-926.png"
            alt="Roman seal"
            style={styles.icon}
          />
        )}
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
