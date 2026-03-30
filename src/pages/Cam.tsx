import React, { useState, useEffect } from "react";

const piUrl = "https://caesarpi.duckdns.org";
const PASSWORD = "cocosister";

export default function Cam() {
  const [unlocked, setUnlocked] = useState(false);
  const [plotError, setPlotError] = useState(false);
  const [plotUrl, setPlotUrl] = useState("");
  const [snapshotUrl, setSnapshotUrl] = useState<string | null>(null);
  const [isTakingPicture, setIsTakingPicture] = useState(false);
  const [isRefreshingPlot, setIsRefreshingPlot] = useState(false);
  const [snapshotError, setSnapshotError] = useState<string | null>(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap";
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
    return () => {
      if (snapshotUrl) {
        URL.revokeObjectURL(snapshotUrl);
      }
    };
  }, [snapshotUrl]);

  const loadExistingPlot = () => {
    setPlotError(false);
    setPlotUrl(`${piUrl}/temp_plot?ts=${Date.now()}`);
  };

  const refreshPlot = async () => {
    try {
      setIsRefreshingPlot(true);
      setPlotError(false);

      const response = await fetch(`${piUrl}/refresh_temp_plot`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`Failed to refresh plot (${response.status})`);
      }

      setPlotUrl(`${piUrl}/temp_plot?ts=${Date.now()}`);
    } catch (err) {
      console.error(err);
      setPlotError(true);
    } finally {
      setIsRefreshingPlot(false);
    }
  };

  const takePicture = async () => {
    try {
      setIsTakingPicture(true);
      setSnapshotError(null);

      const response = await fetch(`${piUrl}/snapshot`, {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        let message = `Failed to take picture (${response.status})`;

        try {
          const data = await response.json();
          if (data?.error) {
            message = data.error;
          }
        } catch {
        }

        throw new Error(message);
      }

      const blob = await response.blob();
      const newUrl = URL.createObjectURL(blob);

      setSnapshotUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return newUrl;
      });
    } catch (err) {
      console.error(err);
      setSnapshotError(
        err instanceof Error ? err.message : "Failed to take picture."
      );
    } finally {
      setIsTakingPicture(false);
    }
  };

  useEffect(() => {
    if (!unlocked) return;

    takePicture();
    loadExistingPlot();
  }, [unlocked]);

  if (!unlocked) return null;

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>CAESAR</h1>

      <div style={styles.feedWrapper}>
        {snapshotUrl ? (
          <img
            src={snapshotUrl}
            alt="Latest cage snapshot"
            style={styles.feed}
          />
        ) : (
          <div style={styles.placeholderWrapper}>
            <p style={styles.placeholderText}>Taking first snapshot...</p>
          </div>
        )}
      </div>

      <div style={styles.buttonRow}>
        <button
          style={{
            ...styles.button,
            opacity: isTakingPicture ? 0.7 : 1,
            cursor: isTakingPicture ? "not-allowed" : "pointer",
          }}
          onClick={takePicture}
          disabled={isTakingPicture}
        >
          {isTakingPicture ? "Taking picture..." : "Take Picture"}
        </button>

        <button
          style={{
            ...styles.button,
            opacity: isRefreshingPlot ? 0.7 : 1,
            cursor: isRefreshingPlot ? "not-allowed" : "pointer",
          }}
          onClick={refreshPlot}
          disabled={isRefreshingPlot}
        >
          {isRefreshingPlot ? "Refreshing plot..." : "Refresh Temperature Plot"}
        </button>
      </div>

      {snapshotError && <p style={styles.errorText}>{snapshotError}</p>}

      <div style={styles.plotSection}>
        <h2 style={styles.plotTitle}>TEMPERATURE READINGS</h2>
        <div style={styles.plotWrapper}>
          {!plotError && plotUrl ? (
            <img
              src={plotUrl}
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
                onClick={loadExistingPlot}
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
    marginBottom: "2rem",
    minWidth: "320px",
  },
  feed: {
    maxWidth: "100%",
    maxHeight: "70vh",
    border: "2px solid #ccc",
    display: "block",
  },
  placeholderWrapper: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    padding: "1rem",
    minHeight: "200px",
  },
  placeholderText: {
    fontSize: "1.1rem",
    color: "goldenrod",
    margin: 0,
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
    marginTop: "1rem",
    marginBottom: "1rem",
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
  errorText: {
    color: "#ff8080",
    fontSize: "1rem",
    marginTop: "0.5rem",
  },
};
