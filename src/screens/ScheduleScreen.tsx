import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../theme/colors';
import { WorkoutSession, Language } from '../types';
import { translations } from '../i18n';
import { MapPin, Navigation, Star, Clock, AlertTriangle, CheckCircle2, ChevronRight, UserCheck, Dumbbell, Waves, Zap, Sparkles, Heart } from 'lucide-react-native';

interface ScheduleScreenProps {
  sessions: WorkoutSession[];
  activeSessionId: string;
  onSelectSession: (id: string) => void;
  lang: Language;
  onStartCheckin: (session: WorkoutSession) => void;
}

export const ScheduleScreen: React.FC<ScheduleScreenProps> = ({
  sessions,
  activeSessionId,
  onSelectSession,
  lang,
  onStartCheckin
}) => {
  const t = translations[lang];
  const [selectedCategory, setSelectedCategory] = useState<string>('barchasi');

  const categories = [
    { id: 'barchasi', label: 'Barchasi', icon: <Sparkles size={14} color="#ffffff" /> },
    { id: 'suzish', label: 'Erkin suzish', icon: <Waves size={14} color="#ffffff" /> },
    { id: 'fitnes', label: 'Fitnes & Zal', icon: <Dumbbell size={14} color="#ffffff" /> },
    { id: 'crossfit', label: 'CrossFit Pro', icon: <Zap size={14} color="#ffffff" /> },
    { id: 'yoga', label: 'Yoga & Pilates', icon: <Heart size={14} color="#ffffff" /> },
  ];

  const filteredSessions = sessions.filter(
    (s) => selectedCategory === 'barchasi' || s.category === selectedCategory
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* PRO Banner */}
      <View style={styles.proBanner}>
        <Text style={styles.proBadge}>PRO CLUB</Text>
        <Text style={styles.proTitle}>{t.proBannerTitle}</Text>
        <Text style={styles.proDesc}>{t.proBannerDesc}</Text>
        <TouchableOpacity style={styles.proCtaBtn} activeOpacity={0.8}>
          <Text style={styles.proCtaText}>{t.proBannerCta}</Text>
        </TouchableOpacity>
      </View>

      {/* Category Chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <TouchableOpacity
              key={cat.id}
              style={[styles.catChip, isActive && styles.catChipActive]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              {cat.icon}
              <Text style={[styles.catText, isActive && styles.catTextActive]}>{cat.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Yozilgan mashg'ulotlaringiz ({filteredSessions.length})</Text>
        <ChevronRight size={18} color={COLORS.textMuted} />
      </View>

      {/* Sessions List */}
      {filteredSessions.map((session) => {
        const isCurrent = session.id === activeSessionId;
        return (
          <TouchableOpacity
            key={session.id}
            style={[styles.card, isCurrent && styles.cardActive]}
            activeOpacity={0.9}
            onPress={() => onSelectSession(session.id)}
          >
            {/* Map Preview */}
            <View style={styles.mapContainer}>
              <Image source={{ uri: session.bannerImage }} style={styles.mapImage} />
              <View style={styles.mapOverlay} />
              <View style={styles.markerContainer}>
                <View style={styles.markerPin}>
                  <MapPin size={16} color="#ffffff" />
                </View>
              </View>
              <View style={styles.distanceBadge}>
                <Navigation size={11} color="#ffffff" />
                <Text style={styles.distanceText}>{session.distance}</Text>
              </View>
            </View>

            {/* Tag Badge */}
            <View style={styles.tagBadge}>
              <UserCheck size={12} color="#c084fc" />
              <Text style={styles.tagText}>{session.genderRestriction}</Text>
            </View>

            {/* Title & DateTime */}
            <Text style={styles.workoutTitle}>{session.title}</Text>
            <View style={styles.datetimeRow}>
              <Clock size={14} color={COLORS.textMuted} />
              <Text style={styles.datetimeText}>{session.dateStr}, {session.timeStr} • {session.durationMinutes} min</Text>
            </View>

            {/* Warning Block */}
            <View style={styles.warningBox}>
              <AlertTriangle size={15} color="#f59e0b" style={{ marginTop: 1 }} />
              <Text style={styles.warningText}>{t.warningNotice}</Text>
            </View>

            {/* Gym Subcard */}
            <View style={styles.gymSubcard}>
              <View>
                <Text style={styles.gymName}>{session.gymName}</Text>
                <Text style={styles.gymAddress}>{session.gymAddress}</Text>
              </View>
              <View style={styles.ratingBadge}>
                <Star size={12} color="#fbbf24" fill="#fbbf24" />
                <Text style={styles.ratingText}>{session.gymRating}</Text>
              </View>
            </View>

            {/* Action Button */}
            {session.isConfirmed ? (
              <View style={[styles.confirmBtn, styles.confirmedBtn]}>
                <CheckCircle2 size={18} color="#4ade80" />
                <Text style={styles.confirmedBtnText}>{t.confirmedBadge}</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.confirmBtn}
                activeOpacity={0.85}
                onPress={() => onStartCheckin(session)}
              >
                <Text style={styles.confirmBtnText}>{t.confirmBtn}</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
  },
  content: {
    padding: 16,
    paddingBottom: 90,
  },
  proBanner: {
    backgroundColor: '#7c3aed',
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
  },
  proBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '800',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  proTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  proDesc: {
    fontSize: 11.5,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 12,
  },
  proCtaBtn: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  proCtaText: {
    color: '#4f46e5',
    fontSize: 12,
    fontWeight: '800',
  },
  catScroll: {
    marginBottom: 16,
  },
  catChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 18,
    marginRight: 8,
  },
  catChipActive: {
    backgroundColor: COLORS.accentPurple,
    borderColor: '#a855f7',
  },
  catText: {
    color: COLORS.textMuted,
    fontSize: 11.5,
    fontWeight: '700',
  },
  catTextActive: {
    color: '#ffffff',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 22,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
  },
  cardActive: {
    borderColor: 'rgba(124, 58, 237, 0.6)',
  },
  mapContainer: {
    height: 125,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 12,
    backgroundColor: '#111827',
  },
  mapImage: {
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(17, 24, 39, 0.4)',
  },
  markerContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -16 }, { translateY: -16 }],
  },
  markerPin: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.accentPurple,
    borderWidth: 2,
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  distanceBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  distanceText: {
    color: '#ffffff',
    fontSize: 10.5,
    fontWeight: '700',
  },
  tagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(124, 58, 237, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  tagText: {
    color: '#c084fc',
    fontSize: 11,
    fontWeight: '700',
  },
  workoutTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  datetimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  datetimeText: {
    color: COLORS.textMuted,
    fontSize: 12.5,
  },
  warningBox: {
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  warningText: {
    color: '#fcd34d',
    fontSize: 11,
    lineHeight: 15,
    flex: 1,
  },
  gymSubcard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    padding: 10,
    borderRadius: 12,
    marginBottom: 14,
  },
  gymName: {
    color: '#ffffff',
    fontSize: 13.5,
    fontWeight: '700',
  },
  gymAddress: {
    color: COLORS.textMuted,
    fontSize: 10.5,
    marginTop: 1,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(251, 191, 36, 0.15)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  ratingText: {
    color: '#fbbf24',
    fontSize: 11.5,
    fontWeight: '800',
  },
  confirmBtn: {
    backgroundColor: COLORS.accentPurple,
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  confirmBtnText: {
    color: '#ffffff',
    fontSize: 14.5,
    fontWeight: '700',
  },
  confirmedBtn: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  confirmedBtnText: {
    color: '#4ade80',
    fontSize: 14.5,
    fontWeight: '700',
  },
});
