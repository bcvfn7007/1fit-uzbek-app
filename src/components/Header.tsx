import React from 'react';
import { History, Bell, Globe } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenHistory: () => void;
  onOpenNotifications: () => void;
  unreadNotificationsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageChange,
  onOpenHistory,
  onOpenNotifications,
  unreadNotificationsCount
}) => {
  const t = translations[lang];

  // Dynamic formatted date in Uzbek/ru/en
  const dateStr = lang === 'uz' 
    ? "Dushanba, 24-iyul" 
    : lang === 'ru' 
    ? "Понедельник, 24 июля" 
    : "Monday, July 24";

  return (
    <div className="header">
      <div className="header-title-group">
        <h1 className="header-title">{t.scheduleTitle}</h1>
        <span className="header-date">{dateStr}</span>
      </div>

      <div className="header-actions">
        {/* Language selector */}
        <div className="lang-switcher">
          {(['uz', 'ru', 'en'] as Language[]).map((l) => (
            <button
              key={l}
              className={`lang-btn ${lang === l ? 'active' : ''}`}
              onClick={() => onLanguageChange(l)}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        {/* History Modal Trigger */}
        <button className="icon-btn" onClick={onOpenHistory} title={t.history}>
          <History size={20} />
        </button>

        {/* Notifications Modal Trigger */}
        <button className="icon-btn" onClick={onOpenNotifications} title={t.notifications}>
          <Bell size={20} />
          {unreadNotificationsCount > 0 && <span className="notification-badge" />}
        </button>
      </div>
    </div>
  );
};
