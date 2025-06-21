import React from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const IndexPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated - only on client side
    if (typeof window !== 'undefined') {
      const isAuthenticated = localStorage.getItem('auth_token');
      
      if (!isAuthenticated) {
        // Redirect to auth page
        router.push('/Auth');
      } else {
        // Redirect to home page
        router.push('/Home');
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">ScoopSocials</h1>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default IndexPage; 