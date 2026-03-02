import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { episodes } from '../lib/episodes';

gsap.registerPlugin(ScrollTrigger);

export default function EpisodesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.5,
          },
        }
      );

      // Cards animation
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
                start: 'top 85%',
                end: 'top 60%',
                scrub: 0.5,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="episodes"
      className="bg-navy py-20 lg:py-32"
    >
      <div className="w-full px-6 lg:px-[8vw]">
        {/* Heading */}
        <div ref={headingRef} className="mb-12 lg:mb-16">
          <h2 className="font-serif text-4xl lg:text-6xl font-semibold text-white mb-4">
            Episodes
          </h2>
          <p className="text-white/60 text-base lg:text-lg max-w-xl leading-relaxed">
            Documentary video episodes and long-form conversations—one story at a time.
          </p>
        </div>

        {/* Episodes Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {episodes.map((episode) => (
            <Link
              key={episode.id}
              to={`/episodes/${episode.id}`}
              className="episode-card group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                <img
                  src={episode.image}
                  alt={episode.title}
                  className="episode-image w-full h-full object-cover transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-gold/90 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Play size={24} fill="#0B0F17" className="text-navy ml-1" />
                  </div>
                </div>
                {/* Category Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 bg-navy/80 backdrop-blur-sm rounded-full">
                  <span className="font-condensed uppercase tracking-wider text-xs text-gold">
                    {episode.category}
                  </span>
                </div>
                {/* Duration */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 bg-navy/80 backdrop-blur-sm rounded-full">
                  <Clock size={12} className="text-white/70" />
                  <span className="text-white/70 text-xs">{episode.duration}</span>
                </div>
              </div>

              {/* Content */}
              <div>
                <span className="font-condensed uppercase tracking-wider text-gold text-xs mb-2 block">
                  E{episode.number}
                </span>
                <h3 className="episode-title font-serif text-xl lg:text-2xl font-semibold text-white mb-2 transition-colors duration-300">
                  {episode.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {episode.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-12 lg:mt-16">
          <Link to="/episodes" className="group flex items-center gap-2 text-gold font-condensed uppercase tracking-widest text-sm hover:text-white transition-colors">
            View all episodes
            <ArrowRight
              size={16}
              className="transform group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
