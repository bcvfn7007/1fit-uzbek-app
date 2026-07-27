import React from 'react';
import { X, Bell, Clock, Sparkles } from 'lucide-react';
import { NotificationItem, Language } from '../types';
import { translations } from '../i18n';

interface NotificationsModalProps {
  notifications: NotificationItem[];
  lang: Language;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  notifications,
  lang,
  onClose
}) => {
  const t = translations[lang];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span>{t.notifications}</span>
          <button className="modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {notifications.map((item) => (
            <div
              key={item.id}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '14px',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start'
              }}
            >
              <div style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: item.type === 'reminder' ? 'rgba(124, 58, 237, 0.2)' : 'rgba(37, 99, 235, 0.2)',
                color: item.type === 'reminder' ? '#a855f7' : '#60a5fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {item.type === 'reminder' ? <Clock size={18} /> : <Sparkles size={18} />}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '2px' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.4, marginBottom: '6px' }}>
                  {item.message}
                </div>
                <div style={{ fontSize: '10px', color: '#64748b' }}>
                  {item.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
