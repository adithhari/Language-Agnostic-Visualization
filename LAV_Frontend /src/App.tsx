/**
 * Entry point of the Language-Agnostic Visualization Frontend.
 * Wraps and renders the Home page component inside a styled container.
 */
import React from 'react';
import Home from './pages/Home';

/**
 * Root App component that renders the Home page with center alignment and background styling.
 */
function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Home />
    </div>
  );
}

export default App;
