import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Clapperboard } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function ClosingCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const starIconRef = useRef<HTMLDivElement>(null);
  const hairlineRef = useRef<HTMLDivElement>(null);
  const microcopyRef = useRef<HTMLParagraphElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE PHASE (0% - 30%)
      // Headline entrance
      scrollTl.fromTo(
        headlineRef.current,
        { y: '60vh', opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // CTAs entrance
      scrollTl.fromTo(
        ctaRef.current,
        { y: '20vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
      );

      // Star icon entrance
      scrollTl.fromTo(
        starIconRef.current,
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none' },
        0.08
      );

      // Hairline entrance
      scrollTl.fromTo(
        hairlineRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none' },
        0.15
      );

      // SETTLE PHASE (30% - 70%) - Elements hold position

      // EXIT PHASE (70% - 100%)
      // Headline exit
      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // CTAs exit
      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      // Star icon exit
      scrollTl.fromTo(
        starIconRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

      // Hairline exit
      scrollTl.fromTo(
        hairlineRef.current,
        { scaleX: 1, opacity: 1 },
        { scaleX: 0.5, opacity: 0, ease: 'power2.in' },
        0.8
      );

      // Microcopy exit
      scrollTl.fromTo(
        microcopyRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.85
      );

      // Background subtle zoom
      scrollTl.fromTo(
        sectionRef.current,
        { backgroundSize: '100% 100%' },
        { backgroundSize: '103% 103%', ease: 'none' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToNewsletter = () => {
    if (location.pathname !== '/') {
      navigate('/#newsletter');
      return;
    }

    const element = document.getElementById('newsletter');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="closing-cta"
      className="section-pinned flex items-center justify-center"
      style={{
        background: 'radial-gradient(ellipse at 50% 50%, #7a1a25 0%, #6B0F1A 50%, #4a0a12 100%)',
      }}
    >
      {/* Star Icon */}
      <div
        ref={starIconRef}
        className="absolute left-1/2 -translate-x-1/2 top-[26%]"
        style={{ opacity: 0 }}
      >
        <Star className="w-6 h-6 text-gold" strokeWidth={1.5} />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full px-6 lg:px-[8vw] flex flex-col items-center text-center">
        {/* Headline */}
        <div ref={headlineRef} style={{ opacity: 0 }}>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-white leading-[1.05] mb-6">
            PRESS PLAY.
            <br />
            <span className="text-gold">STAY CURIOUS.</span>
          </h2>
          <p className="text-white/70 text-base lg:text-lg max-w-md mx-auto leading-relaxed">
            New video episodes every Tuesday—watch on YouTube and the web.
          </p>
        </div>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          style={{ opacity: 0 }}
        >
          <button
            onClick={scrollToNewsletter}
            className="btn-primary flex items-center gap-2"
          >
            <Clapperboard size={16} />
            Subscribe
          </button>
          {/* <button className="btn-secondary flex items-center gap-2">
            <Heart size={16} />
            Support 
          </button> */}
        </div>
      </div>

      {/* Bottom Hairline */}
      <div
        ref={hairlineRef}
        className="absolute bottom-[7vh] left-1/2 -translate-x-1/2 hairline w-[84vw] origin-left"
        style={{ transform: 'translateX(-50%) scaleX(0)' }}
      />

      {/* Bottom Microcopy */}
      <p
        ref={microcopyRef}
        className="absolute bottom-[3.2vh] left-1/2 -translate-x-1/2 font-condensed uppercase tracking-[0.15em] text-white/40 text-xs text-center"
        style={{ opacity: 0 }}
      >
        © United Stories of America. All rights reserved.
      </p>
    </section>
  );
}
