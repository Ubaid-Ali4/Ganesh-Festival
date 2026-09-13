import React, { useState } from 'react';
import { Navbar } from './components/Navigation/Navbar';
import { MobileBottomNav } from './components/Navigation/MobileBottomNav';
import { HeroSection } from './components/Festival/HeroSection';
import { AboutBappa } from './components/Festival/AboutBappa';
import { EventsTimeline } from './components/Festival/EventsTimeline';
import { DigitalDiya } from './components/Festival/DigitalDiya';
import { Gallery } from './components/Festival/Gallery';
import { FestivalVideo } from './components/Festival/FestivalVideo';
import { DidYouKnow } from './components/Festival/DidYouKnow';
import { Footer } from './components/Footer';
import { ARExperience } from './components/AR/ARExperience';
import { ARPermissionModal } from './components/AR/ARPermissionModal';
import { ARInstructionsModal } from './components/AR/ARInstructionsModal';
import { audioService } from './utils/audio';

export default function App() {
  const [view, setView] = useState<'festival' | 'ar'>('festival');
  const [activeSection, setActiveSection] = useState('home');

  // Modals state
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [showMobileMore, setShowMobileMore] = useState(false);

  // Permission handling
  const [isRequestingCamera, setIsRequestingCamera] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  // Scroll to section handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    setShowMobileMore(false);

    if (view === 'ar') {
      setView('festival');
    }

    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Trigger AR Journey
  const handleInitiateAR = () => {
    setShowPermissionModal(true);
  };

  const handleAllowCamera = async () => {
    setIsRequestingCamera(true);
    setPermissionError(null);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Your device or browser does not support camera access.');
      }

      const testStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      testStream.getTracks().forEach((track) => track.stop());

      audioService.playTempleBell(0.6);

      setShowPermissionModal(false);
      setShowInstructionsModal(true);
    } catch (err: unknown) {
      const error = err as Error;
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setPermissionError(
          'Camera access was denied. Please enable camera permission in your browser address bar settings to experience Bappa in AR.'
        );
      } else {
        setPermissionError(
          error.message || 'Unable to access camera on this device. You can still test with simulated idol!'
        );
      }
    } finally {
      setIsRequestingCamera(false);
    }
  };

  const handleStartARExperience = () => {
    setShowInstructionsModal(false);
    setView('ar');
    audioService.playTempleBell(0.8);
  };

  return (
    <div className="min-h-screen bg-[#120B0A] text-[#FFF4DC] font-sans antialiased selection:bg-[#F5B83D] selection:text-[#120B0A] overflow-x-hidden">
      {/* 1. Main Festival View */}
      {view === 'festival' && (
        <div className="relative z-10 animate-fade-in pb-16 md:pb-0">
          <Navbar
            onStartAR={handleInitiateAR}
            onNavigate={handleNavigate}
            activeSection={activeSection}
          />

          <main>
            <div id="home">
              <HeroSection
                onStartAR={handleInitiateAR}
                onExplore={() => handleNavigate('events')}
                onLightDiya={() => handleNavigate('diya')}
              />
            </div>

            <FestivalVideo />
            <AboutBappa />
            <EventsTimeline />
            <DigitalDiya />
            <Gallery />
            <DidYouKnow />
          </main>

          <Footer
            onNavigate={handleNavigate}
          />

          {/* Mobile Bottom Navigation */}
          <MobileBottomNav
            currentSection={activeSection}
            onNavigate={handleNavigate}
            onStartAR={handleInitiateAR}
            onOpenMore={() => setShowMobileMore(!showMobileMore)}
          />
        </div>
      )}

      {/* 2. Full-Screen Augmented Reality Experience View */}
      {view === 'ar' && (
        <ARExperience
          onExit={() => setView('festival')}
          onOpenFestival={() => setView('festival')}
        />
      )}

      {/* 3. Camera Permission Modal */}
      {showPermissionModal && (
        <ARPermissionModal
          onAllow={handleAllowCamera}
          onCancel={() => {
            setShowPermissionModal(false);
            setPermissionError(null);
          }}
          permissionError={permissionError}
          isRequesting={isRequestingCamera}
        />
      )}

      {/* 4. AR Instructions Modal */}
      {showInstructionsModal && (
        <ARInstructionsModal
          onStart={handleStartARExperience}
          onBack={() => setShowInstructionsModal(false)}
        />
      )}

      {/* Mobile "More" Drawer for Secondary Festival Sections */}
      {showMobileMore && (
        <div
          onClick={() => setShowMobileMore(false)}
          className="fixed inset-0 z-40 bg-[#120B0A]/85 backdrop-blur-md flex items-end justify-center p-4 animate-fade-in md:hidden"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-3xl glass-panel-gold border-2 border-[#F5B83D]/40 p-5 mb-14"
          >
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#F5B83D]/20">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F5B83D]">
                Festival Navigation
              </span>
              <button
                onClick={() => setShowMobileMore(false)}
                className="text-xs text-[#FFF4DC]/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs font-medium">
              <button
                onClick={() => handleNavigate('about')}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-left border border-white/10 text-[#FFF4DC]"
              >
                🌺 About Bappa
              </button>
              <button
                onClick={() => handleNavigate('events')}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-left border border-white/10 text-[#FFF4DC]"
              >
                📅 Event Schedule
              </button>
              <button
                onClick={() => handleNavigate('diya')}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-left border border-white/10 text-[#FFF4DC]"
              >
                🪔 Light a Diya
              </button>
              <button
                onClick={() => handleNavigate('gallery')}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-left border border-white/10 text-[#FFF4DC]"
              >
                🖼️ Gallery
              </button>
              <button
                onClick={() => handleNavigate('facts')}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-left border border-white/10 text-[#FFF4DC]"
              >
                🐘 Did You Know?
              </button>
              <button
                onClick={() => {
                  setShowMobileMore(false);
                  handleInitiateAR();
                }}
                className="p-3 rounded-xl bg-[#4A1018] text-left border border-[#F5B83D]/30 text-[#F5B83D] font-bold"
              >
                ✨ Experience in AR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
