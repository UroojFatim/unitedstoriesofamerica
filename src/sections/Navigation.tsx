import { useState, useEffect } from 'react';
import { Menu, X, Clapperboard } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      setIsMobileMenuOpen(false);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Episodes', id: 'episodes' },
    { label: 'Stories', id: 'featured-story' },
    // { label: 'Shop', id: 'shop' },
    // { label: 'Newsletter', id: 'newsletter' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? 'bg-navy/90 backdrop-blur-md py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => {
              if (location.pathname !== '/') {
                navigate('/');
                return;
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-condensed uppercase tracking-[0.2em] text-white text-sm lg:text-base hover:text-gold transition-colors"
          >
            United Stories
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="nav-link"
              >
                {item.label}
              </button>
            ))}
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
            <button
              onClick={() => scrollToSection('newsletter')}
              className="flex items-center gap-2 px-5 py-2 border border-gold text-gold font-condensed uppercase tracking-widest text-xs hover:bg-gold hover:text-navy transition-all duration-300"
            >
              <Clapperboard size={14} />
              Subscribe
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[99] bg-navy/98 backdrop-blur-lg transition-all duration-500 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="font-condensed uppercase tracking-[0.2em] text-white text-xl hover:text-gold transition-colors"
            >
              {item.label}
            </button>
          ))}
          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-condensed uppercase tracking-[0.2em] text-white text-xl hover:text-gold transition-colors"
          >
            Contact
          </Link>
          <button
            onClick={() => scrollToSection('newsletter')}
            className="mt-4 flex items-center gap-3 px-8 py-3 border border-gold text-gold font-condensed uppercase tracking-widest text-sm hover:bg-gold hover:text-navy transition-all duration-300"
          >
            <Clapperboard size={16} />
            Subscribe
          </button>
        </div>
      </div>
    </>
  );
}
