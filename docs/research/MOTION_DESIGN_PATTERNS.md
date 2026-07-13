# MotionSites 动效设计范式研究 · v1.0.0

> 调研对象:<https://motionsites.ai/> —— 面向 Lovable / Bolt / v0 等 AI 建站工具的高端动效网站 prompt 库。
> 调研方式:真实浏览器(Chrome CDP)进入站点,读取作品列表与预览动画,并通过站点自身的 "Copy prompt" 数据通道取回免费作品的 prompt 原文。
> 调研日期:2026-07-13
> 服务对象:念念 EchoEcho(用户口语称「念响」)—— 双向情侣备忘录 App。

## 0. 调研边界与可信度声明(先读这段)

**站点是双层付费墙,必须如实说明:**

- 站点共 **116 个免费作品**(数据源:`prompts` 表 `is_free=true`,实测计数 116)。免费作品在卡片上显示 **Copy** 按钮,点击即把完整 prompt 复制到剪贴板,**无需登录、无需付费**。
- 其余作品显示 **Premium**(锁图标)。点开会走同一个 `get-prompt` 接口,但服务端明确返回:
  ```json
  {"error":"Paid prompt","code":"paid_only","prompt_text":null,"individual_price_cents":1400,"owns_individually":false}
  ```
  即 **Premium 作品的 prompt 原文在未订阅 / 未单买(单价 $14)时服务端根本不下发**。本文 **没有** 任何 Premium 作品的 prompt,**也没有绕过付费墙**,更没有编造。
- 因此本文第一部分收录的 **7 个作品全部来自免费池**,但已刻意跨流派选取,覆盖了任务要求的 3D / glassmorphism / dark premium / cinematic scroll / interactive cursor 五个流派(见下表)。所有 prompt **一字未改**,原样保留(含拼写、破折号、URL、代码块)。

| # | 作品 | 流派归属 | 是否覆盖任务指定流派 |
|---|---|---|---|
| 1 | Stillmind (Lumora) | cinematic video / liquid glass | ✅ cinematic |
| 2 | 3D Jack Portfolio | 3D website / magnetic cursor | ✅ 3D + interactive cursor |
| 3 | Interactive Discovery (Lithos) | interactive cursor spotlight | ✅ interactive cursor |
| 4 | Celestial Renewal (Serene) | dark premium / scroll parallax | ✅ dark premium + cinematic scroll |
| 5 | Liquid Glass CTA | glassmorphism | ✅ glassmorphism |
| 6 | Wellness Companion | mobile glass UI / stagger | ✅ glassmorphism(移动端形态) |
| 7 | Orbis NFT | dark premium / web3 / noise | ✅ dark premium |

**另一个关键事实(影响范式提炼的可信度):** 免费池里的 prompt **不是一种格式**。绝大多数是「规格说明书」式的结构化 markdown(本文 7 个都是),但也存在 **直接给整份 HTML 源码** 的(如 `vision-reveal`,16723 字符,内容是一个完整的 `<!DOCTYPE html>` 文件,含 splash 遮罩动画、word-reveal 模糊上浮、CTA 按钮宽度伸展动画等)。这说明 MotionSites 的「prompt」本质是 **"把一个已经做好的成品,反向压缩成 AI 能一次性复现的指令"**,而不是"给 AI 一个创意 brief"。这一点是后面第三部分范式提炼的地基。

**实测视觉观察方式:** 逐个下载作品的预览视频(R2 CDN 上的 mp4/webp),用 ffmpeg 抽帧成序列图后逐帧读图。下文第二部分的动效描述,来自「prompt 原文 + 预览抽帧」两条证据的交叉印证,不是从 prompt 里"推测"的。

---

## 一、7 个作品的完整 prompt 原文

### 作品 1 · Stillmind (Lumora)

- **风格流派**:Hero · 电影感换景 / Liquid Glass
- **来源**:https://motionsites.ai/ · Stillmind · Free(prompt_id: `stillmind`)
- **原文长度**:6025 字符

<details open>
<summary>完整 prompt 原文(一字未改)</summary>

````markdown
Create a fullscreen cinematic hero section for a mindfulness/focus app called "Lumora" using React, Tailwind CSS, and Lucide React icons.

## Font

Use **Instrument Serif** (Google Fonts, italic for the logo). Load it in index.html:
```
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
```

Set `font-family: 'Instrument Serif', serif` on html/body. Use `system-ui, sans-serif` inline for body text (subtext, buttons, stats, video labels).

---

## Background Video Layer

Stack 4 fullscreen looping videos absolutely positioned. Only the active one has `opacity-100`; others have `opacity-0`. Transition opacity over 1000ms ease-in-out. Videos autoPlay, muted, loop, playsInline.

**Video URLs (in order):**
1. `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4`
2. `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4`
3. `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4`
4. `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4`

**Labels:** Golden Hour, Still Water, Deep Woods, Quiet Dawn

---

## Transparent PNG Overlay (z-index 1)

Place this image over the videos as an absolutely positioned overlay covering the full viewport:
```
https://soft-zoom-63098134.figma.site/_assets/v11/0b4a435b2df2747593c43d7a1c9b4578f7d8d90c.png
```

Apply a continuous "train-bob" animation: translateY oscillates between 0 and -6px over 3s ease-in-out infinite, with a constant scale(1.03) to prevent edges from showing during the motion.

---

## Liquid Glass Effect (CSS class `.liquid-glass`)

```css
.liquid-glass {
  background: rgba(255, 255, 255, 0.01);
  background-blend-mode: luminosity;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: none;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}
```

With a `::before` pseudo-element for a subtle gradient border:
```css
.liquid-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(180deg,
    rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%,
    rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
    rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

---

## Content Layer (z-index 2) - Flex Column Full Height

### Navigation (top)
- Left: "Lumora" in white, italic, text-xl (sm:text-2xl)
- Right (desktop md+): A `.liquid-glass` pill containing nav links ("How It Works", "Features", "Pricing", "Community") in white/90 text-sm with hover to white, plus a solid white "Get Started" button at the end
- Right (mobile): A `.liquid-glass` rounded hamburger button using Lucide `Menu`/`X` icons with a crossfade rotation animation (300ms). The Menu icon rotates out 90deg and scales to 75%; the X icon rotates in from -90deg

### Mobile Menu Overlay (fixed, z-50)
- Backdrop: `bg-black/60 backdrop-blur-sm`
- Centered fullscreen panel with staggered entrance (each link delays 50ms more: 100ms, 150ms, 200ms, 250ms, 300ms)
- Links: white text-3xl, translate-y-4 to 0 on open
- "Get Started" button at bottom with scale animation
- Cubic-bezier easing: `cubic-bezier(0.4,0,0.2,1)`, duration 500ms

### Hero Content (centered, below nav)
- **Badge**: `.liquid-glass` rounded-full pill with text "Over 10,000 minds already finding their clarity"
- **Heading**: "Clarity in an Endlessly / Noisy Universe" (line break after "Endlessly"). Sizes: text-4xl / sm:text-5xl / md:text-7xl / lg:text-[5.5rem], leading-[1.1], max-w-4xl
- **Subtext**: "Rise above the chaos of pings, infinite scrolling, and relentless demands. Discover how to protect your presence and create with intention." max-w-xl, leading-relaxed
- **Email Input**: `.liquid-glass` rounded-full pill containing a text input ("Your Best Email") and a solid white "Get Early Access" button. Max-width 320px on mobile, sm:max-w-sm
- **Video Switcher**: Row of 4 text buttons with labels. Active button has solid color + bottom border. Inactive buttons are 50% opacity with transparent border, hover to 80%

### Dark Mode for "Deep Woods" (3rd video, index 2)
When the 3rd video is active, all hero content (badge, heading, subtext, input, video switcher) transitions to dark color `#182C41` with 700ms duration. The navbar and bottom stats remain white always.

### Bottom Stats (pushed to bottom via flex-1 spacer)
- Row of stats separated by `|` dividers (hidden on mobile): "60+ Deep Sessions", "12,000+ Creators", "4.8 User Satisfaction", "Intentional-First Design"
- text-white/70, text-xs sm:text-sm, system-ui font

---

## Video Switching Logic
- Track `activeVideo` state (default 0) and `isTransitioning` boolean
- On click, if not already active and not mid-transition, set new active video and start a 1000ms cooldown (matching the CSS crossfade duration)
- During cooldown, ignore additional clicks

---

## Responsive Behavior
- Mobile: Smaller text sizes, tighter padding, hamburger nav, stats wrap naturally
- Tablet/Desktop: Larger heading, more padding, inline nav pill, stats with pipe separators

---

## Section Container
```html
<section className="relative w-full h-screen overflow-hidden bg-black">
```

Black background prevents flash before videos load. Everything is a single viewport-height section with no scroll.

---

That's the complete specification. The entire app lives in a single `App.tsx` component with the CSS in `index.css`.
````

</details>

---

### 作品 2 · 3D Jack Portfolio

- **风格流派**:3D Website / Portfolio · 磁吸光标 + 粘性卡片堆叠
- **来源**:https://motionsites.ai/ · 3D Jack Portfolio · Free(prompt_id: `3d-jack-portfolio-hero`)
- **原文长度**:13877 字符

<details open>
<summary>完整 prompt 原文(一字未改)</summary>

````markdown
Build a 3D Creator portfolio landing page for "Jack" using React, TypeScript, Tailwind CSS, Framer Motion, and Lucide React. The page has a dark theme (#0C0C0C background) with the font Kanit (Google Fonts, weights 300-900). The page title is "Jack -- 3D Creator".

GLOBAL STYLES
Background: #0C0C0C on html, body, #root, and the main wrapper
Font family: 'Kanit', sans-serif
Global reset: box-sizing border-box, margin 0, padding 0
CSS class .hero-heading: gradient text using background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%) with -webkit-background-clip: text and -webkit-text-fill-color: transparent
Main wrapper has overflowX: 'clip'
SECTION ORDER
HeroSection
MarqueeSection
AboutSection
ServicesSection
ProjectsSection
1. HERO SECTION
Full viewport height (h-screen), flex column layout with overflowX: clip.

Navbar: Horizontal nav bar with 4 links -- "About", "Price", "Projects", "Contact" -- evenly spaced with justify-between. Text color #D7E2EA, font-medium, uppercase, tracking-wider. Sizes: text-sm md:text-lg lg:text-[1.4rem]. Padding: px-6 md:px-10 pt-6 md:pt-8. Hover: opacity 70% with 200ms transition.

Hero Heading: Massive h1 with text "Hi, i'm jack" (lowercase "i", curly apostrophe via &apos;). Uses the .hero-heading gradient text class. Font-black, uppercase, tracking-tight, leading-none, whitespace-nowrap, w-full. Font sizes: text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]. Margin top: mt-6 sm:mt-4 md:-mt-5. Wrapped in overflow-hidden container.

Bottom bar: Flexbox justify-between items-end with pb-7 sm:pb-8 md:pb-10:

Left: paragraph text "a 3d creator driven by crafting striking and unforgettable projects", color #D7E2EA, font-light, uppercase, tracking-wide, leading-snug. Font size: clamp(0.75rem, 1.4vw, 1.5rem). Max-width: max-w-[160px] sm:max-w-[220px] md:max-w-[260px].
Right: ContactButton component (see below)
Hero Portrait: Centered absolutely. Uses a Magnet component (mouse-following magnetic effect) wrapping an image. Image URL: https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png. Magnet settings: padding 150, strength 3, activeTransition "transform 0.3s ease-out", inactiveTransition "transform 0.6s ease-in-out". Positioning: absolute left-1/2 -translate-x-1/2 z-10. Width: w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]. On mobile: top-1/2 -translate-y-1/2. On sm+: sm:top-auto sm:translate-y-0 sm:bottom-0.

FadeIn animations: Navbar fades in with delay 0, y -20. Heading: delay 0.15, y 40. Left text: delay 0.35, y 20. Contact button: delay 0.5, y 20. Portrait: delay 0.6, y 30.

2. MARQUEE SECTION
Two rows of images that scroll horizontally based on page scroll position. Background #0C0C0C. Padding: pt-24 sm:pt-32 md:pt-40 pb-10.

21 GIF images from motionsites.ai (exact URLs):


https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif
https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif
https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif
https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif
https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif
https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif
https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif
https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif
https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif
https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif
https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif
https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif
https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif
https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif
https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif
https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif
https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif
https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif
https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif
https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif
https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif
Row 1: first 11 images, tripled for seamless scrolling. Moves RIGHT on scroll (translateX(offset - 200)).
Row 2: remaining 10 images, tripled. Moves LEFT on scroll (translateX(-(offset - 200))).
Scroll offset calculated as: (window.scrollY - sectionTop + window.innerHeight) * 0.3
Each image tile: 420px x 270px, rounded-2xl, object-cover, lazy loaded.
Gap between tiles: gap-3. Gap between rows: gap-3.
Uses willChange: 'transform' for performance. Scroll listener is passive.
3. ABOUT SECTION
Full-height centered section with min-h-screen, padding px-5 sm:px-8 md:px-10 py-20.

Four decorative 3D images positioned absolutely in corners:

Top-left: Moon icon -- https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png -- w-[120px] sm:w-[160px] md:w-[210px], positioned top-[4%] left-[1%] sm:left-[2%] md:left-[4%]. FadeIn: delay 0.1, x -80, y 0, duration 0.9.
Bottom-left: 3D object -- https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png -- w-[100px] sm:w-[140px] md:w-[180px], positioned bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]. FadeIn: delay 0.25, x -80, y 0, duration 0.9.
Top-right: Lego icon -- https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png -- w-[120px] sm:w-[160px] md:w-[210px], positioned top-[4%] right-[1%] sm:right-[2%] md:right-[4%]. FadeIn: delay 0.15, x 80, y 0, duration 0.9.
Bottom-right: 3D group -- https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png -- w-[130px] sm:w-[170px] md:w-[220px], positioned bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]. FadeIn: delay 0.3, x 80, y 0, duration 0.9.
Heading: "About me" using .hero-heading gradient text, font-black, uppercase, leading-none, tracking-tight, centered. Font size: clamp(3rem, 12vw, 160px). FadeIn: delay 0, y 40.

Animated paragraph: Uses a character-by-character scroll-driven opacity animation. Text: "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!" -- color #D7E2EA, font-medium, centered, leading-relaxed, max-w-[560px], font size clamp(1rem, 2vw, 1.35rem). Each character animates from opacity 0.2 to 1 based on scroll progress, with scroll offset ['start 0.8', 'end 0.2'].

Contact button below the text block. Gap between heading/text: gap-10 sm:gap-14 md:gap-16. Gap between text block and button: gap-16 sm:gap-20 md:gap-24.

4. SERVICES SECTION
White background (#FFFFFF), with rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] top corners. Padding: px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32.

Heading: "Services" in #0C0C0C, font-black, uppercase, centered, font size clamp(3rem, 12vw, 160px). Margin bottom: mb-16 sm:mb-20 md:mb-28.

5 service items in a vertical list, max-w-5xl, centered:

01 - 3D Modeling: "Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations."
02 - Rendering: "High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life."
03 - Motion Design: "Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences."
04 - Branding: "Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence."
05 - Web Design: "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience."
Each item: horizontal layout with number (font-black, font size clamp(3rem, 10vw, 140px), color #0C0C0C) on the left and name + description stacked vertically on the right. Name: font-medium, uppercase, font size clamp(1rem, 2.2vw, 2.1rem). Description: font-light, leading-relaxed, max-w-2xl, font size clamp(0.85rem, 1.6vw, 1.25rem), opacity 0.6. Items separated by 1px borders (rgba(12, 12, 12, 0.15)). Padding: py-8 sm:py-10 md:py-12. Staggered FadeIn: each item delays by i * 0.1.

5. PROJECTS SECTION
Dark background (#0C0C0C), rounded top corners rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px], pulled up with -mt-10 sm:-mt-12 md:-mt-14, z-10.

Heading: "Project" (singular) using .hero-heading gradient, same styling as other headings.

3 sticky-stacking project cards that scale down as you scroll past them (card stacking effect using Framer Motion useScroll and useTransform). Each card is sticky top-24 md:top-32 inside an h-[85vh] container.

Scale calculation: targetScale = 1 - (totalCards - 1 - index) * 0.03. Each card offset by top: ${index * 28}px.

Each card has: rounded-[40px] sm:rounded-[50px] md:rounded-[60px], border-2 border-[#D7E2EA], background #0C0C0C, padding p-4 sm:p-6 md:p-8.

Card layout:

Top row: Number (huge, same style as services), category label, project name, and a "Live Project" ghost button (rounded-full, border-2 #D7E2EA, uppercase, tracking-widest).
Bottom row: Two-column image grid -- left column (40% width) has 2 stacked images, right column (60%) has 1 tall image. All images have heavy border radius rounded-[40px] sm:rounded-[50px] md:rounded-[60px]. Left top image height: clamp(130px, 16vw, 230px). Left bottom image height: clamp(160px, 22vw, 340px).
Project data with CloudFront image URLs:

Project 01 - "Nextlevel Studio" (Client):

Col1 image 1: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85
Col1 image 2: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85
Col2 image: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85
Project 02 - "Aura Brand Identity" (Personal):

Col1 image 1: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85
Col1 image 2: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85
Col2 image: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85
Project 03 - "Solaris Digital" (Client):

Col1 image 1: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85
Col1 image 2: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85
Col2 image: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85
REUSABLE COMPONENTS
ContactButton: Rounded-full pill button with gradient background linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%), inner box-shadow 0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset, white 2px outline with -3px offset. Text: white, font-medium, uppercase, tracking-widest. Sizes: px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4, text text-xs sm:text-sm md:text-base. Label: "Contact Me".

LiveProjectButton: Ghost/outline pill button. Rounded-full, border-2 border-[#D7E2EA], text color #D7E2EA, font-medium, uppercase, tracking-widest. Sizes: px-8 py-3 sm:px-10 sm:py-3.5, text text-sm sm:text-base. Hover: bg-[#D7E2EA]/10. Label: "Live Project".

FadeIn: Framer Motion wrapper using whileInView with viewport={{ once: true, margin: "50px", amount: 0 }}. Accepts delay, duration (default 0.7), x (default 0), y (default 30). Easing: [0.25, 0.1, 0.25, 1]. Uses motion.create() for dynamic element types.

Magnet: Mouse-following magnetic hover effect. Tracks mouse position relative to element center, applies translate3d transform divided by strength factor. Activates when cursor is within padding distance of element edge. Smooth transition in (0.3s ease-out) and out (0.6s ease-in-out). Uses willChange: 'transform'.

AnimatedText: Character-by-character scroll-reveal text animation. Each character goes from opacity 0.2 to 1 based on its position in the text relative to scroll progress. Uses Framer Motion useScroll targeting the paragraph element with offset ['start 0.8', 'end 0.2']. Each character uses invisible placeholder + absolute positioned animated span.

KEY DEPENDENCIES
react, react-dom (^18.3.1)
framer-motion (^12.38.0)
lucide-react (^0.344.0)
tailwindcss (^3.4.1)
vite, typescript
RESPONSIVE BREAKPOINTS
All sections use Tailwind's default breakpoints (sm: 640px, md: 768px, lg: 1024px) with mobile-first approach. Heavy use of clamp() for fluid typography. The entire design scales gracefully from mobile to ultra-wide screens.
````

</details>

---

### 作品 3 · Interactive Discovery (Lithos)

- **风格流派**:Interactive Cursor · 光标聚光灯揭示
- **来源**:https://motionsites.ai/ · Interactive Discovery · Free(prompt_id: `interactive-discovery`)
- **原文长度**:6894 字符

<details open>
<summary>完整 prompt 原文(一字未改)</summary>

````markdown
Build a full-screen, dark-themed hero section for a geology brand called **Lithos**, using **React 18 + TypeScript + Vite + Tailwind CSS** and **lucide-react** for icons. The signature feature is a **cursor-following spotlight that reveals a second image** through a soft circular mask on top of a base image. Match every detail below exactly.

### Fonts
Add this to the top of `src/index.css`, then `@tailwind base/components/utilities`:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@1,400;1,500;1,600&display=swap');
* { font-family: 'Inter', sans-serif; }
.font-playfair { font-family: 'Playfair Display', serif; }
```
- Body/UI font: **Inter**.
- Display/wordmark accent: **Playfair Display, italic**.

### Asset URLs (use these exactly)
- Base image (`BG_IMAGE_1`):
  `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85`
- Reveal image (`BG_IMAGE_2`):
  `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85`

### Layout & structure
Root wrapper: `min-h-screen bg-white tracking-[-0.02em]`, inline `fontFamily: "'Inter', sans-serif"`.

**Section** (`<section>`): `relative w-full overflow-hidden h-screen bg-black`, inline `style={{ height: '100dvh' }}`. Layers, by z-index:
1. **Base image** (`z-10`): `absolute inset-0 bg-center bg-cover bg-no-repeat`, background = `BG_IMAGE_1`.
2. **Reveal layer** (`z-30`): a `RevealLayer` component (see below) showing `BG_IMAGE_2`.
3. **Heading** (`z-50`): `absolute top-[14%] left-0 right-0 flex flex-col items-center text-center px-5 pointer-events-none`. An `<h1>` with `text-white leading-[0.95]` containing two block spans:
   - Line 1: `block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl`, inline `letterSpacing: '-0.05em'`, text **"Layers hold"**.
   - Line 2: `block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1`, inline `letterSpacing: '-0.08em'`, text **"tales of time"**.
4. **Bottom-left paragraph** (`z-50`): `hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[260px]`. `<p className="text-sm text-white/80 leading-relaxed">` — "Every layer of sediment records a chapter of our planet, from ancient seabeds to drifting ash, layered across millions of years beneath us."
5. **Bottom-right block** (`z-50`): `absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[260px] flex flex-col items-start gap-4 sm:gap-5`. Contains a `<p className="text-xs sm:text-sm text-white/80 leading-relaxed">` — "Our interactive maps let you peel back the crust to trace how stones, fossils, and deep time combine to shape the ground beneath your feet." — and a **Start Digging** button: `bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm font-medium px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#e8702a]/30`.

### The cursor spotlight reveal (core mechanic)
In the parent, define `const SPOTLIGHT_R = 260;` and track the mouse with smoothing:
- Refs: `mouse` (raw), `smooth` (eased), `rafRef`; state `cursorPos` (init `{x:-999,y:-999}`).
- `mousemove` listener stores raw `e.clientX/clientY`.
- A `requestAnimationFrame` loop lerps: `smooth.x += (mouse.x - smooth.x) * 0.1` (same for y), then `setCursorPos`. Clean up listener + cancel RAF on unmount.

`RevealLayer({ image, cursorX, cursorY })`:
- Holds a hidden `<canvas>` (`absolute inset-0 pointer-events-none`, `style={{display:'none'}}`) sized to `window.innerWidth/Height` on mount + resize.
- A reveal `<div>` (`absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none`) with the reveal image as background.
- On every render: clear canvas, build a **radial gradient** at `(cursorX, cursorY)` from radius 0 → `SPOTLIGHT_R` with stops:
  `0 → rgba(255,255,255,1)`, `0.4 → 1`, `0.6 → 0.75`, `0.75 → 0.4`, `0.88 → 0.12`, `1 → 0`.
  Fill an arc of radius `SPOTLIGHT_R` with it. Then `canvas.toDataURL()` and apply it as `maskImage`/`webkitMaskImage` on the reveal div with `maskSize: '100% 100%'`. This makes the second image visible only inside the soft glowing circle that trails the cursor.

### Navigation (fixed, over hero)
`<nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5">`:
- **Left**: an inline SVG logo (26×26, viewBox `0 0 256 256`, `fill="#ffffff"`, path `M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z`) + wordmark `<span className="text-white text-2xl font-playfair italic">Lithos</span>`.
- **Center pill** (`hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-2 py-2 items-center gap-1`): buttons **Course** (active: full white text), then **Field Guides, Geology, Plans, Live Tour** (`text-white/80 ... hover:bg-white/20 hover:text-white transition-colors`, `px-4 py-1.5 rounded-full text-sm font-medium`).
- **Right (desktop)**: `hidden md:block bg-white text-gray-900 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-100` — **Sign Up**.

### Animations (premium, on load)
Add to `index.css`:
```css
@keyframes heroReveal { 0%{opacity:0;transform:translateY(28px);filter:blur(12px)} 100%{opacity:1;transform:translateY(0);filter:blur(0)} }
@keyframes heroFadeUp { 0%{opacity:0;transform:translateY(20px)} 100%{opacity:1;transform:translateY(0)} }
@keyframes heroZoom { 0%{transform:scale(1.12)} 100%{transform:scale(1)} }
.hero-anim { opacity:0; animation-fill-mode:forwards; animation-timing-function:cubic-bezier(0.16,1,0.3,1); }
.hero-reveal { animation-name:heroReveal; animation-duration:1.1s; }
.hero-fade { animation-name:heroFadeUp; animation-duration:1s; }
.hero-zoom { animation:heroZoom 1.8s cubic-bezier(0.16,1,0.3,1) forwards; }
@media (prefers-reduced-motion: reduce){ .hero-anim,.hero-zoom{ animation:none; opacity:1; } }
```
Apply:
- Base image div → add `hero-zoom` (slow Ken Burns zoom-out).
- Heading line 1 → `hero-anim hero-reveal`, inline `animationDelay: '0.25s'`; line 2 → same with `'0.42s'` (blur-rise, staggered).
- Bottom-left paragraph wrapper → `hero-anim hero-fade`, `animationDelay: '0.7s'`.
- Bottom-right wrapper → `hero-anim hero-fade`, `animationDelay: '0.85s'`.

### Responsiveness
- Heading scales `text-5xl` → `sm:text-7xl` → `md:text-8xl`.
- Center nav pill and desktop Sign Up are `hidden` below `md`; the mobile hamburger is `md:hidden`.
- Bottom-left paragraph is `hidden sm:block`; bottom-right block is full-width on mobile (`left-5 right-5`) and right-anchored from `sm`.
- Use `100dvh` so mobile browser chrome doesn't clip the section.
````

</details>

---

### 作品 4 · Celestial Renewal (Serene)

- **风格流派**:Dark Premium / Cinematic Scroll · 视差
- **来源**:https://motionsites.ai/ · Celestial Renewal · Free(prompt_id: `celestial-renewal`)
- **原文长度**:7343 字符

<details open>
<summary>完整 prompt 原文(一字未改)</summary>

````markdown
**Build a React + Vite + Tailwind CSS landing page with two full-screen sections for a luxury beauty/wellness brand called "Serene". Use TypeScript.**

---

### Fonts (loaded via Google Fonts in index.html)

Load these three font families from Google Fonts:
- **Dancing Script** (weights: 400, 500, 600, 700) -- used for the brand logo
- **Instrument Serif** (italic: 0, 1) -- used for the hero heading and the quote text
- **Inter** (weights: 300, 400, 500, 600, 700, 800, 900) -- used for body text, navbar links, and buttons

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
```

---

### Global CSS (index.css)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background: #0a0a0c;
  overflow-x: hidden;
}

.font-inter {
  font-family: 'Inter', sans-serif;
}

.font-instrument {
  font-family: 'Instrument Serif', serif;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.liquid-glass {
  background: rgba(255, 255, 255, 0.01);
  background-blend-mode: luminosity;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: none;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.liquid-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(180deg,
    rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%,
    rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
    rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.text-glow {
  text-shadow: 0 0 40px rgba(255, 255, 255, 0.4), 0 0 80px rgba(255, 255, 255, 0.2), 0 0 120px rgba(255, 255, 255, 0.1);
}

.button-glow {
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.1);
}
```

---

### App Layout (App.tsx)

The wrapper div has `bg-[#0a0608]`. It renders `<Hero />` followed by `<QuoteSection />`.

---

### SECTION 1: Hero

A full-viewport (`h-screen`) section with:

1. **Background video** -- autoplays, muted, loops, playsInline, covers the full section with `object-cover`:
   ```
   https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4
   ```

2. **Dark overlay** -- `absolute inset-0 bg-black/20`

3. **Fixed Navbar** -- `fixed top-0 left-0 right-0 z-50`, flex row, space-between, `px-6 md:px-12 py-5`:
   - **Left**: Brand name "Serene" in Dancing Script cursive, white, `text-2xl md:text-3xl`
   - **Center (desktop only, hidden on mobile)**: Navigation links -- "About", "Services", "Journal", "Contact" -- `text-white/80 hover:text-white text-sm tracking-wide`, spaced `gap-12`
   - **Right (desktop)**: White pill button "Book a consultation"
   - **Right (mobile)**: Hamburger icon (3 lines, animated to X on open). Uses cubic-bezier(0.22,1,0.36,1) easing. On open: top line rotates 45deg + translates down 9px; middle line fades/scales to 0; bottom line rotates -45deg + translates up 9px.
   - **Mobile menu**: Slide-in panel from right, `w-[85%] max-w-[340px]`, `bg-[#0a0608]/95 backdrop-blur-xl border-l border-white/10`. Links stagger-animate in (opacity + translateX, 75ms delay between each, starting at 150ms). Button at bottom with 450ms delay.

4. **Center content** -- absolutely positioned, flex column, centered, with `-mt-[120px]` to shift up:
   - **Heading**: `font-instrument text-white text-[36px] md:text-7xl lg:text-[110px] leading-[0.9] tracking-tight text-center text-glow` -- text: "Gentle touch. Radiant presence."
   - **Subtext**: `text-white/70 text-sm md:text-base text-center mt-5 md:mt-7 max-w-xl` -- text: "Expert beauty and holistic wellness, delivered with warmth and intention."
   - **CTA Button**: White pill button "Begin your renewal", `mt-6 md:mt-9`

5. **Sound indicator (desktop only)** -- bottom-left corner (`bottom-8 left-8`), a 40px circle with `border border-white/20` containing a small horizontal bar, next to two lines of text: "Experience" / "with sound" in `text-white/60 text-xs`

**Button component**: `bg-white text-black px-8 py-3.5 rounded-full font-medium text-sm tracking-wide hover:bg-white/90 transition-all duration-300 button-glow`

---

### SECTION 2: Quote Section (with parallax scroll animations)

A full-viewport (`h-screen`) section with:

**Background**: CSS linear-gradient top to bottom:
```
#010A17 0% -> #0A4267 30% -> #20658E 60% -> #6BADC4 100%
```

**Animated layers (requestAnimationFrame-based parallax with lerp smoothing):**

The animation uses a `progress` value (0 to 1) based on how far the section has scrolled through the viewport:
```
progress = clamp(0, 1, (windowHeight - rect.top) / (windowHeight + rect.height))
```

1. **Rainbow image** -- full-width, positioned `absolute inset-x-0 top-0 z-30`. Parallax: moves vertically from +120px to -160px based on scroll progress. Lerp factor: 0.06.
   ```
   https://soft-zoom-63098134.figma.site/_assets/v11/8d520a7515d06cbfc403d0125e3d05b1a7ccd29c.png
   ```

2. **Left cloud** -- `absolute left-0 bottom-[10%] z-10`, hidden on mobile (`hidden sm:block`). Width: `w-[500px] md:w-[650px]`. Has `marginLeft: '-50%'` to let it overflow left. Slides in from -200px on X when in view (progress 0.12-0.92), slides back out when not. Also drifts up (cloudY = progress * -50). Opacity tied to X distance. Lerp factor: 0.04.
   ```
   https://soft-zoom-63098134.figma.site/_assets/v11/0d6dfd3f90b930f21726f2ed56a3320d79b7a797.png
   ```

3. **Right cloud** -- same image as left but `scale-x-[-1]` (flipped), `absolute right-0 bottom-[15%] z-10`. Has `marginRight: '-75%'`. Slides in from +200px. Same lerp/timing as left cloud.

4. **Quote content** -- centered, `z-20`, `max-w-4xl`:
   - **Quote text**: `font-instrument text-white text-xl sm:text-2xl md:text-4xl lg:text-[42px] leading-[1.45] md:leading-[1.5]` -- text: "Serene was founded on a belief in beauty that honors your nature. We pursue refined outcomes, considered approaches, and lasting vitality. We spend time learning what matters to you before deciding what serves you best. No rushing, no excess -- just support that lets you feel radiant." (wrapped in curly quotes)
   - **Attribution**: `mt-6 md:mt-8 text-white/80 text-sm md:text-base tracking-wide` -- text: "Dr. Mia Callahan -- Founder"

**Key animation implementation detail**: All transforms use `translate3d` for GPU acceleration with `will-change-transform`. Initial cloud state is `opacity: 0` and translated off-screen. The lerp function smoothly interpolates current values toward targets each frame: `current + (target - current) * factor`.

---

### Tailwind Config

Default Tailwind config with no extensions -- all custom styling handled via CSS utility classes in index.css.
````

</details>

---

### 作品 5 · Liquid Glass CTA

- **风格流派**:Glassmorphism · HLS 视频 CTA
- **来源**:https://motionsites.ai/ · Liquid Glass CTA · Free(prompt_id: `liquid-glass-cta`)
- **原文长度**:10077 字符

<details open>
<summary>完整 prompt 原文(一字未改)</summary>

````markdown
Build a "CTA + Footer" section component for a React + Vite + Tailwind CSS project. This is a cinematic full-width call-to-action section with an HLS video background, centered text, two CTA buttons, and a minimal footer bar at the bottom. Black background, white text, liquid glassmorphism effects.

---

### FONTS (import in index.css or HTML head)

```
https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Barlow:wght@300;400;500;600&display=swap
```

- Headings: `Instrument Serif` italic -- Tailwind class `font-heading`
- Body: `Barlow` -- Tailwind class `font-body`

Add to `tailwind.config.ts` under `theme.extend.fontFamily`:
```js
heading: ["'Instrument Serif'", "serif"],
body: ["'Barlow'", "sans-serif"],
```

Base styles in `index.css`:
```css
body {
  font-family: 'Barlow', sans-serif;
  background: #000;
  color: #fff;
}
h1, h2, h3 {
  font-family: 'Instrument Serif', serif;
}
```

---

### LIQUID GLASS CSS (add to index.css inside `@layer components`)

```css
@layer components {
  .liquid-glass-strong {
    background: rgba(255, 255, 255, 0.01);
    background-blend-mode: luminosity;
    backdrop-filter: blur(50px);
    -webkit-backdrop-filter: blur(50px);
    border: none;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.05),
      inset 0 1px 1px rgba(255, 255, 255, 0.15);
    position: relative;
    overflow: hidden;
  }

  .liquid-glass-strong::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1.4px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(255, 255, 255, 0.2) 20%,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0) 60%,
      rgba(255, 255, 255, 0.2) 80%,
      rgba(255, 255, 255, 0.5) 100%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
}
```

The `::before` pseudo-element uses a mask-composite trick to render a thin glowing gradient border that fades out in the middle of each side.

---

### DEPENDENCIES

```
npm install lucide-react hls.js
```

- `ArrowUpRight` icon from `lucide-react`
- `hls.js` for streaming the Mux HLS video

---

### HLS VIDEO URL (Mux)

```
https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8
```

This is an HLS stream that requires `hls.js` to play in non-Safari browsers. Safari supports HLS natively via `<video>`.

---

### EXACT COMPONENT CODE

```tsx
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Hls from "hls.js";

const CtaFooter = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const src = "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }
  }, []);

  return (
    <section className="relative py-32 px-6 md:px-16 lg:px-24 text-center overflow-hidden">
      {/* Background HLS Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Top fade */}
      <div
        className="absolute top-0 left-0 right-0 z-[1] pointer-events-none"
        style={{ height: '200px', background: 'linear-gradient(to bottom, black, transparent)' }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[1] pointer-events-none"
        style={{ height: '200px', background: 'linear-gradient(to top, black, transparent)' }}
      />

      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white tracking-tight leading-[0.85] max-w-3xl mx-auto mb-4">
          Your next website starts here.
        </h2>
        <p className="text-white/60 font-body font-light text-sm md:text-base max-w-xl mx-auto mb-8">
          Book a free strategy call. See what AI&#8209;powered design can do. No commitment, no pressure. Just possibilities.
        </p>
        <div className="flex items-center justify-center gap-6">
          <button className="liquid-glass-strong rounded-full px-6 py-3 text-sm font-medium text-white flex items-center gap-2 hover:bg-white/10 transition-all font-body">
            Book a Call
            <ArrowUpRight className="h-5 w-5" />
          </button>
          <button className="bg-white text-black rounded-full px-6 py-3 text-sm font-medium flex items-center gap-2 hover:bg-white/90 transition-colors font-body">
            View Pricing
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {/* Footer */}
        <div className="mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 font-body font-light text-xs">
            &copy; 2026 Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Contact"].map((link) => (
              <a key={link} href="#" className="text-white/40 hover:text-white/70 font-body font-light text-xs transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaFooter;
```

---

### SECTION STRUCTURE BREAKDOWN

```
<section>  (relative, py-32, px-6 md:px-16 lg:px-24, text-center, overflow-hidden)
  |
  +-- <video>  (absolute inset-0, full cover, z-0, autoPlay loop muted playsInline)
  |
  +-- Top gradient fade  (absolute top-0, 200px tall, black->transparent, z-[1])
  +-- Bottom gradient fade  (absolute bottom-0, 200px tall, transparent<-black, z-[1])
  |
  +-- Content wrapper  (relative z-10)
       |
       +-- <h2> heading
       +-- <p> subtext
       +-- Button row (flex, centered, gap-6)
       |    +-- "Book a Call" (liquid-glass-strong, rounded-full)
       |    +-- "View Pricing" (bg-white text-black, rounded-full)
       |
       +-- Footer bar (mt-32, border-t border-white/10)
            +-- Copyright (left)
            +-- Links: Privacy, Terms, Contact (right)
```

---

### HLS VIDEO SETUP PATTERN

The `useEffect` hook initializes `hls.js` for non-Safari browsers and falls back to native HLS for Safari:

1. Check `Hls.isSupported()` -- if true, create an `Hls` instance, load the `.m3u8` source, attach to the `<video>` element
2. If not supported but the browser can play `application/vnd.apple.mpegurl` (Safari), set `video.src` directly
3. Cleanup: `hls.destroy()` on unmount

The `<video>` element uses `autoPlay loop muted playsInline` -- all four attributes are required for autoplay to work across browsers (especially mobile).

---

### VIDEO OVERLAY FADE PATTERN

Two absolutely positioned `<div>` elements create black gradient fades at the top and bottom edges, making the video blend seamlessly into the surrounding black background:

- **Top fade**: `height: 200px`, `background: linear-gradient(to bottom, black, transparent)`, `z-[1]`, `pointer-events-none`
- **Bottom fade**: `height: 200px`, `background: linear-gradient(to top, black, transparent)`, `z-[1]`, `pointer-events-none`

Content sits at `z-10` above both the video and the fades.

---

### RESPONSIVE BEHAVIOR

| Breakpoint | Heading size | Padding | Footer layout |
|---|---|---|---|
| Mobile (default) | `text-5xl` | `px-6` | Stacked column (`flex-col`) |
| Tablet (`md:`) | `text-6xl` | `px-16` | Horizontal row (`md:flex-row`) |
| Desktop (`lg:`) | `text-7xl` | `px-24` | Horizontal row |

- Button row always horizontal (`flex items-center justify-center gap-6`), buttons stack naturally if viewport is very narrow
- Footer: `flex-col md:flex-row` -- copyright and links stack on mobile, sit side-by-side on tablet+
- Subtext constrained to `max-w-xl mx-auto`
- Heading constrained to `max-w-3xl mx-auto`

---

### TYPOGRAPHY DETAILS

| Element | Classes |
|---|---|
| Heading | `text-5xl md:text-6xl lg:text-7xl font-heading italic text-white tracking-tight leading-[0.85] max-w-3xl mx-auto mb-4` |
| Subtext | `text-white/60 font-body font-light text-sm md:text-base max-w-xl mx-auto mb-8` |
| Glass button text | `text-sm font-medium text-white font-body` |
| Solid button text | `text-sm font-medium` (inherits `text-black` from `bg-white text-black`) |
| Copyright | `text-white/40 font-body font-light text-xs` |
| Footer links | `text-white/40 hover:text-white/70 font-body font-light text-xs transition-colors` |

---

### BUTTON DETAILS

**Primary CTA ("Book a Call"):**
`liquid-glass-strong rounded-full px-6 py-3 text-sm font-medium text-white flex items-center gap-2 hover:bg-white/10 transition-all font-body`
- Glass background with gradient border via `::before`
- `ArrowUpRight` icon at `h-5 w-5`

**Secondary CTA ("View Pricing"):**
`bg-white text-black rounded-full px-6 py-3 text-sm font-medium flex items-center gap-2 hover:bg-white/90 transition-colors font-body`
- Solid white background, black text
- `ArrowUpRight` icon at `h-4 w-4` (slightly smaller than the primary)

---

### EXACT TEXT CONTENT

**Heading**: "Your next website starts here."
**Subtext**: "Book a free strategy call. See what AI-powered design can do. No commitment, no pressure. Just possibilities."
**Button 1**: "Book a Call"
**Button 2**: "View Pricing"
**Copyright**: "(c) 2026 Studio. All rights reserved."
**Footer links**: "Privacy", "Terms", "Contact"

---

### PARENT CONTEXT

This section sits on a `bg-black` parent container as the last section of the page. The top gradient fade blends the video into the section above (which also has a black background). The footer bar is part of this same component -- there is no separate footer component.
````

</details>

---

### 作品 6 · Wellness Companion

- **风格流派**:Mobile App UI · 玻璃拟态 + 交错入场
- **来源**:https://motionsites.ai/ · Wellness Companion · Free(prompt_id: `wellness-companion`)
- **原文长度**:4095 字符

<details open>
<summary>完整 prompt 原文(一字未改)</summary>

````markdown
Build a mobile wellness quiz screen inside a realistic phone frame mockup, centered on a white page. Use React with Tailwind CSS and Lucide React icons.

**Phone Frame:**
- Dimensions: 375px wide x 780px tall
- Border radius: 52px
- Background color: `#8a9aaa`
- Box shadow to simulate a real phone bezel: `inset 0 0 0 2px rgba(255,255,255,0.08), 0 0 0 1px rgba(0,0,0,0.6), 0 0 0 10px #1a1a1e, 0 0 0 11px rgba(255,255,255,0.06), 0 0 60px rgba(0,0,0,0.5)`
- A black pill-shaped Dynamic Island at the top center: 120px wide, 32px tall, fully rounded, z-index 50

**Background:**
- Full-bleed background image using this exact URL: `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260704_143500_a76b8e64-2c69-4683-80e7-2bb060a921d6.png&w=1280&q=85`
- Apply `blur(12px)` and `scale(1.1)` to the background image
- Semi-transparent overlay: `#8a9aaa` at 30% opacity on top

**Font:**
- Load "Helvetica Now Var" from: `https://db.onlinewebfonts.com/c/e66905e07608167a84e6ad52f638c3c6?family=Helvetica+Now+Var`
- Fallback stack: 'Helvetica Neue', Helvetica, Arial, sans-serif
- Apply globally to all elements

**Content Layout (flex column, padding: 56px top, 24px sides, 24px bottom):**

1. **Header Badge** (top, with 40px margin-bottom):
   - Liquid glass pill with Timer icon (12px, white/80) + text "Vitaforge Daily" (12px, white/90, medium weight)
   - Padding: 10px vertical, 12px horizontal

2. **Title Section** (32px margin-bottom):
   - Subtitle: "Choose all that apply" - white/60, 14px
   - Heading: "What aspects of your wellness would you like to boost?" - white, 28px, normal weight, tight leading and tracking

3. **Selection Grid** (2 columns, 12px gap, pushes to fill available space):
   - 4 cards: "Sleep quality", "Stress", "Weight", "Skin"
   - Each card: rounded-[32px], 100px height, padding 16px
   - Shows a number label (01, 02, etc.) in white/50, 11px, medium weight
   - Option text in white, 16px, medium weight
   - "Stress" (id:2) and "Skin" (id:4) are pre-selected
   - Cards are toggleable on click

4. **Voice Button** (centered, 24px vertical margin):
   - Yellow/gold radial glow behind: `radial-gradient(ellipse at center, rgba(220,200,80,0.5) 0%, rgba(180,160,40,0.2) 40%, transparent 70%)`
   - 64px circular liquid glass button with a waveform SVG icon (white strokes, strokeWidth 2, strokeLinecap round) showing 5 vertical bars of varying heights
   - "voice" label below in white/70, 12px

5. **Slide-to-Confirm Button** (bottom, inside 24px horizontal padding):
   - Full-width rounded-full track, 56px tall, liquid glass style
   - White circular thumb (44px) on the left with ArrowRight icon (gray-800)
   - "Done" text centered in white/60, 14px, medium weight
   - 3 ChevronRight icons on the right (14px) at white/40, white/50, white/60 opacity
   - Draggable thumb with pointer events: snaps back if not dragged past 85%, snaps to end if past 85%

**Liquid Glass Effect (CSS classes):**

`.liquid-glass`:
- Background: `rgba(255,255,255,0.01)` with luminosity blend mode
- Backdrop filter: `blur(4px)`
- Box shadow: `inset 0 1px 1px rgba(255,255,255,0.1)`
- `::before` pseudo-element for gradient border: `linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%)` with 1.4px padding and mask-composite exclude technique

`.liquid-glass-selected`:
- Same as above but background: `rgba(255,255,255,0.12)`, blur 8px, stronger box shadow (`inset 0 1px 2px rgba(255,255,255,0.2)`), and brighter gradient border (0.6 alpha at edges, 0.25 at 20%/80%)

**Animations:**
- Staggered fade-up animation on all elements
- Keyframes: from `opacity:0, translateY(16px)` to `opacity:1, translateY(0)`
- Duration: 0.5s, easing: `cubic-bezier(0.22, 1, 0.36, 1)`, fill: forwards
- Delays: header 0.1s, title 0.25s, grid cards 0.4s/0.48s/0.56s/0.64s, voice 0.7s, slider 0.85s

**Dependencies:**
- React 18, Tailwind CSS 3, Lucide React, Vite, TypeScript
````

</details>

---

### 作品 7 · Orbis NFT

- **风格流派**:Dark Premium / Web3 · 噪点纹理 + 霓虹强调
- **来源**:https://motionsites.ai/ · Orbis NFT · Free(prompt_id: `orbis-nft-landing`)
- **原文长度**:8276 字符

<details open>
<summary>完整 prompt 原文(一字未改)</summary>

````markdown
Create an NFT landing page called "Orbis.Nft" with 4 sections, using a dark space theme. The page uses video backgrounds served from CloudFront, a liquid glass UI effect, and a specific color/font system. Recreate it exactly as described below.

FONTS (Google Fonts)

Anton - Used for all headings and navigation text (aliased as font-grotesk in Tailwind)

Condiment - A cursive script used for accent/overlay text (aliased as font-condiment in Tailwind)

System monospace font (font-mono) - Used for body/description paragraphs

Load via Google Fonts in index.html:

https://fonts.googleapis.com/css2?family=Anton&family=Condiment&display=swap


COLOR SYSTEM (Tailwind config)

Background: #010828 (deep dark navy blue)

cream: #EFF4FF (off-white, used for all text)

neon: #6FFF00 (bright green, used for accent cursive text and underline bars)

LIQUID GLASS CSS EFFECT

Applied via a .liquid-glass class. This is used on the navbar, social icon buttons, NFT cards, and card overlays:

.liquid-glass {
  background: rgba(255, 255, 255, 0.01);
  background-blend-mode: luminosity;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: none;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}
.liquid-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(180deg,
    rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%,
    rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
    rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}


TEXTURE OVERLAY

A full-screen fixed texture overlay sits on top of everything (z-50, pointer-events-none). It uses a /texture.png image with mix-blend-mode: lighten at opacity: 0.6, covering the entire viewport with background-size: cover.

SECTION 1: HERO (Full viewport)

Background: Full-bleed looping muted autoplaying video covering the entire section with object-cover

Video URL: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_045634_e1c98c76-1265-4f5c-882a-4276f2080894.mp4

Container: max-w-[1831px] centered with responsive horizontal padding

Section has rounded-b-[32px] bottom corners, clipping the video

Header:

Left: "Orbis.Nft" logo text in Anton, 16px, uppercase

Center: Navigation bar with liquid-glass effect, rounded-[28px], px-[52px] py-[24px]. Contains 5 links: Homepage, Gallery, Buy NFT, FAQ, Contact. Each link is Anton 13px uppercase. Links have hover:text-neon transition. Nav is hidden on mobile (hidden lg:block).

Hero Content:

Large heading in Anton font, responsive sizing: 40px mobile / 60px sm / 75px md / 90px lg. Uppercase. leading-[1.05] mobile, leading-[1] tablet+. Max width 780px on desktop, offset with lg:ml-32.

Text reads:

Beyond earth
and ( its ) familiar boundaries


Overlaid cursive accent text "Nft collection" in Condiment font (24px-48px responsive), positioned absolute to the right side of the heading, slightly rotated (-rotate-1), in neon green (text-neon), with mix-blend-exclusion and opacity-90.

Social Icons (Desktop):

3 square buttons (56x56px) stacked vertically in top-right corner, each with liquid-glass and rounded-[1rem]. Icons: Mail, Twitter, Github from lucide-react (20x20px). hover:bg-white/10 transition.

Social Icons (Mobile):

Same 3 buttons but centered horizontally below the heading, shown only below lg breakpoint.

SECTION 2: ABOUT / INTRO (Full viewport)

Background: Full-bleed looping muted autoplaying video with object-cover

Video URL: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_151551_992053d1-3d3e-4b8c-abac-45f22158f411.mp4

Container: Same max-w-[1831px] centered, with generous vertical padding (64px-96px responsive)

Top Row (flex row on desktop, column on mobile):

Left: Heading in Anton, responsive 32px-60px, uppercase:

Hello!
I'm orbis


With an overlaid "Orbis" in Condiment cursive, neon green, mix-blend-exclusion, 36px-68px responsive, positioned absolute at bottom-right of heading, slightly rotated.

Right: Short paragraph in monospace 14px-16px, uppercase, cream color, max-width 266px: "A digital object fixed beyond time and place. An exploration of distance, form, and silence in space"

Bottom Row (flex row, space-between):

Two columns (left and right), each containing 2 identical paragraphs. Same monospace text as above but at opacity-10 (nearly invisible, decorative). Right column hidden below lg. On mobile, text uses text-[#010828] (dark) so it's effectively invisible against the video.

SECTION 3: NFT COLLECTION GRID

Background: Solid #010828 (no video)

Container: Same max-w-[1831px] centered

Header Row:

Left: Heading in Anton, 32px-60px responsive, uppercase:

Collection of
  [indented] Space objects


Where "Space" is in Condiment cursive neon green, and "objects" is in Anton. The second line is indented with ml-12 / ml-24 / ml-32 responsive.

Right: A "SEE ALL CREATORS" button. "SEE" is large (32px-60px), "ALL" and "CREATORS" are stacked smaller (20px-36px) next to it. Below the text is a neon green bar (bg-neon, height 6px-10px responsive, full width of button).

NFT Card Grid:

3-column grid on desktop (lg:grid-cols-3), 2 on tablet, 1 on mobile. Gap 24px.

Each card: liquid-glass container with rounded-[32px], padding 18px, hover:bg-white/10 transition.

Inside each card: a square video container (pb-[100%] aspect ratio trick) with rounded-[24px] overflow hidden.

Video URLs:

https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_053923_22c0a6a5-313c-474c-85ff-3b50d25e944a.mp4 (Score: 8.7/10)

https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_054411_511c1b7a-fb2f-42ef-bf6c-32c0b1a06e79.mp4 (Score: 9/10)

https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055427_ac7035b5-9f3b-4289-86fc-941b2432317d.mp4 (Score: 8.2/10)

Each card has an overlay bar at the bottom: a liquid-glass bar with rounded-[20px], px-5 py-4, showing "RARITY SCORE:" label (11px, cream/70% opacity) and score value (16px). On the right side of the bar is a circular purple gradient button (48x48px, bg-gradient-to-br from-[#b724ff] to-[#7c3aed]) with a right-arrow chevron SVG inside, with shadow-lg shadow-purple-500/50 and hover:scale-110 transition.

SECTION 4: CTA / FINAL SECTION

Background: Full-width video (NOT object-cover, instead w-full h-auto block so it displays at native aspect ratio)

Video URL: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055729_72d66327-b59e-4ae9-bb70-de6ccb5ecdb0.mp4

Text Content (positioned absolute over the video):

Right-aligned block, offset with lg:pr-[20%] lg:pl-[15%]

Small "Go beyond" text in Condiment cursive, neon green, mix-blend-exclusion, positioned absolute at top-left of the heading block. Sizes: 17px-68px responsive.

Heading in Anton, responsive 16px-60px, uppercase:

JOIN US.
REVEAL WHAT'S HIDDEN.
DEFINE WHAT'S NEXT.
FOLLOW THE SIGNAL.


"JOIN US." has extra bottom margin (mb-4 to mb-12 responsive) before the remaining lines.

Social Icons (Bottom-left, absolute positioned):

Positioned at left-[8%], bottom-[12%] to bottom-[20%] with responsive breakpoints.

A vertical liquid-glass container with rounded-[0.5rem] to rounded-[1.25rem] responsive, containing 3 stacked icon buttons (Mail, Twitter, Github).

Buttons have responsive widths using viewport units and rem values (e.g., w-[14vw] sm:w-[14.375rem] md:w-[10.78125rem] lg:w-[16.77rem]) and similar responsive heights.

Buttons are separated by border-b border-white/10 dividers (except the last one).

KEY TECHNICAL DETAILS

Framework: React + TypeScript + Vite + Tailwind CSS

Icons: lucide-react (Mail, Twitter, Github)

No additional packages needed beyond what Vite + React + Tailwind provides

All videos: autoPlay loop muted playsInline attributes

Responsive: Mobile-first with sm:, md:, lg: breakpoints throughout

Max content width: 1831px across all sections

All text is uppercase except the Condiment cursive accents which are normal-case
````

</details>

---

## 二、动效技法清单

每条含:**效果描述 / 适用场景 / 实现要点 / 出处**。出处标注该技法在上面哪个作品的 prompt 原文里出现,可回溯。

### 2.1 入场类(Entrance)

#### T-01 交错入场(Stagger Fade-Up)
- **效果**:页面元素不是一起出现,而是按视觉阅读顺序一个接一个上浮淡入,间隔 60–150ms。
- **适用**:几乎所有首屏、卡片列表、菜单展开。是"高级感"最低成本的来源——**它把一次性的信息轰炸变成了有节奏的呈现**。
- **实现要点**:
  - 关键帧固定为 `opacity:0, translateY(16~20px)` → `opacity:1, translateY(0)`。位移量 **16–28px**,不能更大(超过 40px 会显得"飞进来",廉价)。
  - 时长 0.5–1.1s;缓动 **`cubic-bezier(0.22, 1, 0.36, 1)`**(easeOutQuint)或 **`cubic-bezier(0.16, 1, 0.3, 1)`**(easeOutExpo)——这两条曲线在 7 个 prompt 里反复出现,是"高端感"的默认曲线:起步快、尾部长时间缓慢收敛,像物体带着惯性停下。
  - 延迟表要**显式列出**,不能只说"依次"。Wellness Companion 的写法是范本:`header 0.1s, title 0.25s, grid cards 0.4/0.48/0.56/0.64s, voice 0.7s, slider 0.85s`。
  - 必须 `animation-fill-mode: forwards` + 初始 `opacity:0`,否则会闪一下。
- **出处**:Wellness Companion(延迟表)、Interactive Discovery(`.hero-anim`)、Stillmind(移动菜单 50ms 递增)、3D Jack(`FadeIn` 组件 delay 0/0.15/0.35/0.5/0.6)。

#### T-02 模糊上浮揭示(Blur-Rise Reveal)
- **效果**:标题不只是淡入,而是从 `blur(10~12px)` 里"对焦"出来,同时上浮。
- **适用**:主标题、品牌名、单句金句。**这是本次调研里最值得抄的一个技法**——它比纯 fade 高级一个数量级,但成本只是多加一行 `filter`。
- **实现要点**:
  ```css
  @keyframes heroReveal {
    0%   { opacity:0; transform:translateY(28px); filter:blur(12px); }
    100% { opacity:1; transform:translateY(0);    filter:blur(0);    }
  }
  /* duration 1.1s; timing cubic-bezier(0.16,1,0.3,1) */
  ```
  两行标题分别延迟 `0.25s` / `0.42s`(相差 ~170ms),制造"逐句显影"感。
- **陷阱**:`filter: blur()` 在移动端是 GPU 开销大户,只对 1–2 个元素用,别对列表用。
- **出处**:Interactive Discovery(`heroReveal`)、Vision Reveal(`word-reveal`,逐词 blur 10px)。

#### T-03 慢速 Ken Burns 缩放(Hero Zoom-Out)
- **效果**:背景图/视频从 `scale(1.12)` 用 1.8s 缓慢收到 `scale(1)`,画面像"呼吸了一口"。
- **适用**:任何全屏背景首屏。**成本几乎为零,但让静态图有了生命**。
- **实现要点**:`@keyframes heroZoom { 0%{transform:scale(1.12)} 100%{transform:scale(1)} }`,1.8s,`cubic-bezier(0.16,1,0.3,1)`,`forwards`。缩放起点不要超过 1.15,否则边缘细节被裁掉太多。
- **出处**:Interactive Discovery(`.hero-zoom`)。

#### T-04 遮罩条开幕(Splash Curtain)
- **效果**:进站瞬间 10 个色块(上 5 下 5)分别向上/向下抽离,像幕布拉开,每块延迟 50ms。
- **适用**:作品集、品牌站的第一印象。**日常工具类产品坚决不要**——它每次刷新都要看一遍,第三次就烦了。
- **实现要点**:`position:fixed; inset:0; z-index:9999; pointer-events:none`,色块 `translateY(±100%)`,缓动 `cubic-bezier(0.96,-0.02,0.38,1.01)`(注意负值——起手有个反向"蓄力"),1s 后整体 `opacity:0; visibility:hidden`。
- **出处**:Vision Reveal(`.splash`)。

### 2.2 滚动类(Scroll-driven)

#### T-05 视差 + Lerp 平滑(Parallax with Lerp Smoothing)
- **效果**:滚动时前景/中景/背景以不同速率移动;关键在于**位移不是直接跟随滚动值,而是每帧向目标值插值逼近**,所以有"跟手但带阻尼"的高级手感。
- **适用**:叙事型 section、品牌故事页。
- **实现要点**(Celestial Renewal 给了完整公式,可直接抄):
  ```
  progress = clamp(0, 1, (windowHeight - rect.top) / (windowHeight + rect.height))
  // 每帧:current += (target - current) * factor
  // 彩虹层 factor = 0.06(较跟手);云层 factor = 0.04(更滞后,拉开层次)
  ```
  - **不同图层用不同 lerp factor**,是层次感的真正来源(不是位移量差异)。
  - 全部走 `translate3d` + `will-change: transform` 上 GPU。
  - 用 `requestAnimationFrame` 循环,滚动监听 `{passive:true}`。
- **出处**:Celestial Renewal(彩虹 +120px→-160px、双云左右滑入)。

#### T-06 逐字滚动显影(Character-by-Character Scroll Reveal)
- **效果**:一段文字里每个字符的 opacity 从 0.2 → 1,随滚动进度像"扫光"一样从左到右点亮。
- **适用**:About / 理念段落,把一段本来没人读的文字变成必须读完的。
- **实现要点**:Framer Motion `useScroll` + `offset: ['start 0.8', 'end 0.2']`,每个字符按其在文本中的相对位置映射一个 progress 区间;实现上用「不可见占位字符 + 绝对定位的动画 span」避免布局抖动。**起始 opacity 是 0.2 而不是 0**——保留可读的"灰稿",避免用户看到空白。
- **出处**:3D Jack Portfolio(`AnimatedText`)。

#### T-07 粘性卡片堆叠(Sticky Card Stack)
- **效果**:多张卡片依次 `sticky`,后一张滑上来时前一张**缩小**并留在下面,形成一叠扑克牌。
- **适用**:项目集、案例列表(3–5 张为宜)。
- **实现要点**:每张卡 `sticky top-24`,外层容器 `h-[85vh]`;缩放公式 `targetScale = 1 - (totalCards - 1 - index) * 0.03`(即每层小 3%),并给每张 `top: index * 28px` 的错位。用 `useScroll` + `useTransform` 驱动。
- **出处**:3D Jack Portfolio(Projects section)。

#### T-08 滚动驱动的横向 Marquee
- **效果**:两排图片随页面**纵向**滚动而**横向**反方向滑动。
- **适用**:logo 墙、作品缩略图墙。
- **实现要点**:`offset = (scrollY - sectionTop + innerHeight) * 0.3`;第一排 `translateX(offset - 200)`,第二排 `translateX(-(offset - 200))`;图片数组 **tripled**(复制三份)保证无缝;`will-change: transform`。
- **出处**:3D Jack Portfolio(Marquee section)。

### 2.3 光标交互类(Cursor)

#### T-09 光标聚光灯揭示(Cursor Spotlight Mask Reveal)
- **效果**:两张图叠放,第二张只在跟随光标的柔和圆形光斑内可见,像用手电筒照出另一个世界。**本次调研里最"高级"的单点技法**。
- **适用**:营销站首屏、需要"探索感"的品牌叙事。
- **实现要点**(Interactive Discovery 给了完整实现):
  - 半径常量 `SPOTLIGHT_R = 260`。
  - 鼠标位置**双缓冲 + lerp**:`smooth.x += (mouse.x - smooth.x) * 0.1`,在 rAF 里跑 —— **这 0.1 的插值系数就是"手感"的全部**,直接用 raw 坐标会显得机械、廉价。
  - 用隐藏 `<canvas>` 画一个**多停止点径向渐变**,再 `toDataURL()` 出图当作揭示层的 `mask-image`:
    ```
    0 → rgba(255,255,255,1)   0.4 → 1   0.6 → 0.75
    0.75 → 0.4   0.88 → 0.12  1 → 0
    ```
    注意 **0→0.4 是纯实心**,0.4 之后才开始羽化——这样光斑中心是"清晰的窗口"而不是一团糊。
- **成本警告**:每帧 `toDataURL()` 是很重的操作。移动端应直接禁用(触屏也没有 hover)。
- **出处**:Interactive Discovery(`RevealLayer`)。

#### T-10 磁吸元素(Magnetic Hover)
- **效果**:光标靠近某元素时,元素被"吸"向光标方向轻微位移;离开后弹回。
- **适用**:主 CTA 按钮、头像、logo。**用一次就够,用多了像果冻**。
- **实现要点**:检测光标是否进入元素外扩 `padding: 150px` 的判定区;位移 = (光标 - 元素中心) / `strength`(取 3,即最多位移距离的 1/3);**吸附与松开用不同缓动**:吸附 `transform 0.3s ease-out`(跟手),松开 `transform 0.6s ease-in-out`(慢慢回位)—— 这个不对称是关键。
- **出处**:3D Jack Portfolio(`Magnet` 组件)。

#### T-11 按钮内部形变(Morphing Pill Button)
- **效果**:胶囊按钮的白色底色块在 hover 时**从文字宽度伸展到整个按钮宽度**,同时右侧圆形图标向左平移 7px —— 按钮"吞掉"了自己的图标。
- **适用**:主 CTA。比"整体放大 1.05"高级得多。
- **实现要点**:底色块是独立的绝对定位 div,`width: calc(100% - 8px - 8px - 48px - 12px)` → hover 时 `width: calc(100% - 16px)`,`transition: width 0.4s cubic-bezier(0.25,0.46,0.45,0.94)`;圆形图标 `transform: translateX(-7px)`。
- **出处**:Vision Reveal(`.cta-btn`)。

### 2.4 材质与氛围类(Material)

#### T-12 Liquid Glass(液态玻璃)—— **MotionSites 的签名技法**
- **效果**:近乎透明的容器,靠一圈**上下亮、中间透明的渐变描边**和极轻的背景模糊来"显形"。它不靠背景色变白,而是靠**边缘的高光**。
- **适用**:导航胶囊、徽章、按钮、卡片。
- **实现要点**:这段 CSS 在 7 个 prompt 里**逐字重复出现了 4 次**(Stillmind / Celestial Renewal / Liquid Glass CTA / Wellness Companion / Orbis NFT),是该站的统一"设计原语":
  ```css
  .liquid-glass {
    background: rgba(255, 255, 255, 0.01);   /* 注意:1% 不是 10% */
    background-blend-mode: luminosity;
    backdrop-filter: blur(4px);              /* 只有 4px,不是 20px */
    border: none;                            /* 关键:不用 border */
    box-shadow: inset 0 1px 1px rgba(255,255,255,0.1);
  }
  .liquid-glass::before {                    /* 描边靠伪元素 + mask-composite */
    content:''; position:absolute; inset:0; border-radius:inherit; padding:1.4px;
    background: linear-gradient(180deg,
      rgba(255,255,255,0.45) 0%,  rgba(255,255,255,0.15) 20%,
      rgba(255,255,255,0)   40%,  rgba(255,255,255,0)    60%,
      rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
    pointer-events: none;
  }
  ```
  **三个反直觉的数值**,是它和"廉价玻璃拟态"的分界线:
  1. 背景只有 **1% 白**(不是常见的 10–20%),所以不糊底下的内容;
  2. 模糊只有 **4px**(强调版才 50px);
  3. **不用 `border`**,而用 `::before` + `mask-composite: exclude` 画一圈只有 1.4px、且**中间段完全透明**的渐变环 —— 模拟真实玻璃只有上下缘反光。
- **变体**:`.liquid-glass-selected`(选中态)= 背景提到 12% 白 + blur 8px + 描边 alpha 提到 0.6。**这是"选中"的正确表达:不是换颜色,是让玻璃变厚**。
- **出处**:Stillmind、Celestial Renewal、Liquid Glass CTA、Wellness Companion、Orbis NFT。

#### T-13 噪点纹理叠层(Noise / Grain Overlay)
- **效果**:全屏叠一层极细颗粒,消除数字渐变的"塑料感",让画面像胶片。
- **适用**:任何有大面积渐变或视频背景的深色页面。**性价比极高的"高级感"开关**。
- **实现要点**:两种做法都出现了——
  - SVG `feTurbulence` 内联 data URI:`baseFrequency: 0.85, numOctaves: 3`,配 `mix-blend-mode: overlay` + `opacity 0.7`(Prisma);
  - 位图 `texture.png` 全屏 `fixed`,`mix-blend-mode: lighten`,`opacity 0.6`,`z-50`,`pointer-events:none`(Orbis NFT)。
- **出处**:Orbis NFT、Prisma Creative Studio。

#### T-14 视频边缘渐隐(Video Edge Fade)
- **效果**:视频背景的上下各盖一条 200px 的 `black → transparent` 渐变,让视频"溶进"页面背景,而不是一个生硬的矩形。
- **适用**:任何嵌在页面中间的视频 section。**这是"视频看起来是设计的一部分"vs"视频看起来是贴上去的"的唯一区别**。
- **实现要点**:两个 `pointer-events-none` 的绝对定位 div,`z-[1]`(视频 `z-0`,内容 `z-10`)。
- **出处**:Liquid Glass CTA。

#### T-15 电影感换景(Cinematic Scene Switch)
- **效果**:4 个全屏视频叠放,只有 active 的 `opacity-100`,点击底部标签(Golden Hour / Still Water / Deep Woods / Quiet Dawn)交叉淡化换景;**且当切到浅色场景时,整层文字颜色会一起过渡到深色**。
- **适用**:氛围优先的品牌首屏。
- **实现要点**:
  - 交叉淡化 `transition-opacity duration-1000 ease-in-out`;
  - **必须有防抖**:`isTransitioning` 布尔量 + 1000ms 冷却,与 CSS 时长严格对齐,冷却期内忽略点击;
  - 文字变色用 **700ms**(比换景的 1000ms 快),所以文字先适应、背景后到位,观感上不会有一瞬间读不清;
  - 容器 `bg-black` 兜底,防止视频加载前白闪。
- **出处**:Stillmind。

#### T-16 持续微动(Idle Micro-Motion / "Train Bob")
- **效果**:前景 PNG 叠层(车窗框)持续 `translateY: 0 → -6px`,3s 一个来回,无限循环 —— 像列车轻微颠簸。
- **适用**:给"静止"的首屏一点**活着的心跳**,而不是死图。
- **实现要点**:位移只有 **6px**;必须同时给 `scale(1.03)`,否则运动时会露出图片边缘的空白。3s ease-in-out infinite。
- **出处**:Stillmind。

#### T-17 滑动确认(Slide-to-Confirm)
- **效果**:底部胶囊轨道 + 可拖拽白色圆钮,拖过 85% 才算确认,否则弹回。
- **适用**:移动端的"重要且不可撤销"操作。**它把一次点击变成一个有仪式感的动作**。
- **实现要点**:轨道 56px 高;拇指 44px(正好是 iOS 最小可点击尺寸);阈值 **85%**;未过阈值 snap back,过了 snap to end。右侧放 3 个透明度递增的 `ChevronRight`(白/40 → 白/50 → 白/60)作为方向暗示。
- **出处**:Wellness Companion。

### 2.5 排版类(Typography as Motion)

#### T-18 巨型视口字号(Viewport-Unit Display Type)
- **效果**:标题字号直接绑视口宽度(`text-[14vw]` ~ `text-[20vw]`),标题从边到边撑满。
- **实现要点**:必须配 `leading-none` / `leading-[0.85]` 和负字距 `tracking-[-0.07em]`;正文则用 `clamp(0.85rem, 1.6vw, 1.25rem)` 做流体字号。**大标题用 vw,正文用 clamp** —— 这是两套逻辑,不能混。
- **出处**:3D Jack(`text-[17.5vw]`)、Prisma(`text-[20vw]`, `tracking-[-0.07em]`)。

#### T-19 衬线斜体 + 无衬线 的二元字体系统
- **效果**:标题/品牌用衬线斜体(Instrument Serif italic / Playfair Display italic),正文用无衬线(Inter / Barlow / system-ui)。
- **观察**:**7 个 prompt 里 5 个用了这个组合,其中 Instrument Serif 出现 3 次**。这几乎是 2026 年"AI 高端站"的默认签名。它的作用是:用衬线体的**人味**去中和暗色科技感的**冷**。
- **实现要点**:字体必须在 prompt 里给出**完整的 Google Fonts `<link>` 代码**并指定权重/斜体轴(`ital@0;1`),否则 AI 会随便挑一个。
- **出处**:Stillmind、Celestial Renewal、Liquid Glass CTA、Interactive Discovery、Prisma。

#### T-20 混合样式的逐词上浮(WordsPullUp Multi-Style)
- **效果**:一句话里,部分词是常规无衬线,部分词是衬线斜体,整句逐词上浮入场(每词 stagger 0.08s)。
- **适用**:About / 自我介绍段落。**用字体切换来做"语气重音"**。
- **出处**:Prisma(`"I am Marcus Chen," / "a self-taught director."(italic serif) / "I have skills in…"`)。

### 2.6 可访问性(唯一一条,但必须有)

#### T-21 `prefers-reduced-motion` 降级
- **实现要点**:
  ```css
  @media (prefers-reduced-motion: reduce) {
    .hero-anim, .hero-zoom { animation: none; opacity: 1; }
  }
  ```
- **观察**:**7 个 prompt 里只有 1 个(Interactive Discovery)写了这一条**。这是 MotionSites 这类"炫技导向"prompt 库的系统性缺陷。**对念念这种日常工具,这条是必选项,不是加分项。**

---

## 三、高端 prompt 范式蒸馏(可复用模板)

### 3.1 观察到的共同结构

把 7 个 prompt 拆开对齐后,骨架高度一致,**顺序几乎不变**:

| 顺序 | 模块 | 出现率 | 说明 |
|---|---|---|---|
| 1 | **一句话定义**:做什么 + 给谁 + 技术栈 | 7/7 | `Build a X for Y using React + TS + Vite + Tailwind + Framer Motion + lucide-react`。**技术栈在第一句就钉死**,不留 AI 发挥空间。 |
| 2 | **字体系统**:字体名 + 完整 `<link>` + 用在哪 | 7/7 | 给到 `ital@0;1`、`wght@300;400;700` 这一层。并明确"标题用 A,正文用 B"。 |
| 3 | **颜色系统**:精确 hex | 7/7 | `#0C0C0C` / `#010828` / `#E1E0CC`。**从不写"深色背景"这种词**。 |
| 4 | **设计原语 / 自定义 CSS 类**:liquid-glass、noise-overlay、text-glow… | 6/7 | **整段 CSS 原样贴出**。这是"可复现"的核心。 |
| 5 | **资源清单**:视频/图片的**完整 URL** | 6/7 | 全部是真实可访问的 CDN 直链。 |
| 6 | **逐 section 描述**:结构 → 内容 → 样式 → 动效 | 7/7 | 每个 section 从 z-index 分层讲起。 |
| 7 | **动效规格**:关键帧 + 时长 + 缓动 + 延迟表 | 7/7 | 见下。 |
| 8 | **可复用组件契约**:props + 默认值 | 3/7 | 如 `FadeIn(delay, duration=0.7, x=0, y=30)`、`Magnet(padding=150, strength=3)`。 |
| 9 | **响应式规则**:断点 × 变化 的表格 | 7/7 | 常以 markdown 表格给出。 |
| 10 | **逐字文案**:所有 UI 文本原样列出 | 7/7 | 连版权行 `© 2026 Studio` 都给。 |

### 3.2 三条最关键的"手法"

**① 用数值,不用形容词。** 全篇没有一句"流畅的""优雅的""现代的"。取而代之的是 `translateY(16px)`、`0.5s`、`cubic-bezier(0.22,1,0.36,1)`、`delay 0.48s`、`opacity 0.2 → 1`、`SPOTLIGHT_R = 260`、`strength 3`、`85%`。**形容词是 prompt 的噪声;数值才是信号。**

**② 动效四件套永远齐全。** 每个动效必给:**关键帧(from/to)+ 时长 + 缓动曲线 + 延迟**。缺一不可。最常用的缓动只有 4 条,可以直接当调色板用:

| 曲线 | 值 | 用途 |
|---|---|---|
| easeOutExpo | `cubic-bezier(0.16, 1, 0.3, 1)` | 主标题入场、大位移(最"贵"的曲线) |
| easeOutQuint | `cubic-bezier(0.22, 1, 0.36, 1)` | 卡片/列表交错入场 |
| Tailwind 默认 | `cubic-bezier(0.4, 0, 0.2, 1)` | 菜单、通用过渡 |
| easeOutQuad-ish | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | 按钮 hover 形变 |

**③ 状态机与竞态被显式指定。** 不是"点击切换视频"就完了,而是"设 `isTransitioning`,1000ms 冷却,冷却内忽略点击,冷却时长必须等于 CSS 过渡时长"。**高质量 prompt 会替 AI 想清楚出错的路径。**

### 3.3 可复用模板

> 直接复制,填空即可。方括号 `[...]` 是待填项。

````markdown
# [组件/页面名] —— [一句话:给谁做什么]

Build a [页面类型] for [产品名 / 品类] using **React 18 + TypeScript + Vite + Tailwind CSS**,
**framer-motion** for animation and **lucide-react** for icons.
Match every detail below exactly. Do not invent values that are not specified.

## 1. Design System

### Fonts
- Display / Heading: **[字体名]** ([weights / ital 轴])
- Body / UI: **[字体名]** ([weights])
- Load in index.html:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=[...]&display=swap" rel="stylesheet">
  ```

### Colors (exact hex, no substitutions)
| Token | Hex | Usage |
|---|---|---|
| bg        | `#[...]` | 页面底色 |
| surface   | `#[...]` | 卡片 |
| primary   | `#[...]` | 主色 / CTA |
| text      | `#[...]` | 正文 |
| muted     | `#[...]` | 次要文字 |

### Spacing & Radius
- Base unit: 4px. Section padding: `py-[..] px-[..]`. Card radius: `rounded-[..]`.

### Type Scale
| Role | Size | Leading | Tracking | Weight |
|---|---|---|---|---|
| Display | `text-[..vw]` / `clamp(..)` | `leading-[0.9]` | `tracking-[-0.03em]` | 700 |
| H2 | ... | ... | ... | ... |
| Body | `clamp(0.9rem, 1.4vw, 1.05rem)` | `leading-relaxed` | 0 | 400 |
| Caption | ... | ... | ... | ... |

### Design Primitives (paste this CSS verbatim)
```css
/* [原语名,如 .soft-card / .liquid-glass] */
[整段 CSS,不要省略]
```

## 2. Motion Language  ← 这一节是本模板的核心,不要跳过

### Easing palette (use ONLY these)
- `--ease-entrance: cubic-bezier(0.16, 1, 0.3, 1);`   /* 入场、大位移 */
- `--ease-stagger:  cubic-bezier(0.22, 1, 0.36, 1);`  /* 列表交错 */
- `--ease-ui:       cubic-bezier(0.4, 0, 0.2, 1);`    /* 通用 UI 过渡 */
- `--ease-hover:    cubic-bezier(0.25, 0.46, 0.45, 0.94);` /* hover 形变 */

### Duration scale (use ONLY these)
- micro (hover / 状态切换): **150–200ms**
- standard (元素入场): **400–600ms**
- expressive (主标题 / 场景切换): **800–1200ms**

### Keyframes
```css
@keyframes fadeUp   { from{opacity:0; transform:translateY(16px);} to{opacity:1; transform:translateY(0);} }
@keyframes blurRise { from{opacity:0; transform:translateY(28px); filter:blur(12px);} to{opacity:1; transform:translateY(0); filter:blur(0);} }
[...]
```

### Stagger timeline (显式列出每个元素的 delay,不要写"依次")
| Element | Animation | Duration | Delay |
|---|---|---|---|
| [nav]     | fadeUp   | 0.5s | 0.10s |
| [heading] | blurRise | 1.1s | 0.25s |
| [card 1]  | fadeUp   | 0.5s | 0.40s |
| [card 2]  | fadeUp   | 0.5s | 0.48s |
| [cta]     | fadeUp   | 0.5s | 0.70s |

### Interaction feedback (每个可交互元素都要有明确的 3 态)
| Element | Hover | Active/Pressed | Disabled |
|---|---|---|---|
| Primary CTA | [具体形变,如底色块 width 伸展 0.4s] | `scale(0.95)` 100ms | opacity 0.4, no motion |
| Card | `translateY(-4px)` + shadow ↑, 200ms | `scale(0.98)` | — |

### Reduced motion (MANDATORY)
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition-duration: 0.01ms !important; }
}
```

## 3. Assets
| Slot | URL |
|---|---|
| [hero video] | `[完整 URL]` |
| [texture]    | `[完整 URL]` |

## 4. Sections (逐个描述:分层 → 结构 → 内容 → 动效)

### Section 1: [名称]
- **Container**: `[完整 className]`
- **Layers (by z-index)**:
  1. z-0  — [背景视频/图],`[属性]`
  2. z-10 — [遮罩/渐变]
  3. z-20 — [内容]
- **Content**:
  - Heading: text = "[逐字文案]", classes = `[...]`
  - Body: text = "[逐字文案]", classes = `[...]`
  - CTA: label = "[...]", classes = `[...]`
- **Motion**: [引用上面 Motion Language 里定义的动画名 + delay]
- **State machine**(若有交互): [state 变量、竞态处理、冷却时长必须与 CSS transition 时长一致]

### Section 2: [...]

## 5. Reusable Components (contract)
- `FadeIn({ children, delay=0, duration=0.5, y=16 })` — framer-motion `whileInView`,`viewport={{ once:true, amount:0 }}`
- `[其他]({ prop=default })` — [行为描述]

## 6. Responsive
| Breakpoint | [元素 A] | [元素 B] | [元素 C] |
|---|---|---|---|
| base (<640) | ... | ... | ... |
| sm | ... | ... | ... |
| md | ... | ... | ... |
| lg | ... | ... | ... |
- Use `100dvh` (not `100vh`) for full-height sections so mobile browser chrome doesn't clip.

## 7. Exact Copy (所有 UI 文案,一字不差)
- Heading: "[...]"
- Subtext: "[...]"
- Buttons: "[...]", "[...]"
````

### 3.4 反面清单(这些写法会让 prompt 质量崩掉)

- ❌ "make it smooth and modern" —— 零信息量。
- ❌ "add some nice animations" —— AI 会给你 `transition-all duration-300` 全家桶。
- ❌ 只说结构不说 z-index —— 叠层类效果(视频/遮罩/内容/纹理)必翻车。
- ❌ 说了动画不说缓动 —— 默认 `ease` 是廉价感的最大来源。
- ❌ 图片写 "a placeholder image" —— 高端站的关键就是**真实资源直链**。
- ❌ 只给 hover 不给 active —— 移动端没有 hover,点击将毫无反馈。

---

## 四、对念念 EchoEcho 的适配建议

### 4.0 先立判据

念念不是营销站,是 **每天用 3–10 次的日常工具**。所以动效的评价标准跟 MotionSites 上那些作品**完全不同**:

| | 营销落地页(MotionSites) | 念念(日常工具) |
|---|---|---|
| 生命周期 | 用户看 **1 次** | 用户看 **1000 次** |
| 动效目标 | 制造惊叹、拖住停留 | **不被注意到**,但让人觉得"这个 App 很稳、很暖" |
| 可接受时长 | 1000–1800ms | **≤ 300ms**(除仪式性时刻) |
| 失败代价 | 用户划走 | 用户**卸载**(每天被烦一次,一周就够了) |

**唯一判据:这个动效是在帮用户理解"发生了什么",还是在展示"我们会做动效"?** 后者一律砍掉。

念念的品牌资产已定(`BRAND.md`):暖珊瑚 `#E8604C`、暖纸 `#FAF6F0`、墨青 `#2C3A42`,logo 是**双圈回声波纹**,情绪基调"温暖、可靠、有点俏皮,不油腻"。下面所有建议都锚在这套资产上。

### 4.1 强烈推荐(直接抄,改数值即可)

#### ✅ A. 交错入场(T-01)—— 用在消息流首屏
- **为什么**:念念的主界面是一条"念念"消息流。一次性把 10 条卡片砸出来,和一条一条呼吸着浮现,情绪完全不同。后者会让人觉得"这些是被认真对待的话",前者只是"数据加载完了"。
- **具体参数(为念念调过,比 MotionSites 的更克制)**:
  - 位移 **12px**(不是 16px——移动端列表要更收敛)
  - 时长 **360ms**,缓动 `cubic-bezier(0.22, 1, 0.36, 1)`
  - stagger **50ms/条**,**最多只对首屏可见的前 6 条生效**,第 7 条起 delay 封顶
  - 二次进入(从详情页返回)**不重播**——用 `sessionStorage` 标记。日常工具最忌讳"每次进来都表演一遍"。

#### ✅ B. 模糊上浮(T-02)—— 只用在「回响仪式」这一个时刻
- **为什么**:PRD F-01 明确要求"办妥"时给发起方一个温柔的正反馈("你两周前提的床头灯,TA 办妥了")。这是产品里**唯一值得铺张的时刻**——男方的 Aha 指标(MARKET:7 天内办妥 2 件并收到回响)就挂在这。
- **具体**:通知文案从 `blur(8px) + translateY(20px)` 对焦浮现,**900ms**,`cubic-bezier(0.16,1,0.3,1)`。全 App 只有这一处允许超过 300ms。
- **配套**:PRD 已写的"卡片翻面动效"——建议用 3D `rotateY` 但**限制在 180° 单次翻转,600ms**,翻面后正面是"办妥 + 一句交待"。不要做连续翻转、不要做粒子。

#### ✅ C. 微动反馈三态(T-11 的克制版)—— 用在所有可点元素
- **为什么**:念念的核心动作是「按住说话」和「三态流转」。**触摸反馈是移动端信任感的地基**——按下去没反应的按钮,用户会怀疑消息没发出去。
- **具体**:
  - `:active` 一律 `scale(0.96)`,**120ms**,`cubic-bezier(0.4, 0, 0.2, 1)`。全 App 统一。
  - 「按住说话」按钮:按下后**暖珊瑚色的双圈波纹向外扩散**(直接复用 logo 语言!),`scale(1) → scale(1.6)` + `opacity 1 → 0`,1.2s infinite。这是**唯一一个允许无限循环的动效**,因为它在传达"我正在听"这个必要的状态信息。
  - 松手时波纹**收敛**回中心(200ms),给一个明确的"停止收音"确认。

#### ✅ D. 状态机与竞态显式化(T-15 的方法论,不是它的效果)
- **为什么**:三态流转(收到→在办→办妥)是念念的产品核心。**状态切换动画期间必须锁住重复点击**——否则用户连点两下,"在办"跳到"办妥"再跳回,这是灾难性的信任损失(尤其在弱网下)。
- **具体**:任何状态变更按钮,动画时长 = 冷却时长 = **250ms**,冷却期内 `pointer-events: none` + 视觉上 `opacity: 0.6`。**这条不是审美问题,是正确性问题。**

#### ✅ E. `prefers-reduced-motion` 全局降级(T-21)
- **为什么**:念念的用户里有 ADHD 倾向的执行方(persona:大鹏)。**动效对这类用户可能是负担而不是愉悦**。这是产品价值观问题,不是技术细节。
- **具体**:全局兜底 + 逐个动效检查。**这一条必须在 v1.1 就落地,不能拖。**

#### ✅ F. 二元字体系统(T-19 的思路,不是它的字体)
- **为什么**:念念需要"温暖但可靠"。纯无衬线 = 冷、工具感;全衬线 = 文艺、不专业。
- **具体建议**:**数字与状态标签用圆润无衬线**(BRAND.md 已定"圆润数字"),**「念念」原文引用用一款有人味的字体**(如思源宋体 / 霞鹜文楷),这样"她说的话"和"系统的话"在视觉上就分层了 —— **这本身就是产品叙事**。这比任何动效都有情绪价值。

### 4.2 谨慎使用(有条件)

#### ⚠️ G. Liquid Glass(T-12)—— 只允许出现在"浮在内容之上"的元素
- **可以**:底部输入栏(悬浮在消息流之上)、顶部导航条。这两处玻璃是**功能性的**——它告诉用户"下面还有内容,你在往上滚"。
- **不可以**:消息卡片本身。念念的卡片承载的是**必须读清楚的文字**(她说的话、他的交待),玻璃拟态会降低对比度。
- **且必须改**:MotionSites 的 liquid-glass 是**给深色背景设计的**(白色高光描边)。念念是**暖纸底色 `#FAF6F0`**,直接抄会完全看不见。必须重做成"暖白玻璃":
  ```css
  .warm-glass {
    background: rgba(250, 246, 240, 0.72);   /* 暖纸色,72% 而非 1% —— 浅色背景必须靠不透明度显形 */
    backdrop-filter: blur(16px) saturate(1.1);
    box-shadow: 0 -1px 0 rgba(255,255,255,0.8) inset,  /* 上缘高光 */
                0 -8px 24px rgba(44, 58, 66, 0.06);    /* 墨青的极淡投影 */
  }
  ```
  **关键认知:玻璃拟态在深色底上靠"边缘高光"显形,在浅色底上必须靠"不透明度 + 投影"显形。这两套是完全不同的配方,不能互抄。**

#### ⚠️ H. 视差(T-05)—— 只在「回响时刻」的全屏庆祝页用,主界面禁用
- 消息流里做视差 = 滚动时文字在飘 = 读不清 = 灾难。
- 但"办妥"后的那一个全屏瞬间,允许双圈波纹以不同 lerp factor(0.06 / 0.03)扩散,做出深度感。**一次性、可跳过、不阻塞。**

#### ⚠️ I. 噪点纹理(T-13)—— 极低强度,静态叠加
- 暖纸底色 `#FAF6F0` 加一层 **opacity 0.03** 的噪点,能让它从"惨白"变成"纸"。这与品牌"暖纸"的命名完全一致。
- **但**:必须是**静态 CSS 层,不能有动画**,且 `pointer-events: none`。不要用 `mix-blend-mode: lighten`(那是深色底的做法),用 `multiply` 或直接 `opacity`。

### 4.3 坚决不要用(红线)

| # | 技法 | 为什么对念念是错的 |
|---|---|---|
| ❌ 1 | **3D 模型 / 磁吸光标(T-10)/ WebGL** | 移动端 PWA,首屏预算以 KB 计。3D 是**纯成本**——它不传达任何产品信息,只传达"我们花了钱"。且磁吸依赖 hover,**触屏根本没有 hover**。 |
| ❌ 2 | **光标聚光灯揭示(T-09)** | 同上,依赖鼠标。且每帧 `canvas.toDataURL()` 会让中端安卓机烫手。念念的用户在通勤路上单手用它。 |
| ❌ 3 | **深色玻璃拟态用在消息卡片上** | 直接和可读性冲突。她凌晨发的"记得买胃药"必须一眼看清,不能隔着毛玻璃。**这是产品的道德底线,不是审美偏好。** |
| ❌ 4 | **遮罩条开幕 / Splash(T-04)** | 每次冷启动看一遍幕布拉开,第三天就是酷刑。日常工具的正确开场是**瞬间可用**。 |
| ❌ 5 | **粘性卡片堆叠(T-07)** | 它把"列表"变成了"表演"。念念的列表用户是来**找一条具体的念念**的,堆叠会让扫读变成翻页。 |
| ❌ 6 | **滚动横向 Marquee(T-08)** | 无信息量的运动 = 视觉噪声。 |
| ❌ 7 | **逐字滚动显影(T-06)用在念念正文** | **严重危险**:她说的话是**指令**,不是**文案**。让指令"慢慢显影"= 用户必须等它显影完才能读 = 直接对抗产品的核心价值(不遗漏、不误读)。 |
| ❌ 8 | **无限循环的装饰动效** | 唯一例外是"正在录音"的波纹(它在传达状态)。其余任何 `infinite` 动画,在一个用户每天盯 10 次的界面上,都是慢性折磨。 |
| ❌ 9 | **任何"进度/排名/评分"的动效强化** | PRD 已明确废弃 KPI 机制(三红线:不做 KPI、不做监工)。**不要用动效去强化一个产品上已经决定不做的东西** —— 比如给"办妥率"做一个满意的环形进度动画,那会把废弃的东西从后门放回来。 |

### 4.4 落地优先级(给 v1.1)

| 优先级 | 事项 | 工作量 | 依据 |
|---|---|---|---|
| **P0** | 全局 `prefers-reduced-motion` 降级 | S | 4.1-E,价值观红线 |
| **P0** | 统一 `:active scale(0.96) / 120ms` 触摸反馈 | S | 4.1-C,信任地基 |
| **P0** | 状态切换动画期锁重复点击(250ms 冷却) | S | 4.1-D,正确性问题 |
| **P0** | 「按住说话」双圈波纹(复用 logo 语言) | M | 4.1-C,核心交互 |
| **P1** | 「回响仪式」模糊上浮 + 卡片翻面 | M | 4.1-B,PRD F-01,男方 Aha |
| **P1** | 消息流交错入场(50ms,首屏 6 条,不重播) | S | 4.1-A |
| **P2** | 暖白玻璃(warm-glass)输入栏 / 导航条 | S | 4.2-G |
| **P2** | 暖纸噪点纹理(opacity 0.03,静态) | S | 4.2-I |
| **P2** | 「她的话」用宋体/文楷,系统话用无衬线 | S | 4.1-F,叙事分层 |

### 4.5 念念的 Motion Language(可直接贴进未来的设计 prompt)

```css
/* ===== 念念 EchoEcho · Motion Tokens v1.0.0 ===== */
:root {
  /* Easing —— 只用这三条 */
  --ease-warm:    cubic-bezier(0.22, 1, 0.36, 1);      /* 入场、交错。温柔收敛 */
  --ease-ui:      cubic-bezier(0.4, 0, 0.2, 1);        /* 通用过渡 */
  --ease-ritual:  cubic-bezier(0.16, 1, 0.3, 1);       /* 仅限「回响仪式」 */

  /* Duration —— 只用这四档 */
  --dur-touch:   120ms;   /* 按下反馈 */
  --dur-ui:      200ms;   /* 状态切换、hover */
  --dur-enter:   360ms;   /* 元素入场 */
  --dur-ritual:  900ms;   /* 仅限「办妥→回响」 */

  /* Stagger */
  --stagger: 50ms;        /* 列表逐条,首屏 6 条封顶 */

  /* Motion 位移 —— 克制 */
  --shift-enter: 12px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**一句话总结念念的动效哲学**:MotionSites 上的作品在用动效说「看我多厉害」;念念的动效只该说一句话 —— **「我听见了,我记住了,我在办。」**

---

## 附录:调研可回溯性

- **站点数据源**:Supabase(`xgdzyqfalbibzelpdpvr.supabase.co`),作品表 `prompts`,prompt 原文出口是 Edge Function `get-prompt`(入参 `{prompt_id}`)。
- **免费/付费判定**:`prompts.is_free` 字段;免费池实测 **116** 条;付费作品 `get-prompt` 返回 `{"code":"paid_only", "individual_price_cents":1400}`。
- **本文 7 个 prompt 的 id**:`stillmind`、`3d-jack-portfolio-hero`、`interactive-discovery`、`celestial-renewal`、`liquid-glass-cta`、`wellness-companion`、`orbis-nft-landing`。全部 `is_free=true`。
- **视觉观察**:预览媒体来自 `pub-86dc5b5484314368ac5436a674b0d919.r2.dev`,用 ffmpeg 每 60 帧抽一帧拼成序列图后读图确认动效。
- **未获取内容**:所有 Premium 作品的 prompt 原文(付费墙,未绕过,未编造)。
