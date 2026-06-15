import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import Navbar      from './components/layout/Navbar';
import Footer      from './components/layout/Footer';
import CartDrawer  from './components/layout/CartDrawer';

import HomePage           from './pages/HomePage';
import ShopPage           from './pages/ShopPage';
import ProductDetailPage  from './pages/ProductDetailPage';
import FragranceFinderPage from './pages/FragranceFinderPage';
import CustomLabPage      from './pages/CustomLab';
import HybridCreatorPage  from './pages/HybridCreatorPage';
import QuizPage           from './pages/QuizPage';
import GiftingPage        from './pages/GiftingPage';
import JournalPage        from './pages/JournalPage';
import JournalPostPage    from './pages/JournalPostPage';
import AboutPage          from './pages/AboutPage';
import ContactPage        from './pages/ContactPage';
import CartPage           from './pages/CartPage';
import NotFoundPage       from './pages/NotFoundPage';
import CheckoutPage from './pages/CheckoutPage';

import OrderSuccessPage from './pages/OrderSuccessPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <CartDrawer />
      <main>
        <Routes>
          <Route path="/"                  element={<HomePage />} />

          {/* Shop + category sub-routes */}
          <Route path="/shop"              element={<ShopPage />} />
          <Route path="/shop/:category"    element={<ShopPage />} />
          <Route path="/product/:slug"     element={<ProductDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          {/* Features */}
          <Route path="/finder"            element={<FragranceFinderPage />} />
          <Route path="/lab"               element={<CustomLabPage />} />
          <Route path="/hybrid"            element={<HybridCreatorPage />} />
          <Route path="/quiz"              element={<QuizPage />} />
          <Route path="/gifting"           element={<GiftingPage />} />

          {/* Content */}
          <Route path="/journal"           element={<JournalPage />} />
          <Route path="/journal/:slug"     element={<JournalPostPage />} />
          <Route path="/about"             element={<AboutPage />} />
          <Route path="/contact"           element={<ContactPage />} />

          {/* Cart */}
          <Route path="/cart"              element={<CartPage />} />

          {/* 404 */}
          <Route path="*"                  element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}