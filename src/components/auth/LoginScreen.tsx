import React from 'react';

interface LoginScreenProps {
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

export default function LoginScreen({
  setCurrentScreen,
  formData,
  setFormData,
  setIsLoading,
  setError,
}: LoginScreenProps) {
  const handleContinue = () => {
    if (!formData.phoneNumber) {
      setError('Please enter your phone number');
      return;
    }
    setError('');
    setCurrentScreen('phone-verification');
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-6">
        <button
          onClick={() => setCurrentScreen('welcome')}
          className="mb-6 p-2 text-gray-600"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
        <p className="text-gray-600 mb-8">Sign in to your ScoopSocials account</p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              placeholder="(555) 123-4567"
              className="w-full p-4 border border-gray-300 rounded-xl bg-gray-50 text-lg text-center"
              autoComplete="tel"
              inputMode="numeric"
            />
            <p className="text-xs text-gray-500 mt-2 text-center">
              We'll send a verification code to confirm it's you
            </p>
          </div>

          <button
            onClick={handleContinue}
            className="w-full bg-cyan-500 text-white py-4 rounded-xl text-lg font-bold"
          >
            Send Verification Code
          </button>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <button className="w-full border border-cyan-500 text-cyan-500 py-4 rounded-xl text-lg font-semibold flex items-center justify-center">
            <span className="mr-2">👆</span>
            Use Touch ID
          </button>

          <div className="text-center mt-6">
            <span className="text-gray-600">Don't have an account? </span>
            <button
              onClick={() => setCurrentScreen('signup')}
              className="text-cyan-500 font-semibold"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 