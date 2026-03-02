import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Phone, Star } from 'lucide-react';
import Navigation from '../sections/Navigation';
import ClosingCTASection from '../sections/ClosingCTASection';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const introRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLElement>(null);

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
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen bg-navy text-white">
      <div className="grain-overlay" />

      <Navigation />

      <main className="relative z-10 pt-28 lg:pt-32 pb-20">
        <div className="w-full px-6 lg:px-[8vw] grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16">
          <section ref={introRef} style={{ opacity: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-4 h-4 text-gold" />
              <p className="font-condensed uppercase tracking-[0.2em] text-gold text-xs">Contact</p>
            </div>
            <h1 className="font-serif text-4xl lg:text-6xl font-semibold mb-5">Get in touch</h1>
            <p className="text-white/70 leading-relaxed max-w-xl mb-8">
              Reach out for story ideas, partnerships, speaking requests, or press inquiries. We review every message and respond as quickly as possible.
            </p>

            <div className="space-y-4 text-sm text-white/75">
              <p className="flex items-center gap-3">
                <Mail size={16} className="text-gold" />
                hello@unitedstories.com
              </p>
              <p className="flex items-center gap-3">
                <Phone size={16} className="text-gold" />
                +1 (555) 214-0198
              </p>
              <p className="flex items-center gap-3">
                <MapPin size={16} className="text-gold" />
                Austin, Texas, United States
              </p>
            </div>
          </section>

          <section ref={formRef} className="bg-white/5 border border-white/15 rounded-2xl p-6 lg:p-8" style={{ opacity: 0 }}>
            <h2 className="font-serif text-2xl lg:text-3xl font-semibold mb-6">Send a message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-white/60 text-sm mb-2">Full name</label>
                <input id="name" type="text" placeholder="Your name" className="input-dark" />
              </div>

              <div>
                <label htmlFor="email" className="block text-white/60 text-sm mb-2">Email address</label>
                <input id="email" type="email" placeholder="you@example.com" className="input-dark" />
              </div>

              <div>
                <label htmlFor="topic" className="block text-white/60 text-sm mb-2">Topic</label>
                <input id="topic" type="text" placeholder="Story idea, partnership, press..." className="input-dark" />
              </div>

              <div>
                <label htmlFor="message" className="block text-white/60 text-sm mb-2">Message</label>
                <textarea id="message" rows={5} placeholder="Tell us more..." className="input-dark resize-none" />
              </div>

              <button type="button" className="btn-primary w-full">Send Message</button>
            </form>
          </section>
        </div>
      </main>

      <div className="pinned-section" style={{ zIndex: 80 }}>
        <ClosingCTASection />
      </div>

      <Footer />
    </div>
  );
}