import React from 'react';
import { QueryProvider } from './providers/QueryProvider';
import { ErrorBoundary } from './components/ErrorBoundary';
import ScoopApp from './components/ScoopApp';

function App() {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <ScoopApp />
      </QueryProvider>
    </ErrorBoundary>
  );
}

export default App; 