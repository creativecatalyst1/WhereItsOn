#!/usr/bin/env bash
# Downloads small favicons for the streaming apps, teams and F1 into www/icons/.
# Run this on your own computer (it needs normal internet access):  bash fetch-icons.sh
# The app already looks for these exact file names and falls back to letter badges when one is missing.
set -u
cd "$(dirname "$0")/www/icons" || exit 1
get(){ # name domain
  curl -sS -m 20 -L -o "$1.png" "https://www.google.com/s2/favicons?domain=$2&sz=128" && echo "ok  $1" || echo "FAIL $1"
}
get app-yttv tv.youtube.com
get app-peacock peacocktv.com
get app-prime primevideo.com
get app-apple tv.apple.com
get app-paramount paramountplus.com
get app-espn espn.com
get app-fox fox.com
get app-nbalp nba.com
get app-max hbomax.com
get app-fubo fubo.tv
get app-netflix netflix.com
get team-cal calbears.com
get team-virginia-tech hokiesports.com
get team-49ers 49ers.com
get team-seahawks seahawks.com
get team-valkyries valkyries.wnba.com
get team-dream dream.wnba.com
get team-aces aces.wnba.com
get team-warriors warriors.com
get team-stanford gostanford.com
get team-formula-1 formula1.com
echo "Done. Reload the app. Favicons are the owners' marks: fine for a private demo, check brand rules before a public launch."
