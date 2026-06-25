import { Routes, Route, Navigate, NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ReactGA from "react-ga4";
import { AuthProvider, useAuth } from "./admin/context/AuthContext";
import { useSiteEffects } from './hooks/useSiteEffects';
import ProtectedRoute from './admin/components/ProtectedRoute';

// Pages
import Login from "./pages/Login";
import SignUpLandingPage from "./pages/SignUpLandingPage";
import HomePage from "./pages/HomePage";
import ExpertAnalysis from "./pages/ExpertAnalysis";
import SignalPage from "./pages/SignalsPage";
import Verified from "./pages/Verified";
import RiskManagement from "./pages/RiskManagement";
import LearnWhileTrading from "./pages/LearnWhileTrading";
import BeginnerFriendly from "./pages/BeginnerFriendly";
import PremiumCommunity from "./pages/PremiumCommunity";
import TrustPilotReg from "./pages/TrustPilotReg";
import Success from "./pages/Success";
import SignUpSuccessPage from './pages/SignUpSuccessPage';
import TradeEntryPage from './pages/TradeEntryPage';
import PricingLandingPage from './pages/PricingLandingPage';
import NotFoundPage from './pages/NotFoundPage';
import ContactUs from './pages/ContactUs';
import VerifiedResults from './pages/VerifiedResults';
import MemberVerificationPage from './pages/MemberVerificationPage';

// Admin Pages
import ChangePasswordPage from './admin/pages/ChangePasswordPage';
import LoginPage from './admin/pages/LoginPage';
import PerformancePage from './admin/pages/PerformancePage';
import SignalDetailPage from './admin/pages/SignalDetailPage';
import SignalFormPage from './admin/pages/SignalFormPage';
import SignalsPage from './admin/pages/SignalsPage';
import VerificationsPage from './admin/pages/VerificationsPage';
import VerificationDetailPage from './admin/pages/VerificationDetailPage';
import SignUpRegistrationsPage from './admin/pages/SignUpRegistrationsPage';
import RegistrationDetailPage from './admin/pages/RegistrationDetailPage';
import PortalRegistrationsPage from './admin/pages/PortalRegistrationsPage';
import AdminUsersPage from './admin/pages/AdminUsersPage';
import PipelinePage from './admin/pages/PipelinePage';

// ─── GA4 ──────────────────────────────────────────────────────────────────────
ReactGA.initialize("G-9409GJH1GQ");

export const Analytics = {
  joinedFreeTier:   () => ReactGA.event({ action: "sign_up",          category: "Conversion", label: "Free Tier" }),
  viewedPricing:    () => ReactGA.event({ action: "view_pricing",      category: "Engagement", label: "Pricing Page" }),
  clickedTelegram:  () => ReactGA.event({ action: "click_telegram",    category: "CTA",        label: "Telegram Link" }),
  clickedWhatsApp:  () => ReactGA.event({ action: "click_whatsapp",    category: "CTA",        label: "WhatsApp Link" }),
  viewedSampleSignal: () => ReactGA.event({ action: "view_sample",     category: "Engagement", label: "Sample Signal" }),
  clickedProUpgrade:  () => ReactGA.event({ action: "begin_checkout",  category: "Conversion", label: "Pro Plan" }),
  clickedEliteUpgrade:() => ReactGA.event({ action: "begin_checkout",  category: "Conversion", label: "Elite Plan" }),
  completedCheckout:  () => ReactGA.event({ action: "purchase",        category: "Conversion", label: "Checkout Complete" }),
  clickedSignupCTA:   () => ReactGA.event({ action: "click_signup_cta",category: "CTA",        label: "Signup Button" }),
};

// ─── Trackers ─────────────────────────────────────────────────────────────────
function PageViewTracker() {
  const location = useLocation();
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);
  return null;
}

function ConversionPageTracker() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/yourownbroker") Analytics.viewedPricing();
    if (location.pathname === "/signupsuccess")  Analytics.joinedFreeTier();
    if (location.pathname === "/success")        Analytics.completedCheckout();
  }, [location.pathname]);
  return null;
}

// ─── Admin Layout ─────────────────────────────────────────────────────────────
function AdminLayout() {
  const { admin, logout } = useAuth();
  const isSuperAdmin = localStorage.getItem('isSuperAdmin') === 'true';

  return (
    <div style={ls.shell}>
      <aside style={ls.sidebar}>
        <div style={ls.brand}>
          <a className="navbar-brand logo-width" href="/admin/signals">
            <img src="/images/white-logo.png" width="100%" alt="emiracle" />
          </a>
        </div>
        <nav style={ls.nav}>
          {[
            { to: '/admin/signals',               label: 'TRADES' },
            { to: '/admin/performance',           label: 'PERFORMANCE' },
            { to: '/admin/pipeline',              label: 'MEMBER PIPELINE' },
            { to: '/admin/verifications',         label: 'ACTIVE MEMBERS' },
            { to: '/admin/registrations',         label: 'REGISTRATIONS' },
            { to: '/admin/portal-registrations',  label: 'PRIMEXBT DATA' },
            { to: '/admin/password',              label: 'PASSWORD' },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              style={({ isActive }) => ({ ...ls.navLink, ...(isActive ? ls.navLinkActive : {}) })}
            >
              {label}
            </NavLink>
          ))}

          {/* Only visible to super admin */}
          {isSuperAdmin && (
            <NavLink
              to="/admin/users"
              style={({ isActive }) => ({
                ...ls.navLink,
                ...(isActive ? ls.navLinkActive : {}),
                marginTop: 12,
                borderTop: '1px solid #1f2937',
                paddingTop: 14,
              })}
            >
              ADMIN USERS
            </NavLink>
          )}
        </nav>
        <div style={ls.footer}>
          <p style={ls.adminName}>{admin?.name}</p>
          <button style={ls.logoutBtn} onClick={logout}>Sign out</button>
        </div>
      </aside>
      <main style={ls.main}><Outlet /></main>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  useSiteEffects();

  return (
    <AuthProvider>
      <PageViewTracker />
      <ConversionPageTracker />

      <Routes>

        {/* Public */}
        <Route path="/"                          element={<HomePage />} />
        <Route path="/login"                     element={<Login />} />
        <Route path="/signup"                    element={<SignUpLandingPage />} />
        <Route path="/contact"                   element={<ContactUs />} />
        <Route path="/verified"                  element={<Verified />} />
        <Route path="/verifiedresults"           element={<VerifiedResults />} />
        <Route path="/active"                    element={<MemberVerificationPage />} />
        <Route path="/signupsuccess"             element={<SignUpSuccessPage />} />
        <Route path="/success"                   element={<Success />} />
        <Route path="/trustpilot"                element={<TrustPilotReg />} />
        <Route path="/tradeentry"                element={<TradeEntryPage />} />
        <Route path="/yourbroker"                element={<PricingLandingPage />} />
        <Route path="/why-us/expert-analysis"    element={<ExpertAnalysis />} />
        <Route path="/why-us/accurate-signals"   element={<SignalPage />} />
        <Route path="/why-us/risk-management"    element={<RiskManagement />} />
        <Route path="/why-us/learn-while-trading"element={<LearnWhileTrading />} />
        <Route path="/why-us/beginner-friendly"  element={<BeginnerFriendly />} />
        <Route path="/why-us/premium-community"  element={<PremiumCommunity />} />

        {/* Admin — login */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* Admin — protected */}
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index                          element={<Navigate to="signals" replace />} />
          <Route path="signals"                 element={<SignalsPage />} />
          <Route path="signals/new"             element={<SignalFormPage />} />
          <Route path="signals/:id"             element={<SignalDetailPage />} />
          <Route path="signals/:id/edit"        element={<SignalFormPage />} />
          <Route path="performance"             element={<PerformancePage />} />
          <Route path="password"                element={<ChangePasswordPage />} />
          <Route path="pipeline"                element={<PipelinePage />} />
          <Route path="verifications"           element={<VerificationsPage />} />
          <Route path="verifications/:id"       element={<VerificationDetailPage />} />
          <Route path="verifications/:id/edit"  element={<VerificationDetailPage />} />
          <Route path="registrations"           element={<SignUpRegistrationsPage />} />
          <Route path="registrations/:id"       element={<RegistrationDetailPage />} />
          <Route path="portal-registrations"    element={<PortalRegistrationsPage />} />
          <Route path="users"                   element={<AdminUsersPage />} />
        </Route>

        {/* 404 — must be last */}
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </AuthProvider>
  );
}

// ─── Admin Styles ─────────────────────────────────────────────────────────────
const ls = {
  shell:         { display: 'flex', minHeight: '100vh', background: '#f9fafb' },
  sidebar:       { width: 220, background: '#111827', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, bottom: 0, left: 0 },
  brand:         { padding: '1.5rem 1.25rem 1rem', borderBottom: '1px solid #1f2937' },
  nav:           { flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: 2 },
  navLink:       { display: 'block', padding: '9px 12px', borderRadius: 8, fontSize: 14, color: '#9ca3af', textDecoration: 'none', transition: 'all 0.15s' },
  navLinkActive: { background: '#1f2937', color: '#fff', fontWeight: 600 },
  footer:        { padding: '1rem 1.25rem', borderTop: '1px solid #1f2937' },
  adminName:     { fontSize: 12, color: '#6b7280', marginBottom: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  logoutBtn:     { fontSize: 12, color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer', padding: 0 },
  main:          { marginLeft: 220, flex: 1, minHeight: '100vh', minWidth: 0, overflow: 'auto' },
};

export default App;