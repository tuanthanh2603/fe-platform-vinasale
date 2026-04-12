import type { Metadata } from "next";
import localFont from "next/font/local";
import { ConfigProvider } from "antd";
import "./globals.css";
import ToastProvider from "@/components/providers/ToastProvider";
import { AuthProvider } from "@/context/AuthContext";

const sfProRounded = localFont({
  variable: "--font-sf-pro-rounded",
  src: [
    { path: "../public/fonts/SF-Pro-Rounded/SF-Pro-Rounded-Thin.otf", weight: "100", style: "normal" },
    { path: "../public/fonts/SF-Pro-Rounded/SF-Pro-Rounded-Ultralight.otf", weight: "200", style: "normal" },
    { path: "../public/fonts/SF-Pro-Rounded/SF-Pro-Rounded-Light.otf", weight: "300", style: "normal" },
    { path: "../public/fonts/SF-Pro-Rounded/SF-Pro-Rounded-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/SF-Pro-Rounded/SF-Pro-Rounded-Medium.otf", weight: "500", style: "normal" },
    { path: "../public/fonts/SF-Pro-Rounded/SF-Pro-Rounded-Semibold.otf", weight: "600", style: "normal" },
    { path: "../public/fonts/SF-Pro-Rounded/SF-Pro-Rounded-Bold.otf", weight: "700", style: "normal" },
    { path: "../public/fonts/SF-Pro-Rounded/SF-Pro-Rounded-Heavy.otf", weight: "800", style: "normal" },
    { path: "../public/fonts/SF-Pro-Rounded/SF-Pro-Rounded-Black.otf", weight: "900", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "VinaSale - Phần mềm quản lý bán hàng",
  description: "Phần mềm quản lý bán hàng",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${sfProRounded.className} ${sfProRounded.variable} antialiased`}
      >
        <ConfigProvider
          theme={{
            token: {
              fontFamily:
                "var(--font-sf-pro-rounded), Arial, Helvetica, sans-serif",
            },
          }}
        >
          <AuthProvider>
            {children}
          </AuthProvider>
          <ToastProvider />
        </ConfigProvider>
      </body>
    </html>
  );
}