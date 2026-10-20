import { useEffect, useRef, useState } from "react";
import { adminApi } from "../api/api";
import ImageGalleryEditor from "./ImageGalleryEditor";
import { errorMessage, slugify } from "./fields";
export function Dialog({ title, children, onClose, busy = false }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog.showModal();
    return () => dialog.close();
  }, []);
  return (
    <dialog
      ref={ref}
      className="adm-dialog"
      aria-labelledby="adm-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        if (!busy) onClose();
      }}
    >
      <div className="adm-dialog-head">
        <h2 id="adm-dialog-title">{title}</h2>
        <button
          type="button"
          className="adm-icon"
          aria-label="Close dialog"
          disabled={busy}
          onClick={onClose}
        >
          ×
        </button>
      </div>
      {children}
    </dialog>
  );
}
function localDate(value) {
  if (!value) return "";
  const date = new Date(value);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
}
export default function Editor({
  config,
  item,
  catalogOptions,
  onClose,
  onSaved,
}) {
  const [draft, setDraft] = useState(() => ({
    ...structuredClone(config.defaults),
    ...structuredClone(item || {}),
    ...(config.endpoint === "/products"
      ? {
          images: item?.images?.length
            ? [...item.images]
            : item?.image
              ? [item.image]
              : [],
        }
      : {}),
  }));
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const set = (key, value) =>
    setDraft((old) => ({
      ...old,
      [key]: value,
      ...(key === "name" &&
      (!old.slug || old.slug === slugify(old.name)) &&
      "slug" in old
        ? { slug: slugify(value) }
        : {}),
    }));
  const save = async (event) => {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const body = Object.fromEntries(
        config.fields.map(([key, , type]) => {
          let value = draft[key];
          if (type === "list" && typeof value === "string")
            value = value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean);
          if (["number", "optionalNumber", "optionalInteger"].includes(type))
            value =
              value === "" || value === null
                ? type === "number"
                  ? 0
                  : null
                : Number(value);
          if (type === "datetime-local")
            value = value ? new Date(value).toISOString() : null;
          if (type === "sizes")
            value = value.map((s) => ({
              label: s.label.trim(),
              sku: (s.sku || "").trim(),
              inStock: s.inStock !== false,
              images: s.images || [],
              price: Number(s.price),
            }));
          return [key, value];
        }),
      );
      if (config.endpoint === "/coupons") {
        body.code = body.code.trim().toUpperCase();
        if (body.type === "percentage" && body.value > 100)
          throw Error("Percentage discounts cannot exceed 100.");
      }
      if (
        body.sizes &&
        new Set(body.sizes.map((s) => s.label.toLowerCase())).size !==
          body.sizes.length
      )
        throw Error("Each variation label can only be listed once.");
      if (item?._id)
        await adminApi.patch(`${config.endpoint}/${item._id}`, body);
      else await adminApi.post(config.endpoint, body);
      onSaved();
    } catch (error) {
      setError(
        error.response
          ? errorMessage(error)
          : error.message || "Could not save. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <Dialog
      title={`${item?._id ? "Edit" : "Add"} ${config.singular}`}
      onClose={onClose}
      busy={busy || uploading}
    >
      <form onSubmit={save}>
        <fieldset disabled={busy || uploading} className="adm-fields">
          <div className="adm-form-grid">
            {config.fields.map(([key, label, type, required, options]) => {
              if (type === "checkbox")
                return (
                  <label key={key} className="adm-check">
                    <input
                      type="checkbox"
                      checked={!!draft[key]}
                      onChange={(e) => set(key, e.target.checked)}
                    />
                    {label}
                  </label>
                );
              if (type === "sizes")
                return (
                  <div key={key} className="adm-field adm-full">
                    <span>{label} *</span>
                    <p className="adm-gallery-help">
                      Create bottle sizes or other variations. Each label must
                      be unique.
                    </p>
                    {draft.sizes.map((size, index) => {
                      const change = (patch) =>
                        set(
                          "sizes",
                          draft.sizes.map((s, i) =>
                            i === index ? { ...s, ...patch } : s,
                          ),
                        );
                      return (
                        <div className="adm-variation" key={index}>
                          <div className="adm-variation-fields">
                            <label className="adm-field">
                              <span>Variation label *</span>
                              <input
                                aria-label={`Variation ${index + 1} label`}
                                required
                                maxLength={80}
                                placeholder="30ml, 100ml, gift boxed…"
                                value={size.label}
                                onChange={(e) =>
                                  change({ label: e.target.value })
                                }
                              />
                            </label>
                            <label className="adm-field">
                              <span>Price (PKR) *</span>
                              <input
                                aria-label={`Price for ${size.label || index + 1}`}
                                type="number"
                                min="0"
                                step="0.01"
                                required
                                value={size.price}
                                onChange={(e) =>
                                  change({ price: e.target.value })
                                }
                              />
                            </label>
                            <label className="adm-field">
                              <span>SKU (optional)</span>
                              <input
                                aria-label={`SKU for ${size.label || index + 1}`}
                                maxLength={100}
                                value={size.sku || ""}
                                onChange={(e) =>
                                  change({ sku: e.target.value })
                                }
                              />
                            </label>
                            <label className="adm-check">
                              <input
                                type="checkbox"
                                checked={size.inStock !== false}
                                onChange={(e) =>
                                  change({ inStock: e.target.checked })
                                }
                              />
                              Variation in stock
                            </label>
                          </div>
                          <ImageGalleryEditor
                            images={size.images || []}
                            onChange={(images) => change({ images })}
                            onBusy={setUploading}
                            onError={setError}
                            limit={8}
                            label={`Variation ${index + 1} photos`}
                            library={draft.images || []}
                          />
                          <button
                            type="button"
                            className="adm-btn"
                            disabled={draft.sizes.length === 1}
                            onClick={() =>
                              set(
                                "sizes",
                                draft.sizes.filter((_, i) => i !== index),
                              )
                            }
                          >
                            Remove variation
                          </button>
                        </div>
                      );
                    })}
                    <button
                      type="button"
                      className="adm-btn"
                      onClick={() =>
                        set("sizes", [
                          ...draft.sizes,
                          {
                            label: "",
                            price: 0,
                            sku: "",
                            inStock: true,
                            images: [],
                          },
                        ])
                      }
                    >
                      + Add variation
                    </button>
                  </div>
                );
              if (type === "images")
                return (
                  <div key={key} className="adm-field adm-full">
                    <span>{label}</span>
                    <ImageGalleryEditor
                      images={draft.images || []}
                      onChange={(images) => set("images", images)}
                      onBusy={setUploading}
                      onError={setError}
                      label="Product photos"
                    />
                  </div>
                );
              const value =
                type === "datetime-local"
                  ? localDate(draft[key])
                  : type === "list" && Array.isArray(draft[key])
                    ? draft[key].join(", ")
                    : (draft[key] ?? "");
              const props = {
                id: `adm-${key}`,
                required: !!required,
                value,
                onChange: (e) => set(key, e.target.value),
              };
              return (
                <label
                  className={`adm-field ${["textarea", "list"].includes(type) ? "adm-full" : ""}`}
                  key={key}
                  htmlFor={props.id}
                >
                  <span>
                    {label}
                    {required ? " *" : ""}
                  </span>
                  {type === "textarea" ? (
                    <textarea rows="4" {...props} />
                  ) : ["select", "category", "taxonomy"].includes(type) ? (
                    <select {...props}>
                      {type !== "select" && (
                        <option value="">Choose {label.toLowerCase()}</option>
                      )}
                      {(type === "select"
                        ? options
                        : [
                            ...new Set([
                              ...(catalogOptions[key] || []).map((c) => c.name),
                              ...(draft[key] ? [draft[key]] : []),
                            ]),
                          ]
                      ).map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      {...props}
                      type={
                        [
                          "number",
                          "optionalNumber",
                          "optionalInteger",
                        ].includes(type)
                          ? "number"
                          : type === "datetime-local"
                            ? type
                            : "text"
                      }
                      min={type === "optionalInteger" ? 1 : 0}
                      max={
                        key === "value" && draft.type === "percentage"
                          ? 100
                          : typeof options === "number"
                            ? options
                            : undefined
                      }
                      step={
                        type === "optionalInteger" || key === "displayOrder"
                          ? 1
                          : "any"
                      }
                      pattern={
                        type === "slug" ? "[a-z0-9]+(-[a-z0-9]+)*" : undefined
                      }
                      maxLength={
                        key === "name" && config.taxonomy ? 80 : undefined
                      }
                    />
                  )}
                  {type === "list" && (
                    <small>Separate entries with commas.</small>
                  )}
                  {type.startsWith("optional") && (
                    <small>Leave blank for no limit.</small>
                  )}
                  {type === "slug" && (
                    <small>Lowercase letters, numbers, and hyphens.</small>
                  )}
                </label>
              );
            })}
          </div>
        </fieldset>
        {error && (
          <p role="alert" className="adm-alert">
            {error}
          </p>
        )}
        <div className="adm-dialog-actions">
          <button
            className="adm-btn"
            type="button"
            disabled={busy || uploading}
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="adm-btn adm-primary" disabled={busy || uploading}>
            {busy ? "Saving…" : uploading ? "Uploading…" : "Save changes"}
          </button>
        </div>
      </form>
    </Dialog>
  );
}
