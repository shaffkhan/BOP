"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

interface CreditCardRecommendation {
  success: boolean;
  user_name: string;
  current_balance: number;
  balance_date: string;
  show_recommendation: boolean;
  message: string;
}

interface AccountCardProps {
  account: any;
  acc: string;
  creditCardRecommendation: CreditCardRecommendation | null;
}

export function AccountCard({
  account,
  acc,
  creditCardRecommendation,
}: AccountCardProps) {
  const [showBalance, setShowBalance] = useState(false);

  return (
    <div className="space-y-4">
      {/* Welcome Card */}
      <div className="bg-[#FF6B35] rounded-lg p-6 text-white">
        <div className="flex items-center gap-2 mb-4">
          {/* <div className="h-8 w-8 bg-white/20 rounded-full" /> */}
          <h1 className="text-xl font-medium">Welcome, {account.name}</h1>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-white/80">View total balance</span>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              {showBalance ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          <AnimatePresence mode="wait">
            <div
              key={showBalance ? "balance" : "hidden"}
              className="text-2xl font-bold"
            >
              {showBalance
                ? `Rs. ${account.balance.toLocaleString()}`
                : "XXXXXXXXXX"}
            </div>
          </AnimatePresence>
          {creditCardRecommendation &&
            creditCardRecommendation.show_recommendation && (
              <div className="mt-4 p-3 bg-white/10 rounded-md text-sm">
                {creditCardRecommendation.message}
              </div>
            )}
        </div>
      </div>

      {/* IBAN Card */}
      <div className="bg-gradient-to-r from-[#FF8B35] to-[#FF6B35] rounded-lg p-6 text-white">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>IBAN</span>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              {/* <QRIcon className="h-5 w-5" /> */}
            </button>
          </div>
          <p className="text-xl font-medium">{account.iban}</p>
          <p className="text-sm text-white/80">{account.branch}</p>
        </div>
      </div>
    </div>
  );
}

function QRIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v1m6 11h2m-6 0h-2v4m0-11v-4m6 0h2m-6 0h-2m0 0H8m13 0h1m-1 0h-2M9 7v4m8-4v4m-8 0h2m6-4h2"
      />
    </svg>
  );
}
