"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface ReviewDetailsProps {
  formData: any;
  onBack: () => void;
  onComplete: () => void;
}

export function ReviewDetails({
  formData,
  onBack,
  onComplete,
}: ReviewDetailsProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();
  const accountNo = localStorage.getItem("accountNo");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);

      // Simulate showing success message before redirecting
      setTimeout(() => {
        onComplete();
        router.push("/dashboard");
      }, 1500);
    }, 2000);
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
        <button
          type="button"
          onClick={onBack}
          className="flex-1 bg-gray-100 text-gray-900 py-3 rounded-md hover:bg-gray-200 transition-colors"
          disabled={isProcessing || showSuccess}
        >
          BACK
        </button>

        <button
          onClick={handleSubmit}
          className="flex-1 bg-[#FF6B35] text-white py-3 rounded-md hover:bg-[#FF6B35]/90 transition-colors flex items-center justify-center"
          disabled={isProcessing || showSuccess}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : showSuccess ? (
            "Transfer Successful!"
          ) : (
            "CONFIRM TRANSFER"
          )}
        </button>
      </div>

      {showSuccess && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
          <p className="text-center font-medium">
            Your transfer has been processed successfully. You will be
            redirected to the dashboard shortly.
          </p>
        </div>
      )}
    </div>
  );
}
