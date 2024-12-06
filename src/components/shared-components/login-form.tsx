"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function LoginForm() {
  const [account_name, setUsername] = useState("");
  const [account_no, setacc_no] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ account_name, account_no }),
      });

      const data = await response.json();

      if (data.authenticated) {
        localStorage.setItem("userName", data.user_name);
        localStorage.setItem("accountNo", data.account_no);
        toast.success("Login successful!");
        router.push("/dashboard");
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          value={account_name}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6B35] focus:ring-[#FF6B35] bg-[#FFFBE6]"
          required
        />
      </div>
      <div>
        <label
          htmlFor="account_no"
          className="block text-sm font-medium text-gray-700"
        >
          Account Number
        </label>
        <input
          type="password"
          id="account_no"
          value={account_no}
          onChange={(e) => setacc_no(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6B35] focus:ring-[#FF6B35] bg-[#FFFBE6]"
          required
        />
        <div className="text-right mt-2">
          <a
            href="/forgot-password"
            className="text-[#FF6B35] hover:text-[#FF6B35]/90 text-sm"
          >
            Forgot Username or Password
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
        <button
          type="button"
          className="flex-1 rounded-md border border-[#FF6B35] bg-white px-4 py-2 text-sm font-medium text-[#FF6B35] hover:bg-[#FF6B35]/10 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-2"
        >
          SIGN UP
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 rounded-md border border-transparent bg-[#FF6B35] px-4 py-2 text-sm font-medium text-white hover:bg-[#FF6B35]/90 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "LOGIN"
          )}
        </button>
      </div>
    </form>
  );
}
