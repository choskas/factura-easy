import NavBar from "@/components/commons/NavBar";
import localFont from "@next/font/local";
import "./globals.css";
import "./fonts.css";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { useTheme } from "next-themes";
import { Inter } from "next/font/google";
import ToasterComponent from "./ui/Toaster";
import Footer from "@/components/commons/Footer";
import { NextAuthProvider } from "@/components/theme-provider/NextAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Factureasy",
  description: "Factureasys",
};

const bitterSemibold = localFont({
  src: [
    {
      path: "../../public/fonts/Bitter-SemiBold.woff",
    },
  ],
  variable: "--bitter-semibold",
});
const ralewayMedium = localFont({
  src: [
    {
      path: "../../public/fonts/Raleway-Medium.woff",
    },
  ],
  variable: "--raleway-medium",
});
const ralewayRegular = localFont({
  src: [
    {
      path: "../../public/fonts/Raleway-Regular.woff",
    },
  ],
  variable: "--raleway-regular",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bitterSemibold.variable} ${ralewayMedium.variable} ${ralewayRegular.variable}`}
    >
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextAuthProvider>
            <NavBar />
            <section className="overflow-y-auto pt-[64px]">{children}</section>
            <Footer />
            <ToasterComponent />
          </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
