import { TrackingState } from '../types';

export interface ARAnchor {
  x: number; // Normalized center x (0 to 1)
  y: number; // Normalized center y (0 to 1)
  width: number;
  height: number;
  confidence: number;
  tiltX: number; // Gyro tilt
  tiltY: number;
  roll: number;
  scale: number;
  lastSeen: number;
}

export interface TrackingAnalysisResult {
  state: TrackingState;
  guidanceText: string;
  isLowLight: boolean;
  anchor: ARAnchor | null;
  featureScore: number;
}

export class WebARTracker {
  private videoElement: HTMLVideoElement | null = null;
  private analysisCanvas: HTMLCanvasElement | null = null;
  private analysisCtx: CanvasRenderingContext2D | null = null;

  // Spatial gyroscope orientation
  private gyroX: number = 0;
  private gyroY: number = 0;
  private gyroRoll: number = 0;
  private hasGyro: boolean = false;

  // Anchor persistence & smoothing
  private currentAnchor: ARAnchor | null = null;
  private detectionFrames: number = 0;
  private lostFrames: number = 0;
  private currentState: TrackingState = 'searching';
  private lastLuminance: number = 120;

  // Smoothing filter weights
  private readonly SMOOTHING = 0.25;

  constructor() {
    if (typeof window !== 'undefined') {
      this.analysisCanvas = document.createElement('canvas');
      this.analysisCanvas.width = 160;
      this.analysisCanvas.height = 120;
      this.analysisCtx = this.analysisCanvas.getContext('2d', { willReadFrequently: true });

      // Attach DeviceOrientation listener if available
      this.setupDeviceSensors();
    }
  }

  private setupDeviceSensors() {
    if (typeof window === 'undefined' || !window.DeviceOrientationEvent) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta !== null && e.gamma !== null) {
        this.hasGyro = true;
        // Beta: front-to-back tilt [-180, 180]
        // Gamma: left-to-right tilt [-90, 90]
        // Alpha: compass direction [0, 360]
        const targetX = (e.gamma || 0) * 0.015;
        const targetY = ((e.beta || 90) - 75) * 0.015;
        const targetRoll = (e.alpha || 0) * (Math.PI / 180);

        this.gyroX += (targetX - this.gyroX) * 0.2;
        this.gyroY += (targetY - this.gyroY) * 0.2;
        this.gyroRoll = targetRoll;
      }
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
  }

  public setVideo(video: HTMLVideoElement) {
    this.videoElement = video;
  }

  /**
   * Analyzes camera video stream for:
   * 1. Warm saffron/gold color clusters & blue illuminated halo
   * 2. Edge density / gradient energy around center target area
   * 3. Overall luminance (to detect low light)
   * 4. Gyroscopic motion stability
   */
  public analyzeFrame(forceSimulatedLock: boolean = false): TrackingAnalysisResult {
    if (forceSimulatedLock) {
      // Direct simulation mode for testing
      const anchor: ARAnchor = {
        x: 0.5 + this.gyroX * 0.3,
        y: 0.45 + this.gyroY * 0.3,
        width: 0.55,
        height: 0.65,
        confidence: 0.95,
        tiltX: this.gyroX,
        tiltY: this.gyroY,
        roll: this.gyroRoll,
        scale: 1.0,
        lastSeen: Date.now(),
      };
      this.currentAnchor = anchor;
      this.currentState = 'detected';
      return {
        state: 'detected',
        guidanceText: '✨ Bappa found!',
        isLowLight: false,
        anchor,
        featureScore: 0.95,
      };
    }

    if (!this.videoElement || !this.analysisCtx || !this.analysisCanvas) {
      return {
        state: 'searching',
        guidanceText: '🔍 Looking for Bappa...',
        isLowLight: false,
        anchor: null,
        featureScore: 0,
      };
    }

    const video = this.videoElement;
    if (video.readyState < 2 || video.videoWidth === 0) {
      return {
        state: 'searching',
        guidanceText: '🔍 Looking for Bappa...',
        isLowLight: false,
        anchor: null,
        featureScore: 0,
      };
    }

    // Downscale video to small analysis canvas for 60fps lightweight CV
    const w = this.analysisCanvas.width;
    const h = this.analysisCanvas.height;

    try {
      this.analysisCtx.drawImage(video, 0, 0, w, h);
      const imgData = this.analysisCtx.getImageData(0, 0, w, h);
      const data = imgData.data;

      let totalLum = 0;
      let centerEnergy = 0;
      let warmHueHits = 0;
      let totalSamples = 0;

      // Define central bounding zone where idol target is expected (30% to 70% of frame)
      const minX = Math.floor(w * 0.25);
      const maxX = Math.floor(w * 0.75);
      const minY = Math.floor(h * 0.2);
      const maxY = Math.floor(h * 0.8);

      let weightedX = 0;
      let weightedY = 0;

      for (let y = minY; y < maxY; y += 2) {
        for (let x = minX; x < maxX; x += 2) {
          const idx = (y * w + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];

          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          totalLum += lum;
          totalSamples++;

          // Look for traditional idol warm tones (saffron/gold: high red, moderate green, lower blue)
          // or blue neon halo (high blue, lower green/red)
          const isSaffronGold = r > 110 && g > 60 && r > b * 1.35;
          const isBlueAura = b > 120 && b > r * 1.25;

          if (isSaffronGold || isBlueAura) {
            warmHueHits++;
            weightedX += x;
            weightedY += y;
          }

          // Simple edge gradient
          if (x + 2 < maxX) {
            const nextIdx = (y * w + (x + 2)) * 4;
            const nextLum = 0.299 * data[nextIdx] + 0.587 * data[nextIdx + 1] + 0.114 * data[nextIdx + 2];
            centerEnergy += Math.abs(lum - nextLum);
          }
        }
      }

      const avgLum = totalSamples > 0 ? totalLum / totalSamples : 100;
      this.lastLuminance = avgLum;
      const isLowLight = avgLum < 35;

      const warmRatio = totalSamples > 0 ? warmHueHits / totalSamples : 0;
      const avgEnergy = totalSamples > 0 ? centerEnergy / totalSamples : 0;

      // Feature matching score combining color signature, edge energy, and center concentration
      let score = (warmRatio * 1.8) + (avgEnergy / 45);
      score = Math.min(1.0, Math.max(0.0, score));

      // Calculate anchor centroid
      let anchorX = 0.5;
      let anchorY = 0.45;
      if (warmHueHits > 15) {
        anchorX = (weightedX / warmHueHits) / w;
        anchorY = (weightedY / warmHueHits) / h;
      }

      // Smooth anchor position
      if (!this.currentAnchor) {
        this.currentAnchor = {
          x: anchorX,
          y: anchorY,
          width: 0.5,
          height: 0.6,
          confidence: score,
          tiltX: this.gyroX,
          tiltY: this.gyroY,
          roll: this.gyroRoll,
          scale: 1.0,
          lastSeen: Date.now(),
        };
      } else {
        this.currentAnchor.x += (anchorX - this.currentAnchor.x) * this.SMOOTHING + this.gyroX * 0.05;
        this.currentAnchor.y += (anchorY - this.currentAnchor.y) * this.SMOOTHING + this.gyroY * 0.05;
        this.currentAnchor.tiltX = this.gyroX;
        this.currentAnchor.tiltY = this.gyroY;
        this.currentAnchor.roll = this.gyroRoll;
        this.currentAnchor.confidence = this.currentAnchor.confidence * 0.7 + score * 0.3;
      }

      // State determination machine based on confidence, movement, and light
      let state: TrackingState = 'searching';
      let guidanceText = '🔍 Looking for Bappa...';

      if (isLowLight) {
        guidanceText = '💡 Point your camera toward a well-lit part of the installation.';
      }

      // Detection threshold
      if (score > 0.32) {
        this.detectionFrames++;
        this.lostFrames = 0;

        if (this.detectionFrames >= 3) {
          state = 'detected';
          guidanceText = '✨ Bappa found!';
          this.currentAnchor.lastSeen = Date.now();
        } else {
          state = 'searching';
          guidanceText = '🎯 Locking onto Bappa...';
        }
      } else if (score > 0.18) {
        // Marginal presence - guide user
        state = 'move_closer';
        guidanceText = 'Move a little closer to Bappa.';
      } else if (this.detectionFrames > 5) {
        // Was previously detected, check grace period before full lost
        this.lostFrames++;
        if (this.lostFrames < 15) {
          state = 'move_slowly';
          guidanceText = 'Slowly move your phone around the idol.';
        } else {
          state = 'lost';
          guidanceText = 'AR tracking paused. Point your camera back at Bappa.';
          this.detectionFrames = 0;
        }
      } else {
        state = 'searching';
        guidanceText = '🔍 Looking for Bappa...';
      }

      this.currentState = state;

      return {
        state,
        guidanceText,
        isLowLight,
        anchor: this.currentAnchor,
        featureScore: score,
      };
    } catch {
      return {
        state: 'searching',
        guidanceText: '🔍 Looking for Bappa...',
        isLowLight: false,
        anchor: null,
        featureScore: 0,
      };
    }
  }

  public reset() {
    this.currentAnchor = null;
    this.detectionFrames = 0;
    this.lostFrames = 0;
    this.currentState = 'searching';
  }
}
