import { HackathonList } from "@/components/hackathon-list"
import { Github } from "lucide-react"
import Link from "next/link"

async function fetchHackathons() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/hackathons`,
      {
        cache: "force-cache",
        next: {
          tags: ["hackathons"],
          revalidate: 60 * 60,
        },
      }
    )
    return await response.json()
  } catch (error) {
    console.error("Failed to fetch hackathons:", error)
    return { hackathons: [] }
  }
}

export default async function Home() {
  const { hackathons } = await fetchHackathons()

  if (!hackathons) {
    return <div>No hackathons found</div>
  }

  return (
    <main className="container mx-auto py-8 px-2 relative">
      <Link
        href="https://github.com/dev-shetty/hackathon-finder"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute md:top-8 md:right-8 top-4 right-4 outline outline-gray-500 outline-1 rounded-full p-1"
      >
        <Github className="w-6 h-6 text-gray-500 hover:text-gray-700" />
      </Link>
      <h1 className="text-4xl font-bold mb-8 text-center">
        Upcoming Hackathons
      </h1>
      <HackathonList hackathons={hackathons} />
    </main>
  )
}
