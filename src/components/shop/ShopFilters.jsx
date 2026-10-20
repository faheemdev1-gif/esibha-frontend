import { INTENSITIES, matchesProduct } from "../../utils/catalog";
export default function ShopFilters({
  filters,
  onChange,
  options,
  products,
  onReset,
}) {
  const toggle = (key, value) =>
    onChange((current) => ({
      ...current,
      [key]: current[key].includes(value)
        ? current[key].filter((item) => item !== value)
        : [...current[key], value],
    }));
  return (
    <div className="catalog-filter-panel">
      <div className="catalog-filter-heading">
        <h2>Refine your search</h2>
        <button onClick={onReset}>Reset all</button>
      </div>
      {[
        ["category", "Category"],
        ["family", "Scent family"],
        ["mood", "Mood"],
        ["size", "Size / variation"],
        ["intensity", "Intensity"],
      ].map(([key, title]) => (
        <fieldset key={key} className="catalog-filter-group">
          <legend>{title}</legend>
          <div className="catalog-filter-options">
            {(key === "intensity"
              ? Object.keys(INTENSITIES)
              : options[key] || []
            ).map((value) => {
              const count = products.filter((product) =>
                matchesProduct(product, { ...filters, [key]: [value] }),
              ).length;
              return (
                <label key={value}>
                  <input
                    type="checkbox"
                    checked={filters[key].includes(value)}
                    onChange={() => toggle(key, value)}
                  />
                  <span>{value}</span>
                  <small>{count}</small>
                </label>
              );
            })}
            {key !== "intensity" && !options[key]?.length && (
              <small>No options yet</small>
            )}
          </div>
        </fieldset>
      ))}
      <fieldset className="catalog-filter-group">
        <legend>Price range (PKR)</legend>
        <div className="catalog-price-inputs">
          <label>
            From
            <input
              aria-label="Minimum price"
              inputMode="decimal"
              type="number"
              min="0"
              placeholder="0"
              value={filters.min}
              onChange={(event) => onChange({ min: event.target.value }, true)}
            />
          </label>
          <span>—</span>
          <label>
            To
            <input
              aria-label="Maximum price"
              inputMode="decimal"
              type="number"
              min="0"
              placeholder="Any"
              value={filters.max}
              onChange={(event) => onChange({ max: event.target.value }, true)}
            />
          </label>
        </div>
        {filters.min !== "" &&
          filters.max !== "" &&
          Number(filters.min) > Number(filters.max) && (
            <small role="status">The minimum is higher than the maximum.</small>
          )}
      </fieldset>
      <label className="catalog-stock">
        <input
          type="checkbox"
          checked={filters.stock}
          onChange={(event) => onChange({ stock: event.target.checked })}
        />
        In stock only
      </label>
    </div>
  );
}
