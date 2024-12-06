"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function TransferModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    recipientIBAN: "",
    amount: 0,
    purpose: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the transfer logic
    console.log("Transfer:", formData);
    // Show success message
    alert("Transfer successful!");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg w-full max-w-md p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Funds Transfer</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipient IBAN
                </label>
                <input
                  type="text"
                  value={formData.recipientIBAN}
                  onChange={(e) =>
                    setFormData({ ...formData, recipientIBAN: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  required
                  pattern="^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$"
                  placeholder="e.g., PK36BPUN1234567890123"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (Rs.)
                </label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: Number(e.target.value) })
                  }
                  className="w-full p-2 border rounded-md"
                  required
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Purpose
                </label>
                <textarea
                  value={formData.purpose}
                  onChange={(e) =>
                    setFormData({ ...formData, purpose: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  required
                  rows={3}
                />
              </div>

              <button
                className="w-full bg-[#FF6B35] text-white py-2 rounded-md hover:bg-[#FF6B35]/90 transition-colors"
                type="submit"
              >
                Transfer Funds
              </button>
            </form>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
