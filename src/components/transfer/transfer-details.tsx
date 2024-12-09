"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, AlertTriangle, X, Loader2 } from "lucide-react";
import type { RiskCheckResponse } from "@/lib/types";
import axios from "axios";

const categories = [
  "Transfer to Family & Friends",
  "Business Payment",
  "House Rent",
  "School Fees",
  "Ride hailing services",
  "Medical bills",
  "Food and Meal",
  "Club Fee",
  "Other Payment",
  "Other",
] as const;

interface TransferDetailsProps {
  formData: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
}

export function TransferDetails({
  formData,
  onUpdate,
  onNext,
}: TransferDetailsProps) {
  const [userAccount, setUserAccount] = useState<string>("");
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showInsufficientFundsModal, setShowInsufficientFundsModal] =
    useState(false);
  const [riskCheckResponse, setRiskCheckResponse] =
    useState<RiskCheckResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    const accountNo = localStorage.getItem("accountNo");
    if (userName && accountNo) {
      setUserAccount(`${userName} -CURRENT-${accountNo.slice(-4)}`);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const accountNo = localStorage.getItem("accountNo");
    if (!accountNo || !formData.category || !formData.amount) {
      setIsLoading(false);
      return;
    }

    try {
      let apiUrl =
        "https://bopar-304959215088.asia-south1.run.app/api/check-transaction-risk";

      if (formData.category === "Ride Hailing Services") {
        apiUrl =
          "https://bopar-304959215088.asia-south1.run.app/api/check-ride-hailing";
      } else if (formData.category === "Medical Expenses") {
        apiUrl =
          "https://bopar-304959215088.asia-south1.run.app/api/check-medical-expenses";
      } else if (formData.category === "Dine Out Services") {
        apiUrl =
          "https://bopar-304959215088.asia-south1.run.app/api/check-dine-out";
      }

      const response = await axios.post(apiUrl, {
        account_no: accountNo,
        transaction_type: formData.category,
        transaction_amount: formData.amount,
      });

      const data: RiskCheckResponse = response.data;
      setRiskCheckResponse(data);

      if (!data.success || !data.can_proceed) {
        if (data.remaining_balance === data.current_balance) {
          setShowInsufficientFundsModal(true);
        } else {
          setShowWarningModal(true);
        }
      } else {
        onNext();
      }
    } catch (error) {
      console.error("Error checking transaction risk:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg p-4 shadow-sm space-y-4">
          <div>
            <label
              htmlFor="pay-from-select"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Pay From
            </label>
            <Select
              value={userAccount}
              onValueChange={(value) => onUpdate({ payFrom: value })}
            >
              <SelectTrigger id="pay-from-select">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={userAccount}>{userAccount}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pay To
            </label>
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="text-[#FF6B35] font-medium">MUBASHIR AHMAD</p>
              <p className="text-gray-600">
                {formData.accountNumber?.slice(0, 8)}...
              </p>
              <p className="text-gray-600">Standard</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              value={formData.amount || ""}
              onChange={(e) => onUpdate({ amount: Number(e.target.value) })}
              className="w-full p-2 border rounded-md"
              placeholder="Enter amount"
              required
              min="1"
            />
          </div>

          <div>
            <label
              htmlFor="category-select"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Transaction Category
            </label>
            <Select
              value={formData.category}
              onValueChange={(value) => onUpdate({ category: value })}
            >
              <SelectTrigger id="category-select">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comments (optional)
            </label>
            <textarea
              value={formData.comments || ""}
              onChange={(e) => onUpdate({ comments: e.target.value })}
              className="w-full p-2 border rounded-md"
              placeholder="Add Comments"
              rows={3}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#FF6B35] text-white py-3 rounded-md hover:bg-[#FF6B35]/90 transition-colors flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "REVIEW DETAILS"
          )}
        </button>
      </form>

      <AnimatePresence>
        {(showWarningModal || showInsufficientFundsModal) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {showInsufficientFundsModal
                    ? "Insufficient Funds"
                    : "Transaction Warning"}
                </h2>
                <button
                  onClick={() => {
                    setShowWarningModal(false);
                    setShowInsufficientFundsModal(false);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="text-center">
                {showInsufficientFundsModal ? (
                  <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                ) : (
                  <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
                )}
                <p className="text-lg font-semibold mb-2">
                  {riskCheckResponse?.warning_message}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {riskCheckResponse?.message}
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => {
                      setShowWarningModal(false);
                      setShowInsufficientFundsModal(false);
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Review
                  </button>
                  {!showInsufficientFundsModal && (
                    <button
                      onClick={onNext}
                      className="px-4 py-2 bg-[#FF6B35] text-white rounded-md hover:bg-[#FF6B35]/90 transition-colors"
                    >
                      Proceed Anyway
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
