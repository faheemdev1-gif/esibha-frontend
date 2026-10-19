import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  DiscoverMoods,
  StoriesJournal,
  FragranceFinderTeaser,
} from "../components/home/EditorialSections";
import ProductCard from "../components/shop/ProductCard";
import Button from "../components/ui/Button";
import { ArrowRight } from "../components/ui/Icons";
import ReviewGallery from "../components/reviews/ReviewGallery";
import api from "../api/api";

const CUSTOMER_REVIEWS = [
  { name: "Amin", image: "/reviews/amin.webp" },
  { name: "Fahad", image: "/reviews/fahad.webp" },
  { name: "Minahil", image: "/reviews/minahil.webp" },
  { name: "Muzdalfa", image: "/reviews/muzdalfa.webp" },
  { name: "Rahat", image: "/reviews/rahat.webp" },
  { name: "Riffat", image: "/reviews/riffat.webp" },
  { name: "Shahan Babar", image: "/reviews/shahan-babar.webp" },
  { name: "Stoic", image: "/reviews/stoic.webp" },
  { name: "Tahir", image: "/reviews/tahir.webp" },
  { name: "Customer review", image: "/reviews/g-13.webp" },
];

export default function HomePage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch homepage products:", error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  const bestsellers = products
    .filter((p) => p.bestseller || p.mostLoved)
    .slice(0, 4);

  const fallbackBestsellers = products.slice(0, 4);

  const displayBestsellers =
    bestsellers.length > 0 ? bestsellers : fallbackBestsellers;

  const menProducts = products
    .filter((p) => p.category === "Men's")
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
    .slice(0, 4);

  const womenProducts = products
    .filter((p) => p.category === "Women's")
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
    .slice(0, 4);

  return (
    <div style={{ paddingTop: "var(--nav-h)" }}>
      {/* ── HERO ─────────────────────────────────────────────── */}
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "var(--s10) var(--s7) var(--s9)",
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid rgba(255,255,255,.08)",
          background: "#000",
        }}
      >
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,.35), rgba(0,0,0,.55), rgba(0,0,0,.75))",
            zIndex: 1,
          }}
        />

        {/* Decorative line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "1px",
            height: "80px",
            background:
              "linear-gradient(to bottom, transparent, rgba(255,255,255,.4))",
            zIndex: 2,
          }}
        />

        {/* Hero Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "900px",
          }}
        >
          <p
            className="fade-up d1 section-eyebrow"
            style={{ color: "rgba(255,255,255,.75)" }}
          >
            Luxury Fragrance House · Pakistan
          </p>

          <h1
            className="fade-up d2"
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(52px, 8vw, 96px)",
              fontWeight: 300,
              lineHeight: 1.05,
              color: "#fff",
              marginBottom: "var(--s4)",
              letterSpacing: "-0.01em",
            }}
          >
            Wear the Feeling,
            <br />
            <em
              style={{
                fontStyle: "italic",
                color: "#d8b26e",
              }}
            >
              Not Just the Scent.
            </em>
          </h1>

          <p
            className="fade-up d3"
            style={{
              fontSize: "15px",
              fontWeight: 300,
              color: "rgba(255,255,255,.85)",
              maxWidth: "450px",
              lineHeight: 1.75,
              marginBottom: "var(--s7)",
              letterSpacing: "0.02em",
            }}
          >
            Designer-inspired fragrances crafted for those who know exactly what
            they want.
          </p>

          <div
            className="fade-up d4"
            style={{
              display: "flex",
              gap: "var(--s4)",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Button size="lg" onClick={() => navigate("/shop")}>
              Shop Collection
            </Button>

            <Button
              size="lg"
              variant="ghost"
              onClick={() => navigate("/finder")}
            >
              Find Your Fragrance
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="fade-up d5"
          style={{
            position: "absolute",
            bottom: "32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontSize: "9px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,.75)",
            }}
          >
            Scroll
          </span>

          <div
            style={{
              width: "1px",
              height: "36px",
              background:
                "linear-gradient(to bottom, rgba(255,255,255,.8), transparent)",
            }}
          />
        </div>
      </section>

      <DiscoverMoods />

      {/* ── BESTSELLERS ──────────────────────────────────────── */}
      <section
        style={{
          padding: "var(--s9) 0",
          background: "var(--bg-white)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container">
          <SectionHeader
            eyebrow="Bestsellers"
            title="Most Loved"
            linkTo="/shop"
            linkLabel="View All"
          />

          {loadingProducts ? (
            <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
              Loading products...
            </p>
          ) : displayBestsellers.length === 0 ? (
            <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
              No products found.
            </p>
          ) : (
            <div className="grid-cols-4">
              {displayBestsellers.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── SHOP FOR MEN ─────────────────────────────────────── */}
      <ProductCollectionSection
        eyebrow="For Him"
        title="Fragrances for Men"
        products={menProducts}
        loading={loadingProducts}
        linkTo={`/shop?category=${encodeURIComponent("Men's")}`}
      />

      {/* ── SHOP FOR WOMEN ───────────────────────────────────── */}
      <ProductCollectionSection
        eyebrow="For Her"
        title="Fragrances for Women"
        products={womenProducts}
        loading={loadingProducts}
        linkTo={`/shop?category=${encodeURIComponent("Women's")}`}
        alternate
      />

      <FragranceFinderTeaser />

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <ReviewGallery reviews={CUSTOMER_REVIEWS} />

      <StoriesJournal />
    </div>
  );
}

function SectionHeader({ eyebrow, title, linkTo, linkLabel }) {
  const navigate = useNavigate();

  return (
    <div className="section-header-row">
      <div>
        <p className="section-eyebrow">{eyebrow}</p>
        <h2 className="section-title">{title}</h2>
      </div>

      {linkTo && (
        <button
          onClick={() => navigate(linkTo)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "11px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            transition: "color var(--fast)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--text-muted)")
          }
        >
          {linkLabel} <ArrowRight size={13} />
        </button>
      )}
    </div>
  );
}

function ProductCollectionSection({
  eyebrow,
  title,
  products,
  loading,
  linkTo,
  alternate = false,
}) {
  return (
    <section
      style={{
        padding: "var(--s9) 0",
        background: alternate ? "var(--bg)" : "var(--bg-white)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="container">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          linkTo={linkTo}
          linkLabel="View All"
        />

        {loading ? (
          <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            Loading products...
          </p>
        ) : products.length === 0 ? (
          <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            No products are currently available in this collection.
          </p>
        ) : (
          <div className="grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
