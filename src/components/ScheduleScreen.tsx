import React, { useState } from 'react';
import { MapPin, Navigation, Star, Clock, AlertTriangle, CheckCircle2, ChevronRight, UserCheck, Dumbbell, Waves, Zap, Sparkles, Heart } from 'lucide-react';
import { WorkoutSession, Language } from '../types';
import { translations } from '../i18n';

interface ScheduleScreenProps {
  sessions: WorkoutSession[];
  activeSessionId: string;
  onSelectSession: (id: string) => void;
  lang: Language;
  onStartCheckin: (session: WorkoutSession) => void;
}

export const ScheduleScreen: React.FC<ScheduleScreenProps> = ({
  sessions,
  activeSessionId,
  onSelectSession,
  lang,
  onStartCheckin
}) => {
  const t = translations[lang];
  const [selectedCategory, setSelectedCategory] = useState<string>('barchasi');

  const activeSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];

  const categories = [
    { id: 'barchasi', label: 'Barcha mashg\'ulotlar', icon: <Sparkles size={14} /> },
    { id: 'suzish', label: 'Erkin suzish', icon: <Waves size={14} /> },
    { id: 'fitnes', label: 'Fitnes & Zal', icon: <Dumbbell size={14} /> },
    { id: 'crossfit', label: 'CrossFit Pro', icon: <Zap size={14} /> },
    { id: 'yoga', label: 'Yoga & Pilates', icon: <Heart size={14} /> },
    { id: 'boks', label: 'Boks & MMA', icon: <Zap size={14} /> },
  ];

  const filteredSessions = sessions.filter(
    (s) => selectedCategory === 'barchasi' || s.category === selectedCategory
  );

  return (
    <div className="screen-content">
      {/* PRO Subscription Banner Carousel */}
      <div className="pro-banner">
        <span className="pro-badge">PRO CLUB</span>
        <h2 className="pro-title">{t.proBannerTitle}</h2>
        <p className="pro-desc">{t.proBannerDesc}</p>
        <button className="pro-cta-btn">{t.proBannerCta}</button>
      </div>

      {/* Categories Filter Chips */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 16, paddingBottom: 4 }}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              background: selectedCategory === cat.id ? '#7c3aed' : 'rgba(255,255,255,0.06)',
              border: '1px solid ' + (selectedCategory === cat.id ? '#a855f7' : 'rgba(255,255,255,0.08)'),
              color: '#fff',
              padding: '7px 12px',
              borderRadius: 18,
              fontSize: 11.5,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              whiteSpace: 'nowrap',
              cursor: 'pointer'
            }}
          >
            {cat.icon}
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      <div className="section-title">
        <span>Yozilgan mashg'ulotlaringiz ({filteredSessions.length})</span>
        <ChevronRight size={18} />
      </div>

      {/* Booked Workout Cards */}
      {filteredSessions.map((session) => {
        const isCurrent = session.id === activeSession.id;

        return (
          <div
            key={session.id}
            className="workout-card"
            style={{
              borderColor: isCurrent ? 'rgba(124, 58, 237, 0.6)' : 'rgba(255, 255, 255, 0.07)'
            }}
            onClick={() => onSelectSession(session.id)}
          >
            {/* Map Location Preview */}
            <div className="map-preview">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ background: '#111827' }}>
                <pattern id={`grid-${session.id}`} width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1f2937" strokeWidth="1" />
                </pattern>
                <rect width="100%" height="100%" fill={`url(#grid-${session.id})`} />
                <path d="M -10 40 Q 120 70 300 30 T 500 90" fill="none" stroke="#374151" strokeWidth="12" />
                <path d="M 140 0 L 140 150" fill="none" stroke="#374151" strokeWidth="8" />
                <circle cx="90" cy="40" r="22" fill="#1e3a8a" opacity="0.4" />
              </svg>

              <div className="map-marker">
                <div className="map-marker-pin">
                  <MapPin size={16} />
                </div>
              </div>

              <button className="map-route-btn">
                <Navigation size={11} />
                <span>{session.distance}</span>
              </button>
            </div>

            {/* Gender / Group Tag */}
            <div className="tag-badge">
              <UserCheck size={12} />
              <span>{session.genderRestriction}</span>
            </div>

            {/* Workout Title */}
            <h3 className="workout-name">{session.title}</h3>

            {/* Time & Duration */}
            <div className="workout-datetime">
              <Clock size={14} color="#94a3b8" />
              <span>{session.dateStr}, {session.timeStr} • {session.durationMinutes} min</span>
            </div>

            {/* Warning Notice Block */}
            <div className="warning-block">
              <AlertTriangle className="warning-icon" size={15} />
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
                <Star size={12} fill="#fbbf24" stroke="none" />
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
              <button
                className="confirm-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onStartCheckin(session);
                }}
              >
                <span>{t.confirmBtn}</span>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};
