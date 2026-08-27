/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageTab, ServiceItem } from './types';
import { SERVICES_DATA } from './data/servicesData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesGrid } from './components/ServicesGrid';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { BotSimulatorView } from './components/BotSimulatorView';
import { InfoModal } from './components/InfoModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [infoModalType, setInfoModalType] = useState<'privacy' | 'terms' | 'support' | null>(null);

  const scrollToServices = () => {
    if (activeTab !== 'home' && activeTab !== 'services') {
      setActiveTab('home');
      setTimeout(() => {
        const el = document.getElementById('services-section');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('services-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceById = (serviceId: string) => {
    const s = SERVICES_DATA.find((item) => item.id === serviceId);
    if (s) {
      setSelectedService(s);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F12] text-[#E0E2E8] flex flex-col justify-between selection:bg-[#00f0ff]/20 selection:text-[#7df4ff]">
      
      {/* Top Sticky Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBot={() => setActiveTab('bot')}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {activeTab === 'home' && (
          <div className="space-y-4">
            {/* Hero Section matching screenshot */}
            <HeroSection
              onScrollToServices={scrollToServices}
              onOpenBot={() => setActiveTab('bot')}
            />

            {/* 8 Services Grid matching screenshot */}
            <ServicesGrid
              services={SERVICES_DATA}
              onSelectService={(service) => setSelectedService(service)}
            />

            {/* About Us Section matching screenshot */}
            <AboutSection
              onOpenBot={() => setActiveTab('bot')}
            />
          </div>
        )}

        {activeTab === 'services' && (
          <div className="pt-8">
            <ServicesGrid
              services={SERVICES_DATA}
              onSelectService={(service) => setSelectedService(service)}
            />
          </div>
        )}

        {activeTab === 'about' && (
          <div className="pt-8">
            <AboutSection
              onOpenBot={() => setActiveTab('bot')}
            />
          </div>
        )}

        {activeTab === 'bot' && (
          <BotSimulatorView
            onSelectServiceModal={handleSelectServiceById}
            onBackToHome={() => setActiveTab('home')}
          />
        )}
      </main>

      {/* Footer matching screenshot */}
      <Footer
        onOpenSupport={() => setInfoModalType('support')}
        onOpenPrivacy={() => setInfoModalType('privacy')}
        onOpenTerms={() => setInfoModalType('terms')}
      />

      {/* Service Detail & Pricing Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onOpenBot={() => {
          setSelectedService(null);
          setActiveTab('bot');
        }}
      />

      {/* Info Modals (Privacy, Terms, Support) */}
      <InfoModal
        type={infoModalType}
        onClose={() => setInfoModalType(null)}
      />

    </div>
  );
}
