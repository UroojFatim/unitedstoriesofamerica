import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const starIconRef = useRef<HTMLDivElement>(null);
  const hairlineRef = useRef<HTMLDivElement>(null);
  const microcopyRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE PHASE (0% - 30%)
      // Headline entrance
      scrollTl.fromTo(
        headlineRef.current,
        { x: '-60vw', opacity: 0, rotation: -2 },
        { x: 0, opacity: 1, rotation: 0, ease: 'none' },
        0
      );

      // Body entrance
      scrollTl.fromTo(
        bodyRef.current,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.08
      );

      // Star icon entrance
      scrollTl.fromTo(
        starIconRef.current,
        { y: '-6vh', scale: 0.7, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'none' },
        0.05
      );

      // Hairline entrance
      scrollTl.fromTo(
        hairlineRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none' },
        0.12
      );

      // SETTLE PHASE (30% - 70%) - Elements hold position

      // EXIT PHASE (70% - 100%)
      // Headline exit
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Body exit
      scrollTl.fromTo(
        bodyRef.current,
        { x: 0, opacity: 1 },
        { x: '14vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Star icon exit
      scrollTl.fromTo(
        starIconRef.current,
        { opacity: 1, scale: 1 },
        { opacity: 0, scale: 0.8, ease: 'power2.in' },
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

      // Background subtle movement
      scrollTl.fromTo(
        sectionRef.current,
        { backgroundPosition: '0% 0%' },
        { backgroundPosition: '3% 0%', ease: 'none' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="featured-story"
      className="section-pinned bg-crimson flex items-center"
      style={{
        background: 'radial-gradient(ellipse at 30% 50%, #7a1a25 0%, #6B0F1A 50%, #4a0a12 100%)',
      }}
    >
      {/* Star Icon */}
      <div
        ref={starIconRef}
        className="absolute left-[8vw] top-[18vh]"
        style={{ opacity: 0 }}
      >
        <Star className="w-5 h-5 text-gold" strokeWidth={1.5} />
      </div>

      {/* Content Container */}
      <div className="w-full px-6 lg:px-[8vw] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-20">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-white leading-[1.05] max-w-xl"
          style={{ opacity: 0 }}
        >
          STORIES THAT DEFINE A NATION
        </h2>

        {/* Body Text */}
        <p
          ref={bodyRef}
          className="text-white/80 text-base lg:text-lg leading-relaxed max-w-md"
          style={{ opacity: 0 }}
        >
          We record the moments that usually go unheard—small towns, big cities,
          and the people moving between them. Every voice matters. Every story
          counts. This is America, one conversation at a time.
        </p>
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
        Submit a story · Watch on your favorite platform
      </p>
    </section>
  );
}
