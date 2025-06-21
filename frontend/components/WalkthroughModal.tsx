import React, { useState } from 'react';

interface WalkthroughModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const SOCIAL_PLATFORMS = [
  { value: 'facebook', label: 'Facebook' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'twitter', label: 'Twitter/X' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'snapchat', label: 'Snapchat' },
  { value: 'discord', label: 'Discord' },
  { value: 'reddit', label: 'Reddit' },
  { value: 'twitch', label: 'Twitch' },
  { value: 'pinterest', label: 'Pinterest' },
  { value: 'other', label: 'Other' },
];

interface SocialAccount {
  platform: string;
  username: string;
  customPlatform?: string;
  customUrl?: string;
}

export const WalkthroughModal: React.FC<WalkthroughModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([
    { platform: 'facebook', username: '' }
  ]);
  const [showOtherModal, setShowOtherModal] = useState(false);
  const [customPlatform, setCustomPlatform] = useState('');
  const [customUrl, setCustomUrl] = useState('');

  const totalSteps = 6;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const skipToEnd = () => {
    onComplete();
  };

  const addSocialAccount = () => {
    setSocialAccounts([...socialAccounts, { platform: 'facebook', username: '' }]);
  };

  const updateSocialAccount = (index: number, field: string, value: string) => {
    const updated = [...socialAccounts];
    updated[index] = { ...updated[index], [field]: value };
    setSocialAccounts(updated);
  };

  const removeSocialAccount = (index: number) => {
    if (socialAccounts.length > 1) {
      setSocialAccounts(socialAccounts.filter((_, i) => i !== index));
    }
  };

  const handleAddOtherPlatform = () => {
    if (customPlatform && customUrl) {
      setSocialAccounts([...socialAccounts, {
        platform: 'other',
        username: '',
        customPlatform,
        customUrl
      }]);
      setCustomPlatform('');
      setCustomUrl('');
      setShowOtherModal(false);
    }
  };

  const importPhoneContacts = () => {
    console.log('Importing phone contacts...');
    alert('Contact import feature would be implemented here');
  };

  const finishWalkthrough = () => {
    localStorage.setItem('walkthroughCompleted', 'true');
    localStorage.setItem('userSocialAccounts', JSON.stringify(socialAccounts));
    onComplete();
  };

  if (!isOpen) return null;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center">
            <div className="text-4xl mb-4">🏠</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Scoop Socials!</h2>
            <p className="text-gray-600 mb-6">
              This is your HOME FEED where you'll see REVIEWS from your network about people.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="text-left space-y-3">
                <div className="border-b pb-2">
                  <div className="font-semibold">👤 John reviewed Sarah</div>
                  <div className="text-sm text-gray-600">"Great project partner, very reliable"</div>
                  <div className="text-sm text-gray-500">👍 12  👎 3  💬 5</div>
                </div>
                <div>
                  <div className="font-semibold">👤 Mike reviewed Lisa</div>
                  <div className="text-sm text-gray-600">"Helpful mentor, always on time"</div>
                  <div className="text-sm text-gray-500">👍 8   👎 7  💬 2</div>
                </div>
              </div>
            </div>
            <button
              onClick={nextStep}
              className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700"
            >
              Next: See Reviews ➡️
            </button>
          </div>
        );

      case 2:
        return (
          <div className="text-center">
            <div className="text-4xl mb-4">⭐</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Trust Scores</h2>
            <p className="text-gray-600 mb-6">
              These show how reliable people are based on community reviews!
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="text-left">
                <div className="font-semibold mb-2">👤 John reviewed Sarah</div>
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
                  <div className="font-semibold text-yellow-800">Sarah: 94/100 Trust Score</div>
                  <div className="text-sm text-yellow-700">Based on 23 community reviews</div>
                </div>
              </div>
            </div>
            <button
              onClick={nextStep}
              className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700"
            >
              Next: Search 🔍
            </button>
          </div>
        );

      case 3:
        return (
          <div className="text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Find People to Review</h2>
            <p className="text-gray-600 mb-6">
              Use Search to find people you know and can write reviews about their character!
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <input
                type="text"
                placeholder="Try 'Sarah Johnson' or 'New York'"
                className="w-full p-3 border rounded-lg mb-4"
                disabled
              />
              <div className="text-left space-y-2">
                <div className="text-sm font-semibold">📍 Nearby Users</div>
                <div className="text-sm">👤 Alex Chen - Software Dev - 0.5mi</div>
                <div className="text-sm">👤 Maria Lopez - Designer - 1.2mi</div>
              </div>
            </div>
            <button
              onClick={nextStep}
              className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700"
            >
              Next: Events 🎉
            </button>
          </div>
        );

      case 4:
        return (
          <div className="text-center">
            <div className="text-4xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Meet in Real Life!</h2>
            <p className="text-gray-600 mb-6">
              Events help you connect with your network offline. Meet people you can later review!
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="text-left space-y-3">
                <div className="border-b pb-2">
                  <div className="font-semibold">🎯 Tech Meetup Tonight</div>
                  <div className="text-sm text-gray-600">📍 Downtown Cafe • 🕖 7:00 PM</div>
                  <div className="text-sm text-gray-500">👥 12 going • ⭐ Trust score: 85+ required</div>
                </div>
                <div>
                  <div className="font-semibold">🍕 Community Pizza Night</div>
                  <div className="text-sm text-gray-600">📍 Local Park • 🕕 6:00 PM</div>
                  <div className="text-sm text-gray-500">👥 28 going • ⭐ Trust score: 70+ required</div>
                </div>
              </div>
            </div>
            <button
              onClick={nextStep}
              className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700"
            >
              Next: Friends 👥
            </button>
          </div>
        );

      case 5:
        return (
          <div className="text-center">
            <div className="text-4xl mb-4">👥</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Build Your Network</h2>
            <p className="text-gray-600 mb-6">
              Connect with friends to build trust and unlock better opportunities!
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="text-left space-y-3">
                <div className="text-sm font-semibold">📞 Import Phone Contacts</div>
                <div className="text-sm text-gray-600">Find friends who are already using ScoopSocials</div>
                <button 
                  onClick={importPhoneContacts}
                  className="w-full bg-blue-100 text-blue-800 py-2 rounded-lg hover:bg-blue-200"
                >
                  📱 Import Contacts
                </button>
                <div className="border-t pt-3 mt-3">
                  <div className="text-sm font-semibold">🔗 Recommended Connections</div>
                  <div className="text-sm text-gray-600">👤 3 mutual connections with Sarah</div>
                  <div className="text-sm text-gray-600">👤 5 mutual connections with Mike</div>
                </div>
              </div>
            </div>
            <button
              onClick={nextStep}
              className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700"
            >
              Next: Setup Profile 📱
            </button>
          </div>
        );

      case 6:
        return (
          <div className="text-center">
            <div className="text-4xl mb-4">📱</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Connect Your Social Accounts</h2>
            <p className="text-gray-600 mb-6">
              Link your social profiles to boost your trust score and credibility!
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6 max-h-80 overflow-y-auto">
              {socialAccounts.map((account, index) => (
                <div key={index} className="mb-4 p-3 bg-white rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <select
                      value={account.platform}
                      onChange={(e) => updateSocialAccount(index, 'platform', e.target.value)}
                      className="flex-1 mr-2 p-2 border rounded"
                    >
                      {SOCIAL_PLATFORMS.map(platform => (
                        <option key={platform.value} value={platform.value}>
                          {platform.label}
                        </option>
                      ))}
                    </select>
                    {socialAccounts.length > 1 && (
                      <button
                        onClick={() => removeSocialAccount(index)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        ❌
                      </button>
                    )}
                  </div>
                  
                  {account.platform === 'other' ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Platform name"
                        value={account.customPlatform || ''}
                        onChange={(e) => updateSocialAccount(index, 'customPlatform', e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                      <input
                        type="url"
                        placeholder="Website URL"
                        value={account.customUrl || ''}
                        onChange={(e) => updateSocialAccount(index, 'customUrl', e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  ) : (
                    <input
                      type="text"
                      placeholder="Username"
                      value={account.username}
                      onChange={(e) => updateSocialAccount(index, 'username', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  )}
                </div>
              ))}
              
              <button
                onClick={addSocialAccount}
                className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-cyan-500 hover:text-cyan-600"
              >
                ➕ Add another platform?
              </button>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={skipToEnd}
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                Skip for now
              </button>
              <button
                onClick={finishWalkthrough}
                className="flex-1 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700"
              >
                Complete Setup ✅
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Custom Platform Modal
  const renderOtherModal = () => {
    if (!showOtherModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
          <h3 className="text-lg font-semibold mb-4">Add Custom Platform</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Platform name (e.g., MySpace)"
              value={customPlatform}
              onChange={(e) => setCustomPlatform(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="url"
              placeholder="Website URL (e.g., https://myspace.com)"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div className="flex space-x-3 mt-4">
            <button
              onClick={() => setShowOtherModal(false)}
              className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleAddOtherPlatform}
              className="flex-1 bg-cyan-600 text-white px-4 py-2 rounded-lg"
              disabled={!customPlatform || !customUrl}
            >
              Add Platform
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
        <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
          {/* Progress indicator */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-500">
              Step {currentStep} of {totalSteps}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div
              className="bg-cyan-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>

          {/* Step content */}
          {renderStep()}

          {/* Skip button */}
          <div className="mt-6 text-center">
            <button
              onClick={skipToEnd}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Skip walkthrough
            </button>
          </div>
        </div>
      </div>
      {renderOtherModal()}
    </>
  );
}; 