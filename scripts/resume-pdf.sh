#!/usr/bin/env bash
# Prints /resume to public/Adam_Munir_Resume.pdf with headless Chrome, using
# the page's print styles, then renders page 1 to public/Adam_Munir_Resume.png
# for the on-page preview. Run it against a running server after any resume
# edit, so the download always matches the page. Needs poppler (pdfinfo,
# pdftoppm): brew install poppler.
#
#   scripts/resume-pdf.sh [url]    default: http://localhost:3100/resume
set -euo pipefail

URL="${1:-http://localhost:3100/resume}"
PUBLIC="$(cd "$(dirname "$0")/.." && pwd)/public"
OUT="$PUBLIC/Adam_Munir_Resume.pdf"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=5000 \
  --print-to-pdf="$OUT" "$URL" 2>/dev/null

PAGES="$(pdfinfo "$OUT" | awk '/^Pages:/ { print $2 }')"
pdftoppm -png -r 100 -f 1 -l 1 -singlefile "$OUT" "${OUT%.pdf}"
echo "Wrote $OUT ($PAGES page(s)) and its preview"

# The resume is a one-page document; a second page means something grew.
if [ "$PAGES" != "1" ]; then
  echo "Expected 1 page, got $PAGES. Tighten the content or the print sizes." >&2
  exit 1
fi
