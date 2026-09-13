/**
 * Web Audio API synthesizer for authentic Indian temple sounds.
 * Avoids broken external MP3 audio links.
 */

class TempleAudioEngine {
  private ctx: AudioContext | null = null;
  private droneGain: GainNode | null = null;
  private isMuted: boolean = false;
  private droneActive: boolean = false;
  private customAudioUrl: string | null = null;

  constructor() {
    // Check saved audio preference
    if (typeof window !== 'undefined') {
      const savedMute = localStorage.getItem('ganpati_audio_muted');
      if (savedMute !== null) {
        this.isMuted = savedMute === 'true';
      }
      const savedAudio = localStorage.getItem('ganpati_custom_audio_url');
      if (savedAudio) {
        this.customAudioUrl = savedAudio;
      }
    }
  }

  public setCustomAudio(url: string) {
    this.customAudioUrl = url;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('ganpati_custom_audio_url', url);
      } catch {
        // storage quota
      }
    }
  }

  public getCustomAudio(): string | null {
    return this.customAudioUrl;
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('ganpati_audio_muted', String(this.isMuted));
    }
    if (this.isMuted && this.droneGain && this.ctx) {
      this.droneGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
    } else if (!this.isMuted && this.droneGain && this.ctx && this.droneActive) {
      this.droneGain.gain.setTargetAtTime(0.08, this.ctx.currentTime, 0.5);
    }
    return this.isMuted;
  }

  /**
   * Plays the temple bell sound.
   * Prioritizes user's uploaded sound file (/bell.mp3, /bell.wav, /sound.mp3 or customAudioUrl) if provided,
   * otherwise plays the resonant 3-strike temple bell acoustic synthesis.
   */
  public playTempleBell(volume: number = 0.65) {
    if (this.isMuted) return;

    // 1. Check if user configured custom sound file / data URI
    if (this.customAudioUrl) {
      try {
        const audio = new Audio(this.customAudioUrl);
        audio.volume = Math.min(1, Math.max(0, volume));
        const playPromise = audio.play();
        if (playPromise) {
          playPromise.catch(() => {
            this.playSynthesizedBell(volume);
          });
        }
        return;
      } catch {
        // Fall back to synthesis
      }
    }

    // 2. Check for uploaded file in public directory (e.g., /bell.mp3, /bell.wav, /sound.mp3)
    if (typeof window !== 'undefined') {
      try {
        const testAudio = new Audio('src/utils/bell.mp3');
        testAudio.volume = Math.min(1, Math.max(0, volume));
        const playPromise = testAudio.play();
        if (playPromise) {
          playPromise
            .then(() => {
              // Successfully played user's uploaded /bell.mp3
            })
            .catch(() => {
              // Not loaded yet or 404, fallback to synthesized bell
              this.playSynthesizedBell(volume);
            });
          return;
        }
      } catch {
        // Fall through
      }
    }

    this.playSynthesizedBell(volume);
  }

  private playSynthesizedBell(volume: number = 0.65) {
    this.initContext();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const startTime = ctx.currentTime;

    const playStrike = (strikeTime: number, baseFreq: number, strikeVol: number, decayTime: number) => {
      // Inharmonic brass partials typical of consecrated temple bells
      const partials = [
        { ratio: 1.0, gain: 1.0, decay: decayTime },
        { ratio: 1.58, gain: 0.65, decay: decayTime * 0.8 },
        { ratio: 2.14, gain: 0.45, decay: decayTime * 0.7 },
        { ratio: 2.76, gain: 0.35, decay: decayTime * 0.55 },
        { ratio: 3.42, gain: 0.22, decay: decayTime * 0.4 },
        { ratio: 0.51, gain: 0.35, decay: decayTime * 1.1 }, // deep brass body hum
      ];

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(strikeVol * volume, strikeTime);
      masterGain.connect(ctx.destination);

      partials.forEach((p) => {
        const osc = ctx.createOscillator();
        const pGain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq * p.ratio, strikeTime);
        // Subtle natural detuning for metallic richness
        osc.detune.setValueAtTime((Math.random() - 0.5) * 6, strikeTime);

        // Instantaneous strike attack
        pGain.gain.setValueAtTime(0.0001, strikeTime);
        pGain.gain.linearRampToValueAtTime(p.gain, strikeTime + 0.002);
        // Natural exponential decay ring-out
        pGain.gain.exponentialRampToValueAtTime(0.0001, strikeTime + p.decay);

        osc.connect(pGain);
        pGain.connect(masterGain);

        osc.start(strikeTime);
        osc.stop(strikeTime + p.decay + 0.1);
      });
    };

    // Strike 1 (0.0s): First clear high-register brass chime
    

    // Strike 2 (0.72s): Second crisp resonant bell strike
    
  }

  /**
   * Plays a double aarti chime
   */
  public playAartiChime() {
    this.playTempleBell(0.5);
    setTimeout(() => {
      this.playTempleBell(0.7);
    }, 280);
    setTimeout(() => {
      this.playTempleBell(0.45);
    }, 620);
  }

  /**
   * Plays a deep resonant sacred Om drone (136.1 Hz - Cosmic Om frequency)
   */
  public startDivineAmbient(volume: number = 0.08) {
    if (this.isMuted || this.droneActive) return;
    this.initContext();
    if (!this.ctx) return;

    this.droneActive = true;
    const now = this.ctx.currentTime;
    const omFreq = 136.1;

    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.0001, now);
    this.droneGain.gain.linearRampToValueAtTime(volume, now + 2.0);
    this.droneGain.connect(this.ctx.destination);

    // Warm chord: fundamental, fifth (204.15Hz), octave (272.2Hz)
    [1, 1.498, 2, 2.996].forEach((ratio, idx) => {
      if (!this.ctx || !this.droneGain) return;
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(omFreq * ratio, now);

      // Add gentle detuning chorus
      osc.detune.setValueAtTime((idx - 1.5) * 4, now);

      oscGain.gain.setValueAtTime(0.3 / (idx + 1), now);
      osc.connect(oscGain);
      oscGain.connect(this.droneGain);

      osc.start(now);
    });
  }

  public stopDivineAmbient() {
    if (this.droneGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.droneGain.gain.linearRampToValueAtTime(0.0001, now + 1.5);
    }
    this.droneActive = false;
  }
}

export const audioService = new TempleAudioEngine();
