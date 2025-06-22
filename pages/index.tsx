import React, { useState } from 'react';
import Head from 'next/head';
import { useMediaQuery } from 'react-responsive';
import ScoopApp from '../src/components/ScoopApp';
import WelcomeScreen from '../src/components/auth/WelcomeScreen';
import LoginScreen from '../src/components/auth/LoginScreen';
import SignupScreen from '../src/components/auth/SignupScreen';
import PhoneVerificationScreen from '../src/components/auth/PhoneVerificationScreen';
import AccountTypeScreen from '../src/components/auth/AccountTypeScreen';
import ContactsScreen from '../src/components/auth/ContactsScreen';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [previousScreen, setPreviousScreen] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    verificationCode: '',
    name: '',
    email: '',
  });
  const [accountType, setAccountType] = useState('free');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isDesktop = useMediaQuery({ minWidth: 768 });

  // If desktop, show the web version
  if (isDesktop) {
    return (
      <>
        <Head>
          <title>ScoopSocials</title>
          <meta name="description" content="Building trust in digital connections through community-driven social verification" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
          <meta name="theme-color" content="#00BCD4" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <ScoopApp />
          </div>
        </div>
      </>
    );
  }

  // Mobile version
  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen 
          setCurrentScreen={setCurrentScreen}
          formData={formData}
          setFormData={setFormData}
          setIsLoading={setIsLoading}
          setError={setError}
        />;
      case 'signup':
        return <SignupScreen 
          setCurrentScreen={setCurrentScreen}
          formData={formData}
          setFormData={setFormData}
          setIsLoading={setIsLoading}
          setError={setError}
        />;
      case 'phone-verification':
        return <PhoneVerificationScreen 
          setCurrentScreen={setCurrentScreen}
          formData={formData}
          setFormData={setFormData}
          setIsLoading={setIsLoading}
          setError={setError}
          isSigningIn={isSigningIn}
        />;
      case 'account-type': 
        return <AccountTypeScreen 
          setCurrentScreen={setCurrentScreen}
          accountType={accountType}
          setAccountType={setAccountType}
        />;
      case 'contacts': 
        return <ContactsScreen 
          setCurrentScreen={setCurrentScreen}
          formData={formData}
          accountType={accountType}
          setIsLoading={setIsLoading}
          setError={setError}
          isLoading={isLoading}
          error={error}
        />;
      default: 
        return <WelcomeScreen 
          setPreviousScreen={setPreviousScreen} 
          setIsSigningIn={setIsSigningIn} 
          setCurrentScreen={setCurrentScreen} 
        />;
    }
  };

  return (
    <>
      <Head>
        <title>ScoopSocials</title>
        <meta name="description" content="Building trust in digital connections through community-driven social verification" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#00BCD4" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-cyan-400 to-blue-500">
        {renderScreen()}
      </div>
    </>
  );
}