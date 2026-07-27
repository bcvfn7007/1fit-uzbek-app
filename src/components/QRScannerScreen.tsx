import React, { useEffect, useRef, useState } from 'react';
import { X, Camera } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n';

interface QRScannerScreenProps {
  lang: Language;
  onClose: () => void;
  onSuccessQR: () => void;
  onOpenHelp: () => void;
}

export const QRScannerScreen: React.FC<QRScannerScreenProps> = ({
  lang,
  onClose,
  onSuccessQR,
  onOpenHelp
}) => {
  const t = translations[lang];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCamera, setHasCamera] = useState<boolean>(true);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [isDetected, setIsDetected] = useState<boolean>(false);

  useEffect(() => {
    let stream: MediaStream | null = null;

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facingMode }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasCamera(true);
      } catch (err) {
        console.warn('Camera access denied or unavailable, using simulation mode', err);
        setHasCamera(false);
      }
    }

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  // Handle QR code detection trigger (Spec 3: 100ms bright white flash then auto-transition to Face ID)
  const handleTriggerDetection = () => {
    if (isDetected) return;
    setIsDetected(true);
    setTimeout(() => {
      onSuccessQR();
    }, 120);
  };

  return (
    <div className="full-overlay">
      {/* Live Camera Stream */}
      <div className="camera-container">
        {hasCamera ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="camera-video"
          />
        ) : (
          <div className="camera-fallback-sim">
            <div style={{ opacity: 0.3, textAlign: 'center' }}>
              <Camera size={80} color="#8580ff" />
              <p style={{ marginTop: 12, color: '#94a3b8', fontSize: 12 }}>Kamera simulyatsiyasi faol</p>
            </div>
          </div>
        )}
      </div>

      {/* Header Close Icon */}
      <div className="overlay-header">
        <button className="overlay-close-btn" onClick={onClose} title={t.close}>
          <X size={24} />
        </button>
      </div>

      {/* Instruction text */}
      <div className="overlay-instruction">
        {"QR kodini skanerlang\nva mashg'ulotni tasdiqlang"}
      </div>

      {/* Lavender Rounded Square Scanner Frame with Flash on Detection (Spec 3) */}
      <div className="qr-frame-wrapper" onClick={handleTriggerDetection} style={{ cursor: 'pointer' }}>
        <div className={`qr-frame-border ${isDetected ? 'detected-flash' : ''}`}>
          <div className="qr-laser-line" />
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="overlay-footer">
        <button className="camera-switch-btn" onClick={toggleCamera} title="Switch Camera">
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Camera size={22} color="#1e293b" />
            <span style={{ fontSize: 10, fontWeight: 900, position: 'absolute', bottom: -2, right: -2 }}>⇄</span>
          </div>
        </button>

        <button className="help-link" onClick={onOpenHelp}>
          {t.needHelp}
        </button>

        <button
          onClick={handleTriggerDetection}
          style={{
            marginTop: 2,
            background: 'rgba(131, 123, 230, 0.25)',
            border: '1px solid rgba(131, 123, 230, 0.4)',
            color: '#c7d2fe',
            padding: '5px 12px',
            borderRadius: '10px',
            fontSize: '11px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          ⚡ {t.simScan}
        </button>
      </div>
    </div>
  );
};
