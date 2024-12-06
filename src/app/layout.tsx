import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";



export const metadata: Metadata = {
  title: "digiBOP",
  description: "Created by XEVEN SOLUTIONS LLC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <Toaster position="top-center" richColors />
        {children}
      </body>
    </html>
  );
}
