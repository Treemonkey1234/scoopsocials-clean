import React from 'react';

interface SignupScreenProps {
  setCurrentScreen: (screen: string) => void;
  formData: {
    phoneNumber: string;
    verificationCode: string;
    name: string;
    email: string;
  };
  setFormData: (data: any) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}

export default function SignupScreen({
  setCurrentScreen,
  formData,
  setFormData,
  setIsLoading,
  setError,
}: SignupScreenProps) {
  const handleContinue = () => {
    if (!formData.name || !formData.phoneNumber) {
      setError('Please fill in all required fields');
      return;
    }
    setError('');
    setCurrentScreen('phone-verification');
  };

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      <div className="p-4 flex-shrink-0">
        <button
          onClick={() => setCurrentScreen('welcome')}
          className="mb-4 p-2 text-gray-600"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Create Account</h1>
        <p className="text-gray-600 mb-4">Join the community and start building trust</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 scrollbar-hide">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your full name"
              className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              placeholder="(555) 123-4567"
              className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 text-base"
              autoComplete="tel"
              inputMode="numeric"
            />
            <p className="text-xs text-gray-500 mt-1">We'll send a verification code to this number</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email (Optional)</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 text-base"
            />
          </div>

          <button
            onClick={handleContinue}
            className="w-full bg-cyan-500 text-white py-3 rounded-xl text-lg font-bold mt-6"
          >
            Continue
          </button>

          <div className="text-center mt-4 pb-4">
            <span className="text-gray-600">Already have an account? </span>
            <button
              onClick={() => setCurrentScreen('login')}
              className="text-cyan-500 font-semibold"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 