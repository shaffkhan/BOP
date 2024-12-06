"use client";

import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const banks = [
  "The Bank of Punjab",
  "Allied Bank",
  "HBL",
  "MCB",
  "UBL",
] as const;

export function AccountSelect({ formData, onUpdate, onNext }: any) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h2 className="text-lg font-medium mb-4">Select Account Type</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => onUpdate({ accountType: "raast" })}
            className={`p-4 rounded-lg border-2 text-center ${
              formData.accountType === "raast"
                ? "border-[#FF6B35]"
                : "border-gray-200"
            }`}
          >
            <Image
              src="/raast.jpg"
              alt="Raast"
              width={120}
              height={100}
              className="mx-auto mb-2"
            />
            <p className="text-sm text-gray-600">
              *It's instant and free of cost
            </p>
          </button>

          <button
            type="button"
            onClick={() => onUpdate({ accountType: "ibft" })}
            className={`p-4 rounded-lg border-2 text-center ${
              formData.accountType === "ibft"
                ? "border-[#FF6B35]"
                : "border-gray-200"
            }`}
          >
            <div className="h-[100px] flex items-center justify-center mb-2">
              <div className="text-[#FF6B35] text-4xl">→</div>
            </div>
            <h3 className="font-medium mb-1">
              Funds Transfer/IBFT/Credit Card
            </h3>
            <p className="text-sm text-gray-600">
              *Fee may apply (As per the schedules charges)
            </p>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm space-y-4">
        <div>
          <label
            htmlFor="bank-select"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select Bank
          </label>
          <Select
            value={formData.bankName}
            onValueChange={(value) => onUpdate({ bankName: value })}
          >
            <SelectTrigger id="bank-select">
              <SelectValue placeholder="Select a bank" />
            </SelectTrigger>
            <SelectContent>
              {banks.map((bank) => (
                <SelectItem key={bank} value={bank}>
                  {bank}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Account Number / IBAN
          </label>
          <input
            type="text"
            value={formData.accountNumber || ""}
            onChange={(e) => onUpdate({ accountNumber: e.target.value })}
            className="w-full p-2 border rounded-md"
            placeholder="Enter Account Number / IBAN"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            Please enter Bank of Punjab Account Number Enter the 17 or 16 Digit
            account number Layout as below XXXXXXXXXXXXXXXX XXXXXXXXXXXXXXX .
          </p>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-[#FF6B35] text-white py-3 rounded-md hover:bg-[#FF6B35]/90 transition-colors"
      >
        NEXT
      </button>
    </form>
  );
}
