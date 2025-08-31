# Sensor Data Recorder

A Progressive Web App (PWA) for recording GPS, accelerometer, and gyroscope sensor data on mobile devices. Built with vanilla HTML, CSS, and JavaScript.

## Features

- 📍 **GPS Tracking** - Real-time location data with accuracy metrics
- 📱 **Accelerometer** - 3-axis motion detection with gravity
- 🌀 **Gyroscope** - Device orientation (alpha, beta, gamma)
- 📊 **Real-time Display** - Live sensor data visualization
- 💾 **Data Export** - Download recorded data as CSV
- 📱 **PWA Support** - Install as native app on mobile devices
- 🔄 **Background Recording** - Continue recording when app is backgrounded
- 📈 **Recording Stats** - Duration, frequency, and record count

## Installation

### Option 1: Install as PWA (Recommended)
1. Open the app in your mobile browser
2. Tap "Add to Home Screen" when prompted
3. Launch from your home screen like a native app

### Option 2: Local Development
1. Clone this repository
2. Open `index.html` in a web browser
3. Grant sensor permissions when prompted

## Usage

1. **Grant Permissions**: Allow access to location and motion sensors
2. **Start Recording**: Tap the "Start Recording" button
3. **Monitor Data**: View real-time sensor readings
4. **Stop & Export**: Stop recording and download your data as CSV

## Browser Compatibility

- ✅ Chrome/Chromium (Android, Desktop)
- ✅ Safari (iOS) - Manual PWA installation
- ✅ Firefox (Android, Desktop)
- ✅ Edge (Desktop, Mobile)

## Technical Details

### Sensor APIs Used
- `Geolocation API` for GPS coordinates
- `DeviceMotionEvent` for accelerometer data
- `DeviceOrientationEvent` for gyroscope data

### Data Format
Exported CSV includes:
- Timestamp (ISO format)
- Recording time (milliseconds)
- GPS: latitude, longitude, accuracy
- Accelerometer: X, Y, Z axes
- Gyroscope: alpha, beta, gamma rotation

### PWA Features
- Service worker for offline functionality
- Web app manifest for installation
- Responsive design for all screen sizes

## Privacy & Security

- ✅ All data stays on your device
- ✅ No data sent to external servers
- ✅ Requires explicit permission for each sensor
- ✅ Can be used completely offline

## Development

The app is built with:
- Vanilla JavaScript (ES6+)
- CSS Grid and Flexbox
- Progressive Web App standards
- No external dependencies

### File Structure
```
sensor-recorder/
├── index.html          # Main application file
├── manifest.json       # PWA manifest (embedded)
├── service-worker.js   # Service worker (embedded)
└── README.md          # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on mobile devices
5. Submit a pull request

## License

MIT License - feel free to use and modify as needed.

## Support

For issues or questions:
1. Check browser compatibility
2. Ensure HTTPS (required for sensor APIs)
3. Verify permissions are granted
4. Test on different devices

---

**Note**: This app requires HTTPS to function properly due to browser security requirements for sensor APIs.
