import { useId, useState } from "react";
import { adminApi, mediaUrl } from "../api/api";
import { errorMessage } from "./fields";

export default function ImageGalleryEditor({
  images = [],
  onChange,
  onBusy,
  onError,
  limit = 12,
  label = "Product photos",
  library = [],
}) {
  const id = useId();
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState("");
  const upload = async (event) => {
    const files = [...(event.target.files || [])];
    event.target.value = "";
    if (!files.length) return;
    if (images.length + files.length > limit)
      return onError(
        `Choose at most ${limit} photos for ${label.toLowerCase()}.`,
      );
    if (files.some((file) => file.size > 5 * 1024 * 1024))
      return onError("Each image must be smaller than 5 MB.");
    onBusy(true);
    onError("");
    const next = [...images];
    try {
      for (const [index, file] of files.entries()) {
        setProgress(`Uploading ${index + 1} of ${files.length}…`);
        const data = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(Error("Could not read this image."));
          reader.readAsDataURL(file);
        });
        const result = await adminApi.post("/media", { name: file.name, data });
        next.push(result.data.data.path);
        onChange([...next]);
      }
    } catch (error) {
      onError(
        error.response
          ? errorMessage(error)
          : error.message ||
              "Upload failed. Your completed uploads are still here.",
      );
    } finally {
      setProgress("");
      onBusy(false);
    }
  };
  const add = () => {
    const value = url.trim();
    if (!/^https?:\/\/[^\s]+$/.test(value))
      return onError("Paste a valid http:// or https:// image URL.");
    if (!images.includes(value) && images.length < limit)
      onChange([...images, value]);
    setUrl("");
  };
  return (
    <div className="adm-gallery-editor" role="group" aria-label={label}>
      <p className="adm-gallery-help">
        {label} · {images.length}/{limit}. The first photo is the cover.{" "}
        {limit === 8 && "Leave empty to use the product photos."}
      </p>
      <div className="adm-gallery-grid">
        {images.map((image, index) => (
          <div className="adm-gallery-tile" key={image}>
            <img src={mediaUrl(image)} alt={`${label} ${index + 1}`} />
            <span>{index === 0 ? "Cover" : `Photo ${index + 1}`}</span>
            <div>
              <button
                type="button"
                className="adm-btn"
                disabled={index === 0}
                aria-label={`Move photo ${index + 1} earlier in ${label}`}
                onClick={() => {
                  const next = [...images];
                  [next[index - 1], next[index]] = [
                    next[index],
                    next[index - 1],
                  ];
                  onChange(next);
                }}
              >
                ←
              </button>
              <button
                type="button"
                className="adm-btn"
                disabled={index === images.length - 1}
                aria-label={`Move photo ${index + 1} later in ${label}`}
                onClick={() => {
                  const next = [...images];
                  [next[index + 1], next[index]] = [
                    next[index],
                    next[index + 1],
                  ];
                  onChange(next);
                }}
              >
                →
              </button>
              <button
                type="button"
                className="adm-btn"
                aria-label={`Remove photo ${index + 1} from ${label}`}
                onClick={() => onChange(images.filter((_, i) => i !== index))}
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
      <label className="adm-btn" htmlFor={id}>
        Upload photos
        <input
          id={id}
          aria-label={`Upload ${label}`}
          type="file"
          multiple
          accept="image/png,image/jpeg,image/webp,image/gif"
          disabled={images.length >= limit}
          onChange={upload}
        />
      </label>
      <small>PNG, JPEG, WebP or GIF · up to 5 MB each</small>
      {progress && <p role="status">{progress}</p>}
      <div className="adm-url-row">
        <input
          aria-label={`${label} URL`}
          type="url"
          placeholder="Or paste an image URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
        />
        <button
          type="button"
          className="adm-btn"
          disabled={!url || images.length >= limit}
          onClick={add}
        >
          Add URL
        </button>
      </div>
      {library.some((image) => !images.includes(image)) && (
        <details>
          <summary>Use a product photo</summary>
          <div className="adm-gallery-picks">
            {library
              .filter((image) => !images.includes(image))
              .map((image, index) => (
                <button
                  type="button"
                  key={image}
                  disabled={images.length >= limit}
                  aria-label={`Use product photo ${index + 1} for ${label}`}
                  onClick={() => onChange([...images, image])}
                >
                  <img src={mediaUrl(image)} alt="" />
                </button>
              ))}
          </div>
        </details>
      )}
    </div>
  );
}
