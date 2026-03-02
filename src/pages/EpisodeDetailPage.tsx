import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, Clock, Play, Star } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { episodes, getEpisodeById } from '../lib/episodes';
import Navigation from '../sections/Navigation';
import ClosingCTASection from '../sections/ClosingCTASection';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function EpisodeDetailPage() {
  const { episodeId } = useParams();
  const episode = episodeId ? getEpisodeById(episodeId) : undefined;
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLElement>(null);
  const infoRef = useRef<HTMLElement>(null);
  const relatedRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!episode) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      );

      gsap.fromTo(
        videoRef.current,
        { y: '10vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: videoRef.current,
            start: 'top 88%',
            end: 'top 60%',
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        infoRef.current,
        { y: '8vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 88%',
            end: 'top 62%',
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        relatedRef.current,
        { y: '8vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: relatedRef.current,
            start: 'top 90%',
            end: 'top 64%',
            scrub: 0.5,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [episode]);

  if (!episode) {
    return (
      <div className="relative min-h-screen bg-navy text-white">
        <div className="grain-overlay" />
        <Navigation />
        <main className="relative z-10 min-h-[70vh] pt-28 lg:pt-32 flex items-center justify-center px-6">
          <div className="max-w-xl text-center">
            <p className="font-condensed uppercase tracking-[0.2em] text-gold text-sm mb-4">Episode not found</p>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">This story is unavailable</h1>
            <p className="text-white/70 leading-relaxed mb-8">
              The episode may have moved or the link is incorrect. Return to the home page and choose another story.
            </p>
            <Link to="/" className="btn-primary inline-flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const moreEpisodes = episodes.filter((item) => item.id !== episode.id).slice(0, 3);

  return (
    <div className="relative min-h-screen bg-navy text-white">
      <div className="grain-overlay" />

      <Navigation />

      <main className="relative z-10 pt-28 lg:pt-32 pb-20">
        <section ref={heroRef} className="pb-10 lg:pb-14" style={{ opacity: 0 }}>
          <div className="w-full px-6 lg:px-[8vw] grid lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-16 items-end">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-4 h-4 text-gold" />
                <span className="font-condensed uppercase tracking-[0.2em] text-gold text-xs">Episode {episode.number}</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] mb-5">
                {episode.title}
              </h1>
              <p className="text-white/75 text-base lg:text-lg max-w-2xl leading-relaxed">{episode.description}</p>
            </div>

            <div className="bg-white/5 border border-white/15 rounded-2xl p-6">
              <p className="font-condensed uppercase tracking-widest text-gold text-xs mb-4">Episode details</p>
              <div className="space-y-3 text-sm text-white/70">
                <p>Category: <span className="text-white">{episode.category}</span></p>
                <p>Released: <span className="text-white">{episode.releasedAt}</span></p>
                <p className="flex items-center gap-2">
                  <Clock size={14} className="text-white/70" />
                  <span className="text-white">{episode.duration}</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section ref={videoRef} className="pb-14" style={{ opacity: 0 }}>
          <div className="w-full px-6 lg:px-[8vw]">
            <div className="rounded-2xl border border-white/15 overflow-hidden bg-black/40">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src={episode.videoEmbedUrl}
                  title={episode.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>

        <section ref={infoRef} className="pb-16 lg:pb-20" style={{ opacity: 0 }}>
          <div className="w-full px-6 lg:px-[8vw] grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16">
            <article>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold mb-4">Story overview</h2>
              <p className="text-white/75 leading-relaxed">{episode.story}</p>
            </article>

            <article>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold mb-4">In this episode</h2>
              <ul className="space-y-3">
                {episode.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-white/75 leading-relaxed">
                    <Play size={14} className="text-gold mt-1" fill="currentColor" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section ref={relatedRef} className="border-t border-white/10 pt-14" style={{ opacity: 0 }}>
          <div className="w-full px-6 lg:px-[8vw]">
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold mb-8">Watch more episodes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {moreEpisodes.map((item) => (
                <Link key={item.id} to={`/episodes/${item.id}`} className="episode-card group block">
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                    <img src={item.image} alt={item.title} className="episode-image w-full h-full object-cover transition-transform duration-500" />
                    <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-gold/90 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <Play size={20} fill="#0B0F17" className="text-navy ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <span className="font-condensed uppercase tracking-wider text-gold text-xs mb-2 block">E{item.number}</span>
                  <h3 className="episode-title font-serif text-xl font-semibold text-white mb-2 transition-colors duration-300">{item.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <div className="pinned-section" style={{ zIndex: 80 }}>
        <ClosingCTASection />
      </div>

      <Footer />
    </div>
  );
}