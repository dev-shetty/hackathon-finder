import { HackathonCard } from "@/components/hackathon-card"
import {
  fetchDevpostHackathons,
  fetchUnstopHackathons,
} from "@/services/hackathons"

export default async function Home() {
  const [devpostHackathons, unstopHackathons] = await Promise.all([
    Promise.all(
      Array.from({ length: 5 }, (_, i) => fetchDevpostHackathons(i + 1))
    ).then((results) => results.flat()),
    Promise.all(
      Array.from({ length: 5 }, (_, i) => fetchUnstopHackathons(i + 1))
    ).then((results) => results.flat()),
  ])

  const allHackathons = [...devpostHackathons, ...unstopHackathons].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  )

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Upcoming Hackathons
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allHackathons.map((hackathon, index) => (
          <HackathonCard key={index} hackathon={hackathon} />
        ))}
      </div>
    </main>
  )
}
