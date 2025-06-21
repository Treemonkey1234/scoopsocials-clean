import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Auth from './Auth';

const IndexPage: React.FC = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated - only on client side
    if (typeof window !== 'undefined') {
      const authToken = localStorage.getItem('auth_token');
      setIsAuthenticated(!!authToken);
      setIsLoading(false);
      
      // If authenticated, redirect to home
      if (authToken) {
        router.push('/Home');
      }
    }
  }, [router]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">ScoopSocials</h1>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show Auth component directly
  if (!isAuthenticated) {
    return <Auth />;
  }

  // If authenticated, show loading while redirecting
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">ScoopSocials</h1>
        <p className="text-gray-600">Redirecting to home...</p>
      </div>
    </div>
  );
};

export default IndexPage; 