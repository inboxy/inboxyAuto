(() => {
  const startBtn = document.getElementById("startBtn");
  const stopBtn = document.getElementById("stopBtn");
  const statusEl = document.getElementById("status");

  let recording = false;
  let data = [];
  let geoWatchId = null;
  let lastMotion = 0;
  let lastOrientation = 0;
  const throttleInterval = 100; // ms

  startBtn.addEventListener("click", startRecording);
  stopBtn.addEventListener("click", stopRecording);

  function startRecording() {
    recording = true;
    data = [];
    statusEl.textContent = "Recording started";

    geoWatchId = navigator.geolocation.watchPosition(
      handleGeolocation,
      (err) => console.warn("Geolocation error:", err),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    window.addEventListener("devicemotion", handleMotion);
    window.addEventListener("deviceorientation", handleOrientation);
  }

  function stopRecording() {
    recording = false;
    statusEl.textContent = "Recording stopped";

    if (geoWatchId !== null) {
      navigator.geolocation.clearWatch(geoWatchId);
    }

    window.removeEventListener("devicemotion", handleMotion);
    window.removeEventListener("deviceorientation", handleOrientation);

    exportCSV(data);
  }

  function handleGeolocation(position) {
    if (!recording) return;
    const { latitude, longitude, accuracy } = position.coords;
    data.push([Date.now(), "GPS", latitude, longitude, accuracy]);
  }

  function handleMotion(event) {
    if (!recording || Date.now() - lastMotion < throttleInterval) return;
    lastMotion = Date.now();

    const acc = event.accelerationIncludingGravity;
    if (acc) {
      data.push([Date.now(), "ACC", acc.x, acc.y, acc.z]);
    }
  }

  function handleOrientation(event) {
    if (!recording || Date.now() - lastOrientation < throttleInterval) return;
    lastOrientation = Date.now();

    data.push([Date.now(), "GYRO", event.alpha, event.beta, event.gamma]);
  }

  function exportCSV(rows) {
    const header = "timestamp,type,x,y,z\n";
    const content = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([header + content], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `sensor_data_${Date.now()}.csv`;
    link.click();

    URL.revokeObjectURL(url);
  }
})();
