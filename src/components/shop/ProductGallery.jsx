import { useRef, useState } from "react";
import { mediaUrl } from "../../api/api";
import { productImages } from "../../utils/catalog";
import BottleSVG from "../ui/BottleSVG";
import "./catalog.css";
export default function ProductGallery({ product, variation }) {
  const images = productImages(product, variation);
  const [selected, setSelected] = useState(0);
  const dialog = useRef(null);
  const index = selected < images.length ? selected : 0;
  if (!images.length)
    return (
      <div className="product-image-panel">
        <BottleSVG family={product.family} size={200} />
      </div>
    );
  const move = (direction) =>
    setSelected((index + direction + images.length) % images.length);
  return (
    <div className="product-gallery">
      <button
        className="product-gallery-main"
        aria-label={`Enlarge ${product.name} photo ${index + 1}`}
        onClick={() => dialog.current.showModal()}
      >
        <img
          src={mediaUrl(images[index])}
          alt={`${product.name}${variation ? ` · ${variation.label}` : ""} · photo ${index + 1}`}
        />
        <span>View photo ↗</span>
      </button>
      {images.length > 1 && (
        <div className="product-gallery-thumbs" aria-label="Product photos">
          {images.map((src, i) => (
            <button
              key={src}
              aria-label={`View photo ${i + 1}`}
              aria-pressed={index === i}
              onClick={() => setSelected(i)}
            >
              <img src={mediaUrl(src)} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
      <dialog
        className="product-lightbox"
        ref={dialog}
        aria-label={`${product.name} photos`}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") move(-1);
          if (event.key === "ArrowRight") move(1);
        }}
      >
        <button
          className="gallery-close"
          aria-label="Close enlarged photo"
          onClick={() => dialog.current.close()}
        >
          ×
        </button>
        <img
          src={mediaUrl(images[index])}
          alt={`${product.name} · photo ${index + 1}`}
        />
        <div>
          <button
            disabled={images.length < 2}
            onClick={() => move(-1)}
            aria-label="Previous photo"
          >
            ←
          </button>
          <span>
            {index + 1} / {images.length}
          </span>
          <button
            disabled={images.length < 2}
            onClick={() => move(1)}
            aria-label="Next photo"
          >
            →
          </button>
        </div>
      </dialog>
    </div>
  );
}
