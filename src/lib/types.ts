
export interface RiskCheckResponse {
  success: boolean;
  user_name: string;
  current_balance: number;
  transaction_amount: number;
  remaining_balance: number;
  unusual_transaction: boolean;
  warning_message: string;
  pending_payments: Array<{
    category: string;
    amount: number;
    due_date: string;
  }>;
  total_pending_amount: number;
  can_proceed: boolean;
  message: string;
}
