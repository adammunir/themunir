#!/usr/bin/env bash
# Builds public/work/* from source material on the author's machine.
# Every asset is cut, scaled, and re-encoded here so provenance stays in one
# reviewable place. Anything showing real customer data is redacted in this
# script, never by hand.
set -euo pipefail

SRC_DOCS="$HOME/Documents"
OUT="$(cd "$(dirname "$0")/.." && pwd)/public/work"
mkdir -p "$OUT"/{oasis,lynx,spatial-adjust}

# H.264, no audio, web-start, a quality that holds up full-bleed.
clip() { # in start duration width out
  ffmpeg -v error -y -ss "$2" -t "$3" -i "$1" -an \
    -vf "scale=$4:-2:flags=lanczos,fps=30" \
    -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -movflags +faststart "$5"
}
poster() { # in time width out
  ffmpeg -v error -y -ss "$2" -i "$1" -frames:v 1 -vf "scale=$3:-2:flags=lanczos" -q:v 3 "$4"
}
webp() { # in out [width]
  if [[ -n "${3:-}" ]]; then
    cwebp -quiet -q 86 -resize "$3" 0 "$1" -o "$2"
  else
    cwebp -quiet -q 86 "$1" -o "$2"
  fi
}

# ── Oasis · Bulls Eye ─────────────────────────────────────────────────────────
# Globe stills come from the ?selftest=1 build: synthetic data, no customers.
GLOBE="$HOME/toro-oasis-globe-ultimate/docs/images"
webp "$GLOBE/home.png" "$OUT/oasis/globe-home.webp"
webp "$GLOBE/postcard.png" "$OUT/oasis/globe-postcard.webp"
webp "$GLOBE/minimap-pins.png" "$OUT/oasis/globe-minimap.webp"
webp "$GLOBE/heatmap-night.jpg" "$OUT/oasis/globe-heatmap.webp"
# Public App Store marketing panorama.
webp "$SRC_DOCS/Oasis_Assets/Oasis_App_Store.png" "$OUT/oasis/app-store.webp" 2400

# ── Oasis Mobile ──────────────────────────────────────────────────────────────
# Cover: the first three panels of the public App Store panorama, at 16:10.
# Figma frames in oasis-mobile/figma were exported from the design file; frames
# with client names stay in research/oasis-mobile-excluded.
mkdir -p "$OUT/oasis-mobile"
ffmpeg -v error -y -i "$SRC_DOCS/Oasis_Assets/Oasis_App_Store.png" \
  -vf "crop=4062:2539:0:0,scale=1600:1000:flags=lanczos" /tmp/_cover.png
cwebp -quiet -q 86 /tmp/_cover.png -o "$OUT/oasis-mobile/cover.webp"

# ── Lynx Drive ────────────────────────────────────────────────────────────────
SS="$SRC_DOCS/LynxDriveScreenSaver_AME"
clip "$SS/Screensaver Logo_1.mp4" 0 12 1600 "$OUT/lynx/screensaver.mp4"
poster "$SS/Screensaver Logo_1.mp4" 6 1600 "$OUT/lynx/screensaver.jpg"
# POC Course Report: mask the course picker, which shows a real-sounding club name.
POC="$HOME/LynxDrivePOC/LynxDrivePOC/docs"
ffmpeg -v error -y -i "$POC/fidelity/cr-01-default-docked-map-poc.png" \
  -vf "drawbox=x=305:y=14:w=200:h=38:color=white@1:t=fill" "$OUT/lynx/poc-course-report.png"
webp "$OUT/lynx/poc-course-report.png" "$OUT/lynx/poc-course-report.webp" && rm "$OUT/lynx/poc-course-report.png"
# Field map: crop the black padding under the phone UI.
ffmpeg -v error -y -i "$SRC_DOCS/Lynx Drive UI Screens/Assets/Map Flag Notes.png" \
  -vf "crop=1170:2026:0:0,scale=780:-2:flags=lanczos" "$OUT/lynx/map-flag-notes.png"
webp "$OUT/lynx/map-flag-notes.png" "$OUT/lynx/map-flag-notes.webp" && rm "$OUT/lynx/map-flag-notes.png"

# ── Lynx · Figma prototype frames ─────────────────────────────────────────────
# Exported from the Lynx prototype files into research/lynx-figma-src (never
# published). Course names in the global header and panels become "Demo Course".
# Frames that show staff usernames or first names stay in research/lynx-excluded.
LFS="$(dirname "$OUT")/../research/lynx-figma-src"
LF="$OUT/lynx/figma"
redact() { # name spec...
  local name="$1"; shift
  swift "$(dirname "$0")/redact.swift" "$LFS/$name.webp" /tmp/_redact.png "$@"
  cwebp -quiet -q 88 /tmp/_redact.png -o "$LF/$name.webp"
}
RIVERSIDE="462,28,282,40,Demo Course,26"
SPYGLASS="486,28,320,40,Demo Course,26"
redact desktop-hero-01-course-report-map "$RIVERSIDE"
redact desktop-hero-02-watering-plan-map "$SPYGLASS" "2330,936,160,68,Course Adjust,22"
redact desktop-hero-03-projected-flow "452,36,286,40,Demo Course,26" "2328,1150,170,40,Demo Course,24"
redact desktop-hero-04-alarm-response "$RIVERSIDE"
cp "$LFS/desktop-hero-05-map-station-detail.webp" "$LF/"
redact desktop-hero-06-hydraulic "$RIVERSIDE" "592,374,130,32,Demo Course,22" "2584,676,160,36,Demo Course,26"
redact desktop-morning-01-course-report "$RIVERSIDE"
redact desktop-morning-02-failed-filter "$RIVERSIDE"
redact desktop-morning-03-diagnostics "$SPYGLASS"
redact desktop-morning-04-add-note "$SPYGLASS"
redact desktop-morning-05-note-logged "$RIVERSIDE"
redact desktop-eod-01-holes "$SPYGLASS"
redact desktop-eod-02-program-adjust "$RIVERSIDE"
redact desktop-eod-03-station-adjust "$RIVERSIDE"

# ── Spatial Adjust ────────────────────────────────────────────────────────────
SA="$HOME/SpatialAdjustGuide/dist/media"
clip "$SA/understand-spatial-adjust.mp4" 22 12 1600 "$OUT/spatial-adjust/hero.mp4"
poster "$SA/understand-spatial-adjust.mp4" 30 1600 "$OUT/spatial-adjust/hero.jpg"
clip "$SA/suggested-adjustments.mp4" 24 10 1280 "$OUT/spatial-adjust/suggested.mp4"
poster "$SA/suggested-adjustments.mp4" 30 1280 "$OUT/spatial-adjust/suggested.jpg"
clip "$SA/push-to-lynx.mp4" 10 10 1280 "$OUT/spatial-adjust/push.mp4"
poster "$SA/push-to-lynx.mp4" 12 1280 "$OUT/spatial-adjust/push.jpg"

# Scroll-scrub cuts: a keyframe every 3 frames so seeking on scroll stays smooth.
scrub() { # in start duration width out
  ffmpeg -v error -y -ss "$2" -t "$3" -i "$1" -an \
    -vf "scale=$4:-2:flags=lanczos,fps=24" \
    -c:v libx264 -preset medium -crf 24 -g 3 -keyint_min 3 -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart "$5"
}
# Full films keep their narration and music.
film() { # in width out
  ffmpeg -v error -y -i "$1" -vf "scale=$2:-2:flags=lanczos" \
    -c:v libx264 -preset medium -crf 25 -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart "$3"
}
still() { # in time out
  ffmpeg -v error -y -ss "$2" -i "$1" -frames:v 1 -vf "scale=1920:-2:flags=lanczos" /tmp/_still.png
  cwebp -quiet -q 86 /tmp/_still.png -o "$3"
}

# ── Spatial Adjust · MarCom film (dashboard overview, take 8) ─────────────────
# The demo course is sample data from the recreation harness.
SAF="$SRC_DOCS/SpatialAdjust_MarCom/episodes/dashboard-overview/renders/dashboard-overview-take8.mp4"
clip "$SAF" 23 14 1600 "$OUT/spatial-adjust/hero.mp4"
poster "$SAF" 30 1600 "$OUT/spatial-adjust/hero.jpg"
scrub "$SAF" 84 26 1280 "$OUT/spatial-adjust/scrub.mp4"
poster "$SAF" 84 1280 "$OUT/spatial-adjust/scrub.jpg"
film "$SAF" 1280 "$OUT/spatial-adjust/film.mp4"
poster "$SAF" 1 1280 "$OUT/spatial-adjust/film.jpg"
still "$SAF" 15 "$OUT/spatial-adjust/toolbar.webp"
still "$SAF" 36 "$OUT/spatial-adjust/map-layers.webp"
still "$SAF" 27 "$OUT/spatial-adjust/map-course.webp"
still "$SAF" 70 "$OUT/spatial-adjust/chart.webp"
still "$SAF" 102 "$OUT/spatial-adjust/table.webp"
still "$SAF" 121 "$OUT/spatial-adjust/push-changes.webp"

# ── iCentral · teaser ─────────────────────────────────────────────────────────
# Keep the original launch film for the static product stills below.
mkdir -p "$OUT/icentral"
ICF="$HOME/Downloads/iCentral_Teaser.mp4"
ICF_STILLS="$SRC_DOCS/iCentral_MarCom/06-edit/final/iCentral-hero-16x9-FINAL.mp4"
clip "$ICF" 37 4 1600 "$OUT/icentral/hero.mp4"
poster "$ICF" 38.5 1600 "$OUT/icentral/hero.jpg"
scrub "$ICF" 58.5 22 1280 "$OUT/icentral/scrub.mp4"
poster "$ICF" 61.5 1280 "$OUT/icentral/scrub.jpg"
film "$ICF" 1280 "$OUT/icentral/film.mp4"
poster "$ICF" 38.5 1280 "$OUT/icentral/film.jpg"
still "$ICF_STILLS" 3 "$OUT/icentral/legacy.webp"
still "$ICF_STILLS" 8.6 "$OUT/icentral/home.webp"
still "$ICF_STILLS" 13 "$OUT/icentral/site-detail.webp"
still "$ICF_STILLS" 61.5 "$OUT/icentral/precision.webp"
still "$ICF_STILLS" 70 "$OUT/icentral/schedule.webp"
still "$ICF_STILLS" 78 "$OUT/icentral/water-use.webp"
still "$ICF_STILLS" 84 "$OUT/icentral/global-adjust.webp"
still "$ICF_STILLS" 48 "$OUT/icentral/controller-mode.webp"
still "$ICF_STILLS" 99.2 "$OUT/icentral/programs.webp"
still "$ICF_STILLS" 86 "$OUT/icentral/backup.webp"
still "$ICF_STILLS" 111.2 "$OUT/icentral/controller.webp"
still "$ICF_STILLS" 117 "$OUT/icentral/map.webp"
still "$ICF_STILLS" 122 "$OUT/icentral/map-cluster.webp"

# ── iCentral · Figma frames ───────────────────────────────────────────────────
# Originals live in research/icentral-figma-src (never published). The sample
# account "Riverside Town Hall Park" becomes the film's fictional "Harbor Vale
# Parks", and a person-like controller name becomes "Depot". Frames with names,
# addresses, phone numbers, or a real city's invite stay in research/icentral-excluded.
IFS_="$(dirname "$OUT")/../research/icentral-figma-src"
IF="$OUT/icentral/figma"
iredact() { # name spec...
  local name="$1"; shift
  swift "$(dirname "$0")/redact.swift" "$IFS_/$name.webp" /tmp/_redact.png "$@"
  cwebp -quiet -q 88 /tmp/_redact.png -o "$IF/$name.webp"
}
ACCOUNT="350,20,186,26,Harbor Vale Parks,15"
iredact hero-home-showcase "$ACCOUNT"
iredact ga-1-select "$ACCOUNT"
iredact hero-global-adjustments "$ACCOUNT" "151,597,128,18,Depot Eagle Plus,13" "536,860,150,20,Depot Eagle Plus,15"
iredact ga-3-schedule "$ACCOUNT" "151,675,124,18,Depot Eagle Plus,13"
iredact ga-4-review "$ACCOUNT" "151,481,128,18,Depot Eagle Plus,13"
iredact ga-5-success "$ACCOUNT"

# ── Before / after sliders · legacy frames ────────────────────────────────────
# Sources live in git-ignored research/ folders and are never published. Each
# legacy frame is cut to 16:9 so it lines up under its redesigned frame.
#
# Lynx Watering Plan (legacy): a real screenshot of the old desktop app, taken
# from the laptop mockup in my own portfolio site (themunir-main/img/I2.svg),
# which embeds it as a base64 PNG. Pull image #1 out, redact the course name
# (it appears in the course picker and in the "Course :" label), crop off the
# black screen bezel and the cut-off bottom toolbar, and scale to 2880x1620.
LLS="$(dirname "$OUT")/../research/lynx-legacy-src"
mkdir -p "$LLS"
python3 -I - "$HOME/Downloads/themunir-main/img/I2.svg" "$LLS/legacy-watering-plan.png" <<'PY'
import base64, re, sys
svg = open(sys.argv[1]).read()
imgs = re.findall(r'data:image/png;base64,([A-Za-z0-9+/=\s]+)', svg)
open(sys.argv[2], "wb").write(base64.b64decode(re.sub(r"\s", "", imgs[1])))
PY
swift "$(dirname "$0")/redact.swift" "$LLS/legacy-watering-plan.png" /tmp/_legacy_wp.png \
  "758,48,190,32,Demo Course,24" "1318,118,180,34,Demo Course,24"
ffmpeg -v error -y -i /tmp/_legacy_wp.png \
  -vf "crop=3379:1901:48:20,scale=2880:1620:flags=lanczos" /tmp/_legacy_wp_16x9.png
cwebp -quiet -q 88 /tmp/_legacy_wp_16x9.png -o "$LF/legacy-watering-plan.webp"

# iCentral Home (legacy): a RECREATION, not a capture. The legacy VM was not
# available, so the launch film used a 1:1 HTML rebuild of Home.aspx made from
# the screenshots in the Rain Master quick reference guide, with synthetic data
# (iCentral_MarCom/05-capture/legacy-recreation). The 1920x1080 still is
# already 16:9. The invented customer number becomes an obvious sample.
mkdir -p "$IF"
cp "$SRC_DOCS/iCentral_MarCom/06-edit/gfx/v2/plates/legacy-still-16x9.png" "$IFS_/legacy-home-recreation.png"
swift "$(dirname "$0")/redact.swift" "$IFS_/legacy-home-recreation.png" /tmp/_legacy_home.png \
  "1088,268,134,34,12345678,26"
cwebp -quiet -q 88 /tmp/_legacy_home.png -o "$IF/legacy-home.webp"

# ── Toro Helix · design-parity captures (fixture data) ────────────────────────
mkdir -p "$OUT/helix"
HX="$HOME/toro-helix/artifacts/visual-diff-final"
for r in today.f0 signals.f0 investigations.f0 analytics.f1 journey.f0 memory.f0 roadmap.f0 code.f0 quality.f0 reports.f0 retention.f0 scout.f0 settings.f0; do
  webp "$HX/$r.app.png" "$OUT/helix/${r%.f*}.webp"
done
for k in design diff; do webp "$HX/memory.f0.$k.png" "$OUT/helix/memory-$k.webp"; done

echo "Assets written to $OUT"
du -sh "$OUT"/*
