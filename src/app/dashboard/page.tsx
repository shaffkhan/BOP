"use client";

import { useEffect, useState } from "react";
import { AccountCard } from "@/components/shared-components/account-card";
import { FeatureGrid } from "@/components/shared-components/feature-grid";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function DashboardPage() {
  const [account, setAccount] = useState({
    name: "",
    balance: 0,
    iban: "PK36BPUN1234567890123",
    branch: "Xeven Solutions LLC",
  });
  const [isLoading, setIsLoading] = useState(true);
const [acc,setAcc]= useState('')
  useEffect(() => {
    const fetchBalance = async () => {
      const accountNo = localStorage.getItem("accountNo");
      const userName = localStorage.getItem("userName");
      setAcc(accountNo as string)

      if (!accountNo || !userName) {
        toast.error("User information not found. Please login again.");
        // Redirect to login page or handle this case as needed
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/api/balance", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ account_no: accountNo }),
        });

        const data = await response.json();

        if (data.success) {
          setAccount((prevAccount) => ({
            ...prevAccount,
            name: userName,
            balance: data.balance,
          }));
          localStorage.setItem("balance", data.balance.toString());
        } else {
          toast.error("Failed to fetch balance. Please try again.");
        }
      } catch (error) {
        toast.error("An error occurred while fetching balance.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#8B2B03] to-[#FF6B35] flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#8B2B03] to-[#FF6B35]">
      <div className="container mx-auto max-w-4xl px-4 py-6">
        {/* Header */}
        <header className="flex items-center justify-center mb-6">
          <img
            src="https://www.bop.com.pk/images/DigiBOP_Whiteorange.png"
            alt="digiBOP"
            className="h-12"
          />
          <div className="w-6" /> 
        </header>

        {/* Account Card */}
        <AccountCard account={account} acc={acc}/>

        {/* Features Grid */}
        <FeatureGrid />
      </div>
    </div>
  );
}


