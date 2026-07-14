import Lenis from "lenis";
import { motion } from "framer-motion";
import { StrictMode, useEffect, useRef, useState, type Ref } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const bookingConfig = {
  bookingPhone: "+84 900 000 000",
  bookingZaloUrl: "https://zalo.me/840900000000",
  contactEmail: "hello@forrest.example",
};

const heroImages = [
  {
    src: "/house/8.jpg",
    alt: "For.rest Pomegranate House pool courtyard with arched openings and timber balcony",
  },
  {
    src: "/house/7.jpg",
    alt: "Sunset over red tile roofs and the sea from the wooden balcony",
  },
];

const galleryImages = [
  {
    src: "/house/2.jpg",
    alt: "Sunlit pool courtyard with cream walls, arched doors, and timber window boxes",
    label: "POOL COURTYARD",
    text: "A private pool framed by cream plaster, red rooflines, timber doors, and tropical light.",
  },
  {
    src: "/house/5.jpg",
    alt: "Loft interior with wooden staircase, dining table, and compact kitchen",
    label: "LOFT INTERIOR",
    text: "Warm wood stairs, textured walls, a compact kitchen, and a table made for slow mornings.",
  },
  {
    src: "/house/3.jpg",
    alt: "Twin beds facing an open window with sea and red roof views",
    label: "SEA-VIEW ROOM",
    text: "White linen, open windows, red tile roofs, and the Phu Yen coast just beyond the frame.",
  },
];

const journalCards = [
  {
    src: "/house/6.jpg",
    title: "Sunset from the balcony doors",
  },
  {
    src: "/house/4.jpg",
    title: "Long lunches beside the pool",
  },
  {
    src: "/house/1.jpg",
    title: "A beach walk before nightfall",
  },
];

const amenities = [
  { name: "Sea-view bedrooms", icon: "bed" },
  { name: "Private pool courtyard", icon: "pool" },
  { name: "Loft living and dining room", icon: "stairs" },
  { name: "Wifi, air conditioning, hot water", icon: "wifi" },
  { name: "Compact kitchen with essentials", icon: "kitchen" },
  { name: "Local seafood and meal support", icon: "meal" },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "For.rest Pomegranate House",
  description:
    "A private coastal pool homestay in Phu Yen, Vietnam with sea-view rooms, warm timber interiors, shared dining, and direct booking by Zalo or phone.",
  telephone: bookingConfig.bookingPhone,
  address: {
    "@type": "PostalAddress",
    addressRegion: "Phu Yen",
    addressCountry: "VN",
  },
  amenityFeature: amenities.map((amenity) => ({
    "@type": "LocationFeatureSpecification",
    name: amenity.name,
    value: true,
  })),
  image: [...heroImages, ...galleryImages, ...journalCards].map((image) => image.src),
};

const easeOut = [0.16, 1, 0.3, 1] as const;
const reveal = {
  hidden: { opacity: 0, y: 34, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.85, ease: easeOut } },
};
const imageReveal = {
  hidden: { opacity: 0, y: 42, rotateX: 2, scale: 0.97 },
  visible: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { duration: 1, ease: easeOut } },
};

function App() {
  const phoneHref = `tel:${bookingConfig.bookingPhone.replace(/\s/g, "")}`;
  const heroBookingRef = useRef<HTMLFormElement>(null);
  const stickyBookingRef = useRef<HTMLFormElement>(null);
  const [showStickyBooking, setShowStickyBooking] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.18,
      easing: (time) => Math.min(1, 1.001 - 2 ** (-10 * time)),
      smoothWheel: true,
      touchMultiplier: 1.12,
    });
    let frameId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const heroBooking = heroBookingRef.current;

    if (!heroBooking) {
      return;
    }

    const syncStickyBooking = () => {
      const stickyHeight = stickyBookingRef.current?.offsetHeight || heroBooking.offsetHeight;
      const stickyTop = window.innerHeight - 16 - stickyHeight;

      setShowStickyBooking(heroBooking.getBoundingClientRect().top <= stickyTop);
    };

    syncStickyBooking();
    window.addEventListener("scroll", syncStickyBooking, { passive: true });
    window.addEventListener("resize", syncStickyBooking);

    return () => {
      window.removeEventListener("scroll", syncStickyBooking);
      window.removeEventListener("resize", syncStickyBooking);
    };
  }, []);

  return (
    <main>
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      <motion.div
        className="announcement"
        role="banner"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: easeOut }}
      >
        <span>Phu Yen coastal stays are now open for direct booking</span>
        <a href="#booking" aria-label="Go to the booking section">
          Reserve early to hold the house →
        </a>
      </motion.div>

      <motion.header
        className="site-header"
        aria-label="Main navigation"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.8, ease: easeOut }}
      >
        <a className="brand" href="#top" aria-label="For.rest Pomegranate House">
          For.rest
        </a>
        <nav>
          <a href="#space">The house</a>
          <a href="#experience">The stay</a>
          <a className="nav-pill" href="#booking">
            Book direct
          </a>
        </nav>
      </motion.header>

      <section className="hero page-shell" id="top">
        <HeroWhale />
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.95, ease: easeOut }}
        >
          <p className="meta">PRIVATE COASTAL POOL HOMESTAY IN PHU YEN</p>
          <h1>For.rest Pomegranate House</h1>
          <p>
            A tropical coastal house with a turquoise pool courtyard, sea-view rooms,
            warm timber details, and direct booking that stays simple.
          </p>
        </motion.div>

        <div className="hero-grid" aria-label="For.rest Pomegranate House overview photos">
          <motion.img
            className="hero-image-large"
            src={heroImages[0].src}
            alt={heroImages[0].alt}
            initial={{ opacity: 0, y: 42, rotate: -0.4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            transition={{ delay: 0.24, duration: 1.05, ease: easeOut }}
          />
          <motion.img
            className="hero-image-small"
            src={heroImages[1].src}
            alt={heroImages[1].alt}
            initial={{ opacity: 0, y: 58, rotate: 0.6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            transition={{ delay: 0.34, duration: 1.08, ease: easeOut }}
          />
        </div>

        <motion.div
          className={`hero-booking-shell ${showStickyBooking ? "is-hidden" : ""}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.52, duration: 0.82, ease: easeOut }}
        >
          <BookingBar ref={heroBookingRef} />
        </motion.div>
      </section>

      <motion.section className="page-shell intro" id="space" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-12% 0px" }} variants={reveal}>
        <div>
          <p className="meta">THE HOUSE</p>
          <h2>A Phu Yen pool house made for sea air, long meals, and slow tropical days.</h2>
        </div>
        <p>
          Pomegranate House sits in a quiet coastal rhythm: cream plaster,
          arched openings, timber railings, red rooflines, and rooms that look
          toward the sea. Pool time, local seafood, balcony sunsets, and
          unhurried mornings all happen within a few steps.
        </p>
      </motion.section>

      <section className="page-shell photo-row" aria-label="House details and garden moments">
        {galleryImages.map((image, index) => (
          <motion.article
            className="photo-card"
            key={image.label}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px" }}
            variants={imageReveal}
            transition={{ delay: index * 0.08 }}
          >
            <img src={image.src} alt={image.alt} />
            <div>
              <p className="meta">{image.label}</p>
              <p>{image.text}</p>
            </div>
          </motion.article>
        ))}
      </section>

      <motion.section className="feature-band" id="experience" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-14% 0px" }} variants={reveal}>
        <div className="page-shell feature-grid">
          <div>
            <p className="meta">STAY DETAILS</p>
            <h2>Everything is close at hand: the pool, the table, the rooms, and the salt air.</h2>
          </div>
          <ul className="amenity-list" aria-label="Homestay amenities">
            {amenities.map((item) => (
              <motion.li key={item.name} whileHover={{ y: -4, transition: { duration: 0.22 } }}>
                <AmenityIcon name={item.icon} />
                <span>{item.name}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.section>

      <section className="page-shell journal" aria-label="Stay inspiration">
        <motion.div className="section-heading" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-12% 0px" }} variants={reveal}>
          <div>
            <p className="meta">PERSPECTIVES</p>
            <h2>Small scenes from a For.rest coastal stay.</h2>
          </div>
          <a className="pill-link" href="#booking">
            Hold your dates →
          </a>
        </motion.div>
        <div className="journal-grid">
          {journalCards.map((card, index) => (
            <motion.article
              className="journal-card"
              key={card.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
              variants={imageReveal}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.24 } }}
            >
              <img src={card.src} alt="" />
              <div>
                <p className="meta">JOURNAL</p>
                <h3>{card.title}</h3>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <motion.section className="page-shell booking-section" id="booking" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-12% 0px" }} variants={reveal}>
        <div>
          <p className="meta">BOOK DIRECT</p>
          <h2>Message on Zalo to check availability and confirm your stay.</h2>
          <p>
            Send your arrival date, departure date, and guest count. For.rest
            will reply with availability, the date-specific rate, and the next
            step to hold Pomegranate House.
          </p>
        </div>
        <div className="contact-card">
          <a
            className="primary-cta"
            href={bookingConfig.bookingZaloUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Book For.rest Pomegranate House on Zalo"
          >
            Book on Zalo
          </a>
          <a className="phone-link" href={phoneHref}>
            Call {bookingConfig.bookingPhone}
          </a>
        </div>
      </motion.section>

      <footer className="page-shell footer">
        <a className="brand footer-brand" href="#top" aria-label="For.rest Pomegranate House">
          <span>For.rest</span>
          <span>Pomegranate House</span>
        </a>
        <div>
          <p>Coastal pool homestay in Phu Yen, Vietnam.</p>
          <p>Book directly by Zalo or phone.</p>
        </div>
        <div className="footer-links">
          <a href="#space">The house</a>
          <a href="#experience">The stay</a>
          <a href="#booking">Book direct</a>
        </div>
      </footer>

      <div className={`sticky-booking ${showStickyBooking ? "is-visible" : ""}`} aria-hidden={!showStickyBooking}>
        <BookingBar ref={stickyBookingRef} variant="sticky" />
      </div>

      <ChatWidget stickyAligned={showStickyBooking} />
    </main>
  );
}

type BookingBarProps = {
  variant?: "hero" | "sticky";
  ref?: Ref<HTMLFormElement>;
};

function BookingBar({ variant = "hero", ref }: BookingBarProps) {
  return (
    <form
      ref={ref}
      className={`booking-bar booking-bar-${variant}`}
      aria-label="Check stay availability"
      onSubmit={(event) => event.preventDefault()}
    >
      <label>
        <span>Arrival</span>
        <input type="date" name="arrival" aria-label="Arrival date" />
      </label>
      <label>
        <span>Departure</span>
        <input type="date" name="departure" aria-label="Departure date" />
      </label>
      <label>
        <span>Guests</span>
        <select name="guests" aria-label="Guest count" defaultValue="2 guests">
          <option>1 guest</option>
          <option>2 guests</option>
          <option>3 guests</option>
          <option>4 guests</option>
          <option>5+ guests</option>
        </select>
      </label>
      <a
        className="booking-submit"
        href={bookingConfig.bookingZaloUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Open Zalo to book"
      >
        Book on Zalo
      </a>
    </form>
  );
}

function HeroWhale() {
  return (
    <motion.div
      className="hero-whale"
      aria-hidden="true"
      initial={{ opacity: 0, y: 28, rotate: 5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay: 0.22, duration: 1.1, ease: easeOut }}
    >
      <img src="/blue_whale.png" alt="" />
    </motion.div>
  );
}

function AmenityIcon({ name }: { name: string }) {
  return (
    <span className="amenity-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        {name === "bed" && (
          <>
            <path d="M4 11V7.5A2.5 2.5 0 0 1 6.5 5h3A2.5 2.5 0 0 1 12 7.5V11" />
            <path d="M12 11V8h4.5A3.5 3.5 0 0 1 20 11.5V19" />
            <path d="M4 19v-8h16" />
            <path d="M4 15h16" />
          </>
        )}
        {name === "pool" && (
          <>
            <path d="M7 7.5a2.5 2.5 0 0 1 5 0V17" />
            <path d="M12 7.5a2.5 2.5 0 0 1 5 0V17" />
            <path d="M5 18c1.3 0 1.3-1 2.6-1s1.3 1 2.6 1 1.3-1 2.6-1 1.3 1 2.6 1 1.3-1 2.6-1" />
            <path d="M5 21c1.3 0 1.3-1 2.6-1s1.3 1 2.6 1 1.3-1 2.6-1 1.3 1 2.6 1 1.3-1 2.6-1" />
          </>
        )}
        {name === "stairs" && (
          <>
            <path d="M5 19h4v-4h4v-4h4V7h2" />
            <path d="M5 19V5" />
            <path d="M5 5h14" />
          </>
        )}
        {name === "wifi" && (
          <>
            <path d="M5 9.5a11 11 0 0 1 14 0" />
            <path d="M8 13a6.4 6.4 0 0 1 8 0" />
            <path d="M11 16.5a1.6 1.6 0 0 1 2 0" />
            <path d="M12 19h.01" />
          </>
        )}
        {name === "kitchen" && (
          <>
            <path d="M7 4v16" />
            <path d="M5 4v5a2 2 0 0 0 4 0V4" />
            <path d="M16 4v16" />
            <path d="M14 4h4v8h-4z" />
          </>
        )}
        {name === "meal" && (
          <>
            <path d="M12 21a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z" />
            <path d="M12 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path d="M18 4c-2 0-3.5 1.5-3.5 3.5" />
            <path d="M6 4c2 0 3.5 1.5 3.5 3.5" />
          </>
        )}
      </svg>
    </span>
  );
}

function ChatWidget({ stickyAligned }: { stickyAligned: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const emailHref = createEmailHref(message || "Hi For.rest, I would like to ask about Pomegranate House.");

  return (
    <aside className={`chat-widget ${isOpen ? "is-open" : ""} ${stickyAligned ? "is-sticky-aligned" : ""}`} aria-label="For.rest direct chat">
      <button
        className="chat-launcher"
        type="button"
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </button>

      <section className="chat-panel" aria-hidden={!isOpen}>
        <header className="chat-header">
          <span className="chat-mark" aria-hidden="true">
            FR
          </span>
          <span>For.rest</span>
          <button type="button" aria-label="Close chat" onClick={() => setIsOpen(false)}>
            <CloseIcon />
          </button>
        </header>

        <div className="chat-body">
          <p>
            Hey, I&apos;m Mika, the For.rest digital assistant. I can help with
            Pomegranate House availability, Phu Yen stay questions, and direct contact.
          </p>

          <div className="chat-contact-row" aria-label="Direct contact options">
            <a href={bookingConfig.bookingZaloUrl} target="_blank" rel="noreferrer" aria-label="Chat on Zalo">
              <ZaloIcon />
            </a>
            <a href={emailHref} aria-label="Email For.rest">
              <MailIcon />
            </a>
          </div>

          <div className="chat-quick-actions" aria-label="Common chat actions">
            <a href="#booking" onClick={() => setIsOpen(false)}>
              Book Pomegranate House
            </a>
            <a href={emailHref}>Question about a booking</a>
            <a href={`tel:${bookingConfig.bookingPhone.replace(/\s/g, "")}`}>I want to talk to a human</a>
          </div>
        </div>

        <form
          className="chat-compose"
          onSubmit={(event) => {
            event.preventDefault();
            window.location.href = createEmailHref(message || "Hi For.rest, I would like to ask about Pomegranate House.");
          }}
        >
          <label className="sr-only" htmlFor="chat-message">
            Type your message
          </label>
          <input
            id="chat-message"
            type="text"
            value={message}
            placeholder="Type your message here..."
            onChange={(event) => setMessage(event.target.value)}
          />
          <button type="submit" aria-label="Send message by email">
            <SendIcon />
          </button>
        </form>
      </section>
    </aside>
  );
}

function createEmailHref(body: string) {
  const subject = encodeURIComponent("For.rest Pomegranate House inquiry");
  const encodedBody = encodeURIComponent(body);

  return `mailto:${bookingConfig.contactEmail}?subject=${subject}&body=${encodedBody}`;
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 6.5A5.5 5.5 0 0 1 10.5 1h3A5.5 5.5 0 0 1 19 6.5v3A5.5 5.5 0 0 1 13.5 15H11l-4.5 4v-4.7A5.5 5.5 0 0 1 5 9.5z" />
      <path d="M9 7.6h6M9 10.4h4" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function ZaloIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.7 16.4a6.9 6.9 0 1 1 2 1.4L6 18.6z" />
      <path d="M8.7 9.2h4.4l-4.4 5.6h4.8M15.2 10.8v4M17.8 10.8v4" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 4 21 12 4 20l3-8z" />
      <path d="M7 12h14" />
    </svg>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
