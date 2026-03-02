import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Play, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const starOutlineRef = useRef<SVGSVGElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const hairlineRef = useRef<HTMLDivElement>(null);
  const microcopyRef = useRef<HTMLParagraphElement>(null);
  const starIconRef = useRef<HTMLDivElement>(null);

  // Entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Background entrance
      tl.fromTo(
        bgRef.current,
        { opacity: 0, scale: 1.08 },
        { opacity: 1, scale: 1, duration: 1.1 }
      );

      // Star outline entrance
      tl.fromTo(
        starOutlineRef.current,
        { opacity: 0, scale: 0.96, rotation: -6 },
        { opacity: 0.08, scale: 1, rotation: 0, duration: 1 },
        '-=0.9'
      );

      // Small star icon
      tl.fromTo(
        starIconRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6 },
        '-=0.7'
      );

      // Headline lines stagger
      const headlineLines = headlineRef.current?.querySelectorAll('.headline-line');
      if (headlineLines) {
        tl.fromTo(
          headlineLines,
          { y: 40, opacity: 0, rotateX: 18 },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.9, stagger: 0.08 },
          '-=0.5'
        );
      }

      // Subheadline
      tl.fromTo(
        subheadlineRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.3'
      );

      // CTAs
      tl.fromTo(
        ctaRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      );

      // Hairline
      tl.fromTo(
        hairlineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8 },
        '-=0.5'
      );

      // Microcopy
      tl.fromTo(
        microcopyRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.3'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([headlineRef.current, subheadlineRef.current, ctaRef.current], {
              opacity: 1,
              y: 0,
            });
            gsap.set(bgRef.current, { scale: 1, y: 0 });
            gsap.set(starOutlineRef.current, { rotation: 0, scale: 1, opacity: 0.08 });
          },
        },
      });

      // EXIT PHASE (70% - 100%)
      // Headline exit
      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-28vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Subheadline exit
      scrollTl.fromTo(
        subheadlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // CTAs exit
      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      // Background exit
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, y: 0 },
        { scale: 1.06, y: '-6vh' },
        0.7
      );

      // Star outline exit
      scrollTl.fromTo(
        starOutlineRef.current,
        { rotation: 0, scale: 1, opacity: 0.08 },
        { rotation: 18, scale: 1.08, opacity: 0 },
        0.7
      );

      // Star icon exit
      scrollTl.fromTo(
        starIconRef.current,
        { opacity: 1, scale: 1 },
        { opacity: 0, scale: 0.8 },
        0.75
      );

      // Hairline exit
      scrollTl.fromTo(
        hairlineRef.current,
        { scaleX: 1, opacity: 1 },
        { scaleX: 0.5, opacity: 0 },
        0.8
      );

      // Microcopy exit
      scrollTl.fromTo(
        microcopyRef.current,
        { opacity: 1 },
        { opacity: 0 },
        0.85
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToEpisodes = () => {
    const element = document.getElementById('episodes');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-pinned bg-navy flex items-center justify-center"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{ opacity: 0 }}
      >
        <img
          src="/hero_flag.jpg"
          alt="American Flag"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 45%, rgba(11,15,23,0.35) 0%, rgba(11,15,23,0.72) 70%, rgba(11,15,23,0.85) 100%)',
          }}
        />
      </div>

      {/* Star Outline SVG */}
      <svg
        ref={starOutlineRef}
        className="absolute will-change-transform"
        style={{
          width: '72vw',
          height: '72vw',
          left: '50%',
          top: '52%',
          transform: 'translate(-50%, -50%)',
          opacity: 0,
        }}
        viewBox="0 0 100 100"
      >
        <polygon
          className="star-outline"
          points="50,5 61,35 95,35 68,57 79,87 50,68 21,87 32,57 5,35 39,35"
        />
      </svg>

      {/* Content Container */}
      <div className="relative z-10 w-full px-6 lg:px-12 flex flex-col items-center">
        {/* Small Star Icon */}
        <div
          ref={starIconRef}
          className="mb-6"
          style={{ opacity: 0 }}
        >
          <Star className="w-6 h-6 text-gold" strokeWidth={1.5} />
        </div>

        {/* Micro Label */}
        <p className="font-condensed uppercase tracking-[0.25em] text-white/60 text-xs mb-6">
          A Video Documentary Podcast
        </p>

        {/* Headline */}
        <div
          ref={headlineRef}
          className="text-center mb-8"
          style={{ perspective: '1000px' }}
        >
          <h1 className="font-serif font-semibold text-white leading-[0.95] tracking-tight hero-title">
            <span className="headline-line block" style={{ fontSize: 'clamp(3rem, 10vw, 6.5rem)' }}>
              UNITED
            </span>
            <span className="headline-line block" style={{ fontSize: 'clamp(3rem, 10vw, 6.5rem)' }}>
              STORIES
            </span>
            <span
              className="headline-line block text-gold"
              style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}
            >
              OF AMERICA
            </span>
          </h1>
        </div>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="text-center text-white/80 text-base lg:text-lg max-w-xl mb-10 leading-relaxed"
          style={{ opacity: 0 }}
        >
          Conversations across difference—hosted with curiosity, edited with care.
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center gap-4"
          style={{ opacity: 0 }}
        >
          <button
            onClick={scrollToEpisodes}
            className="btn-primary flex items-center gap-2"
          >
            <Play size={16} fill="currentColor" />
            Start Watching
          </button>
          <Link
            to="/episodes"
            className="btn-secondary flex items-center gap-2"
          >
            Browse Episodes
            <ArrowRight size={16} />
          </Link>
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
        New video episode every Tuesday. Watch on YouTube and web.
      </p>
    </section>
  );
}
