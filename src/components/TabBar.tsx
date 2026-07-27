import React from 'react';
import { Newspaper, Search, Calendar, ShoppingBag, MoreHorizontal } from 'lucide-react';
import { ScreenTab, Language } from '../types';
import { translations } from '../i18n';

interface TabBarProps {
  activeTab: ScreenTab;
  onSelectTab: (tab: ScreenTab) => void;
  lang: Language;
}

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onSelectTab, lang }) => {
  const t = translations[lang].tabs;

  const tabs: { id: ScreenTab; label: string; icon: React.ReactNode }[] = [
    { id: 'feed', label: t.feed, icon: <Newspaper size={22} /> },
    { id: 'search', label: t.search, icon: <Search size={22} /> },
    { id: 'schedule', label: t.schedule, icon: <Calendar size={22} /> },
    { id: 'store', label: t.store, icon: <ShoppingBag size={22} /> },
    { id: 'more', label: t.more, icon: <MoreHorizontal size={22} /> },
  ];

  return (
    <nav className="tab-bar">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onSelectTab(tab.id)}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};
