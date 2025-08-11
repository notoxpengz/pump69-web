"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// Stub API functions
const api = {
  createSubscription: async (planId: string) => {
    // Stub API call - replace with actual payment integration
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      success: true,
      subscriptionId: `sub_${Date.now()}`,
      redirectUrl: '/dashboard?upgraded=true'
    };
  }
};

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'month',
    features: [
      'Join public leagues',
      'Basic leaderboards',
      'Standard support',
      '5 trades per day limit'
    ],
    buttonText: 'Current Plan'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    period: 'month',
    popular: true,
    features: [
      'Join all leagues',
      'Advanced analytics',
      'Priority support',
      'Unlimited trades',
      'Custom strategies',
      'Performance insights'
    ],
    buttonText: 'Upgrade to Pro'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 99,
    period: 'month',
    features: [
      'Everything in Pro',
      'Exclusive VIP leagues',
      'Personal trading coach',
      'Advanced AI insights',
      'Portfolio optimization',
      'White-label features',
      '24/7 dedicated support'
    ],
    buttonText: 'Go Premium'
  }
];

export default function PremiumPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSubscription = async (planId: string) => {
    if (planId === 'free') return;
    
    setLoading(planId);
    try {
      const result = await api.createSubscription(planId);
      if (result.success) {
        // In a real app, you would redirect to payment processor
        alert(`Success! Subscription created: ${result.subscriptionId}`);
        window.location.href = result.redirectUrl;
      }
    } catch (error) {
      console.error('Failed to create subscription:', error);
      alert('Failed to create subscription. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/leagues" 
              className="text-blue-600 hover:underline flex items-center"
            >
              ← Back to Leagues
            </Link>
            <div className="text-sm text-gray-600">
              Questions? <Link href="/support" className="text-blue-600 hover:underline">Contact Support</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Unlock Your Trading Potential
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of traders who have elevated their game with premium features, 
            exclusive leagues, and advanced analytics.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg p-8 border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular
                  ? 'border-purple-500 transform scale-105'
                  : selectedPlan === plan.id
                  ? 'border-blue-500'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscription(plan.id)}
                disabled={loading === plan.id || plan.id === 'free'}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
                  plan.id === 'free'
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : plan.popular
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transform hover:scale-105'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } ${loading === plan.id ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {loading === plan.id ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  plan.buttonText
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Why Choose Premium?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced Analytics</h3>
              <p className="text-gray-600">Get detailed insights into your trading performance with advanced charts and metrics.</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Exclusive Leagues</h3>
              <p className="text-gray-600">Access VIP-only trading competitions with higher prizes and elite traders.</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Insights</h3>
              <p className="text-gray-600">Leverage cutting-edge AI to optimize your trading strategies and maximize returns.</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">What Our Premium Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4 italic">"Premium features helped me increase my trading performance by 340% in just 3 months!"</p>
              <p className="font-semibold text-gray-900">- Sarah Chen, Pro Trader</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4 italic">"The exclusive leagues and AI insights are game-changers. Worth every penny!"</p>
              <p className="font-semibold text-gray-900">- Marcus Rodriguez, Hedge Fund Manager</p>
            </div>
          </div>
        </div>

        {/* Money-back guarantee */}
        <div className="text-center mt-12 p-6 bg-green-50 rounded-lg">
          <h3 className="text-xl font-semibold text-green-800 mb-2">30-Day Money-Back Guarantee</h3>
          <p className="text-green-600">Not satisfied? Get a full refund within 30 days, no questions asked.</p>
        </div>
      </div>
    </div>
  );
}
