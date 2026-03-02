import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Guest {
  id: string;
  name: string;
  role: string;
  image: string;
  quote: string;
}

const guests: Guest[] = [
  {
    id: 'maya',
    name: 'Maya Chen',
    role: 'Urban Planner',
    image: '/guest_maya.jpg',
    quote: 'Every street has a story. Every building holds memories.',
  },
  {
    id: 'james',
    name: "James O'Neill",
    role: 'Firefighter / Musician',
    image: '/guest_james.jpg',
    quote: 'After the sirens fade, the guitar helps me find peace.',
  },
  {
    id: 'sofia',
    name: 'Sofia Reyes',
    role: 'Small Business Owner',
    image: '/guest_sofia.jpg',
    quote: 'My coffee shop is where the neighborhood comes together.',
  },
];

export default function GuestVoicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const guestsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: '6vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 0.5,
          },
        }
      );

      // Guests animation
      const guestCards = guestsRef.current?.querySelectorAll('.guest-card');
      if (guestCards) {
        guestCards.forEach((card) => {
          gsap.fromTo(
            card,
            { scale: 0.85, opacity: 0, y: '8vh' },
            {
              scale: 1,
              opacity: 1,
              y: 0,
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
      id="guest-voices"
      className="bg-navy py-20 lg:py-32"
    >
      <div className="w-full px-6 lg:px-[8vw]">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 lg:mb-20">
          <h2 className="font-serif text-4xl lg:text-6xl font-semibold text-white mb-4">
            Guest Voices
          </h2>
          <p className="text-white/60 text-base lg:text-lg max-w-xl mx-auto leading-relaxed">
            Farmers, nurses, poets, veterans—every voice adds a verse.
          </p>
        </div>

        {/* Guests Grid */}
        <div
          ref={guestsRef}
          className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 xl:gap-24"
        >
          {guests.map((guest) => (
            <article
              key={guest.id}
              className="guest-card flex flex-col items-center text-center max-w-xs"
            >
              {/* Circular Portrait */}
              <div className="circle-portrait w-40 h-40 lg:w-52 lg:h-52 mb-6">
                <img
                  src={guest.image}
                  alt={guest.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Quote */}
              <blockquote className="text-white/70 text-sm lg:text-base italic mb-4 leading-relaxed">
                "{guest.quote}"
              </blockquote>

              {/* Name & Role */}
              <div>
                <h3 className="font-serif text-xl font-semibold text-white mb-1">
                  {guest.name}
                </h3>
                <p className="font-condensed uppercase tracking-wider text-gold text-xs">
                  {guest.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
