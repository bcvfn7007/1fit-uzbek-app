import React from 'react';
import { User, Settings, HelpCircle, Shield, LogOut, ChevronRight, CreditCard, Bell, Sparkles } from 'lucide-react';
import { UserProfile, Language } from '../types';
import { translations } from '../i18n';

interface MoreScreenProps {
  user: UserProfile;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const MoreScreen: React.FC<MoreScreenProps> = ({ user, lang, onLanguageChange }) => {
  const t = translations[lang];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Profile Card Header */}
      <div className="workout-card" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <img src={user.avatarUrl} alt={user.name} style={{ width: 60, height: 60, borderRadius: '50%', border: '2px solid #7c3aed' }} />
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>{user.name}</h3>
          <p style={{ fontSize: 12, color: '#a855f7', fontWeight: 600 }}>@{user.handle}</p>
          <span style={{ fontSize: 11, background: 'rgba(34,197,94,0.15)', color: '#4ade80', padding: '2px 8px', borderRadius: 8, marginTop: 4, display: 'inline-block' }}>
            {user.activePlanName}
          </span>
        </div>
      </div>

      {/* Language Toggle section */}
      <div className="workout-card">
        <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 10 }}>
          Tilni tanlang (Language)
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['uz', 'ru', 'en'] as Language[]).map((l) => (
            <button
              key={l}
              onClick={() => onLanguageChange(l)}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '12px',
                border: '1px solid ' + (lang === l ? '#7c3aed' : 'rgba(255,255,255,0.1)'),
                background: lang === l ? '#7c3aed' : 'transparent',
                color: '#fff',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer'
              }}
            >
              {l === 'uz' ? "O'zbekcha" : l === 'ru' ? 'Русский' : 'English'}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Settings Links */}
      <div className="workout-card" style={{ padding: 8 }}>
        {[
          { icon: <CreditCard size={18} color="#60a5fa" />, title: "Obuna va to'lovlar" },
          { icon: <Bell size={18} color="#a855f7" />, title: 'Bildirishnoma sozlamalari' },
          { icon: <Shield size={18} color="#4ade80" />, title: 'Maxfiylik va Xavfsizlik' },
          { icon: <HelpCircle size={18} color="#f59e0b" />, title: "Qo'llab-quvvatlash xizmati" }
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 14px',
              borderRadius: 12,
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {item.icon}
              <span style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0' }}>{item.title}</span>
            </div>
            <ChevronRight size={16} color="#64748b" />
          </div>
        ))}
      </div>
    </div>
  );
};
