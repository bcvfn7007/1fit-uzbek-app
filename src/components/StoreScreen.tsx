import React from 'react';
import { ShoppingBag, Zap, ShieldCheck, Tag } from 'lucide-react';
import { Language } from '../types';

interface StoreScreenProps {
  lang: Language;
}

export const StoreScreen: React.FC<StoreScreenProps> = () => {
  const products = [
    {
      name: '1FIT PRO (1 Oylik obuna)',
      price: '490,000 UZS',
      desc: 'Barcha залларга cheksiz kirish',
      badge: 'POPULAR'
    },
    {
      name: '1FIT Unlimited (1 Yillik)',
      price: '3,900,000 UZS',
      desc: 'Yillik tejamkorlik va shaxsiy murabbiy bonuses',
      badge: 'BEST VALUE'
    },
    {
      name: 'Proteyn & Fitnes Komplekt',
      price: '320,000 UZS',
      desc: 'Optimum Nutrition Gold Standard Whey',
      badge: 'STORE'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>1FIT Do'kon</h2>

      {products.map((p, idx) => (
        <div key={idx} className="workout-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{
              background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
              color: '#fff',
              fontSize: 10,
              fontWeight: 800,
              padding: '3px 8px',
              borderRadius: 6
            }}>
              {p.badge}
            </span>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#4ade80' }}>{p.price}</span>
          </div>

          <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{p.name}</h3>
          <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 14 }}>{p.desc}</p>

          <button className="confirm-btn">
            <ShoppingBag size={16} />
            <span>Sotib olish</span>
          </button>
        </div>
      ))}
    </div>
  );
};
