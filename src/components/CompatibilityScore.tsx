
import React from 'react';
import { Target, TrendingUp, AlertTriangle } from 'lucide-react';

interface CompatibilityScoreProps {
  score: number;
  showTooltip?: boolean;
}

const CompatibilityScore: React.FC<CompatibilityScoreProps> = ({ score, showTooltip = true }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return { 
      color: 'text-green-600', 
      bg: 'from-green-400 to-green-600',
      icon: TrendingUp,
      label: 'Excellent Match'
    };
    if (score >= 50) return { 
      color: 'text-yellow-600', 
      bg: 'from-yellow-400 to-orange-500',
      icon: Target,
      label: 'Good Match'
    };
    return { 
      color: 'text-red-600', 
      bg: 'from-red-400 to-red-600',
      icon: AlertTriangle,
      label: 'Poor Match'
    };
  };

  const scoreData = getScoreColor(score);
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative group">
      <div className="w-32 h-32 mx-auto relative">
        {/* Background circle */}
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="url(#scoreGradient)"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-in-out"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" className={`${scoreData.bg.split(' ')[0].replace('from-', 'stop-')}`} />
              <stop offset="100%" className={`${scoreData.bg.split(' ')[2].replace('to-', 'stop-')}`} />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`text-3xl font-bold ${scoreData.color} mb-1`}>
            {score}
          </div>
          <div className="text-xs text-gray-500 font-medium">out of 100</div>
          <scoreData.icon className={`w-5 h-5 mt-1 ${scoreData.color}`} />
        </div>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
            <div className="font-medium">{scoreData.label}</div>
            <div className="text-gray-300 mt-1">
              Based on your profile match with tender requirements
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompatibilityScore;
