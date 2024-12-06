"use client";

import { useState } from "react";
import {  AnimatePresence  } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export type AccountDetails = {
  name: string;
  balance: number;
  iban: string;
  branch: string;
};

//@typescript-eslint/no-explicit-any
export function AccountCard({ account,acc }:any) {
  const [showBalance, setShowBalance] = useState(false);

  return (
    <div 
      
      className="space-y-4"
    >
      {/* Welcome Card */}
      <div
        className="bg-[#FF6B35] rounded-lg p-6 text-white"
     
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 bg-white/20 rounded-full" />
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
        </div>
      </div>

      {/* IBAN Card */}
      <div
        className="bg-gradient-to-r from-[#FF8B35] to-[#FF6B35] rounded-lg p-6 text-white"
       
      >
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>IBAN</span>
           
          </div>
          <p className="text-xl font-medium">{acc}</p>
          <p className="text-sm text-white/80">{account.branch}</p>
        </div>
      </div>
    </div>
  );
}

