import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useCategories } from "../api/storeConfig";
import ProductCard from "../components/shop/ProductCard";
import ShopFilters from "../components/shop/ShopFilters";
import { filterProducts, MULTI_FILTERS, readFilters } from "../utils/catalog";
import api from "../api/api";
import "../components/shop/catalog.css";

export default function ShopPage() {
  const { category } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const categories = useCategories();
  const routeCategory = category
    ? categories.find((item) => item.slug === category)?.name || category
    : null;
  const filters = readFilters(params, routeCategory);
  const sort = params.get("sort") || "default";
  const [catalog, setCatalog] = useState({
    products: [],
    family: [],
    mood: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const dialog = useRef(null);
  useEffect(() => {
    let active = true;
    Promise.all(
      ["/products", "/scent-families", "/moods"].map((path) => api.get(path)),
    )
      .then((results) => {
        if (active) {
          setCatalog({
            products: results[0].data.data,
            family: results[1].data.data,
            mood: results[2].data.data,
          });
          setError("");
        }
      })
      .catch(() => {
        if (active)
          setError("We couldn’t load the collection. Please try again.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [attempt]);
  const update = (patch, replace = false, requestedSort) => {
    // Read the latest URL inside the event so rapid changes compose even while
    // React Router is still rendering the previous navigation.
    const currentParams = new URLSearchParams(window.location.search);
    const currentSlug = window.location.pathname.startsWith("/shop/")
      ? window.location.pathname.split("/")[2]
      : null;
    const currentCategory = currentSlug
      ? categories.find((item) => item.slug === currentSlug)?.name ||
        currentSlug
      : null;
    const current = readFilters(currentParams, currentCategory);
    const next =
      typeof patch === "function" ? patch(current) : { ...current, ...patch };
    const nextSort = requestedSort ?? currentParams.get("sort") ?? "default";
    const query = new URLSearchParams();
    for (const key of MULTI_FILTERS)
      next[key].forEach((value) => query.append(key, value));
    for (const key of ["q", "min", "max"])
      if (next[key] !== "") query.set(key, next[key]);
    if (next.stock) query.set("stock", "true");
    if (nextSort !== "default") query.set("sort", nextSort);
    navigate(`/shop${query.size ? `?${query}` : ""}`, {
      replace,
      preventScrollReset: true,
    });
  };
  const reset = () => update(readFilters(new URLSearchParams()), false, sort);
  const options = {
    category: [
      ...new Set([
        ...categories.map((item) => item.name),
        ...catalog.products.map((item) => item.category),
      ]),
    ],
    family: [
      ...new Set([
        ...catalog.family.map((item) => item.name),
        ...catalog.products.map((item) => item.family),
      ]),
    ],
    mood: [
      ...new Set([
        ...catalog.mood.map((item) => item.name),
        ...catalog.products.map((item) => item.mood),
      ]),
    ].filter(Boolean),
    size: [
      ...new Set(
        catalog.products.flatMap((item) =>
          item.sizes.map((size) => size.label),
        ),
      ),
    ].sort((a, b) => a.localeCompare(b, undefined, { numeric: true })),
  };
  const products = filterProducts(catalog.products, filters, sort);
  const chips = MULTI_FILTERS.flatMap((key) =>
    filters[key].map((value) => ({ key, value, label: value })),
  );
  if (filters.q) chips.push({ key: "q", label: `Search: ${filters.q}` });
  if (filters.min !== "")
    chips.push({
      key: "min",
      label: `From PKR ${Number(filters.min).toLocaleString()}`,
    });
  if (filters.max !== "")
    chips.push({
      key: "max",
      label: `To PKR ${Number(filters.max).toLocaleString()}`,
    });
  if (filters.stock) chips.push({ key: "stock", label: "In stock" });
  const panel = (
    <ShopFilters
      filters={filters}
      onChange={update}
      options={options}
      products={catalog.products}
      onReset={reset}
    />
  );
  return (
    <div className="catalog-page">
      <header className="catalog-header">
        <div className="container">
          <p className="section-eyebrow">The eSibha collection</p>
          <h1>{routeCategory || "Find your signature scent"}</h1>
          <p>
            Explore by family, mood, and the details that make a fragrance
            yours.
          </p>
          <form
            className="catalog-search"
            onSubmit={(event) => event.preventDefault()}
            role="search"
          >
            <label htmlFor="catalog-search">Search fragrances</label>
            <div>
              <input
                id="catalog-search"
                type="search"
                placeholder="Search a fragrance, note, or inspiration…"
                value={filters.q}
                onChange={(event) => update({ q: event.target.value }, true)}
              />
              <span aria-hidden="true">⌕</span>
            </div>
          </form>
        </div>
      </header>
      <div className="container catalog-body">
        <div className="catalog-toolbar">
          <p aria-live="polite">
            {loading
              ? "Loading collection…"
              : `${products.length} ${products.length === 1 ? "fragrance" : "fragrances"}`}
          </p>
          <div>
            <button
              className="catalog-mobile-trigger"
              onClick={() => dialog.current.showModal()}
            >
              Filters {chips.length > 0 && `(${chips.length})`}
            </button>
            <label>
              Sort by{" "}
              <select
                aria-label="Sort fragrances"
                value={sort}
                onChange={(event) => update({}, false, event.target.value)}
              >
                <option value="default">Recommended</option>
                <option value="new">Newest arrivals</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </label>
          </div>
        </div>
        {chips.length > 0 && (
          <div className="catalog-chips" aria-label="Active filters">
            {chips.map((chip) => (
              <button
                key={`${chip.key}-${chip.value || ""}`}
                aria-label={`Remove ${chip.label} filter`}
                onClick={() =>
                  update((current) => ({
                    ...current,
                    [chip.key]: MULTI_FILTERS.includes(chip.key)
                      ? current[chip.key].filter(
                          (value) => value !== chip.value,
                        )
                      : chip.key === "stock"
                        ? false
                        : "",
                  }))
                }
              >
                {chip.label} <span>×</span>
              </button>
            ))}
            <button className="catalog-clear" onClick={reset}>
              Clear all
            </button>
          </div>
        )}
        <div className="catalog-layout">
          <aside className="catalog-desktop-filters" aria-label="Shop filters">
            {panel}
          </aside>
          <main aria-label="Fragrance results" aria-busy={loading}>
            {loading ? (
              <div className="catalog-empty" role="status">
                Gathering your fragrances…
              </div>
            ) : error ? (
              <div className="catalog-empty" role="alert">
                <h2>Collection unavailable</h2>
                <p>{error}</p>
                <button
                  onClick={() => {
                    setLoading(true);
                    setAttempt((value) => value + 1);
                  }}
                >
                  Try again
                </button>
              </div>
            ) : products.length ? (
              <div className="product-grid">
                {products.map((product) => (
                  <ProductCard
                    key={`${product._id}-${product.shopSizes.map((size) => size.label).join("|")}`}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <div className="catalog-empty">
                <span>◇</span>
                <h2>No fragrances found</h2>
                <p>
                  Try a different price range or remove a filter to explore more
                  scents.
                </p>
                <button onClick={reset}>Clear filters</button>
              </div>
            )}
          </main>
        </div>
      </div>
      <dialog
        ref={dialog}
        className="catalog-filter-dialog"
        aria-label="Filter fragrances"
      >
        <div className="catalog-dialog-top">
          <strong>Filters</strong>
          <button
            aria-label="Close filters"
            onClick={() => dialog.current.close()}
          >
            ×
          </button>
        </div>
        {panel}
        <div className="catalog-dialog-footer">
          <button onClick={() => dialog.current.close()}>
            Show {products.length} fragrances
          </button>
        </div>
      </dialog>
    </div>
  );
}
