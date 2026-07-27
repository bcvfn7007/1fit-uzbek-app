import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { WorkoutSession, UserProfile, Language } from '../types';
import { translations } from '../i18n';

interface SuccessScreenProps {
  session: WorkoutSession;
  user: UserProfile;
  lang: Language;
  onFinish: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
  session,
  user,
  lang,
  onFinish
}) => {
  const t = translations[lang];

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#3866f2', '#16a34a', '#8580ff', '#ffffff']
      });
    } catch (e) {
      console.log('Confetti effect');
    }
  }, []);

  return (
    <div className="success-screen-bg">
      {/* Background SVG Chevron Vector Pattern (Exact match to Image 5) */}
      <svg className="chevron-pattern-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" preserveAspectRatio="none">
        <g stroke="#16255c" strokeWidth="18" fill="none" opacity="0.65">
          {/* Chevron stack V shapes */}
          <path d="M -50 100 L 200 240 L 450 100" />
          <path d="M -50 200 L 200 340 L 450 200" />
          <path d="M -50 300 L 200 440 L 450 300" />
          <path d="M -50 400 L 200 540 L 450 400" />
          <path d="M -50 500 L 200 640 L 450 500" />
          <path d="M -50 600 L 200 740 L 450 600" />
          <path d="M -50 700 L 200 840 L 450 700" />
        </g>
      </svg>

      {/* Top Profile Section (Image 5) */}
      <div className="success-top-profile">
        <div className="avatar-wrapper">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300"
            alt="user avatar"
            className="avatar-img"
          />
        </div>
        <h2 className="username-text">aziz.magnat</h2>
      </div>

      {/* Confirmation Card with Green Banner (Exact match to Image 5) */}
      <div className="success-card">
        <div className="success-card-badge">
          Tashrif tasdiqlandi
        </div>
        <div className="success-card-body">
          <div className="success-date-row">
            <span className="success-date-text">24-iyul, 20:00</span>
            <span className="success-duration-text">120 min</span>
          </div>

          <h3 className="success-workout-title">Свободное плавание</h3>
          <p className="success-gym-subtitle">Afrosiyob Hotel</p>
        </div>
      </div>

      {/* Speech Bubble Message with Left Tail (Exact text match to Image 5) */}
      <div className="speech-bubble">
        {"Qanchalik zo'r shug'ullansangiz, shunchalik zo'r dam olasiz. Sizni ko'rganimizdan xursandmiz! Zo'r mashg'ulot tilaymiz ⚡"}
      </div>

      {/* Super Button (Exact match to Image 5) */}
      <button className="super-btn" onClick={onFinish}>
        Super
      </button>
    </div>
  );
};
