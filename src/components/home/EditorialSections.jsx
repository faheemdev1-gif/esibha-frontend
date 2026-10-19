import { Link } from "react-router-dom";
import { JOURNAL_POSTS } from "../../data/seed";
import { ArrowRight } from "../ui/Icons";
import "./editorial-sections.css";

const MOODS = [
  {
    name: "Fresh",
    query: "Fresh",
    subtitle: "Citrus & Aquatic",
    icon: "leaves",
    x: 74,
    tone: "#4e5d34",
    glow: "#708456",
    alt: "Green perfume bottle with fresh lime and citrus leaves",
  },
  {
    name: "Romantic",
    query: "Romantic",
    subtitle: "Floral & Soft",
    icon: "flower",
    x: 368,
    tone: "#9c5c52",
    glow: "#d68f80",
    alt: "Rose pink perfume bottle among soft roses and petals",
  },
  {
    name: "Bold",
    query: "Bold",
    subtitle: "Oud & Intense",
    icon: "diamond",
    x: 662,
    tone: "#100d06",
    glow: "#33281a",
    alt: "Dark perfume bottle with oud wood and a curl of smoke",
  },
  {
    name: "Luxury",
    query: "Luxurious",
    subtitle: "Rich & Rare",
    icon: "crown",
    x: 956,
    tone: "#412203",
    glow: "#97610d",
    alt: "Amber perfume bottle with golden resin and warm light",
  },
  {
    name: "Night",
    query: "Night",
    subtitle: "Dark & Musk",
    icon: "moon",
    x: 1250,
    tone: "#050e15",
    glow: "#162e44",
    alt: "Midnight blue perfume bottle with dark flowers and stone",
  },
];

function CraftIcon({ name, className = "" }) {
  let drawing;
  switch (name) {
    case "leaves":
      drawing = (
        <>
          <path d="M24 40V23M24 31C12 31 10 23 10 15c9 0 16 5 14 16ZM24 36c12 0 16-8 16-17-10 0-17 6-16 17ZM24 25c-6-3-7-9-2-15 6 4 8 10 2 15Z" />
        </>
      );
      break;
    case "leaf":
      drawing = (
        <>
          <path d="M12 39c1-17 9-26 27-28 1 19-9 29-24 23M10 42l25-26" />
          <path d="m19 32-1-9m7 3 9 1" />
        </>
      );
      break;
    case "flower":
      drawing = (
        <>
          <circle cx="24" cy="25" r="5" />
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <ellipse
              key={angle}
              cx="24"
              cy="13"
              rx="5.4"
              ry="8.5"
              transform={`rotate(${angle} 24 25)`}
            />
          ))}
          <path d="M24 31v11m0-4c-7 0-9-3-9-7 6 0 9 2 9 7Z" />
        </>
      );
      break;
    case "diamond":
      drawing = (
        <>
          <path d="m24 8 16 16-16 16L8 24 24 8Z" />
          <path d="m24 13 11 11-11 11-11-11 11-11Z" />
        </>
      );
      break;
    case "crown":
      drawing = (
        <>
          <path d="m9 16 6 10 9-15 9 15 6-10-5 20H14L9 16ZM14 40h20" />
          <circle cx="8" cy="13" r="2" />
          <circle cx="24" cy="8" r="2" />
          <circle cx="40" cy="13" r="2" />
        </>
      );
      break;
    case "moon":
      drawing = (
        <>
          <path d="M31 8a17 17 0 1 0 9 27A18 18 0 0 1 31 8Z" />
          <path d="m36 10 1 4 4 1-4 1-1 4-1-4-4-1 4-1 1-4Zm5 13v6m-3-3h6" />
        </>
      );
      break;
    case "book":
      drawing = (
        <>
          <path d="M24 13c-7-5-13-4-18-2v27c6-2 12-2 18 2 6-4 12-4 18-2V11c-5-2-11-3-18 2Zm0 0v27" />
        </>
      );
      break;
    case "education":
      drawing = (
        <>
          <path d="m4 18 20-9 20 9-20 9L4 18Zm9 5v12c7 5 15 5 22 0V23M42 20v16" />
        </>
      );
      break;
    case "search":
      drawing = (
        <>
          <circle cx="20" cy="20" r="12" />
          <path d="m29 29 12 12" />
        </>
      );
      break;
    case "heart":
      drawing = (
        <path d="m24 41-17-17C-5 10 15-3 24 13 33-3 53 10 41 24L24 41Z" />
      );
      break;
    case "blend":
      drawing = (
        <>
          <path d="M14 8h8m-7 0v7m6-7v7m-5 0h4l8 10c8 11-12 20-17 10-3-6 2-13 5-20ZM30 8h8m-6 0v7m4-7v7m-3 1h3l6 8c4 6 0 12-6 13" />
          <path d="m17 28 4 5-4 5-4-5 4-5Z" />
        </>
      );
      break;
    default:
      drawing = (
        <>
          <path d="M19 7h10v7H19V7Zm-3 12h16l5 6v17H11V25l5-6Zm2-5h12v5H18v-5Z" />
          <rect x="16" y="28" width="16" height="9" rx="1" />
        </>
      );
  }
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.45"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {drawing}
    </svg>
  );
}

// Crop only the photography from the supplied references. All headings,
// metadata, controls and decorative marks remain real, responsive HTML/SVG.
function PhotoCrop({ src, sourceWidth, crop, alt, className = "" }) {
  return (
    <div
      className={`editorial-photo ${className}`}
      style={{
        "--photo-ratio": `${crop.width} / ${crop.height}`,
        "--photo-width": `${(sourceWidth / crop.width) * 100}%`,
        "--photo-left": `${(-crop.x / crop.width) * 100}%`,
        "--photo-top": `${(-crop.y / crop.height) * 100}%`,
      }}
    >
      <img src={src} alt={alt} loading="lazy" decoding="async" />
    </div>
  );
}

function Flourish({ simple = false }) {
  return (
    <svg
      className={`editorial-flourish ${simple ? "is-simple" : ""}`}
      viewBox="0 0 390 30"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={
          simple ? "M0 15h177m36 0h177" : "M0 15h36m318 0h36M110 15h66m38 0h66"
        }
        stroke="currentColor"
        strokeWidth=".9"
      />
      <path
        d="m184 15 11-7 11 7-11 7-11-7Z"
        stroke="currentColor"
        strokeWidth=".9"
      />
      {!simple && (
        <>
          <path
            d="M195 15c-25-20-22-24-18-12 3 9 6 12 18 12Zm0 0c25-20 22-24 18-12-3 9-6 12-18 12Zm0 0c-25 20-22 24-18 12 3-9 6-12 18-12Zm0 0c25 20 22 24 18 12-3-9-6-12-18-12Z"
            stroke="currentColor"
            strokeWidth=".8"
          />
          <path
            d="m118 15 35-2 26 2-26 2-35-2Zm154 0-35-2-26 2 26 2 35-2Z"
            fill="currentColor"
            opacity=".6"
          />
        </>
      )}
    </svg>
  );
}

function EditorialHeader({
  eyebrow,
  title,
  description,
  to,
  linkLabel,
  ornate = false,
}) {
  return (
    <header className="editorial-heading">
      <div>
        <p className="editorial-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {ornate ? (
          <Flourish />
        ) : (
          <span className="editorial-short-rule" aria-hidden="true" />
        )}
        <p className="editorial-description">{description}</p>
      </div>
      <Link className="editorial-outline-link" to={to}>
        {linkLabel}
        <ArrowRight size={23} />
      </Link>
    </header>
  );
}

export function DiscoverMoods() {
  return (
    <section
      className="home-editorial mood-section"
      aria-labelledby="home-moods-title"
    >
      <div className="editorial-wrap">
        <EditorialHeader
          eyebrow="Curated Moods"
          title={<span id="home-moods-title">Discover by Feeling</span>}
          description={
            <>
              Every mood has a scent. Find the fragrance
              <br className="editorial-desktop-break" /> that feels like you.
            </>
          }
          to="/shop"
          linkLabel="View All"
        />
        <div className="mood-collection">
          {MOODS.map((mood) => (
            <Link
              className={`mood-card mood-${mood.query.toLowerCase()}`}
              key={mood.name}
              to={`/shop?mood=${mood.query}`}
              aria-label={`Explore ${mood.name} fragrances`}
              style={{ "--mood-tone": mood.tone, "--mood-glow": mood.glow }}
            >
              <div className="mood-visual">
                <PhotoCrop
                  src="/images/home/moods-reference.png"
                  sourceWidth={1600}
                  crop={{ x: mood.x, y: 500, width: 275, height: 279 }}
                  alt={mood.alt}
                  className="mood-photo"
                />
                <div className="mood-caption">
                  <span className="mood-icon">
                    <CraftIcon name={mood.icon} />
                  </span>
                  <h3>{mood.name}</h3>
                  <p>{mood.subtitle}</p>
                </div>
              </div>
              <span className="mood-explore">
                Explore <ArrowRight size={21} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const JOURNAL_IMAGES = [
  {
    x: 135,
    alt: "Golden perfume bottle with a mist of fragrance and oud wood",
    decoration: "flower",
  },
  {
    x: 600,
    alt: "Pieces of dark oud wood with warm golden highlights",
    decoration: "wood",
  },
  {
    x: 1065,
    alt: "A perfumer blending fragrance with a glass pipette and bottles",
    decoration: "bottle",
  },
];
const CRAFT_VALUES = [
  { icon: "bottle", first: "Crafted with", last: "Fine Ingredients" },
  { icon: "leaf", first: "Inspired by Nature,", last: "Perfected by Science" },
  { icon: "blend", first: "Made for Moments", last: "that Matter" },
  { icon: "heart", first: "Thoughtful Stories,", last: "Timeless Craft" },
];
function CardDecoration({ kind }) {
  if (kind === "wood")
    return (
      <svg
        className="journal-decoration journal-wood"
        viewBox="0 0 170 190"
        fill="none"
        aria-hidden="true"
      >
        {[0, 10, 20, 30, 40, 50, 60, 70].map((n) => (
          <path
            key={n}
            d={`M${170 - n} 0C${90 - n} 60 ${160 - n} 100 ${55 - n} 150L${5 - n} 190`}
            stroke="currentColor"
            strokeWidth="1"
          />
        ))}
      </svg>
    );
  return (
    <div className={`journal-decoration journal-${kind}`}>
      <CraftIcon name={kind} />
    </div>
  );
}
export function StoriesJournal() {
  return (
    <section
      className="home-editorial journal-section"
      aria-labelledby="home-journal-title"
    >
      <div className="editorial-wrap">
        <EditorialHeader
          eyebrow="Journal"
          title={<span id="home-journal-title">Stories &amp; Craft</span>}
          description="Insights, inspiration and the art behind every drop."
          to="/journal"
          linkLabel="All Posts"
          ornate
        />
        <div className="journal-collection">
          {JOURNAL_POSTS.slice(0, 3).map((post, index) => (
            <Link
              key={post.id}
              className={`journal-story ${index === 1 ? "journal-story-featured" : ""}`}
              to={`/journal/${post.slug}`}
              aria-labelledby={`home-${post.id}`}
            >
              <div className="journal-story-photo">
                <PhotoCrop
                  src="/images/home/journal-reference.png"
                  sourceWidth={1536}
                  crop={{
                    x: JOURNAL_IMAGES[index].x,
                    y: 310,
                    width: 343,
                    height: 248,
                  }}
                  alt={JOURNAL_IMAGES[index].alt}
                />
                <div className="journal-photo-meta">
                  <span className="journal-category">
                    <CraftIcon
                      name={
                        post.category === "Education"
                          ? "education"
                          : post.category === "Ingredients"
                            ? "leaf"
                            : "book"
                      }
                    />
                    {post.category}
                  </span>
                  <time dateTime={["2024-05", "2024-04", "2024-03"][index]}>
                    {post.date}
                  </time>
                </div>
              </div>
              <div className="journal-story-body">
                <h3 id={`home-${post.id}`}>{post.title}</h3>
                <span className="editorial-short-rule" aria-hidden="true" />
                <p>{post.excerpt}</p>
                <span className="journal-read-more">
                  Read More <ArrowRight size={20} />
                </span>
                <CardDecoration kind={JOURNAL_IMAGES[index].decoration} />
              </div>
            </Link>
          ))}
        </div>
        <div
          className="editorial-craft-values"
          aria-label="Our approach to fragrance"
        >
          {CRAFT_VALUES.map((item) => (
            <div className="editorial-craft-value" key={item.first}>
              <CraftIcon name={item.icon} />
              <p>
                {item.first}
                <br />
                <strong>{item.last}</strong>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FragranceFinderTeaser() {
  return (
    <section
      className="home-editorial finder-editorial-section"
      aria-labelledby="home-finder-title"
    >
      <div className="editorial-wrap">
        <div className="finder-editorial-panel">
          <div className="finder-editorial-photo">
            <img
              src="/images/home/finder-reference.png"
              alt="Three eSibha fragrances on a marble pedestal, with jasmine, oud and amber"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="finder-editorial-copy">
            <p className="editorial-eyebrow">Fragrance Finder</p>
            <span className="finder-eyebrow-rule" aria-hidden="true" />
            <h2 id="home-finder-title">
              Any Fragrance.
              <br />
              <em>On Demand.</em>
            </h2>
            <Flourish simple />
            <p className="finder-editorial-description">
              Name any designer scent — we find our version or recreate it
              specifically for you.
            </p>
            <Link className="finder-editorial-button" to="/finder">
              Try the Finder <ArrowRight size={32} />
            </Link>
            <div
              className="finder-editorial-steps"
              aria-label="How the finder works"
            >
              {[
                { icon: "bottle", title: "Any Scent", detail: "You Name It" },
                {
                  icon: "search",
                  title: "We Find It",
                  detail: "Your Perfect Match",
                },
                {
                  icon: "bottle",
                  title: "Custom Made",
                  detail: "Just For You",
                },
              ].map((step) => (
                <div className="finder-editorial-step" key={step.title}>
                  <span>
                    <CraftIcon name={step.icon} />
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
