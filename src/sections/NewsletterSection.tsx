import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Send, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function NewsletterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const starIcon1Ref = useRef<HTMLDivElement>(null);
  const starIcon2Ref = useRef<HTMLDivElement>(null);
  const hairlineRef = useRef<HTMLDivElement>(null);
  const microcopyRef = useRef<HTMLParagraphElement>(null);
  
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setIsSubmitted(false);
      }, 3000);
    }
  };

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
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Form entrance
      scrollTl.fromTo(
        formRef.current,
        { x: '50vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0.08
      );

      // Star icons entrance
      scrollTl.fromTo(
        starIcon1Ref.current,
        { scale: 0.6, rotation: -20, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        starIcon2Ref.current,
        { scale: 0.6, rotation: 20, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, ease: 'none' },
        0.07
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
        { x: '-16vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Form exit
      scrollTl.fromTo(
        formRef.current,
        { x: 0, opacity: 1 },
        { x: '16vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Star icons exit
      scrollTl.fromTo(
        starIcon1Ref.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        starIcon2Ref.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.77
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="newsletter"
      className="section-pinned bg-navy flex items-center"
    >
      {/* Starfield Background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute w-full h-full opacity-10"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid slice"
        >
          {Array.from({ length: 50 }).map((_, i) => (
            <circle
              key={i}
              cx={Math.random() * 1000}
              cy={Math.random() * 1000}
              r={Math.random() * 1.5 + 0.5}
              fill="#C9A227"
              opacity={Math.random() * 0.5 + 0.2}
            />
          ))}
        </svg>
      </div>

      {/* Star Icons */}
      <div
        ref={starIcon1Ref}
        className="absolute left-[8vw] top-[18vh]"
        style={{ opacity: 0 }}
      >
        <Star className="w-5 h-5 text-gold" strokeWidth={1.5} />
      </div>
      <div
        ref={starIcon2Ref}
        className="absolute left-[56vw] top-[18vh]"
        style={{ opacity: 0 }}
      >
        <Star className="w-5 h-5 text-gold" strokeWidth={1.5} />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full px-6 lg:px-[8vw] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-20">
        {/* Left: Headline */}
        <div ref={headlineRef} className="max-w-lg" style={{ opacity: 0 }}>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.05] mb-6">
            JOIN THE LIST
          </h2>
          <p className="text-white/70 text-base lg:text-lg leading-relaxed">
            Get new episodes, behind-the-scenes notes, and story requests—delivered weekly.
          </p>
        </div>

        {/* Right: Form */}
        <div
          ref={formRef}
          className="w-full max-w-md"
          style={{ opacity: 0 }}
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/15 rounded-2xl p-6 lg:p-8">
            <form onSubmit={handleSubmit}>
              <label className="block text-white/60 text-sm mb-3">
                Email address
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-dark flex-1"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitted}
                  className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70"
                >
                  {isSubmitted ? (
                    <>
                      <Check size={16} />
                      Subscribed
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Subscribe
                    </>
                  )}
                </button>
              </div>
              <p className="text-white/40 text-xs mt-4">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          </div>
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
        Join 12,000+ viewers
      </p>
    </section>
  );
}
