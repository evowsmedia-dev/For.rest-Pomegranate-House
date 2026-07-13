import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const bookingConfig = {
  bookingPhone: "+84 900 000 000",
  bookingZaloUrl: "https://zalo.me/840900000000",
  locationLabel: "Outside Da Lat, Lam Dong, Vietnam",
};

const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85",
    alt: "Warm timber garden house surrounded by green trees",
  },
  {
    src: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=900&q=85",
    alt: "Small cabin porch in soft morning forest light",
  },
];

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85",
    alt: "Sunlit living room with large glass doors facing the garden",
    label: "IDEA 01",
    text: "A small house for slow reading, deeper sleep, and mornings that begin with the garden.",
  },
  {
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=85",
    alt: "Warm wood lounge corner with light linen textures",
    label: "IDEA 02",
    text: "Natural textures, light linen, and quiet corners designed for staying in.",
  },
  {
    src: "https://images.unsplash.com/photo-1521783593447-5702b9bfd267?auto=format&fit=crop&w=900&q=85",
    alt: "Breakfast table beside a window looking into green trees",
    label: "IDEA 03",
    text: "Simple breakfasts by the window before a short walk through the nearby hills.",
  },
];

const journalCards = [
  {
    src: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=900&q=85",
    title: "A morning with nothing scheduled",
  },
  {
    src: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=900&q=85",
    title: "Small paths around the house",
  },
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=85",
    title: "When the garden is the destination",
  },
];

const amenities = [
  "2 private bedrooms",
  "Compact kitchen with essentials",
  "Garden yard and tea porch",
  "Wifi, air conditioning, hot water",
  "Window-side work corner",
  "Optional breakfast support",
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "For.rest Pomegranate House",
  description:
    "A private garden homestay outside Da Lat, Vietnam, designed for quiet weekend stays, slow mornings, small groups, and direct booking by Zalo or phone.",
  telephone: bookingConfig.bookingPhone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Da Lat",
    addressRegion: "Lam Dong",
    addressCountry: "VN",
  },
  amenityFeature: amenities.map((amenity) => ({
    "@type": "LocationFeatureSpecification",
    name: amenity,
    value: true,
  })),
  image: heroImages.map((image) => image.src),
};

function App() {
  const phoneHref = `tel:${bookingConfig.bookingPhone.replace(/\s/g, "")}`;

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
          <p className="meta">PRIVATE GARDEN HOMESTAY NEAR DA LAT</p>
          <h1>For.rest Pomegranate House</h1>
          <p>
            A quiet garden house for travelers who want the city to fall
            away, the morning to arrive slowly, and the booking to stay simple.
          </p>
        </div>

        <div className="hero-grid" aria-label="For.rest Pomegranate House overview photos">
          <img className="hero-image-large" src={heroImages[0].src} alt={heroImages[0].alt} />
          <img className="hero-image-small" src={heroImages[1].src} alt={heroImages[1].alt} />
        </div>

        <BookingBar />
      </section>

      <section className="page-shell intro" id="space">
        <div>
          <p className="meta">THE HOUSE</p>
          <h2>A private garden homestay made for small groups and unhurried days.</h2>
        </div>
        <p>
          Pomegranate House is shaped like a stay-in journal: warm materials,
          wide openings, a useful little kitchen, and a garden that gives every
          hour its own reason to slow down.
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
            <h2>Everything is kept useful, calm, and easy to settle into.</h2>
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
            <h2>Small scenes from a For.rest weekend.</h2>
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
          and small groups looking for a quiet weekend base with light cooking,
          garden time, and short walks nearby.
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
    </main>
  );
}

function BookingBar() {
  return (
    <form className="booking-bar" aria-label="Check stay availability" onSubmit={(event) => event.preventDefault()}>
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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
