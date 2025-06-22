import React from 'react';

interface WelcomeScreenProps {
  setPreviousScreen: (screen: string) => void;
  setIsSigningIn: (isSigningIn: boolean) => void;
  setCurrentScreen: (screen: string) => void;
}

export default function WelcomeScreen({
  setPreviousScreen,
  setIsSigningIn,
  setCurrentScreen,
}: WelcomeScreenProps) {
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-cyan-400 to-blue-500 text-white overflow-hidden">
      <div className="flex-1 flex flex-col p-5 py-3">
        <div className="text-center mt-3">
          <div className="w-16 h-16 bg-white rounded-full mx-auto mb-3 flex items-center justify-center">
            <span className="text-lg font-bold text-cyan-500">S</span>
          </div>
          <h1 className="text-xl font-bold mb-1">ScoopSocials</h1>
          <p className="text-cyan-100 text-sm">Building trust in digital connections</p>
        </div>

        <div className="space-y-3 text-center my-4 flex-1 flex flex-col justify-center">
          <div className="bg-white/10 backdrop-blur rounded-full px-4 py-3 flex items-center">
            <span className="text-xl mr-3">🛡️</span>
            <span className="text-base">Verified Profiles</span>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-full px-4 py-3 flex items-center">
            <span className="text-xl mr-3">📱</span>
            <span className="text-base">Phone Verification</span>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-full px-4 py-3 flex items-center">
            <span className="text-xl mr-3">👥</span>
            <span className="text-base">Community Trust</span>
          </div>
        </div>

        <div className="space-y-3 pb-1">
          <button
            onClick={() => {
              setPreviousScreen('welcome');
              setIsSigningIn(false);
              setCurrentScreen('signup');
            }}
            className="w-full bg-white text-cyan-500 py-3 rounded-full text-base font-bold"
          >
            Create Account
          </button>
          <button
            onClick={() => {
              setPreviousScreen('welcome');
              setIsSigningIn(true);
              setCurrentScreen('login');
            }}
            className="w-full border-2 border-white text-white py-3 rounded-full text-base font-semibold"
          >
            Sign In
          </button>
          <p className="text-center text-xs text-cyan-100 px-2 leading-tight">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
} 