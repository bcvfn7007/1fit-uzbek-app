import React from 'react';
import { X, HelpCircle, PhoneCall, MessageSquare, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n';

interface HelpModalProps {
  lang: Language;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ lang, onClose }) => {
  const t = translations[lang];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <HelpCircle color="#8b5cf6" size={20} />
            <span>{t.needHelp}</span>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, color: '#e2e8f0' }}>
          <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>
            QR-kodni skanerlashda yoki Yuz verifikatsiyasida muammo yuzaga kelgan bo'lsa, zal administratoriga murojaat qiling yoki qo'llab-quvvatlash xizmatiga yozing.
          </p>

          <a
            href="tel:+998712000000"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: 'rgba(255, 255, 255, 0.05)',
              padding: 14,
              borderRadius: 16,
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: 14
            }}
          >
            <PhoneCall size={18} color="#38bdf8" />
            <span>Qo'llab-quvvatlash call-markazi: +998 71 200-00-00</span>
          </a>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: 'rgba(255, 255, 255, 0.05)',
              padding: 14,
              borderRadius: 16,
              fontWeight: 600,
              fontSize: 14
            }}
          >
            <MessageSquare size={18} color="#a855f7" />
            <span>Telegram Bot: @onefit_support_bot</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: 'rgba(255, 255, 255, 0.05)',
              padding: 14,
              borderRadius: 16,
              fontWeight: 600,
              fontSize: 14
            }}
          >
            <ShieldCheck size={18} color="#4ade80" />
            <span>Administrator orqali manual check-in</span>
          </div>
        </div>
      </div>
    </div>
  );
};
