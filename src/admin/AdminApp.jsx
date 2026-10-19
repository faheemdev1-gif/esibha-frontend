import { useCallback, useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/auth";
import { adminApi, mediaUrl } from "../api/api";
import { resources, orderTypes, money, errorMessage, date } from "./fields";
import Editor, { Dialog } from "./Editor";
import OrderDetails, { Status } from "./Orders";
import "./admin.css";
const navigation = [
  ["", "Overview", "◫"],
  ["products", "Products", "◇"],
  ["categories", "Categories", "▤"],
  ["gift-packs", "Gift packs", "◈"],
  ["coupons", "Promo codes", "%"],
  ["orders", "Shop orders", "▧"],
  ["custom-lab-orders", "Custom Lab orders", "⚗"],
  ["hybrid-orders", "Hybrid orders", "⤨"],
  ["settings", "Store settings", "⚙"],
];
function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await login({ email, password });
      navigate("/admin", { replace: true });
    } catch (error) {
      setError(errorMessage(error));
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="adm-login">
      <div className="adm-login-story">
        <Link to="/" className="adm-brand">
          eSibha<span>STORE MANAGEMENT</span>
        </Link>
        <div>
          <p className="adm-eyebrow">The atelier, behind the scenes</p>
          <h1>
            A little care.
            <br />
            An extraordinary
            <br />
            <em>collection.</em>
          </h1>
          <p>
            Everything you need to keep your fragrance store running
            beautifully.
          </p>
        </div>
        <span>Crafted for the world of eSibha.</span>
      </div>
      <div className="adm-login-panel">
        <form onSubmit={submit}>
          <p className="adm-eyebrow">ADMINISTRATOR ACCESS</p>
          <h2>Welcome back.</h2>
          <p>Sign in to manage your store.</p>
          <label className="adm-field">
            <span>Email address</span>
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={busy}
            />
          </label>
          <label className="adm-field">
            <span>Password</span>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={busy}
            />
          </label>
          {error && (
            <p role="alert" className="adm-alert">
              {error}
            </p>
          )}
          <button className="adm-btn adm-primary" disabled={busy}>
            {busy ? "Signing in…" : "Sign in →"}
          </button>
          <small>
            Use the administrator credentials configured for this store.
          </small>
          <Link to="/" className="adm-link">
            ← Back to storefront
          </Link>
        </form>
      </div>
    </div>
  );
}
function Shell() {
  const { admin, logout } = useAuth();
  const [open, setOpen] = useState(false);
  return (
    <div className="adm-shell">
      <aside className={`adm-sidebar ${open ? "is-open" : ""}`}>
        <Link to="/admin" className="adm-brand">
          eSibha<span>STORE MANAGEMENT</span>
        </Link>
        <p className="adm-nav-label">WORKSPACE</p>
        <nav aria-label="Administration">
          {navigation.map(([path, label, icon]) => (
            <NavLink
              end
              to={`/admin${path ? "/" + path : ""}`}
              key={path}
              onClick={() => setOpen(false)}
            >
              <span aria-hidden="true">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="adm-sidebar-bottom">
          <a href="/" target="_blank" rel="noreferrer">
            View storefront ↗
          </a>
          <span title={admin.email}>{admin.email}</span>
          <button onClick={logout}>Sign out</button>
        </div>
      </aside>
      <div className="adm-workspace">
        <header className="adm-topbar">
          <button
            className="adm-btn adm-menu"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle admin navigation"
          >
            ☰
          </button>
          <span>eSibha / Administration</span>
          <span className="adm-live">
            <i /> Store workspace
          </span>
        </header>
        <main className="adm-main">
          <Routes>
            <Route index element={<Dashboard />} />
            {Object.entries(resources).map(([key, config]) => (
              <Route
                path={key}
                key={key}
                element={<ResourcePage key={key} config={config} />}
              />
            ))}
            {Object.entries(orderTypes).map(([key, config]) => (
              <Route
                path={key}
                key={key}
                element={<ResourcePage key={key} config={config} orders />}
              />
            ))}
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>
        <footer className="adm-footer">eSibha · Store management</footer>
      </div>
    </div>
  );
}
function Header({ eyebrow = "Your workspace", title, description, children }) {
  return (
    <div className="adm-page-header">
      <div>
        <p className="adm-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="adm-header-actions">{children}</div>
    </div>
  );
}
function useRecords(endpoint) {
  const [data, setData] = useState([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState("");
  const refresh = useCallback(async () => {
    try {
      const res = await adminApi.get(endpoint);
      setData(res.data.data);
      setError("");
    } catch (error) {
      setError(errorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [endpoint]);
  useEffect(() => {
    let active = true;
    adminApi
      .get(endpoint)
      .then((res) => {
        if (active) {
          setData(res.data.data);
          setError("");
        }
      })
      .catch((error) => {
        if (active) setError(errorMessage(error));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [endpoint]);
  return {
    data,
    loading,
    error,
    refresh: () => {
      setLoading(true);
      setError("");
      return refresh();
    },
  };
}
function ResourcePage({ config, orders = false }) {
  const { data, loading, error, refresh } = useRecords(config.endpoint);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState(""),
    [filter, setFilter] = useState("all"),
    [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null),
    [deleting, setDeleting] = useState(null),
    [busy, setBusy] = useState(false),
    [actionError, setActionError] = useState(""),
    [notice, setNotice] = useState("");
  useEffect(() => {
    if (config.endpoint === "/products")
      adminApi
        .get("/categories")
        .then((r) => setCategories(r.data.data))
        .catch(() => {});
  }, [config.endpoint]);
  const filtered = data.filter((item) => {
    const text = orders
      ? [
          item._id,
          item.customer?.fullName,
          item.customer?.phone,
          item.customer?.email,
          item.contact?.name,
          item.contact?.phone,
          item.perfumeName,
          item.hybridName,
        ].join(" ")
      : [item.name, item.code, item.slug, item.category, item.inspo].join(" ");
    return (
      text.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "all" ||
        (orders
          ? item.status === filter
          : config.endpoint === "/coupons"
            ? filter === "active"
              ? item.isActive
              : !item.isActive
            : config.endpoint === "/products"
              ? item.category === filter
              : filter === "in"
                ? item.inStock
                : !item.inStock))
    );
  });
  const pages = Math.max(1, Math.ceil(filtered.length / 12));
  const currentPage = Math.min(page, pages);
  const visible = filtered.slice((currentPage - 1) * 12, currentPage * 12);
  const saved = () => {
    setEditing(null);
    setNotice("Changes saved successfully.");
    refresh();
  };
  const remove = async () => {
    setBusy(true);
    setActionError("");
    try {
      await adminApi.delete(`${config.endpoint}/${deleting._id}`);
      setDeleting(null);
      setNotice("Deleted successfully.");
      refresh();
    } catch (error) {
      setActionError(errorMessage(error));
    } finally {
      setBusy(false);
    }
  };
  return (
    <>
      <Header
        title={config.title}
        description={
          config.description ||
          "Review customer details, order contents, and fulfilment status."
        }
      >
        <button className="adm-btn" onClick={refresh} disabled={loading}>
          ↻ Refresh
        </button>
        {!orders && (
          <button
            className="adm-btn adm-primary"
            onClick={() => setEditing({})}
          >
            + Add {config.singular}
          </button>
        )}
      </Header>
      {notice && (
        <div className="adm-notice" role="status">
          {notice}
          <button
            className="adm-icon"
            aria-label="Dismiss notification"
            onClick={() => setNotice("")}
          >
            ×
          </button>
        </div>
      )}
      {error && (
        <div className="adm-alert" role="alert">
          {error}{" "}
          <button className="adm-link" onClick={refresh}>
            Try again
          </button>
        </div>
      )}
      <div className="adm-card">
        <div className="adm-toolbar">
          <input
            aria-label={`Search ${config.title}`}
            placeholder={
              orders
                ? "Search name, phone, email, or order ID…"
                : `Search ${config.title.toLowerCase()}…`
            }
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          {(orders || config.endpoint !== "/categories") && (
            <select
              aria-label="Filter records"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="all">
                {orders
                  ? "All statuses"
                  : config.endpoint === "/products"
                    ? "All categories"
                    : "All records"}
              </option>
              {(orders
                ? config.statuses.map((s) => [s, s])
                : config.endpoint === "/products"
                  ? [...new Set(data.map((p) => p.category))].map((c) => [c, c])
                  : config.endpoint === "/coupons"
                    ? [
                        ["active", "Active"],
                        ["inactive", "Inactive"],
                      ]
                    : [
                        ["in", "In stock"],
                        ["out", "Out of stock"],
                      ]
              ).map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          )}
          <span>
            {filtered.length} {filtered.length === 1 ? "record" : "records"}
          </span>
        </div>
        {loading ? (
          <div className="adm-empty" role="status">
            Loading {config.title.toLowerCase()}…
          </div>
        ) : visible.length === 0 ? (
          <div className="adm-empty">
            <span>◇</span>
            <h3>
              {search || filter !== "all"
                ? "No matching records"
                : `No ${config.title.toLowerCase()} yet`}
            </h3>
            <p>
              {search || filter !== "all"
                ? "Try another search or filter."
                : orders
                  ? "New customer orders will appear here."
                  : `Add your first ${config.singular} to get started.`}
            </p>
          </div>
        ) : (
          <div className="adm-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>
                    {orders
                      ? "Order / customer"
                      : config.endpoint === "/coupons"
                        ? "Promo code"
                        : "Name"}
                  </th>
                  <th>
                    {orders
                      ? "Date"
                      : config.endpoint === "/products"
                        ? "Category"
                        : config.endpoint === "/coupons"
                          ? "Discount"
                          : "Details"}
                  </th>
                  <th>
                    {orders
                      ? "Amount"
                      : config.endpoint === "/categories"
                        ? "Display order"
                        : config.endpoint === "/coupons"
                          ? "Usage"
                          : "Price"}
                  </th>
                  <th>
                    {config.endpoint === "/categories" ? "Shop link" : "Status"}
                  </th>
                  <th>
                    <span className="adm-sr">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {visible.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="adm-name-cell">
                        {config.endpoint === "/products" && (
                          <div className="adm-thumb">
                            {item.image ? (
                              <img src={mediaUrl(item.image)} alt="" />
                            ) : (
                              "◇"
                            )}
                          </div>
                        )}
                        <div>
                          <strong>
                            {orders
                              ? item.customer?.fullName || item.contact?.name
                              : item.name || item.code}
                          </strong>
                          <small>
                            {orders
                              ? `#${item._id.slice(-8).toUpperCase()} · ${item.customer?.phone || item.contact?.phone}`
                              : item.slug ||
                                (config.endpoint === "/coupons"
                                  ? item.expiresAt
                                    ? `Expires ${date(item.expiresAt)}`
                                    : "No expiry"
                                  : item.contents?.join(", "))}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td>
                      {orders ? (
                        date(item.createdAt)
                      ) : config.endpoint === "/products" ? (
                        item.category
                      ) : config.endpoint === "/coupons" ? (
                        item.type === "percentage" ? (
                          `${item.value}% off`
                        ) : (
                          `${money(item.value)} off`
                        )
                      ) : (
                        <span className="adm-truncate">
                          {item.description || "—"}
                        </span>
                      )}
                    </td>
                    <td>
                      {orders ? (
                        money(item.total ?? item.price)
                      ) : config.endpoint === "/categories" ? (
                        item.displayOrder
                      ) : config.endpoint === "/coupons" ? (
                        `${item.usedCount} / ${item.usageLimit ?? "Unlimited"}`
                      ) : config.endpoint === "/products" ? (
                        <div>
                          {item.sizes?.map((s) => (
                            <small className="adm-price" key={s.label}>
                              {s.label} · {money(s.price)}
                            </small>
                          ))}
                        </div>
                      ) : (
                        money(item.price)
                      )}
                    </td>
                    <td>
                      {orders ? (
                        <Status value={item.status} />
                      ) : config.endpoint === "/categories" ? (
                        <a
                          className="adm-link"
                          href={`/shop/${item.slug}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View ↗
                        </a>
                      ) : (
                        <span
                          className={`adm-badge ${(item.inStock ?? item.isActive) ? "adm-status-confirmed" : "adm-status-cancelled"}`}
                        >
                          {config.endpoint === "/coupons"
                            ? item.isActive
                              ? "Active"
                              : "Inactive"
                            : item.inStock
                              ? "In stock"
                              : "Out of stock"}
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="adm-row-actions">
                        <button
                          className="adm-btn"
                          onClick={() => setEditing(item)}
                        >
                          {orders ? "View order" : "Edit"}
                        </button>
                        {!orders && (
                          <button
                            className="adm-link adm-danger"
                            onClick={() => {
                              setActionError("");
                              setDeleting(item);
                            }}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="adm-pagination">
          <span>
            Page {currentPage} of {pages}
          </span>
          <div>
            <button
              className="adm-btn"
              disabled={currentPage <= 1}
              onClick={() => setPage(currentPage - 1)}
            >
              Previous
            </button>
            <button
              className="adm-btn"
              disabled={currentPage >= pages}
              onClick={() => setPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {editing &&
        (orders ? (
          <OrderDetails
            config={config}
            item={editing}
            onClose={() => setEditing(null)}
            onSaved={saved}
          />
        ) : (
          <Editor
            config={config}
            item={editing}
            categories={categories}
            onClose={() => setEditing(null)}
            onSaved={saved}
          />
        ))}
      {deleting && (
        <Dialog
          title={`Delete ${config.singular}?`}
          busy={busy}
          onClose={() => setDeleting(null)}
        >
          <div className="adm-detail">
            <p>
              Delete <strong>{deleting.name || deleting.code}</strong>? This
              cannot be undone.
            </p>
            {actionError && (
              <p className="adm-alert" role="alert">
                {actionError}
              </p>
            )}
          </div>
          <div className="adm-dialog-actions">
            <button
              className="adm-btn"
              disabled={busy}
              onClick={() => setDeleting(null)}
            >
              Cancel
            </button>
            <button
              className="adm-btn adm-destructive"
              disabled={busy}
              onClick={remove}
            >
              {busy ? "Deleting…" : "Delete"}
            </button>
          </div>
        </Dialog>
      )}
    </>
  );
}
function Dashboard() {
  const [data, setData] = useState(null),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(true);
  const refresh = useCallback(async () => {
    try {
      const keys = [
        "products",
        "categories",
        "coupons",
        "orders",
        "custom-lab-orders",
        "hybrid-orders",
      ];
      const results = await Promise.all(
        keys.map((key) => adminApi.get("/" + key)),
      );
      setData(
        Object.fromEntries(keys.map((key, i) => [key, results[i].data.data])),
      );
      setError("");
    } catch (error) {
      setError(errorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    let active = true;
    const keys = [
      "products",
      "categories",
      "coupons",
      "orders",
      "custom-lab-orders",
      "hybrid-orders",
    ];
    Promise.all(keys.map((key) => adminApi.get("/" + key)))
      .then((results) => {
        if (active)
          setData(
            Object.fromEntries(
              keys.map((key, i) => [key, results[i].data.data]),
            ),
          );
      })
      .catch((error) => {
        if (active) setError(errorMessage(error));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);
  const allOrders = data
    ? ["orders", "custom-lab-orders", "hybrid-orders"].flatMap((type) =>
        data[type].map((order) => ({ ...order, type })),
      )
    : [];
  const revenue = allOrders
    .filter((o) => ["delivered", "completed"].includes(o.status))
    .reduce((sum, o) => sum + (o.total ?? o.price), 0);
  const recent = [...allOrders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);
  return (
    <>
      <Header
        title="A good day to grow."
        description="Your collection and orders, all in one place."
        eyebrow="Store overview"
      >
        <button
          className="adm-btn"
          onClick={() => {
            setLoading(true);
            refresh();
          }}
          disabled={loading}
        >
          ↻ Refresh
        </button>
        <Link className="adm-btn adm-primary" to="/admin/products">
          Manage products →
        </Link>
      </Header>
      {error && (
        <div className="adm-alert" role="alert">
          {error}{" "}
          <button className="adm-link" onClick={refresh}>
            Try again
          </button>
        </div>
      )}
      {loading ? (
        <div className="adm-empty" role="status">
          Loading store overview…
        </div>
      ) : (
        data && (
          <>
            <div className="adm-stats">
              {[
                [
                  "Completed order value",
                  money(revenue),
                  "Delivered and completed orders",
                ],
                [
                  "Orders to confirm",
                  allOrders.filter((o) => o.status === "pending").length,
                  "Across shop, lab, and hybrid",
                ],
                [
                  "Products",
                  data.products.length,
                  `${data.products.filter((p) => p.inStock).length} in stock`,
                ],
                [
                  "Active promo codes",
                  data.coupons.filter(
                    (c) =>
                      c.isActive &&
                      (!c.expiresAt || new Date(c.expiresAt) > new Date()) &&
                      (c.usageLimit === null || c.usedCount < c.usageLimit),
                  ).length,
                  "Ready for customer checkout",
                ],
              ].map(([label, value, note]) => (
                <div className="adm-stat" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                  <small>{note}</small>
                </div>
              ))}
            </div>
            <div className="adm-dashboard-grid">
              <section className="adm-card">
                <div className="adm-card-title">
                  <h2>Latest orders</h2>
                  <Link className="adm-link" to="/admin/orders">
                    All shop orders ↗
                  </Link>
                </div>
                {recent.length ? (
                  recent.map((order) => (
                    <Link
                      className="adm-recent"
                      key={order._id}
                      to={`/admin/${order.type}`}
                    >
                      <div>
                        <strong>
                          {order.customer?.fullName || order.contact?.name}
                        </strong>
                        <small>
                          {orderTypes[order.type].title} ·{" "}
                          {date(order.createdAt)}
                        </small>
                      </div>
                      <Status value={order.status} />
                      <span>{money(order.total ?? order.price)}</span>
                    </Link>
                  ))
                ) : (
                  <div className="adm-empty">
                    Your latest orders will appear here.
                  </div>
                )}
              </section>
              <section className="adm-card adm-quick">
                <p className="adm-eyebrow">KEEP THINGS MOVING</p>
                <h2>Make it yours.</h2>
                <p>
                  Build your collection, plan a promotion, and prepare every
                  order with care.
                </p>
                {[
                  [
                    "products",
                    "Manage fragrances",
                    "Edit sizes, prices, and images",
                  ],
                  [
                    "coupons",
                    "Create a promotion",
                    "Set discounts and usage limits",
                  ],
                  [
                    "settings",
                    "Fine-tune your store",
                    "Shipping, wrapping, and blend prices",
                  ],
                ].map(([key, title, note]) => (
                  <Link to={`/admin/${key}`} key={key}>
                    <div>
                      <strong>{title}</strong>
                      <small>{note}</small>
                    </div>
                    <span>↗</span>
                  </Link>
                ))}
              </section>
            </div>
          </>
        )
      )}
    </>
  );
}
function Settings() {
  const [draft, setDraft] = useState(null),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [notice, setNotice] = useState("");
  const load = useCallback(async () => {
    try {
      setDraft((await adminApi.get("/settings")).data.data);
      setError("");
    } catch (error) {
      setError(errorMessage(error));
    }
  }, []);
  useEffect(() => {
    let active = true;
    adminApi
      .get("/settings")
      .then((res) => {
        if (active) setDraft(res.data.data);
      })
      .catch((error) => {
        if (active) setError(errorMessage(error));
      });
    return () => {
      active = false;
    };
  }, []);
  const update = (group, key, value) =>
    setDraft((old) =>
      group
        ? { ...old, [group]: { ...old[group], [key]: value } }
        : { ...old, [key]: value },
    );
  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const body = {
        shippingFee: Number(draft.shippingFee),
        freeShippingThreshold: Number(draft.freeShippingThreshold),
      };
      for (const key of ["labPrices", "hybridPrices", "wrapPrices"])
        body[key] = Object.fromEntries(
          Object.entries(draft[key]).map(([k, v]) => [k, Number(v)]),
        );
      setDraft((await adminApi.put("/settings", body)).data.data);
      setNotice("Store settings saved.");
    } catch (error) {
      setError(errorMessage(error));
    } finally {
      setBusy(false);
    }
  };
  return (
    <>
      <Header
        title="Store settings"
        description="Set your shipping fees, gift wrapping charges, and custom fragrance prices."
      />
      {error && (
        <p className="adm-alert" role="alert">
          {error}{" "}
          <button className="adm-link" onClick={load}>
            Try again
          </button>
        </p>
      )}
      {notice && (
        <p className="adm-notice" role="status">
          {notice}
        </p>
      )}
      {draft ? (
        <form className="adm-settings" onSubmit={save}>
          <fieldset disabled={busy} className="adm-fields">
            {[
              [
                null,
                "Shipping",
                "Order delivery charges in PKR.",
                [
                  ["shippingFee", "Shipping fee"],
                  ["freeShippingThreshold", "Free shipping from"],
                ],
              ],
              [
                "labPrices",
                "Custom Lab",
                "Handcrafted fragrance prices by bottle size.",
                Object.keys(draft.labPrices).map((k) => [k, k]),
              ],
              [
                "hybridPrices",
                "Hybrid blends",
                "Prices for blends of two existing fragrances.",
                Object.keys(draft.hybridPrices).map((k) => [k, k]),
              ],
              [
                "wrapPrices",
                "Gift wrapping",
                "Packaging charges added to gift pack prices.",
                Object.keys(draft.wrapPrices).map((k) => [
                  k,
                  k.charAt(0).toUpperCase() + k.slice(1),
                ]),
              ],
            ].map(([group, title, description, fields]) => (
              <section className="adm-card adm-settings-section" key={title}>
                <div>
                  <h2>{title}</h2>
                  <p>{description}</p>
                </div>
                <div className="adm-form-grid">
                  {fields.map(([key, label]) => (
                    <label className="adm-field" key={key}>
                      <span>{label} (PKR)</span>
                      <input
                        required
                        type="number"
                        min="0"
                        step="0.01"
                        value={group ? draft[group][key] : draft[key]}
                        onChange={(e) => update(group, key, e.target.value)}
                      />
                    </label>
                  ))}
                </div>
              </section>
            ))}
          </fieldset>
          <button className="adm-btn adm-primary" disabled={busy}>
            {busy ? "Saving…" : "Save store settings"}
          </button>
          <p className="adm-hint">
            Admin login credentials are managed through your backend environment
            variables.
          </p>
        </form>
      ) : (
        !error && <div className="adm-empty">Loading settings…</div>
      )}
    </>
  );
}
function AdminRoot() {
  const { admin, checking } = useAuth();
  if (checking) return <div className="adm-empty">Checking your session…</div>;
  return admin ? <Shell /> : <Login />;
}
export default function AdminApp() {
  return (
    <div className="admin-app">
      <AuthProvider>
        <AdminRoot />
      </AuthProvider>
    </div>
  );
}
