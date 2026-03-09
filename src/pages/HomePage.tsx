import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocation } from 'react-router-dom';
import Navigation from '../sections/Navigation';
import HeroSection from '../sections/HeroSection';
import EpisodesSection from '../sections/EpisodesSection';
import FeaturedStorySection from '../sections/FeaturedStorySection';
import GuestVoicesSection from '../sections/GuestVoicesSection';
import NewsletterSection from '../sections/NewsletterSection';
// import ShopSection from '../sections/ShopSection';
import CommunitySection from '../sections/CommunitySection';
import BecomeCreatorSection from '../sections/BecomeCreatorSection';
import ClosingCTASection from '../sections/ClosingCTASection';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);

      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              (range) => value >= range.start - 0.02 && value <= range.end + 0.02
            );

            if (!inPinned) return value;

            return pinnedRanges.reduce(
              (closest, range) =>
                Math.abs(range.center - value) < Math.abs(closest - value)
                  ? range.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace('#', '');
    const timer = setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [location.hash]);

  return (
    <div ref={mainRef} className="relative bg-navy min-h-screen">
      <div className="grain-overlay" />

      <Navigation />

      <main className="relative">
        <div className="pinned-section" style={{ zIndex: 10 }}>
          <HeroSection />
        </div>

        <div style={{ zIndex: 20 }}>
          <EpisodesSection />
        </div>

        <div className="pinned-section" style={{ zIndex: 30 }}>
          <FeaturedStorySection />
        </div>

        <div style={{ zIndex: 40 }}>
          <GuestVoicesSection />
        </div>

        <div className="pinned-section" style={{ zIndex: 50 }}>
          <NewsletterSection />
        </div>

        {/* <div style={{ zIndex: 60 }}>
          <ShopSection />
        </div> */}

        <div style={{ zIndex: 70 }}>
          <CommunitySection />
        </div>

        <div style={{ zIndex: 75 }}>
          <BecomeCreatorSection />
        </div>

        <div className="pinned-section" style={{ zIndex: 80 }}>
          <ClosingCTASection />
        </div>

        <div style={{ zIndex: 90 }}>
          <Footer />
        </div>
      </main>
    </div>
  );
}