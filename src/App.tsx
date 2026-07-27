import React, { useState } from 'react';
import './index.css';
import { Language, ScreenTab, WorkoutSession, UserProfile, NotificationItem, HistoryItem } from './types';
import { Header } from './components/Header';
import { TabBar } from './components/TabBar';
import { ScheduleScreen } from './components/ScheduleScreen';
import { QRScannerScreen } from './components/QRScannerScreen';
import { FaceVerifyScreen } from './components/FaceVerifyScreen';
import { SuccessScreen } from './components/SuccessScreen';
import { NotificationsModal } from './components/NotificationsModal';
import { HistoryModal } from './components/HistoryModal';
import { HelpModal } from './components/HelpModal';
import { FeedScreen } from './components/FeedScreen';
import { SearchScreen } from './components/SearchScreen';
import { StoreScreen } from './components/StoreScreen';
import { MoreScreen } from './components/MoreScreen';
import { Smartphone, Monitor } from 'lucide-react';

export const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('uz');
  const [activeTab, setActiveTab] = useState<ScreenTab>('schedule');
  const [flowModal, setFlowModal] = useState<'none' | 'qr_scanner' | 'face_verify' | 'success' | 'notifications' | 'history' | 'help'>('none');
  const [isMobileFrameView, setIsMobileFrameView] = useState<boolean>(true);

  // User Profile matching screenshot 5
  const [user] = useState<UserProfile>({
    name: 'Azizbek Magnatov',
    handle: 'aziz.magnat',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
    isPro: true,
    activePlanName: '1FIT Unlimited PRO Pass',
    remainingVisits: 28
  });

  // Multiple 1FIT Workout Sessions across different gyms
  const [workoutSessions, setWorkoutSessions] = useState<WorkoutSession[]>([
    {
      id: 'session-1',
      title: 'Свободное плавание',
      category: 'suzish',
      gymName: 'Afrosiyob Hotel',
      gymAddress: 'Toshkent sh., Afrosiyob ko\'chasi 12A',
      gymRating: 4.9,
      distance: '1.2 km',
      dateStr: '24-iyul',
      timeStr: '20:00',
      durationMinutes: 120,
      genderRestriction: 'Faqat erkaklar uchun',
      isConfirmed: false,
      mapCoordinates: { lat: 41.3111, lng: 69.2797 },
      bannerImage: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600'
    },
    {
      id: 'session-2',
      title: 'CrossFit Power & Conditioning',
      category: 'crossfit',
      gymName: 'BeFit Premium',
      gymAddress: 'Toshkent sh., Amir Temur shoh ko\'chasi 45',
      gymRating: 4.9,
      distance: '2.1 km',
      dateStr: '25-iyul',
      timeStr: '18:30',
      durationMinutes: 60,
      genderRestriction: 'Aralash guruhi',
      isConfirmed: false,
      mapCoordinates: { lat: 41.3211, lng: 69.2897 },
      bannerImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600'
    },
    {
      id: 'session-3',
      title: 'Yoga & Pilates Relax',
      category: 'yoga',
      gymName: 'Chekhov Sport Club',
      gymAddress: 'Toshkent sh., Chekhov ko\'chasi 8',
      gymRating: 4.8,
      distance: '3.4 km',
      dateStr: '26-iyul',
      timeStr: '10:00',
      durationMinutes: 90,
      genderRestriction: 'Faqat ayollar uchun',
      isConfirmed: false,
      mapCoordinates: { lat: 41.3011, lng: 69.2697 },
      bannerImage: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600'
    },
    {
      id: 'session-4',
      title: 'Boks & Kikboksing Training',
      category: 'boks',
      gymName: 'Buka Gym Tashkent',
      gymAddress: 'Toshkent sh., Oybek ko\'chasi 24',
      gymRating: 4.9,
      distance: '1.8 km',
      dateStr: '27-iyul',
      timeStr: '19:00',
      durationMinutes: 75,
      genderRestriction: 'Aralash guruhi',
      isConfirmed: false,
      mapCoordinates: { lat: 41.3055, lng: 69.2755 },
      bannerImage: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600'
    }
  ]);

  const [activeSessionId, setActiveSessionId] = useState<string>('session-1');

  const currentSession = workoutSessions.find((s) => s.id === activeSessionId) || workoutSessions[0];

  // Notifications
  const [notifications] = useState<NotificationItem[]>([
    {
      id: 'n1',
      title: 'Mashg\'ulotga 30 daqiqa qoldi!',
      message: `${currentSession.gymName} zalida "${currentSession.title}" mashg'ulotini tasdiqlashni unutmang.`,
      time: '19:30',
      read: false,
      type: 'reminder'
    },
    {
      id: 'n2',
      title: '1FIT PRO obunasi faollashtirildi 🎉',
      message: 'Endi 200+ zallarga kirish va premium imtiyozlardan foydalanishingiz mumkin.',
      time: 'Kecha',
      read: true,
      type: 'promo'
    }
  ]);

  // History
  const [historyItems] = useState<HistoryItem[]>([
    {
      id: 'h1',
      workoutTitle: 'Erkin suzish & Spa',
      gymName: 'BeFit Premium',
      date: '22-iyul',
      time: '18:30',
      status: 'completed'
    },
    {
      id: 'h2',
      workoutTitle: 'CrossFit Power Training',
      gymName: 'Chekhov Sport Club',
      date: '20-iyul',
      time: '19:00',
      status: 'completed'
    }
  ]);

  // Handlers
  const handleStartCheckin = (session: WorkoutSession) => {
    setActiveSessionId(session.id);
    setFlowModal('qr_scanner');
  };

  const handleQRSuccess = () => {
    setFlowModal('face_verify');
  };

  const handleFaceSuccess = () => {
    setFlowModal('success');
  };

  const handleCompleteFlow = () => {
    setWorkoutSessions((prev) =>
      prev.map((s) => (s.id === activeSessionId ? { ...s, isConfirmed: true } : s))
    );
    setFlowModal('none');
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {/* Viewport Mode Switcher */}
      <div style={{
        position: 'fixed',
        top: 12,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 300,
        background: 'rgba(19, 27, 46, 0.9)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: 20,
        padding: '6px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
        color: '#e2e8f0',
        fontSize: 12,
        fontWeight: 600
      }}>
        <span>📱 Mobile Framed Mode:</span>
        <button
          onClick={() => setIsMobileFrameView(!isMobileFrameView)}
          style={{
            background: isMobileFrameView ? '#7c3aed' : 'rgba(255,255,255,0.1)',
            border: 'none',
            color: '#fff',
            padding: '4px 10px',
            borderRadius: 12,
            fontSize: 11,
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}
        >
          {isMobileFrameView ? <Smartphone size={14} /> : <Monitor size={14} />}
          <span>{isMobileFrameView ? "Phone Frame" : "Full Window"}</span>
        </button>
      </div>

      {/* Main App Shell */}
      <div className={`app-wrapper ${!isMobileFrameView ? 'full-window' : ''}`} style={!isMobileFrameView ? { maxWidth: '100%', height: '100vh', maxHeight: '100vh', borderRadius: 0 } : {}}>
        {/* Device Status Bar */}
        <div className="status-bar">
          <span>19:57</span>
          <div className="status-bar-icons">
            <span style={{ fontSize: 11, letterSpacing: 0.5 }}>VoLTE 4G+</span>
            <span className="battery-pill">97</span>
          </div>
        </div>

        {/* Screen Content Container */}
        <div className="screen-container">
          <Header
            lang={lang}
            onLanguageChange={setLang}
            onOpenHistory={() => setFlowModal('history')}
            onOpenNotifications={() => setFlowModal('notifications')}
            unreadNotificationsCount={notifications.filter(n => !n.read).length}
          />

          {/* Tab Views */}
          {activeTab === 'schedule' && (
            <ScheduleScreen
              sessions={workoutSessions}
              activeSessionId={activeSessionId}
              onSelectSession={setActiveSessionId}
              lang={lang}
              onStartCheckin={handleStartCheckin}
            />
          )}

          {activeTab === 'feed' && <FeedScreen lang={lang} />}
          {activeTab === 'search' && <SearchScreen lang={lang} />}
          {activeTab === 'store' && <StoreScreen lang={lang} />}
          {activeTab === 'more' && (
            <MoreScreen
              user={user}
              lang={lang}
              onLanguageChange={setLang}
            />
          )}
        </div>

        {/* Bottom Tab Bar */}
        <TabBar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          lang={lang}
        />

        {/* FULLSCREEN CHECK-IN FLOW MODALS */}
        {flowModal === 'qr_scanner' && (
          <QRScannerScreen
            lang={lang}
            onClose={() => setFlowModal('none')}
            onSuccessQR={handleQRSuccess}
            onOpenHelp={() => setFlowModal('help')}
          />
        )}

        {flowModal === 'face_verify' && (
          <FaceVerifyScreen
            lang={lang}
            onClose={() => setFlowModal('none')}
            onSuccessFace={handleFaceSuccess}
            onOpenHelp={() => setFlowModal('help')}
          />
        )}

        {flowModal === 'success' && (
          <SuccessScreen
            session={currentSession}
            user={user}
            lang={lang}
            onFinish={handleCompleteFlow}
          />
        )}

        {/* DIALOG MODALS */}
        {flowModal === 'notifications' && (
          <NotificationsModal
            notifications={notifications}
            lang={lang}
            onClose={() => setFlowModal('none')}
          />
        )}

        {flowModal === 'history' && (
          <HistoryModal
            historyItems={historyItems}
            lang={lang}
            onClose={() => setFlowModal('none')}
          />
        )}

        {flowModal === 'help' && (
          <HelpModal
            lang={lang}
            onClose={() => setFlowModal('none')}
          />
        )}
      </div>
    </div>
  );
};
