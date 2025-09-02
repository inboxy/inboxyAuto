//indexDB
const DB_NAME = 'SensorDB';
const DB_VERSION = 1;
const STORE_NAME = 'readings';

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = event => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'timestamp' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// save reading to indexDB
async function saveReading(reading) {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  tx.objectStore(STORE_NAME).put(reading);
  return tx.complete;
}


// clean up indexDB
async function clearReadings() {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  tx.objectStore(STORE_NAME).clear();
  return tx.complete;
}

// get all readings
async function getAllReadings() {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}








// script.js

let recording = false;
let data = [];

function startRecording() {
  if (recording) return;
  recording = true;
  data = [];

  document.getElementById("status").textContent = "Recording...";

  window.addEventListener("devicemotion", handleMotion);
  window.addEventListener("deviceorientation", handleOrientation);
  navigator.geolocation.watchPosition(handlePosition, handleError, {
    enableHighAccuracy: true,
    maximumAge: 1000,
    timeout: 5000,
  });
}

function stopRecording() {
  if (!recording) return;
  recording = false;

  document.getElementById("status").textContent = "Stopped";

  window.removeEventListener("devicemotion", handleMotion);
  window.removeEventListener("deviceorientation", handleOrientation);
  // Geolocation watchPosition can't be removed directly without storing the watch ID
}

function handleMotion(event) {
  const { acceleration, rotationRate } = event;
  const timestamp = Date.now();
  data.push({
    timestamp,
    ax: acceleration.x,
    ay: acceleration.y,
    az: acceleration.z,
    alpha: rotationRate.alpha,
    beta: rotationRate.beta,
    gamma: rotationRate.gamma,
  });
}

function handleOrientation(event) {
  // Optional: capture orientation data
}

function handlePosition(position) {
  const { latitude, longitude, altitude, accuracy } = position.coords;
  const timestamp = position.timestamp;
  data.push({
    timestamp,
    lat: latitude,
    lon: longitude,
    alt: altitude,
    acc: accuracy,
  });
}

function handleError(error) {
  console.error("Geolocation error:", error);
}

function exportCSV() {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(","),
    ...data.map(row => headers.map(h => row[h] ?? "").join(","))
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `sensor_data_${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
