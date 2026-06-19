import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Product from './pages/Product';
import Offers from './pages/Offers';
import About from './pages/About';
import EarlyAccess from './pages/EarlyAccess';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Modules from './pages/Modules';
import Pricing from './pages/Pricing';
import Roadmap from './pages/Roadmap';
import Docs from './pages/Docs';
import Impressum from './pages/Impressum';
import Success from './pages/Success';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ background: '#0E0F14', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sign-in" element={<SignIn />} />
            <Route path="/modules" element={<Modules />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/product" element={<Product />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/about" element={<About />} />
            <Route path="/early-access" element={<EarlyAccess />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/impressum" element={<Impressum />} />
              <Route path="/success" element={<Success />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
