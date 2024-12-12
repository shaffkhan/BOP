"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from 'lucide-react';
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WarningModal } from "../warningModal";



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
  const [apiResponse, setApiResponse] = useState<any>(null);
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

      if (formData.category === "Ride hailing services") {
        apiUrl =
          "https://bopar-304959215088.asia-south1.run.app/api/check-ride-hailing";
      } else if (formData.category === "Medical bills") {
        apiUrl =
          "https://bopar-304959215088.asia-south1.run.app/api/check-medical-expenses";
      } else if (formData.category === "Food and Meal") {
        apiUrl =
          "https://bopar-304959215088.asia-south1.run.app/api/check-dine-out";
      }

      const response = await axios.post(apiUrl, {
        account_no: accountNo,
        transaction_type: formData.category,
        transaction_amount: formData.amount,
      });

      const data = response.data;
      setApiResponse(data);

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
      console.error("Error checking transaction:", error);
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
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Transfer Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="pay-from-select" className="block text-sm font-medium text-gray-700 mb-1">
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
                <Input
                  type="number"
                  value={formData.amount || ""}
                  onChange={(e) => onUpdate({ amount: Number(e.target.value) })}
                  placeholder="Enter amount"
                  required
                  min="1"
                />
              </div>

              <div>
                <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-1">
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
                <Textarea
                  value={formData.comments || ""}
                  onChange={(e) => onUpdate({ comments: e.target.value })}
                  placeholder="Add Comments"
                  rows={3}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"
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
            </Button>
          </form>
        </CardContent>
      </Card>

      <WarningModal
        isOpen={showWarningModal || showInsufficientFundsModal}
        onClose={() => {
          setShowWarningModal(false);
          setShowInsufficientFundsModal(false);
        }}
        onProceed={onNext}
        apiResponse={apiResponse}
        isInsufficientFunds={showInsufficientFundsModal}
      />
    </>
  );
}

