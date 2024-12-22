import "./globals.css"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import { PostHogProvider } from "@/app/providers/posthog-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hackathon Finder",
  description: "Discover upcoming hackathons from various platforms",
  authors: [
    {
      name: "Dev Shetty",
      url: "https://dev.shetty.me",
    },
  ],
  openGraph: {
    title: "Hackathon Finder",
    description: "Discover upcoming hackathons from various platforms",
    url: "https://hackathon-finder.vercel.app",
    siteName: "Hackathon Finder",
    images: [
      {
        url: "/og-image.png",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  )
}
