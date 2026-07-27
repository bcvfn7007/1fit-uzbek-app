import React, { useState } from 'react';
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

  // User Profile matching Screenshot 5 handle: @aziz.magnat
  const [user] = useState<UserProfile>({
    name: 'Azizbek Magnatov',
    handle: 'aziz.magnat',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
    isPro: true,
    activePlanName: '1FIT Unlimited PRO Pass',
    remainingVisits: 28
  });

  // Booked Workout Session (Matching Image 5: 24-iyul, 20:00 • 120 min, Свободное плавание, Afrosiyob Hotel)
  const [workoutSession, setWorkoutSession] = useState<WorkoutSession>({
    id: 'session-1fit-8924',
    title: 'Свободное плавание',
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
  });

  // Notifications
  const [notifications] = useState<NotificationItem[]>([
    {
      id: 'n1',
      title: 'Mashg\'ulotga 30 daqiqa qoldi!',
      message: 'Afrosiyob Hotel zalida "Свободное плавание" mashg\'ulotini tasdiqlashni unutmang.',
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

  // Handlers for state transition flows
  const handleStartCheckin = () => {
    setFlowModal('qr_scanner');
  };

  const handleQRSuccess = () => {
    setFlowModal('face_verify');
  };

  const handleFaceSuccess = () => {
    setFlowModal('success');
  };

  const handleCompleteFlow = () => {
    setWorkoutSession((prev) => ({ ...prev, isConfirmed: true }));
    setFlowModal('none');
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {/* Optional Top Viewport Switcher Banner for Desktop Testing */}
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

      {/* Main App Container */}
      <div className={`app-wrapper ${!isMobileFrameView ? 'full-window' : ''}`} style={!isMobileFrameView ? { maxWidth: '100%', height: '100vh', maxHeight: '100vh', borderRadius: 0 } : {}}>
        {/* Device Status Bar */}
        <div className="status-bar">
          <span>19:57</span>
          <div className="status-bar-icons">
            <span style={{ fontSize: 11, letterSpacing: 0.5 }}>VoLTE 4G+</span>
            <span style={{ fontSize: 11, background: '#22c55e', color: '#000', padding: '1px 5px', borderRadius: 6, fontWeight: 800 }}>97</span>
          </div>
        </div>

        {/* Main Screen Container */}
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
              session={workoutSession}
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
            session={workoutSession}
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
