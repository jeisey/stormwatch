# StormWatch — Local Weather Alerts

A minimal, mobile-first weather emergency dashboard. Get real-time NWS alerts, forecasts, precipitation data, and regional weather news for any US ZIP code. Always verify with local authorities if unsure about any data.

## Features

### 📍 Vital Tab
- **Emergency Alerts** — Active NWS warnings with severity badges (Extreme, Severe, Moderate, Minor)
- **Safety Tips** — 50+ alert types mapped to actionable guidance
- **Current Conditions** — Temperature with a matching weather glyph, "feels like" (heat index / wind chill), humidity, wind (with gusts), dew point, barometric pressure, and visibility
- **12-Hour Forecast** — Scrollable hourly forecast with precipitation probability and a temperature-trend sparkline

### 📅 Forecast Tab
- **7-Day Outlook** — Extended daily forecast with highs, lows, and conditions

### 🌧️ Precip Tab
- **Precipitation Chance** — Probability of rain/snow for next 24 hours
- **Snow & Ice Forecast** — Visual accumulation chart (only shown when relevant)
- **Wind Forecast** — Max sustained winds and gusts with warnings for strong wind

### 📡 Radar Tab *(NEW)*
A full, dependency-free live weather radar — built from scratch on a `<canvas>`, no
mapping library. Centered on your ZIP the moment you open it.
- **Animated radar loop** — The last ~2 hours of radar plus a short-range forecast,
  playing on a smooth, cross-faded timeline (RainViewer tiles)
- **Rain Reaching You (nowcast)** — Samples radar intensity at your exact coordinates
  across the forecast frames to estimate when precipitation will *arrive* or *clear*
  — e.g. "Rain in ~20 min" or "Easing — likely to clear in ~30 min"
- **Storm-warning polygons** — Active NWS Tornado / Severe Thunderstorm / Flash Flood
  warnings drawn over the map in their real shapes, color-coded by severity
- **Rain / Clouds layers** — Toggle between precipitation radar and infrared satellite
- **Touch-native controls** — Drag to pan, pinch / wheel / double-tap to zoom,
  one-tap recenter, scrubbable timeline with play/pause
- **Battery-aware** — Only initializes when you open the tab, and pauses rendering
  when the tab is hidden or the app is backgrounded

### �️ Prepare Tab *(NEW)*
- **Impact Timeline** — Visual timeline showing when conditions will change
- **Action Checklist** — Dynamic preparation tasks based on active alerts
  - "Do Now" — Urgent tasks to complete immediately
  - "Before Storm" — Tasks to do before conditions deteriorate  
  - "Have Ready" — Items to have accessible
  - Persistent checkboxes — Progress saved locally
- **Supply Calculator** — Calculate emergency supplies based on household size
  - Water, food, batteries, flashlights
  - Adaptive extras based on storm type (blankets for cold, extra water for heat)
- **Emergency Contacts** — One-tap calling for 911, 211, Poison Control
  - Link to local NWS forecast office

### �📰 News Tab
- **Regional Weather News** — Breaking weather news via GDELT
- **State-Level Coverage** — Ensures suburban areas get relevant news

## Performance & Offline

StormWatch is built to feel instant, especially when installed to your home screen:

- **Instant launch (service worker)** — The app shell is cached, so the installed app opens immediately and keeps working offline. The shell refreshes itself in the background (stale-while-revalidate).
- **Progressive / lazy loading** — Critical data (alerts, current conditions, forecast, precipitation) renders as soon as it arrives. Slower regional news loads separately so it never blocks the weather you actually need.
- **Skeleton loaders** — You see the layout shimmering into place instead of a blank screen.
- **Resilient fetching** — Each request has a timeout (no more hanging on a stalled connection), and if the network fails the app falls back to the last cached copy rather than erroring out.
- **Self-cleaning cache** — Expired entries are pruned on idle so local storage doesn't bloat and slow the app down over weeks of use.

## Screenshots

The app features a dark theme optimized for readability during emergencies.

## Live Demo

Visit: [https://jeisey.github.io/stormwatch/](https://jeisey.github.io/stormwatch/)

## Quick Start

1. Open the app
2. Tap "Set Location"
3. Enter your 5-digit US ZIP code
4. View your local weather data

## Add to Home Screen

StormWatch can be installed on your phone like a native app for quick access during emergencies.

### iOS (iPhone/iPad)

1. Open [https://jeisey.github.io/stormwatch/](https://jeisey.github.io/stormwatch/) in **Safari**
2. Tap the **Share** button (square with arrow pointing up) at the bottom of the screen
3. Scroll down and tap **"Add to Home Screen"**
4. Edit the name if desired, then tap **Add**
5. The StormWatch icon will appear on your home screen

### Android

1. Open [https://jeisey.github.io/stormwatch/](https://jeisey.github.io/stormwatch/) in **Chrome**
2. Tap the **three-dot menu** (⋮) in the top-right corner
3. Tap **"Add to Home screen"** or **"Install app"**
4. Confirm by tapping **Add** or **Install**
5. The StormWatch icon will appear on your home screen

Once installed, the app will open in full-screen mode without browser navigation bars, providing a native app-like experience.

## Deployment to GitHub Pages

1. Create a new repository on GitHub
2. Upload files: `index.html`, `manifest.json`, `sw.js`, and the icon PNGs
3. Go to **Settings → Pages**
4. Under "Source", select **Deploy from a branch**
5. Select `main` branch and `/ (root)` folder
6. Click **Save**

Your site will be live at `https://[username].github.io/[repo-name]/`

## Data Sources

| Data | Source | Notes |
|------|--------|-------|
| Geocoding | Zippopotam.us | ZIP to coordinates |
| Weather Alerts | NWS API `/alerts` | Real-time warnings |
| Current Conditions | NWS API `/observations` | From nearest station |
| Forecasts | NWS API `/forecast` | Hourly & daily |
| Precipitation/Wind | NWS API `/gridpoints` | Raw gridpoint data |
| Weather Radar | RainViewer Weather Maps v2 | Animated radar + IR satellite tiles |
| Radar Base Map | CARTO dark basemap (OpenStreetMap data) | Map tiles for the radar view |
| Weather News | GDELT DOC 2.0 | State-level search |

## Caching Strategy

Aggressive caching reduces API load and improves reliability:

| Resource | Cache Duration |
|----------|---------------|
| ZIP → Coordinates | 30 days |
| NWS Grid Points | 7 days |
| NWS Gridpoint Data | 15 minutes |
| Current Conditions | 5 minutes |
| Hourly Forecast | 15 minutes |
| Daily Forecast | 30 minutes |
| Active Alerts | 2 minutes |
| News Articles | 10 minutes |

## Supported Alert Types

Safety tips are provided for 50+ NWS alert types:

- **Winter:** Winter Storm, Blizzard, Ice Storm, Wind Chill, Freeze
- **Severe:** Tornado, Severe Thunderstorm
- **Flood:** Flash Flood, Flood, Coastal Flood
- **Heat:** Excessive Heat, Heat Advisory
- **Wind:** High Wind, Hurricane, Tropical Storm
- **Other:** Red Flag, Dense Fog, Air Quality

## Technical Details

### PWA Support
- Add to Home Screen capable
- Manifest file included
- Service worker for instant launch and offline use
- Mobile-optimized viewport

### API Compliance
- NWS requests include User-Agent header
- Respectful caching to minimize API calls
- Graceful degradation when APIs fail

### Browser Support
- Chrome/Edge 80+
- Safari 14+
- Firefox 75+
- iOS Safari, Chrome for Android

## Disclaimer

Data provided by NWS & GDELT. Not official. Always verify alerts with local authorities.

## License

MIT License — Free to use, modify, and deploy.

---

**Stay safe during severe weather.** 🌨️

