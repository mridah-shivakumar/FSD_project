import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { PortfolioEditorPage } from './pages/PortfolioEditorPage';
import { PortfolioPreviewPage } from './pages/PortfolioPreviewPage';
import { PublicPortfolioPage } from './pages/PublicPortfolioPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Component that selectively renders Navbar and Footer based on route
const AppLayout = () => {
  const location = useLocation();
  const isPublicPortfolio = location.pathname.startsWith('/portfolio/');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isPublicPortfolio && <Navbar />}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <PortfolioEditorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <PortfolioEditorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/preview/:id"
            element={
              <ProtectedRoute>
                <PortfolioPreviewPage />
              </ProtectedRoute>
            }
          />
          <Route path="/portfolio/:slug" element={<PublicPortfolioPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {!isPublicPortfolio && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;
