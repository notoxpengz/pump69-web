"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Stub API functions
const api = {
  fetchLeagueDetail: async (id: string) => {
    // Stub data - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      id,
      name: 'Premier Trading League',
      description: 'The ultimate trading competition for experienced traders. Compete with the best and win amazing prizes!',
      participants: 156,
      prize: '$10,000',
      status: 'Active',
      startDate: '2025-08-01',
      endDate: '2025-09-01',
      rules: [
        'Minimum trade amount: $100',
        'Maximum leverage: 10x',
        'No wash trading allowed',
        'Real-time position tracking',
      ],
      leaderboard: [
        { rank: 1, user: 'CryptoMaster', pnl: '+$2,450', trades: 45 },
        { rank: 2, user: 'TokenTrader', pnl: '+$1,890', trades: 32 },
        { rank: 3, user: 'DeFiPro', pnl: '+$1,650', trades: 28 },
        { rank: 4, user: 'ChartWiz', pnl: '+$1,234', trades: 41 },
        { rank: 5, user: 'BullRun', pnl: '+$989', trades: 19 },
      ]
    };
  },
  joinLeague: async (id: string) => {
    // Stub API call - replace with actual implementation
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: 'Successfully joined the league!' };
  }
};

interface LeagueDetail {
  id: string;
  name: string;
  description: string;
  participants: number;
  prize: string;
  status: string;
  startDate: string;
  endDate: string;
  rules: string[];
  leaderboard: Array<{
    rank: number;
    user: string;
    pnl: string;
    trades: number;
  }>;
}

export default function LeagueDetailPage() {
  const params = useParams();
  const leagueId = params.id as string;
  
  const [league, setLeague] = useState<LeagueDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const loadLeague = async () => {
      try {
        const data = await api.fetchLeagueDetail(leagueId);
        setLeague(data);
      } catch (error) {
        console.error('Failed to load league:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (leagueId) {
      loadLeague();
    }
  }, [leagueId]);

  const handleJoinLeague = async () => {
    setJoining(true);
    try {
      const result = await api.joinLeague(leagueId);
      if (result.success) {
        setJoined(true);
        alert(result.message);
      }
    } catch (error) {
      console.error('Failed to join league:', error);
      alert('Failed to join league. Please try again.');
    } finally {
      setJoining(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'starting soon': return 'bg-yellow-100 text-yellow-800';
      case 'ended': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPnlColor = (pnl: string) => {
    return pnl.startsWith('+') ? 'text-green-600' : 'text-red-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading league details...</div>
      </div>
    );
  }

  if (!league) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">League Not Found</h1>
          <Link href="/leagues" className="text-blue-600 hover:underline">
            Back to Leagues
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/leagues" 
            className="text-blue-600 hover:underline mb-4 inline-block"
          >
            ← Back to Leagues
          </Link>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{league.name}</h1>
              <p className="text-gray-600 mt-2 max-w-3xl">{league.description}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(league.status)}`}>
              {league.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* League Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">League Information</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{league.participants}</div>
                  <div className="text-sm text-gray-600">Participants</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{league.prize}</div>
                  <div className="text-sm text-gray-600">Prize Pool</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{league.startDate}</div>
                  <div className="text-sm text-gray-600">Start Date</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{league.endDate}</div>
                  <div className="text-sm text-gray-600">End Date</div>
                </div>
              </div>
            </div>

            {/* Rules */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">League Rules</h2>
              <ul className="space-y-2">
                {league.rules.map((rule, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Leaderboard */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Rank</th>
                      <th className="text-left py-2">Trader</th>
                      <th className="text-left py-2">P&L</th>
                      <th className="text-left py-2">Trades</th>
                    </tr>
                  </thead>
                  <tbody>
                    {league.leaderboard.map((entry) => (
                      <tr key={entry.rank} className="border-b hover:bg-gray-50">
                        <td className="py-3">
                          <div className="flex items-center">
                            {entry.rank <= 3 && (
                              <span className="mr-2">
                                {entry.rank === 1 && '🥇'}
                                {entry.rank === 2 && '🥈'}
                                {entry.rank === 3 && '🥉'}
                              </span>
                            )}
                            #{entry.rank}
                          </div>
                        </td>
                        <td className="py-3 font-medium">{entry.user}</td>
                        <td className={`py-3 font-semibold ${getPnlColor(entry.pnl)}`}>
                          {entry.pnl}
                        </td>
                        <td className="py-3">{entry.trades}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Join League */}
            <div className="bg-white rounded-lg shadow-md p-6">
              {!joined ? (
                <button
                  onClick={handleJoinLeague}
                  disabled={joining || league.status === 'Ended'}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                    league.status === 'Ended'
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : joining
                      ? 'bg-blue-400 text-white cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {joining ? 'Joining...' : 
                   league.status === 'Ended' ? 'League Ended' : 'Join League'}
                </button>
              ) : (
                <div className="text-center">
                  <div className="text-green-600 font-semibold mb-2">✅ Joined!</div>
                  <p className="text-sm text-gray-600">You're now participating in this league</p>
                </div>
              )}
            </div>

            {/* Share League */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-3">Share League</h3>
              <Link 
                href={`/share?league=${league.id}`}
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors block text-center"
              >
                Share with Friends
              </Link>
            </div>

            {/* Premium Upgrade */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-md p-6 text-white">
              <h3 className="font-semibold mb-2">Go Premium</h3>
              <p className="text-sm mb-4 opacity-90">
                Unlock advanced features and exclusive leagues
              </p>
              <Link 
                href="/premium"
                className="bg-white text-purple-600 py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors block text-center"
              >
                Upgrade Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
