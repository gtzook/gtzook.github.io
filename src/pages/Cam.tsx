from flask import Flask, jsonify, send_file
from picamera2 import Picamera2
import threading
import time
import os
import subprocess

app = Flask(__name__)
capture_lock = threading.Lock()
plot_lock = threading.Lock()

TEMP_IMAGE_PATH = "/tmp/latest_snapshot.jpg"
TEMP_PLOT_PATH = "/home/gzook/temp_plot.png"
PLOT_SCRIPT_PATH = "/home/gzook/plot_temps.py"


@app.route("/health")
def health():
    return jsonify({"status": "ok"})


@app.route("/temp_plot")
def temp_plot():
    if not os.path.exists(TEMP_PLOT_PATH):
        return jsonify({"error": f"Plot file not found: {TEMP_PLOT_PATH}"}), 404

    return send_file(
        TEMP_PLOT_PATH,
        mimetype="image/png",
        as_attachment=False,
        max_age=0
    )


@app.route("/refresh_temp_plot", methods=["POST"])
def refresh_temp_plot():
    if not plot_lock.acquire(blocking=False):
        return jsonify({"error": "Plot refresh already in progress"}), 429

    try:
        print("[temp_plot] Regenerating temperature plot...")
        result = subprocess.run(
            ["python3", PLOT_SCRIPT_PATH],
            capture_output=True,
            text=True,
            timeout=120,
            check=True,
        )

        if result.stdout:
            print("[temp_plot] stdout:", result.stdout)
        if result.stderr:
            print("[temp_plot] stderr:", result.stderr)

        if not os.path.exists(TEMP_PLOT_PATH):
            return jsonify({"error": f"Plot file not found: {TEMP_PLOT_PATH}"}), 500

        return jsonify({"message": "Temperature plot refreshed"})
    except subprocess.TimeoutExpired:
        print("[temp_plot] Plot generation timed out.")
        return jsonify({"error": "Temperature plot generation timed out"}), 500
    except subprocess.CalledProcessError as e:
        print("[temp_plot] Plot script failed.")
        print("stdout:", e.stdout)
        print("stderr:", e.stderr)
        return jsonify({
            "error": "Temperature plot generation failed",
            "stdout": e.stdout,
            "stderr": e.stderr
        }), 500
    except Exception as e:
        print(f"[temp_plot] Error: {e}")
        return jsonify({"error": str(e)}), 500
    finally:
        plot_lock.release()


def capture_to_file():
    picam2 = None
    try:
        print("[camera] Opening camera...")
        picam2 = Picamera2()

        preview_config = picam2.create_preview_configuration(
            main={"size": (640, 480), "format": "RGB888"},
            buffer_count=2
        )

        still_config = picam2.create_still_configuration(
            main={"size": (3280, 2464)},
            buffer_count=1
        )

        print("[camera] Configuring preview...")
        picam2.configure(preview_config)

        print("[camera] Starting camera...")
        picam2.start()

        print("[camera] Letting AE/AWB settle...")
        time.sleep(1.5)

        print("[camera] Switching mode and capturing...")
        picam2.switch_mode_and_capture_file(still_config, TEMP_IMAGE_PATH)
        print(f"[camera] Saved to {TEMP_IMAGE_PATH}")

    finally:
        if picam2 is not None:
            try:
                print("[camera] Stopping camera...")
                picam2.stop()
            except Exception as e:
                print(f"[camera] Error during stop: {e}")
            try:
                print("[camera] Closing camera...")
                picam2.close()
            except Exception as e:
                print(f"[camera] Error during close: {e}")


@app.route("/snapshot", methods=["GET", "POST"])
def snapshot():
    if not capture_lock.acquire(blocking=False):
        return jsonify({"error": "Capture already in progress"}), 429

    try:
        print("[snapshot] About to capture...")
        capture_to_file()
        print("[snapshot] Capture finished.")

        if not os.path.exists(TEMP_IMAGE_PATH):
            return jsonify({"error": "Snapshot file was not created"}), 500

        return send_file(
            TEMP_IMAGE_PATH,
            mimetype="image/jpeg",
            as_attachment=False,
            max_age=0
        )
    except Exception as e:
        print(f"[snapshot] Error: {e}")
        return jsonify({"error": str(e)}), 500
    finally:
        capture_lock.release()


if __name__ == "__main__":
    print("[server] Snapshot server starting on port 8080...")
    app.run(host="0.0.0.0", port=8080, threaded=True)
