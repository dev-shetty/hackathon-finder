import { NextResponse } from "next/server"
import {
  fetchDevpostHackathons,
  fetchUnstopHackathons,
} from "@/services/hackathons"

export async function GET() {
  const PAGE_SIZE = 6

  try {
    const [devpostHackathons, unstopHackathons] = await Promise.all([
      Promise.all(
        Array.from({ length: PAGE_SIZE }, (_, i) =>
          fetchDevpostHackathons(i + 1)
        )
      ).then((results) => results.flat()),
      Promise.all(
        Array.from({ length: PAGE_SIZE }, (_, i) =>
          fetchUnstopHackathons(i + 1)
        )
      ).then((results) => results.flat()),
    ])

    return NextResponse.json({
      hackathons: [...devpostHackathons, ...unstopHackathons],
    })
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch hackathons", error: error },
      { status: 500 }
    )
  }
}
