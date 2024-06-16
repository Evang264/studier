import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Header from "@/app/components/Header";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedContent from "../components/ProtectedContent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Studier",
  description: "A central place to seek tutors and tutor others",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ProtectedContent>
            <Header />
            {children}
          </ProtectedContent>
        </AuthProvider>
      </body>
    </html>
  );
}
