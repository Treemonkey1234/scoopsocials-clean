import React from 'react';
import type { AppProps } from 'next/app';
import App from '../App';
import '../index.css';

function MyApp({ Component, pageProps }: AppProps) {
  // Use our custom App component for all routes
  return <App />;
}

export default MyApp; 