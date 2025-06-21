import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Step enums for clarity
enum Step {
  Landing,
  PhoneEntry,
  SMSVerification,
  ProfileCreation,
  InterestsOnboarding,
  SocialOnboarding,
  FriendsOnboarding,
  Complete,
  SignInSuccess,
}

type Mode = "signIn" | "signUp" | null;

export default function Auth() {
  const [step, setStep] = useState<Step>(Step.Landing);
  const [mode, setMode] = useState<Mode>(null);
  const [localNumber, setLocalNumber] = useState('');
  const [sms, setSms] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [socials, setSocials] = useState<{ [platform: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Social connection state
  const [socialConnections, setSocialConnections] = useState<{
    [platform: string]: {
      connected: boolean;
      method: 'manual' | 'oauth' | null;
      username?: string;
    }
  }>({});

  // Handle redirect when onboarding is complete
  useEffect(() => {
    if (step === Step.Complete) {
      setTimeout(() => navigate("/home"), 1200);
    }
  }, [step, navigate]);

  // Clear error when step changes
  useEffect(() => {
    setError("");
  }, [step]);

  // Improved progress tracking for different flows
  const getProgressInfo = () => {
    const signInSteps = [
      { step: Step.Landing, label: "Welcome" },
      { step: Step.PhoneEntry, label: "Enter Phone" },
      { step: Step.SMSVerification, label: "Verify Code" },
      { step: Step.SignInSuccess, label: "Success" }
    ];

    const signUpSteps = [
      { step: Step.Landing, label: "Welcome" },
      { step: Step.PhoneEntry, label: "Enter Phone" },
      { step: Step.SMSVerification, label: "Verify Code" },
      { step: Step.ProfileCreation, label: "Create Profile" },
      { step: Step.InterestsOnboarding, label: "Select Interests" },
      { step: Step.SocialOnboarding, label: "Connect Social" },
      { step: Step.FriendsOnboarding, label: "Find Friends" },
      { step: Step.Complete, label: "Complete" }
    ];

    const currentSteps = mode === "signIn" ? signInSteps : signUpSteps;
    const currentIndex = currentSteps.findIndex(s => s.step === step);
    
    if (currentIndex === -1) {
      return {
        currentStepNumber: 0,
        totalSteps: currentSteps.length,
        progressPercentage: 0,
        currentStepLabel: "Unknown",
        shouldShowProgress: false
      };
    }
    
    const totalSteps = currentSteps.length;
    const currentStepNumber = currentIndex + 1;
    const progressPercentage = Math.round((currentStepNumber / totalSteps) * 100);
    const currentStepLabel = currentSteps[currentIndex]?.label || "Unknown";
    
    return {
      currentStepNumber,
      totalSteps,
      progressPercentage,
      currentStepLabel,
      shouldShowProgress: step !== Step.Landing && step !== Step.SignInSuccess && step !== Step.Complete
    };
  };

  const handleSendSMS = async () => {
    if (!localNumber) {
      setError("Please enter your phone number");
      return;
    }
    setLoading(true);
    setError("");
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep(Step.SMSVerification);
    } catch (err: any) {
      setError("Failed to send verification code");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySMS = async () => {
    if (!sms || sms.length !== 6) {
      setError("Please enter a 6-digit verification code");
      return;
    }
    setLoading(true);
    setError("");
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (mode === "signIn") {
        // Simulate login
        localStorage.setItem('auth_token', 'demo_token');
        localStorage.setItem('user', JSON.stringify({ 
          name: 'Demo User', 
          username: 'demo_user', 
          phone: localNumber 
        }));
        setStep(Step.SignInSuccess);
        setTimeout(() => navigate("/home"), 1200);
      } else {
        setStep(Step.ProfileCreation);
      }
    } catch (err: any) {
      setError("Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  const handleProfile = async () => {
    if (!name || !username) {
      setError("Please enter your name and username");
      return;
    }
    setLoading(true);
    setError("");
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create user object
      const userData = {
        phone: localNumber,
        name,
        username,
        email: email || undefined,
        bio: bio || undefined,
        interests: interests
      };
      
      localStorage.setItem('auth_token', 'demo_token');
      localStorage.setItem('user', JSON.stringify(userData));
      
      setStep(Step.InterestsOnboarding);
    } catch (err: any) {
      setError("Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const handleInterests = () => setStep(Step.SocialOnboarding);
  const handleSocials = () => setStep(Step.FriendsOnboarding);
  
  // 🚨 CRITICAL FUNCTION: Sets isNewUser flag to trigger walkthrough
  const handleFriends = () => {
    // Save social connections to localStorage
    const userData = {
      name,
      username,
      phone: localNumber,
      email,
      bio,
      interests,
      socials
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    
    // 🚨 CRITICAL: Set isNewUser flag to trigger walkthrough after auth completion
    localStorage.setItem('isNewUser', 'true');
    
    setStep(Step.Complete);
  };

  // Interest categories for onboarding
  const interestCategories = [
    { category: "Technology", interests: ["Programming", "AI/ML", "Web Development", "Mobile Apps", "Gaming", "Cybersecurity"] },
    { category: "Sports & Fitness", interests: ["Running", "Gym", "Yoga", "Basketball", "Soccer", "Swimming", "Hiking"] },
    { category: "Arts & Culture", interests: ["Photography", "Music", "Painting", "Dance", "Theater", "Museums", "Literature"] },
    { category: "Food & Cooking", interests: ["Cooking", "Baking", "Restaurants", "Wine", "Coffee", "Vegan", "BBQ"] },
    { category: "Travel & Adventure", interests: ["Backpacking", "Road Trips", "International Travel", "Camping", "Sightseeing"] },
    { category: "Business & Career", interests: ["Entrepreneurship", "Marketing", "Finance", "Networking", "Leadership"] }
  ];

  // Social platforms for onboarding
  const platforms = [
    "Facebook", "Instagram", "Twitter/X", "TikTok", "Snapchat",
    "LinkedIn", "YouTube", "Reddit", "Pinterest", "Threads", "BeReal"
  ];

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  // Social connection helpers
  const connectSocialPlatform = (platform: string, method: 'manual' | 'oauth') => {
    setSocialConnections(prev => ({
      ...prev,
      [platform]: {
        connected: true,
        method,
        username: method === 'manual' ? '' : undefined
      }
    }));
  };

  const disconnectSocialPlatform = (platform: string) => {
    setSocialConnections(prev => ({
      ...prev,
      [platform]: {
        connected: false,
        method: null,
        username: undefined
      }
    }));
    setSocials(prev => {
      const newSocials = { ...prev };
      delete newSocials[platform];
      return newSocials;
    });
  };

  const updateSocialUsername = (platform: string, username: string) => {
    setSocialConnections(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        username
      }
    }));
    setSocials(prev => ({
      ...prev,
      [platform]: username
    }));
  };

  const handleOAuthConnect = async (platform: string) => {
    alert(`This would redirect to ${platform} OAuth. For demo, we'll simulate success.`);
    
    setSocialConnections(prev => ({
      ...prev,
      [platform]: {
        connected: true,
        method: 'oauth',
        username: `@${platform.toLowerCase()}_user_${Math.floor(Math.random() * 1000)}`
      }
    }));
    
    setSocials(prev => ({
      ...prev,
      [platform]: `@${platform.toLowerCase()}_user_${Math.floor(Math.random() * 1000)}`
    }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      {/* Progress Bar */}
      {getProgressInfo().shouldShowProgress && (
        <div className="w-full max-w-xs mb-6 flex flex-col items-center">
          <div className="flex justify-between text-sm text-gray-600 mb-2 w-full">
            <span>Step {getProgressInfo().currentStepNumber} of {getProgressInfo().totalSteps}</span>
            <span>{getProgressInfo().progressPercentage}%</span>
          </div>
          <div className="w-full" style={{ maxWidth: 320 }}>
            <div className="bg-gray-200 rounded-full h-2 w-full">
              <div 
                className="bg-cyan-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${getProgressInfo().progressPercentage}%` }}
              ></div>
            </div>
          </div>
          <div className="text-xs text-gray-600 mt-2 text-center">
            {getProgressInfo().currentStepLabel}
          </div>
        </div>
      )}

      {error && (
        <div className="w-full max-w-xs mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {step === Step.Landing && (
        <div className="w-full max-w-xs space-y-4">
          <div className="text-center">
            <div className="text-4xl mb-4">🌟</div>
            <div className="text-2xl font-bold mb-4 text-cyan-600">Welcome to Scoop Socials</div>
            <div className="text-gray-600 mb-6">
              Connect with trusted friends, discover amazing events, and build meaningful relationships.
            </div>
          </div>
          <button 
            className="w-full py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50" 
            onClick={() => { setMode("signIn"); setStep(Step.PhoneEntry); }}
            disabled={loading}
          >
            Sign In
          </button>
          <button 
            className="w-full py-3 bg-white text-cyan-600 border border-cyan-600 rounded-lg hover:bg-cyan-50 disabled:opacity-50" 
            onClick={() => { setMode("signUp"); setStep(Step.PhoneEntry); }}
            disabled={loading}
          >
            Create Account
          </button>
        </div>
      )}

      {step === Step.PhoneEntry && (
        <div className="w-full max-w-xs space-y-4">
          <div className="text-center">
            <div className="text-2xl mb-2">📱</div>
            <div className="text-xl font-semibold text-cyan-600">
              {mode === "signIn" ? "Sign In" : "Create Account"}
            </div>
            <div className="text-gray-600">
              {mode === "signIn" 
                ? "Enter your phone number to continue" 
                : "Let's start by verifying your phone number"
              }
            </div>
          </div>
          <input
            className="w-full p-3 border rounded-lg"
            type="tel"
            placeholder="Phone number"
            value={localNumber}
            onChange={e => setLocalNumber(e.target.value)}
            disabled={loading}
          />
          <button 
            className="w-full py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50"
            onClick={handleSendSMS}
            disabled={loading || !localNumber}
          >
            {loading ? "Sending..." : "Continue"}
          </button>
        </div>
      )}

      {step === Step.SMSVerification && (
        <div className="w-full max-w-xs space-y-4">
          <div className="text-center">
            <div className="text-2xl mb-2">💬</div>
            <div className="text-xl font-semibold text-cyan-600">Verify Your Phone</div>
            <div className="text-gray-600">
              Enter the 6-digit code sent to {localNumber}
            </div>
          </div>
          <input
            className="w-full p-3 border rounded-lg text-center"
            type="text"
            placeholder="123456"
            value={sms}
            onChange={e => setSms(e.target.value.replace(/\D/g, '').slice(0, 6))}
            disabled={loading}
          />
          <button 
            className="w-full py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50"
            onClick={handleVerifySMS}
            disabled={loading || sms.length !== 6}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>
      )}

      {step === Step.ProfileCreation && (
        <div className="w-full max-w-xs space-y-4">
          <div className="text-center">
            <div className="text-2xl mb-2">👤</div>
            <div className="text-xl font-semibold text-cyan-600">Create Your Profile</div>
            <div className="text-gray-600">Tell us about yourself</div>
          </div>
          <input
            className="w-full p-3 border rounded-lg"
            type="text"
            placeholder="Full name"
            value={name}
            onChange={e => setName(e.target.value)}
            disabled={loading}
          />
          <input
            className="w-full p-3 border rounded-lg"
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            disabled={loading}
          />
          <input
            className="w-full p-3 border rounded-lg"
            type="email"
            placeholder="Email (optional)"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
          />
          <textarea
            className="w-full p-3 border rounded-lg"
            placeholder="Bio (optional)"
            value={bio}
            onChange={e => setBio(e.target.value)}
            disabled={loading}
            rows={3}
          />
          <button 
            className="w-full py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50"
            onClick={handleProfile}
            disabled={loading || !name || !username}
          >
            {loading ? "Creating..." : "Continue"}
          </button>
        </div>
      )}

      {step === Step.InterestsOnboarding && (
        <div className="w-full max-w-md space-y-4">
          <div className="text-center">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-xl font-semibold text-cyan-600">What are you interested in?</div>
            <div className="text-gray-600">Choose topics that interest you</div>
          </div>
          <div className="max-h-80 overflow-y-auto space-y-4">
            {interestCategories.map((category) => (
              <div key={category.category} className="space-y-2">
                <div className="font-semibold text-gray-800">{category.category}</div>
                <div className="flex flex-wrap gap-2">
                  {category.interests.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`px-3 py-1 text-sm rounded-full border ${
                        interests.includes(interest)
                          ? 'bg-cyan-600 text-white border-cyan-600'
                          : 'bg-white text-gray-600 border-gray-300 hover:border-cyan-600'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button 
            className="w-full py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
            onClick={handleInterests}
          >
            Continue
          </button>
        </div>
      )}

      {step === Step.SocialOnboarding && (
        <div className="w-full max-w-md space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="text-center">
            <div className="text-2xl mb-2">🔗</div>
            <div className="text-xl font-semibold text-cyan-600">Connect Social Accounts</div>
            <div className="text-gray-600">Optional: Link your social profiles</div>
          </div>
          <div className="space-y-3">
            {platforms.map((platform) => {
              const connection = socialConnections[platform];
              const isConnected = connection?.connected;
              
              return (
                <div key={platform} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{platform}</span>
                    {!isConnected ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => connectSocialPlatform(platform, 'manual')}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          Manual
                        </button>
                        <button
                          onClick={() => handleOAuthConnect(platform)}
                          className="text-xs bg-cyan-600 text-white px-2 py-1 rounded"
                        >
                          Connect
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => disconnectSocialPlatform(platform)}
                        className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded"
                      >
                        Disconnect
                      </button>
                    )}
                  </div>
                  
                  {isConnected && connection.method === 'manual' && (
                    <input
                      type="text"
                      placeholder="Username"
                      value={connection.username || ''}
                      onChange={(e) => updateSocialUsername(platform, e.target.value)}
                      className="w-full p-2 border rounded text-sm"
                    />
                  )}
                  
                  {isConnected && connection.method === 'oauth' && (
                    <div className="text-sm text-green-600">
                      ✓ Connected as {connection.username}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <button 
            className="w-full py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
            onClick={handleSocials}
          >
            Continue
          </button>
        </div>
      )}

      {step === Step.FriendsOnboarding && (
        <div className="w-full max-w-xs space-y-4">
          <div className="text-center">
            <div className="text-2xl mb-2">👥</div>
            <div className="text-xl font-semibold text-cyan-600">Find Friends</div>
            <div className="text-gray-600">Connect with people you know</div>
          </div>
          <div className="space-y-3">
            <button className="w-full p-3 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
              📱 Import Phone Contacts
            </button>
            <div className="text-center text-gray-500 text-sm">
              We'll help you find friends who are already on ScoopSocials
            </div>
          </div>
          <button 
            className="w-full py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
            onClick={handleFriends}
          >
            Continue
          </button>
        </div>
      )}

      {step === Step.Complete && (
        <div className="w-full max-w-xs space-y-4 text-center">
          <div className="text-4xl mb-4">🎉</div>
          <div className="text-2xl font-bold text-cyan-600">Welcome to ScoopSocials!</div>
          <div className="text-gray-600">
            Your account has been created successfully. Let's explore your new social platform!
          </div>
        </div>
      )}

      {step === Step.SignInSuccess && (
        <div className="w-full max-w-xs space-y-4 text-center">
          <div className="text-4xl mb-4">👋</div>
          <div className="text-2xl font-bold text-cyan-600">Welcome Back!</div>
          <div className="text-gray-600">
            You're successfully signed in.
          </div>
        </div>
      )}
    </div>
  );
} 