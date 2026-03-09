import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Camera, Mic, Clapperboard } from 'lucide-react';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function BecomeCreatorPage() {
  const introRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        introRef.current,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      );

      gsap.fromTo(
        formRef.current,
        { y: '10vh', opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 88%',
            end: 'top 62%',
            scrub: 0.5,
          },
        }
      );

      const steps = stepsRef.current?.querySelectorAll('.creator-process-card');
      if (steps) {
        gsap.fromTo(
          steps,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: stepsRef.current,
              start: 'top 88%',
              end: 'top 62%',
              scrub: 0.4,
            },
          }
        );
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
          <section ref={introRef} className="max-w-3xl mb-10 lg:mb-12" style={{ opacity: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-4 h-4 text-gold" />
              <p className="font-condensed uppercase tracking-[0.2em] text-gold text-xs">Become a Creator</p>
            </div>
            <h1 className="font-serif text-4xl lg:text-6xl font-semibold leading-[1.05] mb-5">
              Apply to tell your
              <span className="text-gold"> story on camera.</span>
            </h1>
            <p className="text-white/70 leading-relaxed max-w-2xl">
              Share your concept, what drives you, and why your voice matters. If your idea fits our upcoming slate, our team will reach out with production next steps.
            </p>
          </section>

          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-10">
            <section
              ref={formRef}
              className="bg-white/5 border border-white/15 rounded-2xl p-6 lg:p-8"
              style={{ opacity: 0 }}
            >
              <h2 className="font-serif text-2xl lg:text-3xl font-semibold mb-6">Creator application</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="creator-name" className="block text-white/60 text-sm mb-2">Full name</label>
                  <input id="creator-name" type="text" placeholder="Your name" className="input-dark" />
                </div>

                <div>
                  <label htmlFor="creator-email" className="block text-white/60 text-sm mb-2">Email address</label>
                  <input id="creator-email" type="email" placeholder="you@example.com" className="input-dark" />
                </div>

                <div>
                  <label htmlFor="creator-location" className="block text-white/60 text-sm mb-2">Location</label>
                  <input id="creator-location" type="text" placeholder="City, State" className="input-dark" />
                </div>

                <div>
                  <label htmlFor="creator-idea" className="block text-white/60 text-sm mb-2">Story concept</label>
                  <input id="creator-idea" type="text" placeholder="What story do you want to tell?" className="input-dark" />
                </div>

                <div>
                  <label htmlFor="creator-message" className="block text-white/60 text-sm mb-2">Why this story matters</label>
                  <textarea
                    id="creator-message"
                    rows={5}
                    placeholder="Tell us the perspective and impact you want to share..."
                    className="input-dark resize-none"
                  />
                </div>

                <button type="button" className="btn-primary w-full">Submit Application</button>
              </form>
            </section>

            <section ref={stepsRef} className="space-y-4 lg:space-y-5">
              <article className="creator-process-card bg-white/5 border border-white/10 rounded-xl p-5 lg:p-6">
                <Mic className="w-5 h-5 text-gold mb-3" />
                <h3 className="font-serif text-2xl text-white mb-2">1. We review your pitch</h3>
                <p className="text-white/65 leading-relaxed text-sm lg:text-base">
                  Our editorial team evaluates fit, authenticity, and storytelling potential.
                </p>
              </article>

              <article className="creator-process-card bg-white/5 border border-white/10 rounded-xl p-5 lg:p-6">
                <Camera className="w-5 h-5 text-gold mb-3" />
                <h3 className="font-serif text-2xl text-white mb-2">2. Creative planning</h3>
                <p className="text-white/65 leading-relaxed text-sm lg:text-base">
                  We shape your episode arc, visuals, and shooting approach together.
                </p>
              </article>

              <article className="creator-process-card bg-white/5 border border-white/10 rounded-xl p-5 lg:p-6">
                <Clapperboard className="w-5 h-5 text-gold mb-3" />
                <h3 className="font-serif text-2xl text-white mb-2">3. Production and release</h3>
                <p className="text-white/65 leading-relaxed text-sm lg:text-base">
                  You create with support from pre-production to final publication.
                </p>
              </article>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}