import React, { useEffect, useRef, useState } from 'react';
import { Film, Volume2, VolumeX, Play, Pause } from 'lucide-react';

const YOUTUBE_VIDEO_ID = 'gF2M6vvQnXw';

export const FestivalVideo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // States
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const isInViewRef = useRef<boolean>(false);
  const isUserMutedPrefRef = useRef<boolean | null>(null);

  // Helper to send postMessage commands to YouTube IFrame API
  const sendYouTubeCommand = (func: string, args: unknown[] = []) => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;
    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({
        event: 'command',
        func,
        args,
      }),
      '*'
    );
  };

  // 1. Play video helper
  const playVideo = () => {
    sendYouTubeCommand('playVideo');
    setIsPlaying(true);

    if (isUserMutedPrefRef.current === false) {
      sendYouTubeCommand('unMute');
      sendYouTubeCommand('setVolume', [100]);
      setIsMuted(false);
    }
  };

  // 2. Pause video helper
  const pauseVideo = () => {
    sendYouTubeCommand('pauseVideo');
    setIsPlaying(false);
  };

  // 3. Viewport Focus: Autoplay when scrolled into view, pause when scrolled away
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          isInViewRef.current = true;
          playVideo();
        } else if (!entry.isIntersecting || entry.intersectionRatio < 0.15) {
          isInViewRef.current = false;
          pauseVideo();
        }
      },
      {
        rootMargin: '100px 0px',
        threshold: [0, 0.25, 0.6],
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // 4. Tab Visibility: Pause when inactive, resume when active
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        pauseVideo();
      } else if (isInViewRef.current) {
        playVideo();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('blur', handleVisibility);
    window.addEventListener('focus', handleVisibility);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('blur', handleVisibility);
      window.removeEventListener('focus', handleVisibility);
    };
  }, []);

  // 5. Global One-Time Interaction: Unlock Audio on First User Touch or Tap
  useEffect(() => {
    const handleFirstGesture = () => {
      isUserMutedPrefRef.current = false;
      sendYouTubeCommand('unMute');
      sendYouTubeCommand('setVolume', [100]);
      setIsMuted(false);
    };

    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true, passive: true });

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };
  }, []);

  // Audio Mute / Unmute Toggle
  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    const nextMuted = !isMuted;
    isUserMutedPrefRef.current = nextMuted;

    if (nextMuted) {
      sendYouTubeCommand('mute');
      setIsMuted(true);
    } else {
      sendYouTubeCommand('unMute');
      sendYouTubeCommand('setVolume', [100]);
      setIsMuted(false);

      if (!isPlaying) {
        sendYouTubeCommand('playVideo');
        setIsPlaying(true);
      }
    }
  };

  // Play / Pause Toggle
  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (isPlaying) {
      pauseVideo();
    } else {
      isUserMutedPrefRef.current = false;
      sendYouTubeCommand('unMute');
      sendYouTubeCommand('setVolume', [100]);
      setIsMuted(false);
      playVideo();
    }
  };

  return (
    <section id="video" className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E88918]/15 border border-[#E88918]/30 text-xs font-semibold text-[#E88918] mb-3">
          <Film className="w-3.5 h-3.5" />
          <span>CAMPUS FESTIVAL DARSHAN</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[#FFF4DC] mb-3">
          🎥 Campus Darshan
        </h2>
        <p className="text-sm sm:text-base text-[#FFF4DC]/80">
          Experience the divine atmosphere, campus utsav celebrations, and sacred darshan of Lord Ganesha in crystal-clear high definition.
        </p>
      </div>

      {/* Vertical Video Card Container (Sleek 9:16 Mobile Reel Frame) */}
      <div ref={containerRef} className="mx-auto my-6 max-w-xs sm:max-w-sm px-2">
        <div className="relative overflow-hidden rounded-3xl border-2 border-[#F5B83D]/40 bg-black/90 shadow-[0_0_35px_rgba(245,184,61,0.25)] backdrop-blur-md group">
          {/* 9:16 Aspect Ratio Frame */}
          <div style={{ padding: '177.78% 0 0 0', position: 'relative' }}>
            <iframe
              ref={iframeRef}
              src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&playsinline=1&rel=0&modestbranding=1&controls=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
              title="Ganesh Festival ACET - Campus Darshan"
            />
          </div>

          {/* Interactive Floating Sound Toggle Badge */}
          <div className="absolute top-3.5 right-3.5 z-30 flex items-center gap-2">
            <button
              onClick={toggleMute}
              className={`px-3.5 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 shadow-2xl backdrop-blur-md transition-all active:scale-95 cursor-pointer ${
                isMuted
                  ? 'bg-[#120B0A]/90 border-[#F5B83D]/60 text-[#F5B83D] animate-pulse hover:bg-[#4A1018]'
                  : 'bg-[#4A1018]/90 border-[#F5B83D] text-[#FFF4DC]'
              }`}
              title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-[#F5B83D]" /> : <Volume2 className="w-4 h-4 text-[#F5B83D]" />}
              <span>{isMuted ? 'Tap for Sound 🔊' : 'Sound On 🔊'}</span>
            </button>
          </div>

          {/* Bottom Mini Play/Pause Indicator Toggle */}
          <div className="absolute bottom-3 left-3 z-30">
            <button
              onClick={togglePlay}
              className="p-2.5 rounded-full bg-[#120B0A]/85 hover:bg-[#4A1018] border border-[#F5B83D]/50 text-[#F5B83D] shadow-lg backdrop-blur-md transition-all active:scale-95 cursor-pointer"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
