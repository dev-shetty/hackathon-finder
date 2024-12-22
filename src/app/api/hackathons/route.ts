import { NextResponse } from 'next/server'
import { fetchDevpostHackathons, fetchUnstopHackathons } from '@/services/hackathons'

export async function GET() {
  try {
    const [devpostHackathons, unstopHackathons] = await Promise.all([
      fetchDevpostHackathons(),
      fetchUnstopHackathons(),
    ])

    return NextResponse.json({
      hackathons: [...devpostHackathons, ...unstopHackathons],
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch hackathons' }, { status: 500 })
  }
} 