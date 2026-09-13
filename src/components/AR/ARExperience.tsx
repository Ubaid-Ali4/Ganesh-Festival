import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  ArrowLeft,
  Camera,
  Volume2,
  VolumeX,
  Sparkles,
  Sliders,
  RotateCcw,
  Share2,
  AlertTriangle,
  Flame,
  Flower2,
  Eye,
} from 'lucide-react';
import { WebARTracker, TrackingAnalysisResult } from '../../utils/arTracking';
import { AREffectRenderer } from '../../utils/arRenderer';
import { audioService } from '../../utils/audio';
import { AREffectToggles, TrackingState } from '../../types';
import { PhotoResultModal } from './PhotoResultModal';
import digitalIdolBg from '../../assets/images/ganpati_digital_idol_1789118075314.jpg';

interface ARExperienceProps {
  onExit: () => void;
  onOpenFestival: () => void;
}

export const ARExperience: React.FC<ARExperienceProps> = ({ onExit }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const trackerRef = useRef<WebARTracker>(new WebARTracker());
  const rendererRef = useRef<AREffectRenderer>(new AREffectRenderer());
  const animFrameIdRef = useRef<number | null>(null);

  // AR States
  const [trackingState, setTrackingState] = useState<TrackingState>('searching');
  const [guidanceText, setGuidanceText] = useState('🔍 Looking for Bappa...');
  const [isLowLight, setIsLowLight] = useState(false);
  const [detectionProgress, setDetectionProgress] = useState(0);
  const [showWowBanner, setShowWowBanner] = useState(false);

  // Camera settings
  const [cameraFacing, setCameraFacing] = useState<'environment' | 'user'>('environment');
  const [hasCameraError, setHasCameraError] = useState<string | null>(null);
  const [isSimulatedTarget, setIsSimulatedTarget] = useState(false);

  // UI Panels
  const [showEffectsDrawer, setShowEffectsDrawer] = useState(false);
  const [capturedPhotoUrl, setCapturedPhotoUrl] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isMuted, setIsMuted] = useState(audioService.getIsMuted());

  // Effect toggles (Section 15)
  const [toggles, setToggles] = useState<AREffectToggles>({
    petals: true,
    diyas: true,
    particles: true,
    mandala: true,
    om: true,
    aura: true,
    sound: true,
  });

  // Start video stream
  const startCamera = useCallback(async () => {
    setHasCameraError(null);
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setHasCameraError('Camera API is not supported on this browser.');
      return;
    }

    try {
      if (videoRef.current && videoRef.current.srcObject) {
        const currentStream = videoRef.current.srcObject as MediaStream;
        currentStream.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: cameraFacing,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(() => {});
          if (videoRef.current) {
            trackerRef.current.setVideo(videoRef.current);
          }
        };
      }
    } catch (err: unknown) {
      const error = err as Error;
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setHasCameraError('Camera permission was denied. Please allow camera access in browser settings.');
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        setHasCameraError('No camera found on this device. You can use Simulated Idol mode to test AR.');
      } else {
        setHasCameraError(`Unable to start camera: ${error.message || 'Unknown error'}`);
      }
    }
  }, [cameraFacing]);

  useEffect(() => {
    startCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [startCamera]);

  // Main AR Render & Tracking Loop (60 FPS)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let targetDetectedTimer: ReturnType<typeof setTimeout> | null = null;
    let localDetectionProgress = 0;

    const renderLoop = () => {
      // Auto-resize canvas to match container exactly
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (canvas.width !== rect.width || canvas.height !== rect.height) {
          canvas.width = rect.width;
          canvas.height = rect.height;
        }
      }

      // Step 1: Run WebAR Computer Vision Tracking
      const analysis: TrackingAnalysisResult = trackerRef.current.analyzeFrame(isSimulatedTarget);

      setTrackingState(analysis.state);
      setGuidanceText(analysis.guidanceText);
      setIsLowLight(analysis.isLowLight);

      // WOW Sequence Transition Management (Section 12)
      if (analysis.state === 'detected') {
        if (localDetectionProgress < 1.0) {
          localDetectionProgress = Math.min(1.0, localDetectionProgress + 0.03);
          setDetectionProgress(localDetectionProgress);
        }

        // Trigger Wow Banner once upon detection
        if (localDetectionProgress > 0.8 && !showWowBanner && !targetDetectedTimer) {
          setShowWowBanner(true);
          if (toggles.sound && !isMuted) {
            audioService.playTempleBell(0.7);
          }
          targetDetectedTimer = setTimeout(() => {
            setShowWowBanner(false);
          }, 4500);
        }
      } else {
        if (localDetectionProgress > 0) {
          localDetectionProgress = Math.max(0, localDetectionProgress - 0.05);
          setDetectionProgress(localDetectionProgress);
        }
      }

      // Step 2: Render AR Graphics Overlay onto Canvas
      rendererRef.current.render(
        ctx,
        canvas.width,
        canvas.height,
        analysis.anchor,
        toggles,
        localDetectionProgress
      );

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      if (targetDetectedTimer) {
        clearTimeout(targetDetectedTimer);
      }
    };
  }, [isSimulatedTarget, toggles, isMuted, showWowBanner]);

  // Capture Photo with AR Effects & Branding Frame (Section 16)
  const handleCapturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    setIsCapturing(true);
    if (toggles.sound && !isMuted) {
      audioService.playTempleBell(0.85);
    }

    setTimeout(() => {
      const dataUrl = rendererRef.current.captureFrame(
        video,
        canvas,
        'GANESH FESTIVAL 2026',
        'VIGHNAHARTA OF THE DIGITAL AGE',
        'Anuradha College of Engineering & Technology, Chikhli'
      );
      setCapturedPhotoUrl(dataUrl);
      setIsCapturing(false);
    }, 200);
  };

  const handleToggleMute = () => {
    const muted = audioService.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      audioService.playTempleBell(0.5);
    }
  };

  const handleBellRing = () => {
    audioService.playTempleBell(0.75);
  };

  const toggleEffect = (key: keyof AREffectToggles) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-40 bg-[#120B0A] text-[#FFF4DC] select-none overflow-hidden touch-none"
    >
      {/* 1. Camera Video Feed Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center bg-black">
        {/* If user enabled Simulated Target or Camera has fallback, display the realistic festival installation */}
        {isSimulatedTarget && (
          <img
            src={digitalIdolBg}
            alt="Simulated Bappa Installation Target"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-90 filter brightness-95"
            referrerPolicy="no-referrer"
          />
        )}
        <video
          ref={videoRef}
          playsInline
          muted
          autoPlay
          className={`w-full h-full object-cover ${isSimulatedTarget ? 'opacity-20' : 'opacity-100'} ${
            cameraFacing === 'user' ? 'scale-x-[-1]' : ''
          }`}
        />
      </div>

      {/* 2. AR Graphics Canvas Overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 w-full h-full pointer-events-none"
      />

      {/* 3. Flash Effect during capture */}
      {isCapturing && (
        <div className="absolute inset-0 z-30 bg-white animate-fade-out pointer-events-none" />
      )}

      {/* 4. Top Header Bar (Section 31) */}
      <div className="absolute top-0 inset-x-0 z-20 p-4 flex items-center justify-between bg-gradient-to-b from-[#120B0A]/85 via-[#120B0A]/40 to-transparent">
        <button
          onClick={onExit}
          className="py-2 px-3.5 rounded-full glass-panel hover:bg-white/10 active:scale-95 transition-all text-xs font-semibold flex items-center gap-1.5 border border-[#F5B83D]/30 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#F5B83D]" />
          <span>Exit AR</span>
        </button>

        {/* Quick Tools */}
        <div className="flex items-center gap-2">
          {/* Simulated Target Mode Toggle (For desktop / offline test) */}
          <button
            onClick={() => setIsSimulatedTarget(!isSimulatedTarget)}
            title={isSimulatedTarget ? 'Switch to Real Camera Target' : 'Switch to Test Installation Target'}
            className={`p-2 rounded-full backdrop-blur-md border transition-all text-xs ${
              isSimulatedTarget
                ? 'bg-[#F5B83D] text-[#120B0A] border-[#F5B83D]'
                : 'glass-panel text-[#FFF4DC]/80 hover:text-white border-white/20'
            }`}
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Switch Camera (Rear / Front) */}
          <button
            onClick={() =>
              setCameraFacing((prev) => (prev === 'environment' ? 'user' : 'environment'))
            }
            title="Switch Camera"
            className="p-2 rounded-full glass-panel hover:bg-white/10 text-[#FFF4DC]/80 hover:text-white border border-white/20 active:scale-95 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleMute}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            className="p-2 rounded-full glass-panel hover:bg-white/10 text-[#F5B83D] border border-[#F5B83D]/30 active:scale-95 transition-all"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>


      {/* 6. Section 12 & 43: "WOW" MOMENT BANNER ON DETECTION */}
      {showWowBanner && (
        <div className="absolute top-20 inset-x-4 z-25 flex justify-center pointer-events-none animate-bounce-short">
          <div className="max-w-md w-full p-4 rounded-2xl glass-panel-gold border-2 border-[#F5B83D] shadow-2xl text-center">
            <div className="text-2xl font-bold font-display text-[#F5B83D] tracking-wide mb-1 drop-shadow-md">
              🕉️ GANPATI BAPPA MORYA!
            </div>
            <p className="text-xs sm:text-sm text-[#FFF4DC] font-medium leading-snug">
              May Bappa bless you with wisdom, happiness & success.
            </p>
          </div>
        </div>
      )}

      {/* 7. Low Light Warning Banner (Section 35) */}
      {isLowLight && (
        <div className="absolute top-18 inset-x-6 z-20 flex justify-center">
          <div className="px-3.5 py-1.5 rounded-full bg-[#E88918]/90 text-[#120B0A] text-xs font-semibold flex items-center gap-1.5 shadow-md">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>💡 Point your camera toward a well-lit part of the installation.</span>
          </div>
        </div>
      )}

      {/* 8. Camera Error Fallback (Section 33 & 34) */}
      {hasCameraError && (
        <div className="absolute inset-0 z-30 flex items-center justify-center p-6 bg-[#120B0A]/95 text-center">
          <div className="max-w-sm rounded-2xl glass-panel-gold p-6 border border-[#F5B83D]/40">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#4A1018] border border-[#F5B83D] flex items-center justify-center mb-3">
              <Camera className="w-7 h-7 text-[#F5B83D]" />
            </div>
            <h3 className="text-xl font-bold font-heading mb-2">Camera Access Needed</h3>
            <p className="text-xs text-[#FFF4DC]/80 mb-5 leading-relaxed">{hasCameraError}</p>
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setIsSimulatedTarget(true);
                  setHasCameraError(null);
                }}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-[#F5B83D] to-[#E88918] text-[#120B0A]"
              >
                Experience with Simulated Idol Target
              </button>
              <button
                onClick={startCamera}
                className="w-full py-2.5 px-4 rounded-xl font-medium text-xs bg-white/10 hover:bg-white/15"
              >
                Retry Camera
              </button>
              <button
                onClick={onExit}
                className="w-full py-2.5 px-4 rounded-xl text-xs text-[#FFF4DC]/60 hover:text-white"
              >
                Explore Festival Website
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. AR Effects Expandable Toggle Drawer (Section 15) */}
      {showEffectsDrawer && (
        <div className="absolute bottom-28 inset-x-4 max-w-sm mx-auto z-25 p-4 rounded-2xl glass-panel-gold border border-[#F5B83D]/40 shadow-2xl animate-fade-in">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#F5B83D]/20">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F5B83D] flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              Customize AR Effects
            </span>
            <button
              onClick={() => setShowEffectsDrawer(false)}
              className="text-xs text-[#FFF4DC]/60 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              onClick={() => toggleEffect('petals')}
              className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                toggles.petals
                  ? 'bg-[#F5B83D]/20 border-[#F5B83D] text-[#FFF4DC]'
                  : 'bg-black/30 border-white/10 text-white/40'
              }`}
            >
              <Flower2 className="w-4 h-4 text-[#F5B83D]" />
              <span>🌸 Petals</span>
            </button>

            <button
              onClick={() => toggleEffect('diyas')}
              className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                toggles.diyas
                  ? 'bg-[#F5B83D]/20 border-[#F5B83D] text-[#FFF4DC]'
                  : 'bg-black/30 border-white/10 text-white/40'
              }`}
            >
              <Flame className="w-4 h-4 text-[#E88918]" />
              <span>🪔 Diyas</span>
            </button>

            <button
              onClick={() => toggleEffect('particles')}
              className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                toggles.particles
                  ? 'bg-[#F5B83D]/20 border-[#F5B83D] text-[#FFF4DC]'
                  : 'bg-black/30 border-white/10 text-white/40'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#FFD066]" />
              <span>✨ Particles</span>
            </button>

            <button
              onClick={() => toggleEffect('mandala')}
              className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                toggles.mandala
                  ? 'bg-[#F5B83D]/20 border-[#F5B83D] text-[#FFF4DC]'
                  : 'bg-black/30 border-white/10 text-white/40'
              }`}
            >
              <div className="w-4 h-4 rounded-full border border-dashed border-[#F5B83D] flex items-center justify-center text-[8px]">
                ☸
              </div>
              <span>🌺 Mandala</span>
            </button>

            <button
              onClick={() => toggleEffect('om')}
              className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                toggles.om
                  ? 'bg-[#F5B83D]/20 border-[#F5B83D] text-[#FFF4DC]'
                  : 'bg-black/30 border-white/10 text-white/40'
              }`}
            >
              <span className="text-sm">ॐ</span>
              <span>🕉️ Om Halo</span>
            </button>

            <button
              onClick={() => toggleEffect('sound')}
              className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                toggles.sound
                  ? 'bg-[#F5B83D]/20 border-[#F5B83D] text-[#FFF4DC]'
                  : 'bg-black/30 border-white/10 text-white/40'
              }`}
            >
              <Volume2 className="w-4 h-4 text-[#F5B83D]" />
              <span>🔔 Chimes</span>
            </button>
          </div>
        </div>
      )}

      {/* 10. Bottom Floating AR Control Panel (Section 14 & 31) */}
      <div className="absolute bottom-0 inset-x-0 z-20 pb-6 pt-3 px-4 flex flex-col items-center bg-gradient-to-t from-[#120B0A]/95 via-[#120B0A]/50 to-transparent">
        <div className="w-full max-w-sm flex items-center justify-around glass-panel-gold rounded-2xl py-2 px-3 border border-[#F5B83D]/40 shadow-2xl">
          {/* Effects Toggle Button */}
          <button
            onClick={() => setShowEffectsDrawer(!showEffectsDrawer)}
            className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              showEffectsDrawer
                ? 'bg-[#F5B83D] text-[#120B0A]'
                : 'text-[#FFF4DC] hover:bg-white/10'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#F5B83D]" />
            <span>Effects</span>
          </button>

          {/* Center Large Shutter Capture Button (Section 16) */}
          <button
            onClick={handleCapturePhoto}
            aria-label="Capture Bappa Photo"
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#F5B83D] via-[#FFD066] to-[#E88918] p-1 shadow-lg shadow-[#F5B83D]/35 active:scale-90 hover:scale-105 transition-all cursor-pointer flex items-center justify-center"
          >
            <div className="w-full h-full rounded-full border-2 border-[#120B0A] flex items-center justify-center bg-white/20">
              <Camera className="w-7 h-7 text-[#120B0A]" />
            </div>
          </button>

          {/* Temple Bell Ring Button */}
          <button
            onClick={handleBellRing}
            title="Ring Temple Bell"
            className="py-2 px-3 rounded-xl text-xs font-semibold text-[#FFF4DC] hover:bg-white/10 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <span className="text-base">🔔</span>
            <span>Bell</span>
          </button>
        </div>
      </div>

      {/* 11. Captured Photo Modal Preview (Section 17) */}
      {capturedPhotoUrl && (
        <PhotoResultModal
          photoDataUrl={capturedPhotoUrl}
          onRetake={() => setCapturedPhotoUrl(null)}
          onClose={() => setCapturedPhotoUrl(null)}
        />
      )}
    </div>
  );
};
