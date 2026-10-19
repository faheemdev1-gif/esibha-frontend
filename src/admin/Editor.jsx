import { useEffect, useRef, useState } from "react";
import { adminApi, mediaUrl } from "../api/api";
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
export default function Editor({ config, item, categories, onClose, onSaved }) {
  const [draft, setDraft] = useState(() => ({
    ...structuredClone(config.defaults),
    ...structuredClone(item || {}),
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
  const upload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("Choose an image smaller than 5 MB.");
      return;
    }
    setUploading(true);
    setError("");
    try {
      const data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const res = await adminApi.post("/media", { name: file.name, data });
      set("image", mediaUrl(res.data.data.path));
    } catch (error) {
      setError(errorMessage(error));
    } finally {
      setUploading(false);
    }
  };
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
              label: s.label,
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
        new Set(body.sizes.map((s) => s.label)).size !== body.sizes.length
      )
        throw Error("Each size can only be listed once.");
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
                    {draft.sizes.map((size, index) => (
                      <div className="adm-size-row" key={index}>
                        <select
                          aria-label={`Size ${index + 1}`}
                          value={size.label}
                          onChange={(e) =>
                            set(
                              "sizes",
                              draft.sizes.map((s, i) =>
                                i === index
                                  ? { ...s, label: e.target.value }
                                  : s,
                              ),
                            )
                          }
                        >
                          {["5ml", "30ml", "50ml", "100ml"].map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                        <input
                          aria-label={`Price for ${size.label}`}
                          type="number"
                          min="0"
                          step="0.01"
                          required
                          value={size.price}
                          onChange={(e) =>
                            set(
                              "sizes",
                              draft.sizes.map((s, i) =>
                                i === index
                                  ? { ...s, price: e.target.value }
                                  : s,
                              ),
                            )
                          }
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
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="adm-btn"
                      disabled={draft.sizes.length >= 4}
                      onClick={() =>
                        set("sizes", [
                          ...draft.sizes,
                          {
                            label: ["5ml", "30ml", "50ml", "100ml"].find(
                              (label) =>
                                !draft.sizes.some((s) => s.label === label),
                            ),
                            price: 0,
                          },
                        ])
                      }
                    >
                      + Add size
                    </button>
                  </div>
                );
              if (type === "image")
                return (
                  <div key={key} className="adm-field adm-full">
                    <span>{label}</span>
                    <div className="adm-image-editor">
                      {draft.image && (
                        <img
                          src={mediaUrl(draft.image)}
                          alt="Product preview"
                        />
                      )}
                      <div>
                        <label className="adm-btn">
                          {uploading ? "Uploading…" : "Upload image"}
                          <input
                            type="file"
                            accept="image/png,image/jpeg,image/webp,image/gif"
                            onChange={upload}
                          />
                        </label>
                        <small>PNG, JPEG, WebP or GIF · up to 5 MB</small>
                        {draft.image && (
                          <button
                            type="button"
                            className="adm-link"
                            onClick={() => set("image", "")}
                          >
                            Remove image
                          </button>
                        )}
                      </div>
                    </div>
                    <input
                      aria-label="Image URL"
                      type="url"
                      value={draft.image || ""}
                      placeholder="Or paste an https:// image URL"
                      onChange={(e) => set("image", e.target.value)}
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
                  ) : ["select", "category"].includes(type) ? (
                    <select {...props}>
                      {type === "category" && (
                        <option value="">Choose category</option>
                      )}
                      {(type === "category"
                        ? [
                            ...new Set([
                              ...categories.map((c) => c.name),
                              ...(draft.category ? [draft.category] : []),
                            ]),
                          ]
                        : options
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
                        key === "name" && config.endpoint === "/categories"
                          ? 80
                          : undefined
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
