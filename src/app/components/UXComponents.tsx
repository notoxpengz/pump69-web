"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Stub API functions for all components
export const api = {
  getReferralData: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      referralCode: 'PUMP69_REF_ABC123',
      totalReferrals: 23,
      activeReferrals: 18,
      totalEarnings: '$1,247.50',
      pendingPayouts: '$324.75',
      clickThroughRate: '4.2%',
      conversionRate: '12.3%',
      recentReferrals: [
        { id: '1', name: 'John D.', joinDate: '2025-08-10', status: 'Active', earnings: '$45.00' },
        { id: '2', name: 'Sarah M.', joinDate: '2025-08-09', status: 'Active', earnings: '$67.50' },
        { id: '3', name: 'Mike R.', joinDate: '2025-08-08', status: 'Pending', earnings: '$0.00' },
      ]
    };
  },
  generateReferralLink: async (type: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return `https://pump69.com/join?ref=PUMP69_REF_ABC123&type=${type}`;
  },
  shareToSocial: async (platform: string, content: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true, platform, sharedUrl: content };
  }
};

// Referral Dashboard Component
export function ReferralDashboard() {
  const [referralData, setReferralData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadReferralData = async () => {
      try {
        const data = await api.getReferralData();
        setReferralData(data);
      } catch (error) {
        console.error('Failed to load referral data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadReferralData();
  }, []);

  const copyReferralCode = async () => {
    if (referralData?.referralCode) {
      await navigator.clipboard.writeText(referralData.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading referral dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Referral Dashboard</h1>
            <p className="text-gray-600 mt-2">Earn rewards by referring friends to Pump69</p>
          </div>
          <Link href="/leagues" className="text-blue-600 hover:underline">
            ← Back to Leagues
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-2xl font-bold text-blue-600">{referralData?.totalReferrals}</div>
            <div className="text-sm text-gray-600">Total Referrals</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-2xl font-bold text-green-600">{referralData?.totalEarnings}</div>
            <div className="text-sm text-gray-600">Total Earnings</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-2xl font-bold text-yellow-600">{referralData?.pendingPayouts}</div>
            <div className="text-sm text-gray-600">Pending Payouts</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-2xl font-bold text-purple-600">{referralData?.conversionRate}</div>
            <div className="text-sm text-gray-600">Conversion Rate</div>
          </div>
        </div>

        {/* Referral Code Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Referral Code</h2>
          <div className="flex items-center space-x-4">
            <code className="bg-gray-100 px-4 py-2 rounded-lg font-mono text-lg flex-1">
              {referralData?.referralCode}
            </code>
            <button
              onClick={copyReferralCode}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                copied ? 'bg-green-100 text-green-800' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {copied ? '✓ Copied!' : 'Copy Code'}
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Share this code with friends to earn 10% of their subscription fees!
          </p>
        </div>

        {/* Recent Referrals Table */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Referrals</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Join Date</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Earnings</th>
                </tr>
              </thead>
              <tbody>
                {referralData?.recentReferrals?.map((referral: any) => (
                  <tr key={referral.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 font-medium">{referral.name}</td>
                    <td className="py-3 text-gray-600">{referral.joinDate}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        referral.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {referral.status}
                      </span>
                    </td>
                    <td className="py-3 font-semibold text-green-600">{referral.earnings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Share Component
export function ShareComponent({ league }: { league?: { id: string; name: string } }) {
  const [sharing, setSharing] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    const generateShareUrl = async () => {
      if (league) {
        const url = await api.generateReferralLink(`league-${league.id}`);
        setShareUrl(url);
      } else {
        const url = await api.generateReferralLink('platform');
        setShareUrl(url);
      }
    };
    generateShareUrl();
  }, [league]);

  const handleShare = async (platform: string) => {
    setSharing(platform);
    try {
      const content = league 
        ? `Check out this amazing trading league: ${league.name}! Join me on Pump69 and let's compete together! ${shareUrl}`
        : `Join me on Pump69 - the ultimate trading platform! Compete in leagues and win amazing prizes! ${shareUrl}`;
      
      const result = await api.shareToSocial(platform, content);
      if (result.success) {
        alert(`Successfully shared to ${platform}!`);
        // In real implementation, would open platform-specific sharing
        if (platform === 'twitter') {
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`, '_blank');
        } else if (platform === 'facebook') {
          window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        }
      }
    } catch (error) {
      console.error('Share failed:', error);
      alert('Failed to share. Please try again.');
    } finally {
      setSharing(null);
    }
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {league ? `Share ${league.name}` : 'Share Pump69'}
          </h1>
          
          <p className="text-gray-600 mb-8">
            {league 
              ? 'Invite your friends to join this exciting trading league!'
              : 'Invite friends to join Pump69 and earn referral rewards!'}
          </p>

          {/* Share URL Display */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Share Link</label>
            <div className="flex">
              <input 
                type="text" 
                value={shareUrl}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg bg-gray-50"
              />
              <button
                onClick={copyLink}
                className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
              >
                Copy Link
              </button>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => handleShare('twitter')}
              disabled={sharing === 'twitter'}
              className="flex items-center justify-center px-4 py-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50"
            >
              {sharing === 'twitter' ? 'Sharing...' : '🐦 Twitter'}
            </button>
            
            <button
              onClick={() => handleShare('facebook')}
              disabled={sharing === 'facebook'}
              className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {sharing === 'facebook' ? 'Sharing...' : '📘 Facebook'}
            </button>
            
            <button
              onClick={() => handleShare('linkedin')}
              disabled={sharing === 'linkedin'}
              className="flex items-center justify-center px-4 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors disabled:opacity-50"
            >
              {sharing === 'linkedin' ? 'Sharing...' : '💼 LinkedIn'}
            </button>
            
            <button
              onClick={() => handleShare('telegram')}
              disabled={sharing === 'telegram'}
              className="flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {sharing === 'telegram' ? 'Sharing...' : '✈️ Telegram'}
            </button>
          </div>

          {/* Back Navigation */}
          <div className="mt-8 pt-6 border-t">
            <Link 
              href={league ? `/leagues/${league.id}` : '/leagues'}
              className="text-blue-600 hover:underline"
            >
              ← {league ? 'Back to League' : 'Back to Leagues'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export default components that can be used as pages
export default {
  ReferralDashboard,
  ShareComponent,
  api
};
