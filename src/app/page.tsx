import { HackathonList } from "@/components/hackathon-list"
import {
  fetchDevpostHackathons,
  fetchUnstopHackathons,
} from "@/services/hackathons"
import { Github } from "lucide-react"
import Link from "next/link"

const PAGE_SIZE = 6

export default async function Home() {
  const [devpostHackathons, unstopHackathons] = await Promise.all([
    Promise.all(
      Array.from({ length: PAGE_SIZE }, (_, i) => fetchDevpostHackathons(i + 1))
    ).then((results) => results.flat()),
    Promise.all(
      Array.from({ length: PAGE_SIZE }, (_, i) => fetchUnstopHackathons(i + 1))
    ).then((results) => results.flat()),
  ])

  const allHackathons = [...devpostHackathons, ...unstopHackathons].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  )

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
      <HackathonList hackathons={allHackathons} />
    </main>
  )
}
