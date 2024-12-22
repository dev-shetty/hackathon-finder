import { HackathonList } from "@/components/hackathon-list"
import {
  fetchDevpostHackathons,
  fetchUnstopHackathons,
} from "@/services/hackathons"

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
    <main className="container mx-auto py-8 px-2">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Upcoming Hackathons
      </h1>
      <HackathonList hackathons={allHackathons} />
    </main>
  )
}
