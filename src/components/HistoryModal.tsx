import React from 'react';
import { X, CheckCircle2, Calendar } from 'lucide-react';
import { HistoryItem, Language } from '../types';
import { translations } from '../i18n';

interface HistoryModalProps {
  historyItems: HistoryItem[];
  lang: Language;
  onClose: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  historyItems,
  lang,
  onClose
}) => {
  const t = translations[lang];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span>{t.history}</span>
          <button className="modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {historyItems.map((item) => (
            <div
              key={item.id}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '2px' }}>
                  {item.workoutTitle}
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                  {item.gymName}
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={12} />
                  <span>{item.date}, {item.time}</span>
                </div>
              </div>

              <div style={{
                background: 'rgba(34, 197, 94, 0.15)',
                color: '#4ade80',
                padding: '6px 12px',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <CheckCircle2 size={13} />
                <span>Bajarildi</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
