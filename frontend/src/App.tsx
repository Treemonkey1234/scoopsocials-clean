import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Friends from "./pages/Friends";
import Auth from "./pages/Auth";
import FooterNav from "./components/FooterNav";
import { WalkthroughModal } from "./components/WalkthroughModal";
import { TestNewUser } from "./components/TestNewUser";

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem('auth_token');

  if (!isAuthenticated) {
    // Redirect them to the /auth page
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';
  const [showWalkthrough, setShowWalkthrough] = useState(false);

  useEffect(() => {
    // Check if user just completed authentication and hasn't seen walkthrough
    const isAuthenticated = localStorage.getItem('auth_token');
    const walkthroughCompleted = localStorage.getItem('walkthroughCompleted');
    const isNewUser = localStorage.getItem('isNewUser') === 'true';

    if (isAuthenticated && !walkthroughCompleted && isNewUser) {
      setShowWalkthrough(true);
    }
  }, [location.pathname]);

  const handleWalkthroughComplete = () => {
    setShowWalkthrough(false);
    localStorage.removeItem('isNewUser'); // Clean up the flag
  };

  const handleWalkthroughClose = () => {
    setShowWalkthrough(false);
    localStorage.removeItem('isNewUser'); // Clean up the flag
  };

  return (
    <div className="App min-h-screen bg-gray-50">
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/events" element={
          <ProtectedRoute>
            <Events />
          </ProtectedRoute>
        } />
        <Route path="/search" element={
          <ProtectedRoute>
            <Search />
          </ProtectedRoute>
        } />
        <Route path="/friends" element={
          <ProtectedRoute>
            <Friends />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
      
      {!isAuthPage && <FooterNav />}
      
      <WalkthroughModal
        isOpen={showWalkthrough}
        onClose={handleWalkthroughClose}
        onComplete={handleWalkthroughComplete}
      />
      
      {/* Development tools - remove in production */}
      {process.env.NODE_ENV === 'development' && <TestNewUser />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App; 