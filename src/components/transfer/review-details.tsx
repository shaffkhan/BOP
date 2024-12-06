"use client";

import { motion } from "framer-motion";
import type { TransferFormData } from "@/lib/types";

interface ReviewDetailsProps {
  formData: TransferFormData;
  onBack: () => void;
  onComplete: () => void;
}

export function ReviewDetails({
  formData,
  onBack,
  onComplete,
}: ReviewDetailsProps) {
  const accountNo = localStorage.getItem("accountNo");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Processing transfer:", formData);
    onComplete();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h2 className="text-lg font-medium mb-4">Review Transfer Details</h2>

        <div className="space-y-4">
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Transfer Type</span>
            <span className="font-medium">
              {formData.accountType === "raast" ? "Raast" : "IBFT"}
            </span>
          </div>

          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">From Account</span>
            <span className="font-medium">{accountNo}</span>
          </div>

          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">To Account</span>
            <span className="font-medium">{formData.accountNumber}</span>
          </div>

          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Amount</span>
            <span className="font-medium">Rs. {formData.amount}</span>
          </div>

          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Category</span>
            <span className="font-medium">{formData.category}</span>
          </div>

          {formData.comments && (
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Comments</span>
              <span className="font-medium">{formData.comments}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <motion.button
          type="button"
          onClick={onBack}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 bg-gray-100 text-gray-900 py-3 rounded-md hover:bg-gray-200 transition-colors"
        >
          BACK
        </motion.button>

        <motion.button
          onClick={handleSubmit}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 bg-[#FF6B35] text-white py-3 rounded-md hover:bg-[#FF6B35]/90 transition-colors"
        >
          CONFIRM TRANSFER
        </motion.button>
      </div>
    </div>
  );
}
