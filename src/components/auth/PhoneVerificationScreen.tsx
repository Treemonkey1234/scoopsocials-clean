import React from 'react';

interface PhoneVerificationScreenProps {
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
  isSigningIn: boolean;
}

export default function PhoneVerificationScreen({
  setCurrentScreen,
  formData,
  setFormData,
  setIsLoading,
  setError,
  isSigningIn,
}: PhoneVerificationScreenProps) {
  const handleVerify = () => {
    if (!formData.verificationCode || formData.verificationCode.length !== 6) {
      setError('Please enter a valid verification code');
      return;
    }
    setError('');
    setIsLoading(true);

    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      if (formData.verificationCode === '123456') {
        if (isSigningIn) {
          // Existing user - go straight to main app
          window.location.href = '/';
        } else {
          // New user - continue to onboarding
          setCurrentScreen('account-type');
        }
      } else {
        setError('Invalid verification code');
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-6">
        <button
          onClick={() => setCurrentScreen(isSigningIn ? 'login' : 'signup')}
          className="mb-6 p-2 text-gray-600"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Verify Phone Number</h1>
        <p className="text-gray-600 text-center mb-8">
          We sent a 6-digit code to<br />
          <span className="font-semibold text-cyan-500">{formData.phoneNumber}</span>
        </p>

        <div className="flex justify-center space-x-3 mb-8">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={formData.verificationCode[index] || ''}
              onChange={(e) => {
                const newCode = formData.verificationCode.split('');
                newCode[index] = e.target.value;
                setFormData({ ...formData, verificationCode: newCode.join('') });
                if (e.target.value && index < 5) {
                  const nextInput = document.querySelector(`input:nth-of-type(${index + 2})`) as HTMLInputElement;
                  nextInput?.focus();
                }
              }}
              className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:border-cyan-500 focus:outline-none"
            />
          ))}
        </div>

        <div className="text-center mb-8">
          <button className="text-cyan-500 font-semibold">
            Resend Code
          </button>
        </div>

        <button
          onClick={handleVerify}
          className="w-full bg-cyan-500 text-white py-4 rounded-xl text-lg font-bold"
        >
          Verify
        </button>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            For testing, use code: <span className="font-bold text-cyan-500">123456</span>
          </p>
        </div>
      </div>
    </div>
  );
} 