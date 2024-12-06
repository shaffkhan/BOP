"use client";

import { LoginForm } from "@/components/shared-components/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FF6B35] to-[#FF8B35] pb-16">
      <div className="mx-auto max-w-md px-4 py-8">
        <div className="overflow-hidden rounded-lg bg-white shadow-xl">
          <div className="px-4 py-6">
            {/* Logo */}
            <div className="mb-8 text-center bg-[#7d7b7a]">
              <Image
                src="/bop.png"
                alt="digiBOP Logo"
                width={200}
                height={60}
                className="mx-auto"
                priority
              />
            </div>

            {/* Login Form */}
            <LoginForm />

            {/* Roshan Digital Account Section */}
            <div className="mt-8 pt-6 border-t text-center">
              <div className="flex items-center justify-center space-x-2">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/en/3/38/RDA_Logo.png?20210518081137"
                  alt="Roshan Digital Account"
                  width={55}
                  height={55}
                  className="object-cover"
                />
                <p className="text-sm text-gray-600">
                  To open BOP Roshan Digital Account please{" "}
                  <a
                    href="/roshan-account"
                    className="text-[#FF6B35] hover:underline"
                  >
                    Click Here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
