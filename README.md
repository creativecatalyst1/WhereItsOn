# WhereItsOn demo app (weekend snapshot, Oct 9-12, 2026)

A standalone, offline-capable mobile app. No servers, no licensed feeds: the data is a snapshot of the weekend
(Cal 25-20 Virginia Tech, 49ers 32-29 Seahawks, Singapore GP, Valkyries' Finals clincher) compiled from public recaps.
Win chance is WhereItsOn's own estimate from score, time left and pregame odds.

## Project layout
    www/                        the app itself (this folder is what gets hosted or packaged)
      index.html                whole app: styles, weekend data and logic in one file
      manifest.webmanifest      install name, colors and icons
      sw.js                     offline cache (bump V, e.g. wio-v6 -> wio-v7, after changing any file)
      icons/
        icon-192.png            app icon, also the favicon and Apple touch icon
        icon-512.png            app icon, large
        icon-maskable-512.png   Android adaptive icon (extra padding for the crop)
    fetch-icons.sh              optional: downloads streaming app and team icons into www/icons/
    capacitor.config.json       Android wrapper settings (Capacitor)
    package.json                npm scripts: serve, android

## Try it on a phone in two minutes (installable app)
Live demo: https://creativecatalyst1.github.io/WhereItsOn/ (republished from `www/` on every push to main
by `.github/workflows/pages.yml`, which copies it to the `gh-pages` branch that GitHub Pages serves).

1. Open the live demo, or put the `www` folder on any static host (Netlify drop, Cloudflare Pages), or run `npx serve www` on your Wi-Fi.
2. Open the address in Chrome on Android, then menu > Install app. It opens full screen with its own icon and works offline.

## Make a real Android app (APK)
Needs Node and Android Studio on your computer:
    npm install
    npm run android      # adds the Android project, syncs www, opens Android Studio
Press Run in Android Studio to put it on a phone or emulator.

## Add the real app, team and F1 icons
    bash fetch-icons.sh
Downloads favicons into `www/icons/` using the file names the app looks for (app-peacock.png, team-cal.png, team-formula-1.png ...).
Missing files fall back to letter badges, so nothing breaks. Check each brand's rules before any public release.

## Moments
The chips under the logo jump between five moments: Sat pregame, Sat final drive, Sun F1 race, Sun 49ers 4th quarter, Mon recap.
Default apps: Peacock, Prime Video, Apple TV, ESPN. The 49ers game is on FOX, so it shows the "not in your apps" case.

## Invite-only preview and feedback
Each tester gets a personal invite link. Inside the app: a Feedback button (notes typed as Idea / Problem / Like,
plus a leaderboard where testers vote and see what is Planned or Done), a 3-tap survey offered once after about
90 seconds, and a visit log. Notes show without names; ones that attack people are held for review.
Everything lands in a Google Sheet that doubles as the dashboard. Setup: [feedback/SETUP.md](feedback/SETUP.md).
Until `FEEDBACK_URL` in `www/index.html` is set, the app runs as an open demo with no gate.

## Motion
- Welcome intro once per launch: the icon's board powers up and spells ON. Tap to skip, tap the logo to replay.
- Switching moments: the board flickers, scores and clocks roll to their new values, win-chance charts redraw.
- Tabs slide in from the side you tapped; game sheets slide up and down.
- Live lights: chase bulbs on live game boards, blinking clock colons, a pulsing "now" point on the chart,
  flashing scoring plays that just happened, and the bell rings when new alerts arrive.
- Android's "Remove animations" setting (Accessibility) turns all of it off.
