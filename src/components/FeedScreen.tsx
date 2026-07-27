import React from 'react';
import { Heart, MessageCircle, Share2, Flame, Award } from 'lucide-react';
import { Language } from '../types';

interface FeedScreenProps {
  lang: Language;
}

export const FeedScreen: React.FC<FeedScreenProps> = () => {
  const posts = [
    {
      id: '1',
      author: 'Sardorbek Olimov',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      time: '2 soat oldin',
      gym: 'BeFit Premium',
      text: 'Bugun 100 metr masofani yangi shaxsiy rekord bilan suzib o\'tdim! 🏊‍♂️💪 1FIT a\'zoligi juda qulay!',
      likes: 24,
      image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=600'
    },
    {
      id: '2',
      author: 'Malika Karimova',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      time: '5 soat oldin',
      gym: 'Chekhov Sport Club',
      text: 'Ertalabki Yoga mashg\'ulotlari kayfiyatni a\'lo qiladi 🧘‍♀️✨',
      likes: 42,
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>
        Lenta (Jamiyat)
      </div>

      <div style={{
        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(37, 99, 235, 0.2))',
        border: '1px solid rgba(168, 85, 247, 0.3)',
        borderRadius: 20,
        padding: 16,
        display: 'flex',
        alignItems: 'center',
        gap: 14
      }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          <Flame size={24} />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>Haftalik Streak: 4 kun 🔥</div>
          <div style={{ fontSize: 12, color: '#94a3b8' }}>Maqsadingizga erishish uchun yana 1 ta mashg'ulot qoldi!</div>
        </div>
      </div>

      {posts.map((post) => (
        <div key={post.id} className="workout-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <img src={post.avatar} alt={post.author} style={{ width: 40, height: 40, borderRadius: '50%' }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>{post.author}</div>
              <div style={{ fontSize: 11, color: '#94a3b8' }}>{post.gym} • {post.time}</div>
            </div>
          </div>

          <p style={{ fontSize: 13, color: '#e2e8f0', lineHeight: 1.5, marginBottom: 12 }}>
            {post.text}
          </p>

          <img src={post.image} alt="post" style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 16, marginBottom: 12 }} />

          <div style={{ display: 'flex', gap: 16, color: '#94a3b8', fontSize: 13 }}>
            <button style={{ background: 'none', border: 'none', color: '#f43f5e', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', fontWeight: 600 }}>
              <Heart size={18} fill="#f43f5e" /> {post.likes}
            </button>
            <button style={{ background: 'none', border: 'none', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
              <MessageCircle size={18} /> Izohlar
            </button>
            <button style={{ background: 'none', border: 'none', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
              <Share2 size={18} /> Ulashish
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
