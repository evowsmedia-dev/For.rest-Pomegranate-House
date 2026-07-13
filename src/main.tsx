import { StrictMode, useEffect, useRef, useState, type Ref } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const bookingConfig = {
  bookingPhone: "+84 900 000 000",
  bookingZaloUrl: "https://zalo.me/840900000000",
  contactEmail: "hello@forrest.example",
  locationLabel: "A quiet coastal village in Vietnam",
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
    label: "IDEA 01",
    text: "A private pool courtyard framed by cream walls, red tile roofs, and timber doors.",
  },
  {
    src: "/house/5.jpg",
    alt: "Loft interior with wooden staircase, dining table, and compact kitchen",
    label: "IDEA 02",
    text: "A loft-style interior with warm wood, textured plaster, and a practical little kitchen.",
  },
  {
    src: "/house/3.jpg",
    alt: "Twin beds facing an open window with sea and red roof views",
    label: "IDEA 03",
    text: "Sea-view bedrooms where red rooftops, open windows, and white linen set the pace.",
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
  "Shared meal and local food support",
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "For.rest Pomegranate House",
  description:
    "A private coastal pool homestay in Vietnam with sea-view rooms, warm timber interiors, shared dining, and direct booking by Zalo or phone.",
  telephone: bookingConfig.bookingPhone,
  address: {
    "@type": "PostalAddress",
    addressCountry: "VN",
  },
  amenityFeature: amenities.map((amenity) => ({
    "@type": "LocationFeatureSpecification",
    name: amenity,
    value: true,
  })),
  image: [...heroImages, ...galleryImages, ...journalCards].map((image) => image.src),
};

function App() {
  const phoneHref = `tel:${bookingConfig.bookingPhone.replace(/\s/g, "")}`;
  const heroBookingRef = useRef<HTMLFormElement>(null);
  const [showStickyBooking, setShowStickyBooking] = useState(false);

  useEffect(() => {
    const heroBooking = heroBookingRef.current;

    if (!heroBooking) {
      return;
    }

    const syncStickyBooking = () => {
      setShowStickyBooking(heroBooking.getBoundingClientRect().bottom < 0 && window.scrollY > 240);
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
      <div className="announcement" role="banner">
        <span>Weekend stays are now open for direct booking</span>
        <a href="#booking" aria-label="Go to the booking section">
          Reserve early to hold the house →
        </a>
      </div>

      <header className="site-header" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="For.rest Pomegranate House">
          For.rest
        </a>
        <nav>
          <a href="#space">The house</a>
          <a href="#experience">The stay</a>
          <a href="#location">Location</a>
          <a className="nav-pill" href="#booking">
            Book direct
          </a>
        </nav>
      </header>

      <section className="hero page-shell" id="top">
        <div className="hero-copy">
          <p className="meta">PRIVATE COASTAL POOL HOMESTAY</p>
          <h1>For.rest Pomegranate House</h1>
          <p>
            A coastal house with a turquoise pool courtyard, sea-view rooms,
            warm timber details, and direct booking that stays simple.
          </p>
        </div>

        <div className="hero-grid" aria-label="For.rest Pomegranate House overview photos">
          <img className="hero-image-large" src={heroImages[0].src} alt={heroImages[0].alt} />
          <img className="hero-image-small" src={heroImages[1].src} alt={heroImages[1].alt} />
        </div>

        <BookingBar ref={heroBookingRef} />
      </section>

      <section className="page-shell intro" id="space">
        <div>
          <p className="meta">THE HOUSE</p>
          <h2>A private coastal homestay made for pool days, sea views, and long meals.</h2>
        </div>
        <p>
          Pomegranate House is shaped around a bright courtyard pool, arched
          openings, red rooflines, and rooms that look toward the sea. It feels
          lived-in, textured, and easy for small groups to settle into.
        </p>
      </section>

      <section className="page-shell photo-row" aria-label="House details and garden moments">
        {galleryImages.map((image) => (
          <article className="photo-card" key={image.label}>
            <img src={image.src} alt={image.alt} />
            <div>
              <p className="meta">{image.label}</p>
              <p>{image.text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="feature-band" id="experience">
        <div className="page-shell feature-grid">
          <div>
            <p className="meta">STAY DETAILS</p>
            <h2>Everything is close at hand: the pool, the table, the rooms, and the sea air.</h2>
          </div>
          <ul className="amenity-list" aria-label="Homestay amenities">
            {amenities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="page-shell journal" aria-label="Stay inspiration">
        <div className="section-heading">
          <div>
            <p className="meta">PERSPECTIVES</p>
            <h2>Small scenes from a For.rest coastal stay.</h2>
          </div>
          <a className="pill-link" href="#booking">
            Hold your dates →
          </a>
        </div>
        <div className="journal-grid">
          {journalCards.map((card) => (
            <article className="journal-card" key={card.title}>
              <img src={card.src} alt="" />
              <div>
                <p className="meta">JOURNAL</p>
                <h3>{card.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-shell booking-section" id="booking">
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
      </section>

      <section className="page-shell location" id="location">
        <p className="meta">LOCATION</p>
        <h2>{bookingConfig.locationLabel}</h2>
        <p>
          The exact address is shared after reservation. The area suits couples
          and small groups looking for a quiet coastal base with pool time,
          home-style meals, sea views, and sunset walks nearby.
        </p>
      </section>

      <footer className="page-shell footer">
        <a className="brand" href="#top">For.rest</a>
        <div>
          <p>For.rest Pomegranate House</p>
          <p>Book directly by Zalo or phone.</p>
        </div>
        <div className="footer-links">
          <a href="#space">The house</a>
          <a href="#experience">The stay</a>
          <a href="#booking">Book direct</a>
        </div>
      </footer>

      <div className={`sticky-booking ${showStickyBooking ? "is-visible" : ""}`} aria-hidden={!showStickyBooking}>
        <BookingBar variant="sticky" />
      </div>

      <ChatWidget />
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

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const emailHref = createEmailHref(message || "Hi For.rest, I would like to ask about Pomegranate House.");

  return (
    <aside className={`chat-widget ${isOpen ? "is-open" : ""}`} aria-label="For.rest direct chat">
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
            Pomegranate House availability, booking questions, and direct contact.
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
