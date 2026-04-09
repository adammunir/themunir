# Toro Oasis × Vectoro: AI-Powered Design-to-Production for Smart Irrigation

> **A case study in building production-grade IoT software — from competitive research to pixel-perfect native apps — using AI-orchestrated design systems, scientific computation, and a custom Figma engine.**

---

## Executive Summary

We designed and built **Precision ET** — an intelligent irrigation scheduling feature for Toro's consumer IoT platform, **Oasis** — across iOS (SwiftUI), Android (Jetpack Compose), and a .NET admin console. The entire pipeline — from competitive UX research, through design system creation, to Figma screen design, to native implementation, to scientific irrigation engine — was orchestrated through **Vectoro Bridge V2**, a custom MCP-based AI-to-Figma engine, and validated at every stage by AI-driven quality gates.

The result: a feature that computes FAO-56 Penman-Monteith evapotranspiration, guides homeowners through zone characterization via a 7-step wizard, and auto-generates irrigation schedules — all with pixel-perfect design fidelity verified against Figma specs down to 0.5px stroke widths.

**Key numbers:**
- **8 competing platforms** analyzed in the research phase
- **71 MCP tools** in the Vectoro Bridge powering the design pipeline
- **43 reusable UI components** in the shared design system
- **75 color tokens**, 24 typography styles, 4 responsive breakpoints
- **202 checkpoint iterations** from first design audit to final pixel-perfect screens
- **FAO-56 Penman-Monteith** irrigation science — the global standard — implemented from scratch
- **3 platforms** shipping from a single design source of truth

---

## I. The Problem

Toro's **Oasis** platform connects residential irrigation controllers to a mobile app. The existing app handled basic manual scheduling — start times, durations, days of the week. But modern competitors (Rachio, Hunter Hydrawise, Weathermatic) were shipping **weather-responsive smart scheduling** that adjusts watering based on real-time evapotranspiration data.

Toro already had this technology in their commercial platform, **iCentral / Lynx Central Control**, serving golf courses and large properties. The challenge: bring that same scientific rigor to a consumer-friendly mobile experience, without the complexity that enterprise users tolerate.

The gap wasn't just technical. The existing Oasis app had been built **without consulting design files**. The implementation was disconnected from the design system — wrong fonts, incorrect spacing, missing components, hardcoded colors. We needed to:

1. **Research** what the best competitors were doing — and find the gap
2. **Design** a wizard flow that makes complex agronomic configuration feel approachable
3. **Build** an irrigation engine rooted in real science
4. **Implement** native screens that are pixel-perfect to the Figma spec
5. **Do it all** with AI assistance at every stage

---

## II. Research: Competitive Intelligence at Scale

### The 8-Platform Audit

Before designing a single screen, we conducted a comprehensive UX teardown of every significant smart irrigation platform: **Rachio, Orbit B-hyve, Weathermatic SmartLink, Hunter Hydrawise, Rain Bird, Netro, RainMachine, Skydrop**, plus Toro's own commercial **Lynx Central Control** system.

The analysis covered:
- **Zone setup flows** — how each platform collects hardware type, vegetation, soil, sun exposure, and slope
- **ET intelligence** — how weather data translates into scheduling decisions
- **Advanced settings** — crop coefficients, precipitation rates, root depth, allowed depletion
- **UX patterns** — what works, what doesn't, and where users drop off

### The Finding

> Every competitor collects the same 5-6 zone attributes through nearly identical form-based flows. None of them do a good job of **explaining why** each input matters, **showing the impact** of selections in real-time, or making configuration feel **rewarding** rather than tedious.

**Rachio** had the best consumer UX (4.7★) but no real-time impact feedback. **Weathermatic** had the deepest agronomic intelligence but a dated interface. **Hunter Hydrawise** exposed powerful settings but behind intimidating menus.

No platform in the market does all three well:
1. **Educate** — explain why each category matters for irrigation in plain language
2. **Visualize impact** — show real-time feedback as users make selections
3. **Celebrate completion** — make profile building feel like an achievement, not a chore

This became the design brief for Precision ET.

### Prior Art: iCentral's Engine

Toro's commercial platform provided a critical head start. The **Lynx Central Control** system already implemented FAO-56 ET calculations in its `LynxWeatherCore` C# library. We studied this implementation in detail — the `FAO56EtCalc.cs` module, the `WeatherUtility` orchestrator, the Magnus formula for dew point calculation, the hourly computation pipeline.

Key insights from iCentral:
- The algorithm uses **separate day/night surface resistance values** (50 s/m vs 200 s/m) per FAO-56 recommendations
- **Extra-terrestrial radiation (Ra)** is calculated from latitude, day-of-year, and solar hour angle
- The implementation handles both **hourly weather observations** (max/min pairs) and **real-time point readings**
- All values are returned in **inches per hour** for direct integration with scheduling logic

We adapted this proven science for a mobile-first consumer context — same physics, different interface.

---

## III. The Design Engine: Vectoro Bridge V2

### What Is Vectoro?

**Vectoro Bridge V2** is a custom-built **Model Context Protocol (MCP) server** that gives AI assistants direct, programmatic access to Figma. It's not a plugin that generates code from screenshots — it's a full bidirectional bridge that lets AI agents **read, write, create, and manipulate** every element in a Figma file in real time.

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│  AI Assistant (Claude / Copilot CLI / Cursor)           │
│  ↕ MCP Protocol (stdio or HTTP+SSE)                    │
├─────────────────────────────────────────────────────────┤
│  Vectoro MCP Server (Node.js / TypeScript)              │
│  71 registered tools across 15 categories               │
│  ↕ REST API + WebSocket + CDP                           │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Figma REST   │  │ WebSocket    │  │ Chrome       │  │
│  │ API          │  │ Bridge       │  │ DevTools     │  │
│  │ (read files, │  │ (real-time   │  │ Protocol     │  │
│  │  styles,     │  │  node ops,   │  │ (console,    │  │
│  │  components) │  │  variables,  │  │  eval,       │  │
│  │              │  │  plugin API) │  │  navigate)   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
├─────────────────────────────────────────────────────────┤
│  Vectoro Bridge Plugin (Figma Desktop)                  │
│  Full figma.* API access via sandboxed code execution   │
│  WebSocket client → postMessage → Plugin Sandbox        │
└─────────────────────────────────────────────────────────┘
```

### Multi-Instance Architecture

Vectoro supports **parallel sessions** through an instance-based port mapping system:

| Instance | HTTP Port | WebSocket Port | Use Case |
|----------|-----------|----------------|----------|
| #1 | 7600 | 7601 | iCentral admin screens |
| #2 | 7602 | 7603 | Oasis mobile designs |
| #7 | 7612 | 7613 | Precision ET feature |

Each instance binds to a specific Figma file, preventing cross-contamination. An AI agent working on the admin console cannot accidentally modify the mobile design file.

### The 71-Tool Ecosystem

Vectoro exposes **71 tools** organized across **15 categories**:

| Category | Tools | Purpose |
|----------|-------|---------|
| **Canvas Inspection** | 6 | Read selections, page structure, node properties, find nodes |
| **Node Manipulation** | 9 | Resize, move, clone, delete, reparent, rename, zoom |
| **Styling** | 6 | Set fills, strokes, effects, constraints, image fills |
| **Text** | 3 | Set content, style character ranges, list fonts |
| **Auto-Layout** | 1 | Full flexbox control: direction, spacing, padding, alignment, wrap |
| **Design Tokens** | 11 | CRUD on variables, collections, modes; batch operations; binding |
| **Components** | 8 | Create, instantiate, detach, set properties, arrange variant sets |
| **Vector & Boolean** | 5 | Create vectors/SVGs, boolean ops (union/subtract/intersect) |
| **Design System Library** | 8 | Search components, get details, instantiate from library, set active DS |
| **Screenshots & Export** | 3 | Capture nodes as PNG/SVG, reload plugin |
| **Code Execution** | 1 | Arbitrary JavaScript with full `figma.*` API access |
| **Console & Monitoring** | 6 | Logs, navigation, status, reconnection |
| **Agent Visualization** | 5 | Spawn/move/dismiss AI cursors, active frame overlays |
| **Design-Code Parity** | 2 | Check design vs code discrepancies, generate component docs |
| **Reference** | 1 | Design craft guide (typography, color, spacing, a11y) |

### How the AI Designs

The workflow for creating a screen in Figma:

1. **Scout the Design System** — `figma_get_design_system_summary` → understand available components, tokens, patterns
2. **Search Components** — `figma_search_components("Button")` → find the exact component key and variant properties
3. **Create Frame Structure** — `figma_create_child(FRAME)` → build the layout skeleton with auto-layout
4. **Instantiate Components** — `use_ds_component("Button", variant: { Type: "Primary", Size: "Large" })` → place real design system components
5. **Apply Tokens** — `figma_set_fills` with hex values from `tokens.json` → never hardcode, always use the system
6. **Set Auto-Layout** — `figma_set_auto_layout` → match Figma's flexbox model exactly
7. **Validate** — `figma_capture_screenshot` → visually verify the output matches intent

The AI agent is visible in Figma as a **colored cursor** (`spawn_design_agent`), and the frame being worked on gets a **pulsating overlay** (`set_active_frame`) — collaborators can see the AI working in real time.

---

## IV. The Design System

### Toro Design System: Two Libraries

The design system spans two Figma component libraries:
- **Toro Lynx Component Library** — enterprise/desktop patterns for iCentral
- **Toro SMRTscape Component Library** — mobile-first patterns for Oasis

Both share the same foundational tokens:

**75 color styles** organized hierarchically:
- Brand: Toro Red `#E11837`
- 11 neutral greys: `#080D12` (neutral100) → `#FFFFFF` (neutral05)
- Semantic: Informative (Blue), Warning (Orange), Negative (Red), Positive (Green)
- 30 program colors for irrigation zone visualization
- 13 fixture zone colors (Willow, Dandelion, Forest, Slate, etc.)

**24 typography styles** built on **Golos UI**:
- Display (96/72/48px Bold)
- Headings H1–H6 (32px Medium → 12px Bold)
- Body Large/Medium/Small/Extra Small (Regular + Bold variants)
- Eyebrow Large/Small

**Spacing scale** (implemented as Swift constants):
```
none=0, xxSmall=2, xSmall=8, small=12, medium=16,
large=20, xLarge=24, xLarge28=28, xxLarge=32,
huge=36, xHuge=40, xxHuge=48
```

**4 responsive breakpoints**: Mobile (393px), Tablet (768px), Desktop (1440px), Wide (1920px)

### The Rule

> **The Toro Design System Is Law.** No deviations. Every color, spacing value, typography token, and component must come from this system. No improvisation, no substitutions, no "close enough."

This rule was enforced at every stage — design, code review, and pixel-perfect validation.

---

## V. The Irrigation Engine: FAO-56 in Swift

### The Science

**Precision ET** implements the **FAO-56 Penman-Monteith equation** — the global standard for computing reference evapotranspiration (ET₀), endorsed by the Food and Agriculture Organization of the United Nations.

The equation models four physical processes:
1. **Radiation balance** — net shortwave minus net longwave radiation at the crop surface
2. **Aerodynamic resistance** — how easily water vapor moves from crop canopy to atmosphere
3. **Surface resistance** — the crop's resistance to releasing water vapor (day vs. night)
4. **Vapor pressure deficit** — the drying power of the air

```
ET₀ = [0.408 × Δ × (Rn - G) + γ × (Cn / (T + 273)) × u₂ × (eₛ - eₐ)]
      ─────────────────────────────────────────────────────────────────────
                      Δ + γ × (1 + Cₑ × u₂)
```

### Crop Coefficients (Kc)

The engine applies **crop coefficients** to adjust ET₀ for specific vegetation types and plant maturity stages:

| Vegetation | New | Establishing | Mature |
|-----------|-----|-------------|--------|
| Cool Season Turf | 0.65 | 0.85 | 0.80 |
| Warm Season Turf | 0.55 | 0.70 | 0.65 |
| Shrubs & Trees | 0.50 | 0.70 | 0.80 |
| Ground Cover | 0.55 | 0.75 | 0.70 |
| Flowers | 0.70 | 0.90 | 0.85 |
| Xeriscape | 0.20 | 0.30 | 0.25 |

The final irrigation runtime is computed as:
```
ETc = ET₀ × Kc                              (crop ET in inches/day)
gallonsNeeded = ETc × areaSqFt × 0.6234     (water volume)
runtimeMinutes = gallonsNeeded / GPM          (schedule duration)
```

### Zone Characterization

Each irrigation zone is profiled across **6 dimensions**, captured through the wizard:

| Dimension | Options | Impact |
|-----------|---------|--------|
| **Hardware Type** | Fixed, Rotor, Drip, Unsure | Precipitation rate (in/hr) |
| **Vegetation** | 6 types | Crop coefficient (Kc) |
| **Soil Type** | Clay, Loam, Sand, Silt | Infiltration rate, cycle/soak |
| **Sun Exposure** | Full, Partial, Shade, Mixed | ET adjustment factor |
| **Slope** | Flat, Gentle, Moderate, Steep | Runoff risk, cycle/soak |
| **Plant Maturity** | New, Establishing, Mature, Unsure | Kc growth stage multiplier |

Each selection feeds directly into the computation — users see the effect of their choices in real time.

### Heritage: Built on iCentral's Proven Engine

The algorithm is adapted from Toro's commercial `LynxWeatherCore` C# implementation, which has been running in production across golf courses and large commercial properties. We ported the physics faithfully:

- **Magnus formula** for dew point calculation
- **Stefan-Boltzmann** constant for net longwave radiation
- **von Kármán** constant for logarithmic wind profiles
- Separate **day/night surface resistance** values (50 vs 200 s/m)
- **Extra-terrestrial radiation (Ra)** from latitude and solar geometry

What changed: the interface. Where iCentral expects agronomists to configure raw parameters, Oasis translates zone characteristics into the same scientific inputs behind a friendly wizard.

---

## VI. Implementation: From Figma to Native Screens

### The iOS App (SwiftUI)

The Oasis iOS app is a **modular Swift Package Manager architecture**:

| Module | Purpose |
|--------|---------|
| `presentation` | SwiftUI views, ViewModels, navigation router |
| `data` | Repository pattern, DAOs, Realm database, API clients |
| `domain` | Business logic, use cases |
| `styleguide` | 43 UI components, design tokens, Golos UI fonts, 2019 image assets |
| `PrecisionET` | FAO-56 engine, schedule generator, zone characteristic lookups |
| `BLEProvisioning` | Bluetooth LE device pairing with Diffie-Hellman key exchange |
| `notifications` | Firebase Cloud Messaging integration |
| `analytics` | Mixpanel event tracking |

**Technology stack:** SwiftUI + Combine, Alamofire, Realm, Mapbox, Firebase, Swinject DI, Lottie animations.

### The Precision ET Wizard: 7 Steps

The wizard guides users through zone characterization:

```
Step 0: Presets ──→ Copy from existing zone or start fresh
Step 1: Hardware ──→ Fixed spray / Rotor / Drip / Not sure
Step 2: Vegetation ──→ Cool season / Warm season / Shrubs / Ground cover / Flowers / Xeriscape
Step 3: Soil ──→ Loam / Silt / Sand / Clay
Step 4: Sun Exposure ──→ Full / Partial / Shade / Mixed
Step 5: Slope ──→ Flat / Gentle / Moderate / Steep
Step 6: Plant Maturity ──→ New / Establishing / Mature / Not sure
Step 7: Profile Complete ──→ Review selections, schedule preview, edit capability
```

Each step includes:
- **Option cards** with descriptive icons (26 unique icons mapped from Figma)
- **"Set Custom Value" bottom sheets** with step-based sliders for power users
- **"What this means" callout text** — the educational layer competitors lack
- **Persistent state** via UserDefaults — users can resume mid-wizard across app sessions

### The Pixel-Perfect Process

This is where Vectoro Bridge and the Figma spec converge. For every screen, we:

1. **Extract the Figma node tree** via REST API — every frame, every spacing value, every color
2. **Cross-reference against SwiftUI code** — compare declared paddings, font sizes, colors, frame dimensions
3. **Identify discrepancies** — down to individual pixels
4. **Apply surgical fixes** — using design system tokens exclusively

Example from the Presets page audit (one of 202 checkpoint iterations):

| Property | Figma Spec | Code (Before) | Code (After) |
|----------|-----------|---------------|--------------|
| Icon size | 32×32 | 40×40 | 32×32 ✅ |
| Title font | 24pt Golos Bold | 22pt | 24pt ✅ |
| Icon→Title gap | 12px | 24px | 12px ✅ |
| Content top padding | 24px | 20px | 24px ✅ |
| Section spacing | 24px | 12px | 24px ✅ |
| Description color | neutral60 | Hardcoded RGB | Token ✅ |
| CTA top border | 0.5px stroke | Missing | 0.5px neutral40 ✅ |
| Stepper dots | Hidden | Visible | Removed ✅ |

**The rule was absolute**: if the Figma spec says 12px, the code says `.padding(.top, 12)`. Not 11. Not 13. Twelve.

### The Android App (Jetpack Compose)

The Android counterpart (`SMRTScapeAndroid/SMRTscapePulse/`) follows the same design system with a dedicated `designsystem` module, ensuring visual parity across platforms. The same Figma source files, same token values, same component hierarchy — different native implementation.

### The Admin Console (.NET)

**Toro Oasis Console** (`ToroOasis.Console`) provides the administrative backend — device fleet management, firmware rollouts, user access control, IoT device monitoring, and configuration management. This is the operations layer that supports the consumer experience.

---

## VII. The AI-Orchestrated Workflow

### What Made This Different

This wasn't "AI generated some code." This was a **continuous AI-human collaboration loop** across every discipline:

**Research Phase:**
- AI analyzed 8 competitor platforms, extracting UX patterns, strengths, and weaknesses
- AI studied Toro's existing commercial engine (iCentral `FAO56EtCalc.cs`) and ported the science
- AI synthesized findings into a design brief identifying the market gap

**Design Phase:**
- AI connected to Figma via Vectoro Bridge (Instance #7, WebSocket on port 7613)
- AI explored the design system — component catalog, token values, typography scale
- AI extracted node trees at depth 5 to understand exact measurements
- AI followed design principles: hierarchy, consistency, the 8-point grid, WCAG 2.1 AA

**Implementation Phase:**
- AI read Figma specs and translated to SwiftUI with design system tokens
- AI built the FAO-56 engine with crop coefficient lookup tables
- AI implemented 7-step wizard with persistent state, custom value sliders, multi-zone support
- AI fixed 202 checkpoint-worth of issues — from build errors to 0.5px border omissions

**Validation Phase:**
- Every change was verified against Figma measurements
- Every build was compiled and tested
- Color values were cross-referenced against token definitions
- Spacing was measured against the design system scale

### The Skill Stack

| Skill | Role |
|-------|------|
| **Vectoro Bridge V2** | AI-to-Figma bidirectional design engine (71 tools) |
| **SpecTree** | Epic planning, feature decomposition, task tracking, session management |
| **SpecTree Designer** | Pixel-comparison loop with Playwright + pixelmatch (for web targets) |
| **Gringotts** | Long-term memory vault — decisions, patterns, lessons across sessions |
| **Mixpanel MCP** | Analytics event design and validation |

### The Human in the Loop

The AI didn't work autonomously. At every stage, a software engineer and designer:
- **Directed research** — which competitors to analyze, what questions to answer
- **Set design direction** — the educational-first UX philosophy
- **Reviewed every change** — screenshots compared against Figma, pixel by pixel
- **Caught what AI missed** — icon sizes that were 8px too large, stepper dots that should have been hidden
- **Made architectural decisions** — module boundaries, persistence strategy, navigation patterns

The AI amplified the human. The human ensured the AI was right.

---

## VIII. Results

### What Shipped

- **Precision ET Wizard** — 7-step zone characterization with educational callouts, custom value sliders, and multi-zone support
- **FAO-56 Engine** — industry-standard evapotranspiration calculations adapted from Toro's commercial platform
- **3-State Zone Cards** — visual feedback for unconfigured, in-progress, and configured zones
- **Automatic Schedule Generation** — computed runtimes based on real science, not arbitrary timers
- **Design System Compliance** — 100% token usage, zero hardcoded values, pixel-perfect Figma fidelity
- **Cross-Platform Parity** — iOS, Android, and admin console from a single design source

### What We Proved

1. **AI can design production screens** — not wireframes, not mockups — real Figma files with real components from a real design system, via Vectoro Bridge
2. **Scientific software can have beautiful UX** — the FAO-56 equation doesn't have to mean a spreadsheet-style interface
3. **Pixel-perfect is achievable at speed** — 202 iterations sounds like a lot, but each was minutes, not days
4. **The design system is the contract** — when both AI and humans treat tokens as law, consistency is automatic
5. **Competitive research drives differentiation** — by studying 8 platforms before designing, we found the gap no one else had filled

---

## IX. Technical Architecture Summary

```
┌─────────────────────────────────────────────────────────────────┐
│                    TORO OASIS PLATFORM                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────────────┐    │
│  │  iOS App    │  │ Android App │  │  Admin Console       │    │
│  │  (SwiftUI)  │  │ (Compose)   │  │  (.NET)              │    │
│  │             │  │             │  │                      │    │
│  │ presentation│  │ designsystem│  │  Device Management   │    │
│  │ data        │  │ app         │  │  Firmware OTA        │    │
│  │ domain      │  │             │  │  User Access Control │    │
│  │ styleguide  │  │             │  │  IoT Monitoring      │    │
│  │ PrecisionET │  │             │  │  Configuration       │    │
│  │ BLE         │  │             │  │                      │    │
│  │ analytics   │  │             │  │                      │    │
│  └──────┬──────┘  └──────┬──────┘  └──────────┬───────────┘    │
│         │                │                     │                │
│         └────────────────┼─────────────────────┘                │
│                          │                                      │
│                    ┌─────┴─────┐                                │
│                    │ REST API  │                                │
│                    │ Backend   │                                │
│                    └─────┬─────┘                                │
│                          │                                      │
│              ┌───────────┼───────────┐                          │
│              │           │           │                          │
│         ┌────┴────┐ ┌───┴───┐ ┌────┴────┐                     │
│         │ Weather │ │ IoT   │ │ User    │                      │
│         │ Service │ │ Fleet │ │ Auth    │                      │
│         └─────────┘ └───────┘ └─────────┘                      │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                    DESIGN PIPELINE                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐    ┌───────────────────────────────────┐  │
│  │ Vectoro Bridge V2│◄──►│ Figma (Toro Oasis M Design Files)│  │
│  │ 71 MCP Tools     │    │ Toro Lynx Component Library       │  │
│  │ Multi-Instance   │    │ Toro SMRTscape Component Library  │  │
│  │ WebSocket + REST │    │ 75 colors / 24 type styles        │  │
│  └────────┬─────────┘    └───────────────────────────────────┘  │
│           │                                                     │
│  ┌────────┴─────────┐                                           │
│  │ AI Agents        │                                           │
│  │ Claude / Copilot │                                           │
│  │ SpecTree Planning│                                           │
│  │ Gringotts Memory │                                           │
│  └──────────────────┘                                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## X. Lessons for the Industry

**1. Design systems aren't optional — they're infrastructure.**
When both AI and humans work from the same token set, inconsistency becomes mechanically impossible. The design system wasn't documentation we wrote after the fact — it was the contract that made everything else work.

**2. AI needs structured access, not screenshots.**
Vectoro Bridge doesn't "look at" designs and guess. It reads the node tree, extracts exact pixel values, resolves variable aliases, and maps components to their design system origins. Structured access beats visual inference every time.

**3. Competitive research compounds.**
Studying 8 platforms before designing a single screen didn't slow us down — it gave us the clarity to build something none of them had. The educational-first approach came directly from identifying what every competitor was missing.

**4. Scientific rigor and consumer UX aren't opposites.**
The FAO-56 equation is the same whether it's running on a golf course superintendent's desktop or a homeowner's iPhone. The difference is the interface — and a well-designed wizard can make complex science feel simple.

**5. Pixel-perfect isn't perfectionism — it's trust.**
When the settings icon is 40×40 on one screen and 32×32 on every other, users notice. They might not articulate it, but it registers as "something feels off." Consistency at the pixel level is what separates professional software from everything else.

---

*Built with Vectoro Bridge V2, SpecTree, and a relentless commitment to getting every pixel right.*

*© 2026 — Toro Oasis Platform*
