export type Language = 'uz' | 'ru' | 'en';

export type ScreenTab = 'feed' | 'search' | 'schedule' | 'store' | 'more';

export type FlowModal = 'none' | 'qr_scanner' | 'face_verify' | 'success' | 'notifications' | 'history' | 'help';

export interface WorkoutSession {
  id: string;
  title: string;
  gymName: string;
  gymAddress: string;
  gymRating: number;
  distance: string;
  dateStr: string;
  timeStr: string;
  durationMinutes: number;
  genderRestriction: string;
  isConfirmed: boolean;
  mapCoordinates: { lat: number; lng: number };
  bannerImage: string;
}

export interface UserProfile {
  name: string;
  handle: string;
  avatarUrl: string;
  isPro: boolean;
  activePlanName: string;
  remainingVisits: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'reminder' | 'promo' | 'system';
}

export interface HistoryItem {
  id: string;
  workoutTitle: string;
  gymName: string;
  date: string;
  time: string;
  status: 'completed' | 'cancelled' | 'missed';
}
