import { motion } from "framer-motion";
import { X } from "lucide-react";

interface UpcomingPaymentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    success: boolean;
    user_name: string;
    target_month: string;
    current_balance: number;
    additional_expenses: Array<{
      category: string;
      expected_amount: number;
      usual_amount: number;
      difference: number;
      last_occurrence: number;
    }>;
    total_additional_amount: number;
    can_handle_expenses: boolean;
    message: string;
    expense_list: string;
    recommendation: string;
  };
}

export function UpcomingPaymentsModal({
  isOpen,
  onClose,
  data,
}: UpcomingPaymentsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#FF6B35]">
            Upcoming Payments
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <p className="text-sm text-gray-700">{data.message}</p>
          <div className="bg-[#FFF5F2] p-3 rounded-md">
            <h4 className="font-medium mb-2 text-[#FF6B35]">Expense List:</h4>
            <pre className="text-sm whitespace-pre-wrap text-gray-700">
              {data.expense_list}
            </pre>
          </div>
          <p className="text-sm text-gray-700">{data.recommendation}</p>
          <div className="bg-[#FFF5F2] p-3 rounded-md">
            <h4 className="font-medium mb-2 text-[#FF6B35]">
              Additional Details:
            </h4>
            <p className="text-sm text-gray-700">
              Current Balance: PKR {data.current_balance.toLocaleString()}
            </p>
            <p className="text-sm text-gray-700">
              Total Additional Amount: PKR{" "}
              {data.total_additional_amount.toLocaleString()}
            </p>
            <p className="text-sm text-gray-700">
              Can Handle Expenses: {data.can_handle_expenses ? "Yes" : "No"}
            </p>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#FF6B35] text-white rounded-md hover:bg-[#FF6B35]/90 transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
