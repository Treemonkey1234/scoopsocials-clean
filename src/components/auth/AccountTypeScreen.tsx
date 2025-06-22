import React from 'react';

interface AccountTypeScreenProps {
  setCurrentScreen: (screen: string) => void;
  accountType: string;
  setAccountType: (type: string) => void;
}

export default function AccountTypeScreen({
  setCurrentScreen,
  accountType,
  setAccountType,
}: AccountTypeScreenProps) {
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-cyan-400 to-blue-500 overflow-hidden">
      <div className="p-4 flex-shrink-0">
        <button
          onClick={() => setCurrentScreen('phone-verification')}
          className="mb-4 p-2 text-white"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-white mb-1">Choose Your Plan</h1>
        <p className="text-cyan-100 text-sm">Select the account type that best fits your needs</p>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-3 scrollbar-hide">
        {/* Free Account Card */}
        <div
          onClick={() => setAccountType('free')}
          className={`p-4 rounded-2xl cursor-pointer transition-all ${
            accountType === 'free'
              ? 'bg-white border-2 border-cyan-500'
              : 'bg-white/90 border-2 border-transparent'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Free Account</h3>
              <p className="text-gray-600 text-sm">Perfect for getting started</p>
              <p className="text-lg font-bold text-gray-800 mt-1">$0/month</p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 ${
              accountType === 'free' ? 'bg-cyan-500 border-cyan-500' : 'border-gray-300'
            }`}>
              {accountType === 'free' && <div className="w-full h-full rounded-full bg-white transform scale-50"></div>}
            </div>
          </div>
          <div className="space-y-1">
            {[
              'Basic posting and reviewing',
              'Standard friend connections',
              'Event attendance',
              'Trust score display',
              'Community validation'
            ].map((feature, index) => (
              <div key={index} className="flex items-center">
                <span className="text-green-500 mr-2 text-sm">✓</span>
                <span className="text-gray-700 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Account Card */}
        <div
          onClick={() => setAccountType('professional')}
          className={`p-4 rounded-2xl cursor-pointer transition-all relative ${
            accountType === 'professional'
              ? 'bg-white border-2 border-cyan-500'
              : 'bg-white/90 border-2 border-transparent'
          }`}
        >
          <div className="absolute -top-2 right-4 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            POPULAR
          </div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Professional Account</h3>
              <p className="text-gray-600 text-sm">For power users and organizers</p>
              <p className="text-lg font-bold text-gray-800 mt-1">$9.99/month</p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 ${
              accountType === 'professional' ? 'bg-cyan-500 border-cyan-500' : 'border-gray-300'
            }`}>
              {accountType === 'professional' && <div className="w-full h-full rounded-full bg-white transform scale-50"></div>}
            </div>
          </div>
          <div className="space-y-1">
            {[
              'Everything in Free',
              'Create Local Community Hubs',
              'Create Interest-Based Groups',
              'Enhanced event management',
              'Advanced community features',
              'Priority support'
            ].map((feature, index) => (
              <div key={index} className="flex items-center">
                <span className="text-green-500 mr-2 text-sm">✓</span>
                <span className="text-gray-700 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Venue Account Card */}
        <div
          onClick={() => setAccountType('venue')}
          className={`p-4 rounded-2xl cursor-pointer transition-all relative ${
            accountType === 'venue'
              ? 'bg-white border-2 border-cyan-500'
              : 'bg-white/90 border-2 border-transparent'
          }`}
        >
          <div className="absolute -top-2 right-4 bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            PREMIUM
          </div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Venue Account</h3>
              <p className="text-gray-600 text-sm">For bars, restaurants, and venues</p>
              <p className="text-lg font-bold text-gray-800 mt-1">$19.99/month</p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 ${
              accountType === 'venue' ? 'bg-cyan-500 border-cyan-500' : 'border-gray-300'
            }`}>
              {accountType === 'venue' && <div className="w-full h-full rounded-full bg-white transform scale-50"></div>}
            </div>
          </div>
          <div className="space-y-1">
            {[
              'Everything in Professional',
              'Customer outreach tools',
              'Event promotion features',
              'Business analytics',
              'Review management',
              'Customer engagement suite',
              'Dedicated venue profile'
            ].map((feature, index) => (
              <div key={index} className="flex items-center">
                <span className="text-green-500 mr-2 text-sm">✓</span>
                <span className="text-gray-700 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur p-3 rounded-xl mb-6">
          <div className="flex items-center">
            <span className="text-white mr-2">ℹ️</span>
            <span className="text-white text-xs">
              You can upgrade or downgrade your plan anytime in settings
            </span>
          </div>
        </div>
      </div>

      <div className="p-3 flex-shrink-0">
        <button
          onClick={() => setCurrentScreen('contacts')}
          disabled={!accountType}
          className={`w-full py-3 rounded-xl text-sm font-bold ${
            accountType
              ? 'bg-white text-cyan-500'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue with {accountType === 'free' ? 'Free' : accountType === 'professional' ? 'Professional' : 'Venue'} Account
        </button>
      </div>
    </div>
  );
} 