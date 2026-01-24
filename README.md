# StormWatch — Local Weather Alerts

A minimal, mobile-first weather emergency dashboard. Get real-time NWS alerts, forecasts, precipitation data, and regional weather news for any US ZIP code.

## Features

### 📍 Vital Tab
- **Emergency Alerts** — Active NWS warnings with severity badges (Extreme, Severe, Moderate, Minor)
- **Safety Tips** — 50+ alert types mapped to actionable guidance
- **Current Conditions** — Temperature, humidity, wind speed, visibility
- **12-Hour Forecast** — Scrollable hourly forecast with precipitation probability

### 📅 Forecast Tab
- **7-Day Outlook** — Extended daily forecast with highs, lows, and conditions

### 🌧️ Precip Tab
- **Precipitation Chance** — Probability of rain/snow for next 24 hours
- **Snow & Ice Forecast** — Visual accumulation chart (only shown when relevant)
- **Wind Forecast** — Max sustained winds and gusts with warnings for strong wind

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

## Screenshots

The app features a dark theme optimized for readability during emergencies.

## Live Demo

Visit: `https://[your-username].github.io/stormwatch/`

## Quick Start

1. Open the app
2. Tap "Set Location"
3. Enter your 5-digit US ZIP code
4. View your local weather data

## Deployment to GitHub Pages

1. Create a new repository on GitHub
2. Upload files: `index.html`, `manifest.json`
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
