import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { 
  Clapperboard,
  Youtube, 
  Rss,
  Instagram,
  Twitter,
  Facebook
} from 'lucide-react';
import {Link} from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  explore: [
    { label: 'Episodes', href: '#episodes' },
    { label: 'Stories', href: '#featured-story' },
    { label: 'Contact', href: '/contact' },
    // { label: 'Shop', href: '#shop' },
    { label: 'Newsletter', href: '#newsletter' },
  ],
  // connect: [
  //   { label: 'Contact', href: '/contact' },
  //   { label: 'Submit a Story', href: '#' },
  //   { label: 'Press Kit', href: '#' },
  // ],
  // legal: [
  //   { label: 'Privacy Policy', href: '#' },
  //   { label: 'Terms of Use', href: '#' },
  //   { label: 'Accessibility', href: '#' },
  // ],
};

const platforms = [
  { name: 'Spotify Video', icon: Clapperboard },
  { name: 'Apple Podcasts Video', icon: Clapperboard },
  { name: 'YouTube', icon: Youtube },
  { name: 'RSS', icon: Rss },
];

const socials = [
  { name: 'Instagram', icon: Instagram },
  { name: 'Twitter', icon: Twitter },
  { name: 'Facebook', icon: Facebook },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: '6vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            end: 'top 70%',
            scrub: 0.5,
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith('/')) {
      navigate(href);
      return;
    }

    if (href.startsWith('#')) {
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer
      ref={footerRef}
      className="bg-navy border-t border-white/10 py-16 lg:py-20"
    >
      <div ref={contentRef} className="w-full px-6 lg:px-[8vw]">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <h3 className="font-condensed uppercase tracking-[0.2em] text-white text-lg mb-4">
              United Stories
            </h3>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-6">
              Stories that look and sound like America. Conversations across difference—hosted with curiosity, filmed with care.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socials.map((social) => (
                <button
                  key={social.name}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-gold hover:text-gold transition-colors"
                  aria-label={social.name}
                >
                  <social.icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 gap-8 justify-end flex text-end">
            {/* Explore */}
            <div>
              <h4 className="font-condensed uppercase tracking-wider text-gold text-xs mb-4">
                Explore
              </h4>
              <ul className="space-y-3">
                {footerLinks.explore.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-white/60 text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            {/* <div>
              <h4 className="font-condensed uppercase tracking-wider text-gold text-xs mb-4">
                Connect
              </h4>
              <ul className="space-y-3">
                {footerLinks.connect.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-white/60 text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div> */}

            {/* Legal */}
            {/* <div>
              <h4 className="font-condensed uppercase tracking-wider text-gold text-xs mb-4">
                Legal
              </h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-white/60 text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div> */}
          </div>
        </div>

        {/* Platform Links */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
            {platforms.map((platform) => (
              <button
                key={platform.name}
                className="flex items-center gap-2 text-white/50 hover:text-gold transition-colors group"
              >
                <platform.icon
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="font-condensed uppercase tracking-wider text-xs">
                  {platform.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-white/40 text-xs">
            © 2026 United Stories of America | powered by <span className="text-gold"> <Link to='https://epic-sphere.com/' target="_blank">EpicSphere</Link></span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
