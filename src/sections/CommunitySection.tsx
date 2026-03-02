import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CommunityPost {
  id: string;
  name: string;
  location: string;
  quote: string;
  image: string;
  highlighted?: boolean;
}

const posts: CommunityPost[] = [
  {
    id: 'dana',
    name: 'Dana',
    location: 'OH',
    quote: 'Best commute companion.',
    image: '/community_01.jpg',
    highlighted: true,
  },
  {
    id: 'raj',
    name: 'Raj',
    location: 'TX',
    quote: 'Feels like home.',
    image: '/community_02.jpg',
  },
  {
    id: 'lena',
    name: 'Lena',
    location: 'WA',
    quote: 'I learn something every episode.',
    image: '/community_03.jpg',
  },
];

export default function CommunitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      // Posts animation
      const postCards = gridRef.current?.querySelectorAll('.community-card');
      if (postCards) {
        postCards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: '8vh', opacity: 0, rotation: -1 },
            {
              y: 0,
              opacity: 1,
              rotation: 0,
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
      id="community"
      className="bg-navy py-20 lg:py-32"
    >
      <div className="w-full px-6 lg:px-[8vw]">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 lg:mb-20">
          <h2 className="font-serif text-4xl lg:text-6xl font-semibold text-white mb-4">
            Community
          </h2>
          <p className="text-white/60 text-base lg:text-lg max-w-xl mx-auto leading-relaxed flex items-center justify-center gap-2">
            Tag your watch with{' '}
            <span className="text-gold font-medium">#UnitedStories</span>
            <Instagram size={16} className="text-gold" />
          </p>
        </div>

        {/* Community Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {posts.map((post) => (
            <article
              key={post.id}
              className={`community-card relative rounded-xl overflow-hidden ${
                post.highlighted ? 'ring-1 ring-gold' : ''
              }`}
            >
              {/* Image */}
              <div className="aspect-[3/4]">
                <img
                  src={post.image}
                  alt={post.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <blockquote className="text-white text-lg lg:text-xl font-serif italic mb-3">
                  "{post.quote}"
                </blockquote>
                <div className="flex items-center gap-2">
                  <span className="text-gold font-condensed uppercase tracking-wider text-xs">
                    {post.name}
                  </span>
                  <span className="text-white/40">·</span>
                  <span className="text-white/60 text-sm">{post.location}</span>
                </div>
              </div>

              {/* Highlight Border Animation */}
              {post.highlighted && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                  <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-gold to-transparent" />
                  <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-gold to-transparent" />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
