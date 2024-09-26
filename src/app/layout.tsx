import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/provider/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import ProgressBar from "@/util/ProgressBar";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
// import '@uploadcare/react-widget/dist/uploadcare.min.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_HOST || "https://write-flow-git-main-vishal-kumar-3.vercel.app/"),
  title: "Write Flow",
  description: "Home Page For Write Flow",
  openGraph: {
    title: "Write Flow",
    description: "Home Page For Write Flow",
    url: new URL(process.env.NEXT_PUBLIC_HOST || "https://write-flow-git-main-vishal-kumar-3.vercel.app/"),
    type: 'website',
    images: [
      {
        url: "/HomePage.jpg",
        width: 1200,
        height: 630,
        alt: "Write Flow",
      },
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/favicon.svg"
          type="image/svg"
          sizes="svg"
        />
      </head>
      <body className={`${inter.className} mb-16 md:mb-0`}>
        <ProgressBar />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
