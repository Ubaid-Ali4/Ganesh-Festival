import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Film, Loader2 } from 'lucide-react';

export interface VideoSources {
  posterUrl: string;
  hlsStreamUrl?: string;
  mobileVideoUrl?: string;
  desktopVideoUrl?: string;
  highQualitySourceUrl?: string;
  title?: string;
  subtitle?: string;
}

interface OptimizedVideoPlayerProps {
  sources: VideoSources;
  className?: string;
}

export const OptimizedVideoPlayer: React.FC<OptimizedVideoPlayerProps> = ({
  sources,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // States
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [showControls, setShowControls] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  // References to keep event handlers and observers stable without re-renders
  const isUserMutedPrefRef = useRef<boolean | null>(null); // tracks if user explicitly chose sound on/off
  const isInViewRef = useRef<boolean>(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Helper: Play video safely with current sound preferences
  const playVideo = useCallback(async () => {
    if (!videoRef.current) return;
    try {
      // If user hasn't explicitly unmuted yet, keep muted for browser autoplay compliance
      if (isUserMutedPrefRef.current === null || isUserMutedPrefRef.current === true) {
        videoRef.current.muted = true;
        setIsMuted(true);
      } else {
        videoRef.current.muted = false;
        videoRef.current.volume = 1.0;
        setIsMuted(false);
      }

      await videoRef.current.play();
      setIsPlaying(true);
      setHasStarted(true);
    } catch (err) {
      // If browser blocked unmuted autoplay, fallback to muted autoplay
      if (videoRef.current) {
        videoRef.current.muted = true;
        setIsMuted(true);
        videoRef.current.play().then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        }).catch(() => {});
      }
    }
  }, []);

  // Helper: Pause video safely
  const pauseVideo = useCallback(() => {
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  // 1. In-Focus & Out-of-Focus Viewport Observer (Play on focus, pause on out-of-focus)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          isInViewRef.current = true;
          setIsNearViewport(true);
          playVideo();
        } else if (!entry.isIntersecting || entry.intersectionRatio < 0.2) {
          isInViewRef.current = false;
          pauseVideo();
        }
      },
      {
        rootMargin: '100px 0px',
        threshold: [0, 0.3, 0.6],
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [playVideo, pauseVideo]);

  // 2. Tab Visibility & Window Focus: Pause when user switches away, resume when returning
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseVideo();
      } else {
        if (isInViewRef.current) {
          playVideo();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleVisibilityChange);
    window.addEventListener('focus', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleVisibilityChange);
      window.removeEventListener('focus', handleVisibilityChange);
    };
  }, [playVideo, pauseVideo]);

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // 3. Optimal source based on viewport
  const getOptimalSource = useCallback(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    if (isMobile && sources.mobileVideoUrl) {
      return sources.mobileVideoUrl;
    }
    return sources.desktopVideoUrl || sources.highQualitySourceUrl || sources.mobileVideoUrl || '';
  }, [sources]);

  // 4. Robust Audio Mute / Unmute Handler
  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;

    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    videoRef.current.volume = 1.0;
    setIsMuted(nextMuted);
    isUserMutedPrefRef.current = nextMuted;

    // When unmuting, ensure audio plays
    if (!nextMuted && videoRef.current.paused) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setHasStarted(true);
      }).catch(() => {});
    }
  };

  // Center Play Button clicked by user (Explicit gesture -> unmute and play)
  const handleUserPlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    // Unmute on explicit user play click
    isUserMutedPrefRef.current = false;
    videoRef.current.muted = false;
    videoRef.current.volume = 1.0;
    setIsMuted(false);

    setIsLoading(true);
    videoRef.current.play().then(() => {
      setIsPlaying(true);
      setHasStarted(true);
    }).catch(() => {
      // If browser prevents audio, play muted
      if (videoRef.current) {
        videoRef.current.muted = true;
        setIsMuted(true);
        videoRef.current.play().catch(() => {});
      }
    }).finally(() => {
      setIsLoading(false);
    });
  };

  // Toggle Play / Pause from controls
  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      playVideo();
    } else {
      pauseVideo();
    }
  };

  // Fullscreen
  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  // Progress update
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;
    if (total > 0) {
      setProgress((current / total) * 100);
      setCurrentTime(formatTime(current));
    }
  };

  // Handle loaded metadata & calculate exact aspect ratio
  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(formatTime(videoRef.current.duration));
    if (videoRef.current.videoWidth && videoRef.current.videoHeight) {
      setAspectRatio(videoRef.current.videoWidth / videoRef.current.videoHeight);
    }
    setIsLoading(false);

    // If currently in focus, trigger playback
    if (isInViewRef.current && videoRef.current.paused) {
      playVideo();
    }
  };

  // Seek on timeline
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * videoRef.current.duration;
    if (!isNaN(newTime) && isFinite(newTime)) {
      videoRef.current.currentTime = newTime;
      setProgress(pos * 100);
    }
  };

  // Controls auto-hide
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  const optimalSource = getOptimalSource();

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchStart={handleMouseMove}
      style={aspectRatio ? { aspectRatio: `${aspectRatio}` } : { aspectRatio: '16/9' }}
      className={`relative w-full max-h-[75vh] rounded-3xl overflow-hidden glass-panel border border-[#F5B83D]/35 shadow-2xl bg-[#120B0A] select-none group mx-auto flex items-center justify-center transition-all duration-300 ${className}`}
    >
      {/* 1. Lightweight Poster / Thumbnail Layer */}
      <img
        src={sources.posterUrl}
        alt={sources.title || 'Festival Video Preview'}
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 pointer-events-none ${
          hasStarted && isPlaying ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Atmospheric ambient gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-[#120B0A]/85 via-transparent to-black/30 transition-opacity duration-500 pointer-events-none ${
          hasStarted && isPlaying && !showControls ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* 2. HTML5 Video Element (Fits exact container aspect ratio with zero distortion) */}
      {isNearViewport && (
        <video
          ref={videoRef}
          preload="metadata"
          playsInline
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onWaiting={() => setIsLoading(true)}
          onPlaying={() => {
            setIsLoading(false);
            setIsPlaying(true);
            setHasStarted(true);
          }}
          onPause={() => setIsPlaying(false)}
          onEnded={() => {
            setIsPlaying(false);
            setHasStarted(false);
          }}
          onError={() => {
            setIsLoading(false);
            setLoadError(true);
          }}
          className="absolute inset-0 w-full h-full object-cover rounded-3xl"
        >
          {sources.hlsStreamUrl && (
            <source src={sources.hlsStreamUrl} type="application/x-mpegURL" />
          )}
          {sources.mobileVideoUrl && (
            <source
              media="(max-width: 768px)"
              src={sources.mobileVideoUrl}
              type="video/mp4"
            />
          )}
          {sources.desktopVideoUrl && (
            <source
              media="(min-width: 769px)"
              src={sources.desktopVideoUrl}
              type="video/mp4"
            />
          )}
          {optimalSource && <source src={optimalSource} type="video/mp4" />}
          Your browser does not support the video tag.
        </video>
      )}

      {/* 3. Center Initial Play Button (Clicking directly unmutes & plays) */}
      {!hasStarted && !isPlaying && (
        <div
          onClick={handleUserPlayClick}
          className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer z-20 group/btn bg-black/25"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#F5B83D] via-[#FFD066] to-[#E88918] text-[#120B0A] flex items-center justify-center shadow-2xl shadow-[#F5B83D]/40 group-hover/btn:scale-110 active:scale-95 transition-all duration-300">
            {isLoading ? (
              <Loader2 className="w-8 h-8 animate-spin" />
            ) : (
              <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
            )}
          </div>

          {sources.title && (
            <div className="mt-4 text-center px-4 max-w-lg">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4A1018]/85 border border-[#F5B83D]/40 text-xs font-semibold text-[#F5B83D] mb-1.5 shadow-md">
                <Film className="w-3.5 h-3.5" />
                <span>Watch Campus Darshan</span>
              </span>
              <h3 className="text-base sm:text-xl font-bold font-heading text-[#FFF4DC] drop-shadow-md">
                {sources.title}
              </h3>
              {sources.subtitle && (
                <p className="text-xs sm:text-sm text-[#F5B83D]/90 mt-0.5 drop-shadow-sm">
                  {sources.subtitle}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* 4. Floating Unmute Badge (Appears when video autoplays in focus with muted audio) */}
      {hasStarted && isPlaying && isMuted && (
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 z-30 px-3.5 py-2 rounded-full bg-[#120B0A]/90 hover:bg-[#4A1018] border border-[#F5B83D]/60 text-xs font-semibold text-[#F5B83D] flex items-center gap-2 shadow-2xl backdrop-blur-md cursor-pointer transition-all active:scale-95 hover:scale-105 animate-pulse"
        >
          <VolumeX className="w-4 h-4 text-[#F5B83D]" />
          <span>Tap for Sound 🔊</span>
        </button>
      )}

      {/* 5. Loading Spinner for Buffering */}
      {isLoading && hasStarted && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 bg-black/30 backdrop-blur-xs">
          <div className="p-3.5 rounded-2xl bg-[#120B0A]/80 border border-[#F5B83D]/30 flex items-center gap-2.5 text-xs text-[#F5B83D]">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Streaming in HD...</span>
          </div>
        </div>
      )}

      {/* 6. Custom Sleek Video Controls Bar */}
      {hasStarted && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-[#120B0A] via-[#120B0A]/85 to-transparent transition-opacity duration-300 z-30 ${
            showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Progress / Seek bar */}
          <div
            onClick={handleSeek}
            className="w-full h-1.5 sm:h-2 bg-white/20 hover:h-2.5 rounded-full mb-3 cursor-pointer relative group/bar transition-all"
          >
            <div
              className="h-full bg-gradient-to-r from-[#F5B83D] to-[#E88918] rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md scale-0 group-hover/bar:scale-100 transition-transform" />
            </div>
          </div>

          {/* Bottom Controls Row */}
          <div className="flex items-center justify-between gap-3 text-xs text-[#FFF4DC]">
            <div className="flex items-center gap-3">
              {/* Play / Pause */}
              <button
                onClick={togglePlay}
                className="p-1.5 rounded-lg hover:bg-white/10 text-[#F5B83D] transition-colors cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
              </button>

              {/* Mute / Unmute */}
              <button
                onClick={toggleMute}
                className="p-1.5 rounded-lg hover:bg-white/10 text-[#FFF4DC] hover:text-[#F5B83D] transition-colors cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-[#F5B83D]" /> : <Volume2 className="w-4 h-4 text-[#F5B83D]" />}
              </button>

              {/* Time Display */}
              <div className="text-[11px] sm:text-xs text-[#FFF4DC]/80 font-mono">
                <span>{currentTime}</span> / <span>{duration}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Quality Indicator Badge */}
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-md bg-[#4A1018] border border-[#F5B83D]/30 text-[10px] font-bold text-[#F5B83D]">
                HD Progressive
              </span>

              {/* Fullscreen Button */}
              <button
                onClick={handleFullscreen}
                className="p-1.5 rounded-lg hover:bg-white/10 text-[#FFF4DC] hover:text-[#F5B83D] transition-colors cursor-pointer"
                title="Fullscreen"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Graceful Fallback if File is missing or URL fails */}
      {loadError && (
        <div className="absolute inset-0 bg-[#120B0A]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-25">
          <Film className="w-8 h-8 text-[#E88918] mb-2" />
          <h4 className="text-sm font-bold text-[#FFF4DC] mb-1">
            Video Source Ready for Streaming
          </h4>
          <p className="text-xs text-[#FFF4DC]/70 max-w-sm mb-3">
            Place your optimized progressive MP4 / HLS video file in your assets or public directory to stream instantly.
          </p>
          <button
            onClick={() => {
              setLoadError(false);
              setHasStarted(false);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-[#4A1018] border border-[#F5B83D]/40 text-xs font-semibold text-[#F5B83D] hover:bg-[#4A1018]/80 cursor-pointer"
          >
            Retry Preview
          </button>
        </div>
      )}
    </div>
  );
};
