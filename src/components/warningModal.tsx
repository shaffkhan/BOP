import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  apiResponse: any;
  isInsufficientFunds: boolean;
}

export const WarningModal: React.FC<WarningModalProps> = ({
  isOpen,
  onClose,
  onProceed,
  apiResponse,
  isInsufficientFunds,
}) => {
  if (!isOpen || !apiResponse) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 300 }}
      >
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
            <CardTitle className="text-center text-xl font-semibold">
              {apiResponse.warning_message || "Warning"}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            {isInsufficientFunds ? (
              <AlertCircle className="mx-auto h-12 w-12 text-yellow-500" />
            ) : (
              <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500" />
            )}
            <p className="text-gray-600">{apiResponse.message}</p>
            {apiResponse.recommendation && (
              <p className="text-blue-600 font-medium">
                Recommendation: {apiResponse.recommendation}
              </p>
            )}
            {apiResponse.current_balance !== undefined && (
              <div className="bg-gray-100 p-3 rounded-md">
                <p className="text-sm text-gray-600">
                  Current Balance:{" "}
                  <span className="font-semibold">
                    PKR {apiResponse.current_balance.toLocaleString()}
                  </span>
                </p>
                {apiResponse.remaining_balance !== undefined && (
                  <p className="text-sm text-gray-600 mt-1">
                    Remaining Balance:{" "}
                    <span className="font-semibold">
                      PKR {apiResponse.remaining_balance.toLocaleString()}
                    </span>
                  </p>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              onClick={onProceed}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Proceed Anyway
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};
