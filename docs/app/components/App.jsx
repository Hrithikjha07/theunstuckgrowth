import React, { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import SuccessStoriesScreen from './screens/SuccessStoriesScreen';
import CaseStudiesScreen from './screens/CaseStudiesScreen';
import ProfileScreen from './screens/ProfileScreen';
import ServicesScreen from './screens/ServicesScreen';
import MbaConsultingScreen from './screens/MbaConsultingScreen';
import NewsletterScreen from './screens/NewsletterScreen';
import TestimonialsScreen from './screens/TestimonialsScreen';

const App = () => {
  // State to track the active screen
  const [activeScreen, setActiveScreen] = useState('home');
  
  // Function to handle navigation
  const navigateTo = (screen) => {
    setActiveScreen(screen);
  };

  // Render the active screen
  const renderScreen = () => {
    switch(activeScreen) {
      case 'home':
        return <HomeScreen onNavigate={navigateTo} />;
      case 'success-stories':
        return <SuccessStoriesScreen onNavigate={navigateTo} />;
      case 'case-studies':
        return <CaseStudiesScreen onNavigate={navigateTo} />;
      case 'profile':
        return <ProfileScreen onNavigate={navigateTo} />;
      case 'services':
        return <ServicesScreen onNavigate={navigateTo} />;
      case 'mba-consulting':
        return <MbaConsultingScreen onNavigate={navigateTo} />;
      case 'newsletter':
        return <NewsletterScreen onNavigate={navigateTo} />;
      case 'testimonials':
        return <TestimonialsScreen onNavigate={navigateTo} />;
      default:
        return <HomeScreen onNavigate={navigateTo} />;
    }
  };

  // Navigation menu
  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'case-studies', label: 'Case Studies' },
    { id: 'success-stories', label: 'Success Stories' },
    { id: 'newsletter', label: 'Newsletter' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'services', label: 'Services' },
    { id: 'profile', label: 'Swati Shukla' },
    { id: 'mba-consulting', label: 'MBA Consulting' }
  ];

  return (
    <div className="app-container bg-gray-100 min-h-screen flex flex-col items-center py-8">
      {/* Mobile device frame */}
      <div className="mobile-frame bg-white w-[393px] mx-auto relative shadow-2xl rounded-3xl overflow-hidden">
        {/* Render the active screen */}
        {renderScreen()}
      </div>
      
      {/* Screen navigation (development only) */}
      <div className="screen-navigation mt-8 p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-bold mb-2">Navigation</h3>
        <div className="grid grid-cols-2 gap-2">
          {navigationItems.map(item => (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`p-2 rounded text-sm ${
                activeScreen === item.id 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App; 