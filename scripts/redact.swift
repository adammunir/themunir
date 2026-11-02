// Paints over regions of a screen export and sets replacement text in the
// product's own typeface, so redactions read as sample data, not black bars.
//
//   swift scripts/redact.swift in.webp out.png "x,y,w,h,Replacement,size" ...
//
// Coordinates are pixels from the top-left. The fill colour is the most common
// colour on the patch's border and the text colour is the pixel that contrasts
// most with it, so patches match dimmed and overlaid states too. All colour
// work happens on raw pixel values: going through NSColor colour-manages the
// samples and the patch comes out a shade off its surroundings.
import AppKit

let args = CommandLine.arguments
guard args.count >= 4, let src = NSImage(contentsOfFile: args[1]),
      let cg = src.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
  FileHandle.standardError.write("usage: redact.swift in out spec...\n".data(using: .utf8)!)
  exit(1)
}

let rep = NSBitmapImageRep(cgImage: cg)
let spp = rep.samplesPerPixel

func pixel(_ x: Int, _ y: Int) -> [Int] {
  var p = [Int](repeating: 0, count: spp)
  rep.getPixel(&p, atX: x, y: y)
  return p
}
func luminance(_ p: [Int]) -> Int { 2126 * p[0] + 7152 * p[1] + 722 * p[2] }

/// Renders `text` black-on-clear and returns its coverage, 0...255, row-major.
func textMask(_ text: String, size: Double, w: Int, h: Int) -> [UInt8] {
  let m = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: w, pixelsHigh: h, bitsPerSample: 8,
                           samplesPerPixel: 4, hasAlpha: true, isPlanar: false,
                           colorSpaceName: .deviceRGB, bytesPerRow: w * 4, bitsPerPixel: 32)!
  NSGraphicsContext.saveGraphicsState()
  NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: m)
  let font = NSFont(name: "GolosUI-Regular", size: size) ?? NSFont(name: "Golos UI", size: size)
    ?? .systemFont(ofSize: size)
  let lineHeight = font.ascender - font.descender
  // Unflipped context: y is measured from the bottom of the patch.
  (text as NSString).draw(at: NSPoint(x: 2, y: (CGFloat(h) - lineHeight) / 2),
                          withAttributes: [.font: font, .foregroundColor: NSColor.black])
  NSGraphicsContext.restoreGraphicsState()
  let data = m.bitmapData!
  return (0..<(w * h)).map { data[$0 * 4 + 3] }
}

for spec in args.dropFirst(3) {
  let p = spec.split(separator: ",", omittingEmptySubsequences: false).map(String.init)
  guard p.count >= 6, let x = Int(p[0]), let y = Int(p[1]), let w = Int(p[2]), let h = Int(p[3]),
        let size = Double(p[5]) else { fatalError("bad spec: \(spec)") }

  var counts: [[Int]: Int] = [:]
  for bx in x..<(x + w) { counts[pixel(bx, y), default: 0] += 1; counts[pixel(bx, y + h - 1), default: 0] += 1 }
  for by in y..<(y + h) { counts[pixel(x, by), default: 0] += 1; counts[pixel(x + w - 1, by), default: 0] += 1 }
  let fill = counts.max { $0.value < $1.value }!.key

  // The ink is whatever contrasts most with the fill: dark text on light, light text on dark.
  var ink = fill
  let base = luminance(fill)
  for yy in y..<(y + h) { for xx in x..<(x + w) where abs(luminance(pixel(xx, yy)) - base) > abs(luminance(ink) - base) { ink = pixel(xx, yy) } }

  let mask = p[4].isEmpty ? [UInt8](repeating: 0, count: w * h) : textMask(p[4], size: size, w: w, h: h)
  for yy in 0..<h { for xx in 0..<w {
    let a = Int(mask[yy * w + xx])
    var out = (0..<spp).map { (fill[$0] * (255 - a) + ink[$0] * a) / 255 }
    rep.setPixel(&out, atX: x + xx, y: y + yy)
  } }
}

try! rep.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: args[2]))
