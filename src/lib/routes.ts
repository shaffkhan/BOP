import { NextResponse } from "next/server";

export async function GET() {
  // This is a mock response. In a real application, you would fetch this data from your backend.
  const mockResponse = {
    success: true,
    user_name: "Abdul Rehman",
    target_month: "January",
    current_balance: 30,
    additional_expenses: [
      {
        category: "DHA Officers Club Fee ",
        expected_amount: 15000,
        usual_amount: 0,
        difference: 15000,
        last_occurrence: 2023,
      },
      {
        category: "winter school fee",
        expected_amount: 3000,
        usual_amount: 0,
        difference: 3000,
        last_occurrence: 2023,
      },
    ],
    total_additional_amount: 18000,
    can_handle_expenses: false,
    message:
      "Abdul Rehman, be aware there are additional payments expected in January:",
    expense_list:
      "• DHA Officers Club Fee : PKR 15,000.00\n• winter school fee: PKR 3,000.00",
    recommendation:
      "Total additional expenses round up to PKR 18,000.00. Please plan your budget accordingly.",
  };

  return NextResponse.json(mockResponse);
}
