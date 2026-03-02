import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ShoppingBag } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const products: Product[] = [
  {
    id: 'poster',
    name: 'Starfield Poster',
    price: 28,
    image: '/product_poster.jpg',
    category: 'Prints',
  },
  {
    id: 'stickers',
    name: 'Heritage Sticker Pack',
    price: 12,
    image: '/hero_flag.jpg',
    category: 'Accessories',
  },
  {
    id: 'print',
    name: 'Episode Print (Limited)',
    price: 34,
    image: '/episode_thumb_01.jpg',
    category: 'Limited Edition',
  },
];

export default function ShopSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.5,
          },
        }
      );

      // Products animation
      const productCards = gridRef.current?.querySelectorAll('.product-card');
      if (productCards) {
        productCards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: '10vh', opacity: 0, scale: 0.98 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
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
      id="shop"
      className="bg-navy py-20 lg:py-32"
    >
      <div className="w-full px-6 lg:px-[8vw]">
        {/* Heading */}
        <div ref={headingRef} className="mb-12 lg:mb-16">
          <h2 className="font-serif text-4xl lg:text-6xl font-semibold text-white mb-4">
            Shop
          </h2>
          <p className="text-white/60 text-base lg:text-lg max-w-xl leading-relaxed">
            Prints, stickers, and posters that keep the story close.
          </p>
        </div>

        {/* Products Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {products.map((product) => (
            <article
              key={product.id}
              className="product-card group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="flex items-center gap-2 px-6 py-3 bg-gold text-navy font-condensed uppercase tracking-widest text-sm transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <ShoppingBag size={16} />
                    Add to Cart
                  </button>
                </div>
                {/* Category Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 bg-navy/80 backdrop-blur-sm rounded-full">
                  <span className="font-condensed uppercase tracking-wider text-xs text-gold">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-semibold text-white group-hover:text-gold transition-colors">
                  {product.name}
                </h3>
                <span className="font-condensed text-gold text-lg">
                  ${product.price}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Browse Link */}
        <div className="mt-12 lg:mt-16">
          <button className="group flex items-center gap-2 text-gold font-condensed uppercase tracking-widest text-sm hover:text-white transition-colors">
            Browse the shop
            <ArrowRight
              size={16}
              className="transform group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
