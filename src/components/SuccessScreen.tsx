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
            src={user.avatarUrl}
            alt={user.name}
            className="avatar-img"
          />
        </div>
        <h2 className="username-text">@{user.handle}</h2>
      </div>

      {/* Confirmation Card with Green Banner (Dynamic details from selected session) */}
      <div className="success-card">
        <div className="success-card-badge">
          {t.visitConfirmed}
        </div>
        <div className="success-card-body">
          <div className="success-date-row">
            <span className="success-date-text">{session.dateStr}, {session.timeStr}</span>
            <span className="success-duration-text">{session.durationMinutes} min</span>
          </div>

          <h3 className="success-workout-title">{session.title}</h3>
          <p className="success-gym-subtitle">{session.gymName}</p>
        </div>
      </div>

      {/* Speech Bubble Message with Left Tail (Exact text match to Image 5) */}
      <div className="speech-bubble">
        {t.motivationQuote}
      </div>

      {/* Super Button (Exact match to Image 5) */}
      <button className="super-btn" onClick={onFinish}>
        {t.superBtn}
      </button>
    </div>
  );
};
