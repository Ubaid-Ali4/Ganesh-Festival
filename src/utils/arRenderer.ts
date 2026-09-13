import { ARAnchor } from './arTracking';
import { AREffectToggles } from '../types';

interface Petal {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotSpeed: number;
  size: number;
  color: string;
  wobble: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  maxAlpha: number;
  decay: number;
}

interface Diya {
  relX: number;
  relY: number;
  scale: number;
  flameFlicker: number;
}

export class AREffectRenderer {
  private petals: Petal[] = [];
  private particles: Particle[] = [];
  private diyas: Diya[] = [];
  private mandalaAngle: number = 0;
  private pulsePhase: number = 0;

  constructor() {
    this.initPetals(35);
    this.initParticles(50);
    this.initDiyas();
  }

  private initPetals(count: number) {
    this.petals = [];
    const colors = [
      '#FF8C00', // Marigold orange
      '#FFB703', // Marigold golden yellow
      '#E63946', // Rose petal red
      '#F4A261', // Soft saffron
    ];
    for (let i = 0; i < count; i++) {
      this.petals.push({
        x: Math.random(),
        y: Math.random() * -0.5,
        vx: (Math.random() - 0.5) * 0.0015,
        vy: 0.0015 + Math.random() * 0.003,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.04,
        size: 14 + Math.random() * 16,
        color: colors[Math.floor(Math.random() * colors.length)],
        wobble: Math.random() * Math.PI * 2,
      });
    }
  }

  private initParticles(count: number) {
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: 0.2 + Math.random() * 0.6,
        y: 0.2 + Math.random() * 0.6,
        vx: (Math.random() - 0.5) * 0.001,
        vy: -0.001 - Math.random() * 0.002,
        radius: 2 + Math.random() * 3.5,
        alpha: Math.random(),
        maxAlpha: 0.4 + Math.random() * 0.5,
        decay: 0.005 + Math.random() * 0.01,
      });
    }
  }

  private initDiyas() {
    // Diyas positioned aside on the left and right flanks of the camera view
    this.diyas = [
      // Left side diyas
      { relX: -0.75, relY: 0.38, scale: 0.9, flameFlicker: 0 },
      { relX: -0.60, relY: 0.44, scale: 1.0, flameFlicker: 0.5 },
      { relX: -0.45, relY: 0.48, scale: 1.05, flameFlicker: 0.2 },
      // Right side diyas
      { relX: 0.45, relY: 0.48, scale: 1.05, flameFlicker: 0.7 },
      { relX: 0.60, relY: 0.44, scale: 1.0, flameFlicker: 0.4 },
      { relX: 0.75, relY: 0.38, scale: 0.9, flameFlicker: 0.9 },
    ];
  }

  public render(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    anchor: ARAnchor | null,
    toggles: AREffectToggles,
    detectionProgress: number = 1.0
  ) {
    ctx.clearRect(0, 0, width, height);

    const centerX = anchor ? anchor.x * width : width * 0.5;
    const centerY = anchor ? anchor.y * height : height * 0.45;
    const anchorSize = Math.min(width, height) * (anchor ? anchor.width * 1.1 : 0.65);

    this.mandalaAngle += 0.006;
    this.pulsePhase += 0.035;

    // 1. Golden Aura Glow - Bloom removed as requested ("does not create bloom")

    // 2. Sacred Rotating Mandala (AR Ring) - Removed as requested

    // 3. Om Symbol Aura
    if (toggles.om && detectionProgress > 0.4) {
      this.drawSacredOm(ctx, centerX, centerY - anchorSize * 0.45, anchorSize * 0.18, this.pulsePhase);
    }

    // 4. Grounded Glowing Diyas (Placed aside on the left & right sides)
    if (toggles.diyas && detectionProgress > 0.5) {
      this.drawDiyas(ctx, centerX, centerY, anchorSize, detectionProgress);
    }

    // 5. Divine Sparkle Particles
    if (toggles.particles && detectionProgress > 0.2) {
      this.updateAndDrawParticles(ctx, width, height, centerX, centerY, anchorSize);
    }

    // 6. Fluttering Flower Petals
    if (toggles.petals && detectionProgress > 0.4) {
      this.updateAndDrawPetals(ctx, width, height);
    }
  }

  private drawSacredMandala(
    _ctx: CanvasRenderingContext2D,
    _cx: number,
    _cy: number,
    _radius: number,
    _angle: number
  ) {
    // AR circular and geometric ring removed as requested
  }

  private drawSacredOm(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    size: number,
    pulse: number
  ) {
    ctx.save();
    ctx.translate(cx, cy);

    const glow = Math.sin(pulse) * 0.15 + 0.85;

    // Golden Om Glyphic Text (Clean, crisp without background bloom)
    ctx.font = `bold ${Math.floor(size * 1.1 * glow)}px 'Cinzel Decorative', serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#FFF4DC';
    ctx.fillText('ॐ', 0, 0);

    ctx.restore();
  }

  private drawDiyas(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    size: number,
    progress: number
  ) {
    this.diyas.forEach((diya) => {
      const dx = cx + diya.relX * size;
      const dy = cy + diya.relY * size;
      const dSize = 28 * diya.scale * progress;

      diya.flameFlicker += 0.08;
      const flicker = Math.sin(diya.flameFlicker * 3) * 2.5;

      ctx.save();
      ctx.translate(dx, dy);

      // Flame glow aura (tight, no bloom)
      const flameAura = ctx.createRadialGradient(0, -dSize * 0.6, 1, 0, -dSize * 0.6, dSize * 0.9);
      flameAura.addColorStop(0, 'rgba(255, 200, 50, 0.6)');
      flameAura.addColorStop(1, 'rgba(232, 137, 24, 0)');
      ctx.fillStyle = flameAura;
      ctx.beginPath();
      ctx.arc(0, -dSize * 0.6, dSize * 0.9, 0, Math.PI * 2);
      ctx.fill();

      // Brass Diya Base Bowl
      ctx.fillStyle = '#C58925';
      ctx.beginPath();
      ctx.ellipse(0, 0, dSize * 0.7, dSize * 0.28, 0, 0, Math.PI);
      ctx.fill();

      // Diya Rim
      ctx.strokeStyle = '#F5B83D';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(0, 0, dSize * 0.7, dSize * 0.28, 0, 0, Math.PI);
      ctx.stroke();

      // Inner Oil Basin
      ctx.fillStyle = '#8C430B';
      ctx.beginPath();
      ctx.ellipse(0, 0, dSize * 0.58, dSize * 0.16, 0, 0, Math.PI * 2);
      ctx.fill();

      // Flame (outer orange, inner yellow-white)
      ctx.save();
      ctx.translate(flicker * 0.3, 0);

      // Outer flame
      ctx.fillStyle = '#FF7A00';
      ctx.beginPath();
      ctx.moveTo(-dSize * 0.22, -dSize * 0.1);
      ctx.quadraticCurveTo(-dSize * 0.3, -dSize * 0.7, 0, -dSize * 1.2 + flicker);
      ctx.quadraticCurveTo(dSize * 0.3, -dSize * 0.7, dSize * 0.22, -dSize * 0.1);
      ctx.closePath();
      ctx.fill();

      // Inner golden flame core
      ctx.fillStyle = '#FFF275';
      ctx.beginPath();
      ctx.moveTo(-dSize * 0.12, -dSize * 0.15);
      ctx.quadraticCurveTo(-dSize * 0.15, -dSize * 0.55, 0, -dSize * 0.95 + flicker * 0.7);
      ctx.quadraticCurveTo(dSize * 0.15, -dSize * 0.55, dSize * 0.12, -dSize * 0.15);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
      ctx.restore();
    });
  }

  private updateAndDrawParticles(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    cx: number,
    cy: number,
    size: number
  ) {
    this.particles.forEach((p) => {
      p.y += p.vy;
      p.x += p.vx;
      p.alpha += p.decay;

      if (p.alpha > p.maxAlpha || p.alpha < 0.05) {
        p.decay = -p.decay;
      }

      // Reset when particle drifts off
      if (p.y < 0.1 || p.y > 0.9 || p.x < 0.1 || p.x > 0.9) {
        p.x = (cx / w) + (Math.random() - 0.5) * (size / w);
        p.y = (cy / h) + (Math.random() - 0.5) * (size / h);
        p.alpha = 0.1;
      }

      ctx.save();
      ctx.fillStyle = `rgba(245, 184, 61, ${Math.max(0, p.alpha)})`;
      ctx.shadowColor = '#F5B83D';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(p.x * w, p.y * h, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  private updateAndDrawPetals(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number
  ) {
    this.petals.forEach((petal) => {
      petal.y += petal.vy;
      petal.x += petal.vx + Math.sin(petal.wobble) * 0.0008;
      petal.wobble += 0.04;
      petal.rotation += petal.rotSpeed;

      // Wrap around top
      if (petal.y > 1.05) {
        petal.y = -0.05;
        petal.x = Math.random();
      }

      const px = petal.x * w;
      const py = petal.y * h;

      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(petal.rotation);

      // Marigold / Rose Petal teardrop shape
      ctx.fillStyle = petal.color;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
      ctx.shadowBlur = 4;

      ctx.beginPath();
      ctx.ellipse(0, 0, petal.size * 0.5, petal.size * 0.3, Math.sin(petal.wobble) * 0.4, 0, Math.PI * 2);
      ctx.fill();

      // Subtle petal vein highlight
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-petal.size * 0.4, 0);
      ctx.lineTo(petal.size * 0.4, 0);
      ctx.stroke();

      ctx.restore();
    });
  }

  /**
   * Generates composite photo of camera feed + AR effects + elegant festival frame
   */
  public captureFrame(
    video: HTMLVideoElement,
    arCanvas: HTMLCanvasElement,
    festivalTitle: string = 'GANESH FESTIVAL 2026',
    themeText: string = 'VIGHNAHARTA OF THE DIGITAL AGE',
    collegeText: string = 'Anuradha College of Engineering & Technology, Chikhli'
  ): string {
    const exportCanvas = document.createElement('canvas');
    const width = video.videoWidth || 1080;
    const height = video.videoHeight || 1920;
    exportCanvas.width = width;
    exportCanvas.height = height;
    const ctx = exportCanvas.getContext('2d');

    if (!ctx) return '';

    // 1. Draw raw video camera feed
    ctx.drawImage(video, 0, 0, width, height);

    // 2. Draw AR canvas overlaid
    ctx.drawImage(arCanvas, 0, 0, width, height);

    // 3. Draw Festival Branding Frame & Borders (Subtle, as required by spec #16)
    ctx.save();

    // Top subtle gradient header
    const topGrad = ctx.createLinearGradient(0, 0, 0, height * 0.16);
    topGrad.addColorStop(0, 'rgba(18, 11, 10, 0.88)');
    topGrad.addColorStop(1, 'rgba(18, 11, 10, 0)');
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 0, width, height * 0.16);

    // Bottom subtle gradient footer
    const bottomGrad = ctx.createLinearGradient(0, height * 0.82, 0, height);
    bottomGrad.addColorStop(0, 'rgba(18, 11, 10, 0)');
    bottomGrad.addColorStop(1, 'rgba(18, 11, 10, 0.94)');
    ctx.fillStyle = bottomGrad;
    ctx.fillRect(0, height * 0.82, width, height * 0.18);

    // Golden inner border
    ctx.strokeStyle = 'rgba(245, 184, 61, 0.65)';
    ctx.lineWidth = Math.max(3, width * 0.004);
    const m = Math.max(16, width * 0.025);
    ctx.strokeRect(m, m, width - m * 2, height - m * 2);

    // Corner traditional flourishes
    const cornerSize = Math.max(24, width * 0.04);
    ctx.strokeStyle = '#F5B83D';
    ctx.lineWidth = Math.max(4, width * 0.005);
    // Top-left
    ctx.beginPath();
    ctx.moveTo(m, m + cornerSize);
    ctx.lineTo(m, m);
    ctx.lineTo(m + cornerSize, m);
    ctx.stroke();
    // Top-right
    ctx.beginPath();
    ctx.moveTo(width - m - cornerSize, m);
    ctx.lineTo(width - m, m);
    ctx.lineTo(width - m, m + cornerSize);
    ctx.stroke();
    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(m, height - m - cornerSize);
    ctx.lineTo(m, height - m);
    ctx.lineTo(m + cornerSize, height - m);
    ctx.stroke();
    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(width - m - cornerSize, height - m);
    ctx.lineTo(width - m, height - m);
    ctx.lineTo(width - m, height - m - cornerSize);
    ctx.stroke();

    // Top Header Typography
    ctx.textAlign = 'center';
    ctx.fillStyle = '#F5B83D';
    ctx.font = `bold ${Math.floor(width * 0.038)}px 'Cinzel Decorative', serif`;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = 10;
    ctx.fillText('🕉️ ' + festivalTitle, width * 0.5, m + Math.max(36, width * 0.045));

    ctx.fillStyle = '#FFF4DC';
    ctx.font = `500 ${Math.floor(width * 0.024)}px 'Plus Jakarta Sans', sans-serif`;
    ctx.fillText(themeText, width * 0.5, m + Math.max(68, width * 0.075));

    // Bottom Footer Typography
    ctx.fillStyle = '#F5B83D';
    ctx.font = `bold ${Math.floor(width * 0.042)}px 'Marcellus', serif`;
    ctx.fillText('GANPATI BAPPA MORYA! 🙏✨', width * 0.5, height - m - Math.max(48, width * 0.065));

    ctx.fillStyle = '#FFF4DC';
    ctx.font = `400 ${Math.floor(width * 0.022)}px 'Plus Jakarta Sans', sans-serif`;
    ctx.fillText(collegeText, width * 0.5, height - m - Math.max(20, width * 0.03));

    ctx.restore();

    return exportCanvas.toDataURL('image/jpeg', 0.92);
  }
}
