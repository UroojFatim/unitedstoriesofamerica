import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Play, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { episodes } from '../lib/episodes';
import Navigation from '../sections/Navigation';
import ClosingCTASection from '../sections/ClosingCTASection';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function EpisodesPage() {
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: '8vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        }
      );

      const cards = gridRef.current?.querySelectorAll('.episode-card');
      if (cards) {
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: '10vh', opacity: 0, scale: 0.98 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                end: 'top 62%',
                scrub: 0.5,
              },
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen bg-navy text-white">
      <div className="grain-overlay" />

      <Navigation />

      <main className="relative z-10 pt-28 lg:pt-32 pb-20">
        <div className="w-full px-6 lg:px-[8vw]">
          <div ref={headingRef} className="mb-12 lg:mb-16" style={{ opacity: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-4 h-4 text-gold" />
              <span className="font-condensed uppercase tracking-[0.2em] text-gold text-xs">Video Library</span>
            </div>
            <h1 className="font-serif text-4xl lg:text-6xl font-semibold mb-4">All Episodes</h1>
            <p className="text-white/65 text-base lg:text-lg max-w-2xl leading-relaxed">
              Watch every story from United Stories of America. Choose an episode to view the full video and details.
            </p>
          </div>

          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {episodes.map((episode) => (
              <Link key={episode.id} to={`/episodes/${episode.id}`} className="episode-card group cursor-pointer">
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                  <img src={episode.image} alt={episode.title} className="episode-image w-full h-full object-cover transition-transform duration-500" />

                  <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-gold/90 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Play size={24} fill="#0B0F17" className="text-navy ml-1" />
                    </div>
                  </div>

                  <div className="absolute top-3 left-3 px-3 py-1 bg-navy/80 backdrop-blur-sm rounded-full">
                    <span className="font-condensed uppercase tracking-wider text-xs text-gold">{episode.category}</span>
                  </div>

                  <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 bg-navy/80 backdrop-blur-sm rounded-full">
                    <Clock size={12} className="text-white/70" />
                    <span className="text-white/70 text-xs">{episode.duration}</span>
                  </div>
                </div>

                <span className="font-condensed uppercase tracking-wider text-gold text-xs mb-2 block">E{episode.number}</span>
                <h2 className="episode-title font-serif text-xl lg:text-2xl font-semibold text-white mb-2 transition-colors duration-300">
                  {episode.title}
                </h2>
                <p className="text-white/50 text-sm leading-relaxed">{episode.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <div className="pinned-section" style={{ zIndex: 80 }}>
        <ClosingCTASection />
      </div>

      <Footer />
    </div>
  );
}