import { Canvas, useFrame } from "@react-three/fiber";
import Lenis from "lenis";
import { motion } from "framer-motion";
import { StrictMode, useEffect, useRef, useState, type Ref } from "react";
import { createRoot } from "react-dom/client";
import * as THREE from "three";
import "./styles.css";

const bookingConfig = {
  bookingPhone: "+84 900 000 000",
  bookingZaloUrl: "https://zalo.me/840900000000",
  contactEmail: "hello@forrest.example",
  locationLabel: "Phu Yen, Vietnam",
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
  "Sea-view bedrooms",
  "Private pool courtyard",
  "Loft living and dining room",
  "Wifi, air conditioning, hot water",
  "Compact kitchen with essentials",
  "Local seafood and meal support",
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
    name: amenity,
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
          <a href="#location">Phu Yen</a>
          <a className="nav-pill" href="#booking">
            Book direct
          </a>
        </nav>
      </motion.header>

      <section className="hero page-shell" id="top">
        <CinematicScene />
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
              <motion.li key={item} whileHover={{ y: -4, transition: { duration: 0.22 } }}>
                {item}
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

      <motion.section className="page-shell location" id="location" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-12% 0px" }} variants={reveal}>
        <p className="meta">LOCATION</p>
        <h2>{bookingConfig.locationLabel}</h2>
        <p>
          Phu Yen is loved for its quieter coastline, fishing villages, fresh
          seafood, open skies, and red-roofed seaside lanes. The exact address
          is shared after reservation, keeping the house private while still
          giving guests easy access to pool time, sea views, and sunset walks nearby.
        </p>
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

function CinematicScene() {
  return (
    <div className="cinematic-scene" aria-hidden="true">
      <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, 7], fov: 42 }} gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}>
        <ambientLight intensity={0.85} />
        <directionalLight position={[3, 4, 5]} intensity={1.55} color="#ffd0a3" />
        <directionalLight position={[-4, -2, 4]} intensity={0.7} color="#68d7cf" />
        <TropicalLightSculpture />
      </Canvas>
    </div>
  );
}

function TropicalLightSculpture() {
  const groupRef = useRef<THREE.Group>(null);
  const poolRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }) => {
    const time = clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.22) * 0.24 + pointer.x * 0.08;
      groupRef.current.rotation.x = Math.cos(time * 0.18) * 0.08 - pointer.y * 0.05;
      groupRef.current.position.y = Math.sin(time * 0.55) * 0.08;
    }

    if (poolRef.current) {
      poolRef.current.rotation.z = Math.sin(time * 0.35) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0.65, 0.15, -0.2]}>
      <mesh position={[0, 0.38, 0]}>
        <sphereGeometry args={[0.88, 48, 48]} />
        <meshStandardMaterial color="#d96432" roughness={0.42} metalness={0.08} emissive="#6f1f10" emissiveIntensity={0.08} />
      </mesh>
      <mesh position={[0, 0.42, -0.02]} rotation={[0.9, 0.2, 0.2]}>
        <torusGeometry args={[1.08, 0.018, 16, 96]} />
        <meshStandardMaterial color="#f6b84c" roughness={0.22} metalness={0.4} />
      </mesh>
      <mesh position={[0.2, 1.18, 0]} rotation={[0.45, 0.2, -0.75]}>
        <coneGeometry args={[0.18, 0.42, 4]} />
        <meshStandardMaterial color="#0f6c4b" roughness={0.6} />
      </mesh>
      <mesh ref={poolRef} position={[-0.62, -0.82, -0.25]} rotation={[1.18, 0.25, -0.18]}>
        <torusGeometry args={[1.48, 0.038, 18, 128]} />
        <meshStandardMaterial color="#5ed4cc" roughness={0.16} metalness={0.25} transparent opacity={0.72} />
      </mesh>
      <mesh position={[-0.62, -0.82, -0.32]} rotation={[1.18, 0.25, -0.18]}>
        <circleGeometry args={[1.45, 96]} />
        <meshStandardMaterial color="#7ee1df" transparent opacity={0.18} side={THREE.DoubleSide} />
      </mesh>
    </group>
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
