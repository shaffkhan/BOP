"use client";

import { useState, useEffect } from "react";
import {  AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AlertCircle, AlertTriangle } from "lucide-react";
import type { RiskCheckResponse } from "@/lib/types";

const categories = [
  "Transfer to Family & Friends",
  "Business Payment",
  "House Rent",
  "School Fees",
  "Ride Hailing Services",
  "Other Payment",
  "Club Fee",
  "medical bills",
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

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    const accountNo = localStorage.getItem("accountNo");
    if (userName && accountNo) {
      setUserAccount(`${userName} -CURRENT-${accountNo.slice(-4)}`);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const accountNo = localStorage.getItem("accountNo");
    if (!accountNo || !formData.category || !formData.amount) return;

    try {
      const response = await fetch(
        "http://localhost:8000/api/check-transaction-risk",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            account_no: accountNo,
            transaction_type: formData.category,
            transaction_amount: formData.amount,
          }),
        }
      );

      const data: RiskCheckResponse = await response.json();
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
              value={formData.payFrom}
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
          className="w-full bg-[#FF6B35] text-white py-3 rounded-md hover:bg-[#FF6B35]/90 transition-colors"
        >
          REVIEW DETAILS
        </button>
      </form>

      <AnimatePresence>
        {showWarningModal && (
          <Dialog open={showWarningModal} onOpenChange={setShowWarningModal}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-center">
                  Transaction Warning
                </DialogTitle>
              </DialogHeader>
              <div className="mt-4 text-center">
                <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
                <DialogDescription className="text-lg font-semibold mb-2">
                  {riskCheckResponse?.warning_message}
                </DialogDescription>
                <p className="text-sm text-gray-500 mb-4">
                  {riskCheckResponse?.message}
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setShowWarningModal(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                  >
                    Review
                  </button>
                  <button
                    onClick={onNext}
                    className="px-4 py-2 bg-[#FF6B35] text-white rounded-md"
                  >
                    Proceed Anyway
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {showInsufficientFundsModal && (
          <Dialog
            open={showInsufficientFundsModal}
            onOpenChange={setShowInsufficientFundsModal}
          >
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-center">
                  Insufficient Funds
                </DialogTitle>
              </DialogHeader>
              <div className="mt-4 text-center">
                <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                <DialogDescription className="text-lg font-semibold mb-2">
                  {riskCheckResponse?.warning_message}
                </DialogDescription>
                <p className="text-sm text-gray-500 mb-4">
                  {riskCheckResponse?.message}
                </p>
                <button
                  onClick={() => setShowInsufficientFundsModal(false)}
                  className="px-4 py-2 bg-[#FF6B35] text-white rounded-md"
                >
                  Review Transaction
                </button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}
