import React from 'react';
import { MapPin, Navigation, Star, Clock, AlertTriangle, CheckCircle2, ChevronRight, UserCheck } from 'lucide-react';
import { WorkoutSession, Language } from '../types';
import { translations } from '../i18n';

interface ScheduleScreenProps {
  session: WorkoutSession;
  lang: Language;
  onStartCheckin: () => void;
}

export const ScheduleScreen: React.FC<ScheduleScreenProps> = ({ session, lang, onStartCheckin }) => {
  const t = translations[lang];

  return (
    <div className="screen-content">
      {/* PRO Subscription Banner Carousel */}
      <div className="pro-banner">
        <span className="pro-badge">PRO CLUB</span>
        <h2 className="pro-title">{t.proBannerTitle}</h2>
        <p className="pro-desc">{t.proBannerDesc}</p>
        <button className="pro-cta-btn">{t.proBannerCta}</button>
      </div>

      <div className="section-title">
        <span>Bugungi mashg'ulotingiz</span>
        <ChevronRight size={18} />
      </div>

      {/* Booked Workout Card */}
      <div className="workout-card">
        {/* Map Location Preview */}
        <div className="map-preview">
          {/* Simulated Dark Mode Map Graphic */}
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ background: '#111827' }}>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1f2937" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Roads */}
            <path d="M -10 40 Q 120 70 300 30 T 500 90" fill="none" stroke="#374151" strokeWidth="12" />
            <path d="M 140 0 L 140 150" fill="none" stroke="#374151" strokeWidth="8" />
            <path d="M 0 100 L 400 100" fill="none" stroke="#1f2937" strokeWidth="6" />
            {/* Water features */}
            <circle cx="80" cy="30" r="25" fill="#1e3a8a" opacity="0.4" />
          </svg>

          {/* Location Marker */}
          <div className="map-marker">
            <div className="map-marker-pin">
              <MapPin size={18} />
            </div>
          </div>

          <button className="map-route-btn">
            <Navigation size={12} />
            <span>1.2 km</span>
          </button>
        </div>

        {/* Gender / Group Tag */}
        <div className="tag-badge">
          <UserCheck size={13} />
          <span>{session.genderRestriction}</span>
        </div>

        {/* Workout Title */}
        <h3 className="workout-name">{session.title}</h3>

        {/* Time & Duration */}
        <div className="workout-datetime">
          <Clock size={15} color="#94a3b8" />
          <span>{session.dateStr}, {session.timeStr} • {session.durationMinutes} min</span>
        </div>

        {/* Warning Notice Block */}
        <div className="warning-block">
          <AlertTriangle className="warning-icon" size={16} />
          <p className="warning-text">{t.warningNotice}</p>
        </div>

        {/* Gym Details Subcard */}
        <div className="gym-subcard">
          <div className="gym-info">
            <div className="gym-name-row">
              <span>{session.gymName}</span>
            </div>
            <span className="gym-address">{session.gymAddress}</span>
          </div>

          <div className="rating-badge">
            <Star size={13} fill="#fbbf24" stroke="none" />
            <span>{session.gymRating}</span>
          </div>
        </div>

        {/* Confirm Check-in Button */}
        {session.isConfirmed ? (
          <button className="confirm-btn confirmed-btn">
            <CheckCircle2 size={18} />
            <span>{t.confirmedBadge}</span>
          </button>
        ) : (
          <button className="confirm-btn" onClick={onStartCheckin}>
            <span>{t.confirmBtn}</span>
          </button>
        )}
      </div>
    </div>
  );
};
