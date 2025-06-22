import React from 'react';
import { authService } from '../../services/authService';

interface ContactsScreenProps {
  setCurrentScreen: (screen: string) => void;
  formData: {
    phoneNumber: string;
    verificationCode: string;
    name: string;
    email: string;
  };
  accountType: string;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  isLoading: boolean;
  error: string;
}

export default function ContactsScreen({
  setCurrentScreen,
  formData,
  accountType,
  setIsLoading,
  setError,
  isLoading,
  error,
}: ContactsScreenProps) {
  const handleCreateAccount = async (skipContacts: boolean = false) => {
    setIsLoading(true);
    setError('');
    
    try {
      // Create the account with collected data
      const username = formData.name.toLowerCase().replace(/\s+/g, '_');
      const cleanPhone = formData.phoneNumber.replace(/\D/g, '');
      const internationalPhone = `+1${cleanPhone}`;
      
      await authService.signup({
        phone: internationalPhone,
        name: formData.name,
        username: username,
        email: formData.email || undefined,
        accountType: accountType?.toUpperCase() as 'FREE' | 'PROFESSIONAL' | 'VENUE'
      });
      
      // Redirect to main app
      window.location.href = '/';
    } catch (err: any) {
      if (err.message.includes('User already exists') || err.message.includes('409')) {
        // User already exists, try to log them in
        try {
          const cleanPhone = formData.phoneNumber.replace(/\D/g, '');
          const internationalPhone = `+1${cleanPhone}`;
          await authService.login({ phone: internationalPhone });
          window.location.href = '/';
        } catch (loginErr) {
          setError('Account exists but login failed. Please use the Sign In option instead.');
          setIsLoading(false);
        }
      } else {
        setError(err.message || 'Failed to create account');
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-cyan-400 to-blue-500 overflow-hidden">
      <div className="p-4 flex-shrink-0">
        <button
          onClick={() => setCurrentScreen('account-type')}
          className="mb-4 p-2 text-white"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-white mb-1">Find Friends</h1>
        <p className="text-cyan-100 text-sm">
          Discover who's already on ScoopSocials and invite others to join
        </p>
      </div>

      <div className="flex-1 bg-white mx-3 mb-3 rounded-t-3xl overflow-hidden flex flex-col">
        <div className="flex-1 p-4 text-center overflow-y-auto scrollbar-hide">
          <div className="text-5xl mb-3">📱</div>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Connect with Friends</h2>
          <p className="text-gray-600 mb-6 leading-relaxed text-sm">
            We'll check your contacts to see who's already on ScoopSocials and help you connect with them instantly.
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-center">
              <span className="text-green-500 mr-3">👥</span>
              <span className="text-gray-700 text-sm">Find existing friends</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-green-500 mr-3">📤</span>
              <span className="text-gray-700 text-sm">Invite new friends</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-green-500 mr-3">🔒</span>
              <span className="text-gray-700 text-sm">Your privacy is protected</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 flex-shrink-0 space-y-3">
          <button
            onClick={() => handleCreateAccount(false)}
            disabled={isLoading}
            className="w-full bg-cyan-500 text-white py-3 rounded-xl text-base font-bold disabled:opacity-50"
          >
            {isLoading ? 'Creating Account...' : 'Import Contacts'}
          </button>

          <button
            onClick={() => handleCreateAccount(true)}
            disabled={isLoading}
            className="w-full text-gray-500 underline text-sm py-2 disabled:opacity-50"
          >
            Skip for Now
          </button>
          
          {error && (
            <div className="text-red-600 text-sm text-center p-2 bg-red-50 rounded">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 