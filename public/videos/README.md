# 🎥 Festival Video Placement & Optimization Guide

This directory (/public/videos/) is pre-configured with high-performance lazy loading, progressive streaming, and adaptive mobile delivery for your 200 MB high-quality video.

---

### 1. Quick Setup (Direct 200 MB Video Usage)

Place your video file directly into this folder named:
- **ganesh_festival_2026_hq.mp4** (or change the filename in src/components/Festival/FestivalVideo.tsx)

The built-in <OptimizedVideoPlayer />:
- Will **never load the 200 MB video on initial page load**.
- Displays a lightweight, instant poster/thumbnail.
- Observes the user's scroll position with an IntersectionObserver (250px rootMargin) and only begins loading when the section is approached.
- Uses preload="none" and playsinline.
- Streams progressively using standard HTTP Range byte-requests (allowing users to watch instantly without waiting for 200 MB to download).

---

### 2. Recommended: Generate Fast Mobile & Desktop Streams with FFmpeg (Optional but Recommended)

To ensure users scanning the QR code on mobile devices experience instant, buffer-free playback without consuming large cellular data, you can run these standard FFmpeg commands to generate lightweight, high-quality streams:

#### A. Mobile Stream (720p, High Quality, FastStart MOOV atom):
`ash
ffmpeg -i your_200mb_video.mp4 -c:v libx264 -crf 23 -preset slow -vf "scale=-2:720" -c:a aac -b:a 128k -movflags +faststart public/videos/ganesh_festival_mobile.mp4
`

#### B. Desktop Stream (1080p, High Definition, FastStart):
`ash
ffmpeg -i your_200mb_video.mp4 -c:v libx264 -crf 20 -preset slow -vf "scale=-2:1080" -c:a aac -b:a 192k -movflags +faststart public/videos/ganesh_festival_desktop.mp4
`

#### C. Adaptive HLS Multi-Bitrate Streaming (Optional):
`ash
ffmpeg -i your_200mb_video.mp4 -codec: copy -start_number 0 -hls_time 6 -hls_list_size 0 -f hls public/videos/master.m3u8
`

---

### 3. Verification Checklist Completed
- [x] Initial page load is fast & lightweight (0 MB video loaded on startup)
- [x] Lazy loading with IntersectionObserver (triggers 250px before entering viewport)
- [x] Instant lightweight poster rendering with zero layout shifts
- [x] preload="none" and playsinline configured
- [x] Safe muted audio handling (avoids loud autoplay)
- [x] Responsive <source> tags for mobile and desktop viewports
- [x] FastStart progressive byte-range playback
- [x] Intact AR experience, animations, navigation, and festival components
