import { useState } from "react";
import { Dialog } from "./Editor";
import { adminApi } from "../api/api";
import { money, errorMessage, date } from "./fields";
export const Status = ({ value }) => (
  <span className={`adm-badge adm-status-${value}`}>{value}</span>
);
export default function OrderDetails({ item, config, onClose, onSaved }) {
  const [status, setStatus] = useState(item.status);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const customer = item.customer || item.contact || {};
  const save = async () => {
    setBusy(true);
    setError("");
    try {
      await adminApi.patch(`${config.endpoint}/${item._id}/status`, { status });
      onSaved();
    } catch (error) {
      setError(errorMessage(error));
    } finally {
      setBusy(false);
    }
  };
  return (
    <Dialog
      title={`Order #${item._id.slice(-8).toUpperCase()}`}
      busy={busy}
      onClose={onClose}
    >
      <div className="adm-detail">
        <div className="adm-detail-top">
          <span>{date(item.createdAt)}</span>
          <Status value={item.status} />
        </div>
        <section>
          <h3>Customer & delivery</h3>
          <p>
            <strong>{customer.fullName || customer.name}</strong>
          </p>
          <p>
            <a href={`tel:${customer.phone}`}>{customer.phone}</a>
          </p>
          {customer.email && (
            <p>
              <a href={`mailto:${customer.email}`}>{customer.email}</a>
            </p>
          )}
          <p>
            {customer.address} {customer.city}
          </p>
          {customer.notes && <p className="adm-note">{customer.notes}</p>}
        </section>
        {item.items ? (
          <>
            <section>
              <h3>Items</h3>
              {item.items.map((i, index) => (
                <div className="adm-order-line" key={index}>
                  <div>
                    <strong>{i.name}</strong>
                    <p>
                      {i.size} × {i.qty} · {money(i.price)} each
                      {i.sku ? ` · SKU ${i.sku}` : ""}
                    </p>
                    {i.wrap && <p>Wrapping: {i.wrap}</p>}
                    {i.giftMessage && <p>Gift message: {i.giftMessage}</p>}
                  </div>
                  <strong>{money(i.price * i.qty)}</strong>
                </div>
              ))}
            </section>
            <section className="adm-totals">
              <p>
                <span>Subtotal</span>
                {money(item.subtotal)}
              </p>
              <p>
                <span>Shipping</span>
                {money(item.shipping)}
              </p>
              <p>
                <span>
                  Discount {item.coupon?.code && `(${item.coupon.code})`}
                </span>
                − {money(item.discount)}
              </p>
              <p>
                <strong>Total · {item.paymentMethod}</strong>
                <strong>{money(item.total)}</strong>
              </p>
            </section>
          </>
        ) : (
          <section>
            <h3>{item.perfumeName || item.hybridName}</h3>
            <p>
              {item.size} · {money(item.price)}
            </p>
            {item.selected &&
              Object.entries(item.selected).map(([layer, notes]) => (
                <p key={layer}>
                  <strong>{layer}: </strong>
                  {notes.join(", ")}
                </p>
              ))}
            {item.scentA && (
              <>
                <p>
                  <strong>Fragrance A:</strong> {item.scentA.name} ({item.ratio}
                  %)
                </p>
                <p>
                  <strong>Fragrance B:</strong> {item.scentB.name} (
                  {100 - item.ratio}%)
                </p>
              </>
            )}
          </section>
        )}
        <label className="adm-field">
          <span>Order status</span>
          <select
            value={status}
            disabled={busy}
            onChange={(e) => setStatus(e.target.value)}
          >
            {config.statuses.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        {error && (
          <p role="alert" className="adm-alert">
            {error}
          </p>
        )}
      </div>
      <div className="adm-dialog-actions">
        <button className="adm-btn" disabled={busy} onClick={onClose}>
          Close
        </button>
        <button
          className="adm-btn adm-primary"
          disabled={busy || status === item.status}
          onClick={save}
        >
          {busy ? "Saving…" : "Update status"}
        </button>
      </div>
    </Dialog>
  );
}
