"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Stub API functions
const api = {
  fetchLeagues: async () => {
    // Stub data - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
      { id: '1', name: 'Premier Trading League', participants: 156, prize: '$10,000', status: 'Active' },
      { id: '2', name: 'Crypto Champions', participants: 89, prize: '$5,000', status: 'Active' },
      { id: '3', name: 'DeFi Masters', participants: 234, prize: '$15,000', status: 'Starting Soon' },
      { id: '4', name: 'Token Titans', participants: 67, prize: '$7,500', status: 'Ended' },
    ];
  }
};

interface League {
  id: string;
  name: string;
  participants: number;
  prize: string;
  status: string;
}

export default function LeaguesPage() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const loadLeagues = async () => {
      try {
        const data = await api.fetchLeagues();
        setLeagues(data);
      } catch (error) {
        console.error('Failed to load leagues:', error);
      } finally {
        setLoading(false);
      }
    };
    loadLeagues();
  }, []);

  const filteredLeagues = leagues.filter(league => {
    if (filter === 'all') return true;
    return league.status.toLowerCase().includes(filter.toLowerCase());
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'starting soon': return 'bg-yellow-100 text-yellow-800';
      case 'ended': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading leagues...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Trading Leagues</h1>
            <p className="text-gray-600 mt-2">Join competitive trading leagues and showcase your skills</p>
          </div>
          <Link 
            href="/premium" 
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Go Premium
          </Link>
        </div>

        {/* Filter buttons */}
        <div className="flex space-x-4 mb-6">
          {['all', 'active', 'starting soon', 'ended'].map(filterOption => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                filter === filterOption
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {filterOption}
            </button>
          ))}
        </div>

        {/* Leagues grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLeagues.map((league) => (
            <div key={league.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{league.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(league.status)}`}>
                  {league.status}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Participants</span>
                  <span className="font-semibold">{league.participants}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Prize Pool</span>
                  <span className="font-semibold text-green-600">{league.prize}</span>
                </div>
              </div>

              <Link 
                href={`/leagues/${league.id}`}
                className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors block text-center"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

        {filteredLeagues.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No leagues found for the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
