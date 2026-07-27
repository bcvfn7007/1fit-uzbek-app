import React, { useEffect, useRef, useState } from 'react';
import { X, Camera } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n';

interface FaceVerifyScreenProps {
  lang: Language;
  onClose: () => void;
  onSuccessFace: () => void;
  onOpenHelp: () => void;
}

export const FaceVerifyScreen: React.FC<FaceVerifyScreenProps> = ({
  lang,
  onClose,
  onSuccessFace,
  onOpenHelp
}) => {
  const t = translations[lang];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCamera, setHasCamera] = useState<boolean>(true);
  const [activeTickIndex, setActiveTickIndex] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(false);

  useEffect(() => {
    let stream: MediaStream | null = null;

    async function startFrontCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasCamera(true);
      } catch (err) {
        console.warn('Front camera unavailable, using simulation mode', err);
        setHasCamera(false);
      }
    }

    startFrontCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Spec 5: Progress ring filling around perimeter (~2.5s total for 60 ticks)
  const totalTicks = 60;
  useEffect(() => {
    const stepDuration = 2500 / totalTicks; // ~41.6ms per tick step
    const interval = setInterval(() => {
      setActiveTickIndex((prev) => {
        if (prev >= totalTicks) {
          clearInterval(interval);
          setIsDone(true);
          return totalTicks;
        }
        return prev + 1;
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  // When scan completed, show "Hammasi amalga oshdi" + spinner, then transition after ~1.0s (Spec 5 & 6)
  useEffect(() => {
    if (isDone) {
      const timer = setTimeout(() => {
        onSuccessFace();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isDone, onSuccessFace]);

  const cx = 152.5;
  const cy = 152.5;

  const ticks = Array.from({ length: totalTicks }, (_, index) => {
    const angle = (index / totalTicks) * 360 - 90;
    const rad = (angle * Math.PI) / 180;
    const innerRadius = 136;
    const outerRadius = 148;

    const x1 = cx + innerRadius * Math.cos(rad);
    const y1 = cy + innerRadius * Math.sin(rad);
    const x2 = cx + outerRadius * Math.cos(rad);
    const y2 = cy + outerRadius * Math.sin(rad);

    const isActive = index < activeTickIndex;
    const isJustActivated = index === activeTickIndex - 1;

    return (
      <line
        key={index}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        className={`face-radial-dash ${isJustActivated ? 'just-activated' : ''}`}
        style={{
          stroke: isActive ? '#3866f2' : '#1e3a8a',
          opacity: isActive ? 1 : 0.35,
          transform: isJustActivated ? 'scale(1.12)' : 'scale(1.0)'
        }}
      />
    );
  });

  return (
    <div className="full-overlay auto-transition">
      {/* Background Live Camera Feed */}
      <div className="camera-container">
        {hasCamera ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="camera-video"
            style={{ transform: 'scaleX(-1)' }}
          />
        ) : (
          <div className="camera-fallback-sim">
            <div style={{
              width: 130,
              height: 130,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1e293b, #0f172a)',
              border: '2px solid #3866f2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 44
            }}>
              👤
            </div>
          </div>
        )}
      </div>

      {/* Header */}
      <div className="overlay-header">
        <button className="overlay-close-btn" onClick={onClose} title={t.close}>
          <X size={24} />
        </button>
        <button className="overlay-info-btn" onClick={onOpenHelp} title="Info">
          i
        </button>
      </div>

      {/* Instruction text */}
      <div className="overlay-instruction">
        {"Yuzingizni ramkaga kiriting\nva qimirlamang"}
      </div>

      {/* Circular Frame with Radial Dashes (Spec 5) */}
      <div className="face-frame-wrapper">
        <svg className="face-radial-svg" viewBox="0 0 305 305">
          {ticks}
        </svg>

        <div className="face-circle-mask">
          {/* Completion State with 800ms spinner (Spec 5) */}
          {isDone && (
            <div className="face-success-overlay">
              <div className="face-success-icon-dot" />
              <div className="face-success-text">Hammasi amalga oshdi</div>
              <div className="face-blue-spinner" />
            </div>
          )}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="overlay-footer">
        <button className="camera-switch-btn" title="Camera">
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Camera size={22} color="#1e293b" />
            <span style={{ fontSize: 10, fontWeight: 900, position: 'absolute', bottom: -2, right: -2 }}>⇄</span>
          </div>
        </button>

        <button className="help-link" onClick={onOpenHelp}>
          {t.needHelp}
        </button>

        <button
          onClick={onSuccessFace}
          style={{
            marginTop: 2,
            background: 'rgba(56, 102, 242, 0.25)',
            border: '1px solid rgba(56, 102, 242, 0.4)',
            color: '#bfdbfe',
            padding: '5px 12px',
            borderRadius: '10px',
            fontSize: '11px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          ⚡ {t.simFace}
        </button>
      </div>
    </div>
  );
};
