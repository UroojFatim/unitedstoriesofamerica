import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clapperboard, Mic, Users, Sparkles } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const creatorSteps = [
  {
    icon: Mic,
    title: 'Pitch your story',
    copy: 'Tell us the heartbeat of your idea in a few lines.',
  },
  {
    icon: Users,
    title: 'Meet the team',
    copy: 'We align format, tone, and filming timeline together.',
  },
  {
    icon: Clapperboard,
    title: 'Create and publish',
    copy: 'Record, edit, and release your episode with our support.',
  },
];

export default function BecomeCreatorSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const sparkleRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

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
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 82%',
            end: 'top 62%',
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        panelRef.current,
        { y: '8vh', opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: panelRef.current,
            start: 'top 84%',
            end: 'top 62%',
            scrub: 0.5,
          },
        }
      );

      const cards = cardsRef.current?.querySelectorAll('.creator-step-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 86%',
              end: 'top 62%',
              scrub: 0.4,
            },
          }
        );
      }

      gsap.to(sparkleRef.current, {
        y: -10,
        duration: 1.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const goToCreatorPage = () => navigate('/become-a-creator');

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
    <section ref={sectionRef} id="creator" className="bg-navy py-20 lg:py-28">
      <div className="w-full px-6 lg:px-[8vw]">
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-12 lg:mb-14">
          <p className="font-condensed uppercase tracking-[0.18em] text-gold text-xs mb-4">
            Become a Creator
          </p>
          <h2 className="font-serif text-4xl lg:text-6xl font-semibold text-white leading-[1.05] mb-5">
            Turn your voice into a
            <span className="text-gold"> shared American story.</span>
          </h2>
          <p className="text-white/65 text-base lg:text-lg leading-relaxed">
            From first idea to final cut, we help emerging storytellers craft episodes that feel personal, cinematic, and true.
          </p>
        </div>

        <div
          ref={panelRef}
          className="relative bg-white/5 border border-white/15 rounded-2xl lg:rounded-3xl p-6 md:p-8 lg:p-10 overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_85%_20%,rgba(201,162,39,0.16),transparent_55%)]" />
          <div ref={sparkleRef} className="absolute right-6 top-5 text-gold/90">
            <Sparkles size={18} />
          </div>

          <div
            ref={cardsRef}
            className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 mb-8 lg:mb-10"
          >
            {creatorSteps.map((step) => (
              <article
                key={step.title}
                className="creator-step-card bg-navy/55 border border-white/10 rounded-xl p-5 lg:p-6"
              >
                <step.icon className="w-5 h-5 text-gold mb-4" strokeWidth={1.8} />
                <h3 className="font-serif text-xl text-white mb-2">{step.title}</h3>
                <p className="text-white/65 text-sm lg:text-[15px] leading-relaxed">{step.copy}</p>
              </article>
            ))}
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-white/60 text-sm lg:text-base">
              Applications are open for upcoming production slots.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={goToCreatorPage} className="btn-primary">
                Apply Now
              </button>
              <button onClick={scrollToNewsletter} className="btn-secondary">
                Get Creator Updates
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}