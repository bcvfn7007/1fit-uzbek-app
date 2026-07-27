import React, { useState } from 'react';
import { Search, MapPin, Star, Filter, Dumbbell, Waves, Zap, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface SearchScreenProps {
  lang: Language;
}

export const SearchScreen: React.FC<SearchScreenProps> = () => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('barchasi');

  const gyms = [
    {
      name: 'BeFit Premium',
      category: 'fitnes',
      address: 'Toshkent, Amir Temur 45',
      rating: 4.9,
      distance: '1.2 km',
      tags: ['Suzish havzasi', 'Sauna', 'CrossFit'],
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500'
    },
    {
      name: 'Afrosiyob Hotel Fitness & Spa',
      category: 'suzish',
      address: 'Toshkent, Afrosiyob 12A',
      rating: 4.8,
      distance: '2.5 km',
      tags: ['Erkin suzish', 'Spa', 'Jakuzi'],
      image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=500'
    },
    {
      name: 'Chekhov Sport Club',
      category: 'fitnes',
      address: 'Toshkent, Chekhov ko\'chasi 8',
      rating: 4.9,
      distance: '3.1 km',
      tags: ['Trench', 'Boks', 'Pilates'],
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=500'
    }
  ];

  const filteredGyms = gyms.filter(g => 
    (activeCategory === 'barchasi' || g.category === activeCategory) &&
    (g.name.toLowerCase().includes(query.toLowerCase()) || g.address.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>Qidiruv va Zallar</h2>

      {/* Search Input Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: '#131b2e',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 16,
        padding: '10px 14px',
        gap: 10
      }}>
        <Search size={20} color="#94a3b8" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Zal nomi, fitnes turini qidiring..."
          style={{
            background: 'none',
            border: 'none',
            outline: 'none',
            color: '#fff',
            fontSize: 14,
            width: '100%'
          }}
        />
        <Filter size={18} color="#a855f7" style={{ cursor: 'pointer' }} />
      </div>

      {/* Category Chips */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
        {[
          { id: 'barchasi', label: 'Barchasi', icon: <Sparkles size={14} /> },
          { id: 'fitnes', label: 'Fitnes & Zal', icon: <Dumbbell size={14} /> },
          { id: 'suzish', label: 'Havza / Suzish', icon: <Waves size={14} /> },
          { id: 'yakkakurash', label: 'Boks & MMA', icon: <Zap size={14} /> }
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              background: activeCategory === cat.id ? '#7c3aed' : '#131b2e',
              border: '1px solid ' + (activeCategory === cat.id ? '#a855f7' : 'rgba(255,255,255,0.08)'),
              color: '#fff',
              padding: '8px 14px',
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 600,
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

      {/* Gym Cards */}
      {filteredGyms.map((gym, idx) => (
        <div key={idx} className="workout-card" style={{ padding: 0, overflow: 'hidden' }}>
          <img src={gym.image} alt={gym.name} style={{ width: '100%', height: 140, objectFit: 'cover' }} />
          <div style={{ padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>{gym.name}</h3>
              <div className="rating-badge">
                <Star size={12} fill="#fbbf24" stroke="none" />
                <span>{gym.rating}</span>
              </div>
            </div>

            <div style={{ fontSize: 12, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 10 }}>
              <MapPin size={14} color="#a855f7" />
              <span>{gym.address} ({gym.distance})</span>
            </div>

            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {gym.tags.map((tag, tIdx) => (
                <span key={tIdx} style={{
                  background: 'rgba(255,255,255,0.06)',
                  color: '#cbd5e1',
                  padding: '3px 8px',
                  borderRadius: 8,
                  fontSize: 10,
                  fontWeight: 600
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
