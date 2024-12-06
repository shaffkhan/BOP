"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { AccountSelect } from "./account-select";
import { TransferDetails } from "./transfer-details";
import { ReviewDetails } from "./review-details";

const steps: any[] = ["account-select", "transfer-details", "review"];

export function TransferForm() {
  const [currentStep, setCurrentStep] = useState("account-select");
  const [formData, setFormData] = useState({});
  const router = useRouter();

  const updateFormData = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF5F2]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#8B2B03] to-[#FF6B35] text-white p-4">
        <div className="container mx-auto max-w-2xl flex items-center gap-4">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-medium">Transfer Funds</h1>
          <div className="flex-1" />
          <button
            onClick={() => router.push("/dashboard")}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <Home className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Form Content */}
      <main className="container mx-auto max-w-2xl p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {currentStep === "account-select" && (
              <AccountSelect
                formData={formData}
                onUpdate={updateFormData}
                onNext={handleNext}
              />
            )}
            {currentStep === "transfer-details" && (
              <TransferDetails
                formData={formData}
                onUpdate={updateFormData}
                onNext={handleNext}
              />
            )}
            {currentStep === "review" && (
              <ReviewDetails
                formData={formData}
                onBack={() => setCurrentStep("transfer-details")}
                onComplete={() => router.push("/dashboard")}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
