import { cleanCurrencySpan, formatImageUrl } from "@/lib/utils"
import { DevpostHackathon } from "@/types/devpost"
import { NormalizedHackathon } from "@/types/hackathon"
import { UnstopHackathon } from "@/types/unstop"

type DevpostHackathonDetails = Exclude<
  DevpostHackathon["hackathons"],
  undefined
>[0]

export async function fetchDevpostHackathons(
  page: number
): Promise<NormalizedHackathon[]> {
  try {
    const response = await fetch(
      `https://devpost.com/api/hackathons?page=${page ?? 1}`,
      {
        cache: "force-cache",
        next: {
          revalidate: 60 * 60 * 24,
          tags: ["devpost-hackathons"],
        },
      }
    )
    const data = await response.json()

    const normalizedData = data.hackathons.map(
      (hackathon: DevpostHackathonDetails) => ({
        title: hackathon.title,
        url: hackathon.url,
        organizer: hackathon.organization_name,
        imageUrl: formatImageUrl(hackathon.thumbnail_url),
        startDate: new Date(
          hackathon.submission_period_dates.split(" - ")[0]
        ).toLocaleDateString(),
        endDate: new Date(
          hackathon.submission_period_dates.split(" - ")[1]
        ).toLocaleDateString(),
        prize: cleanCurrencySpan(hackathon.prize_amount),
        timeLeft: hackathon.time_left_to_submission,
        tags: hackathon.themes.map((theme) => theme.name),
        registrationCount: hackathon.registrations_count,
        location: hackathon.displayed_location.location,
        source: "devpost" as const,
      })
    )

    return normalizedData
  } catch (error) {
    console.error("Error fetching Devpost hackathons:", error)
    return []
  }
}

type UnstopHackathonDetails = UnstopHackathon["data"]["data"][0]

export async function fetchUnstopHackathons(
  page: number = 1
): Promise<NormalizedHackathon[]> {
  try {
    const response = await fetch(
      `https://unstop.com/api/public/opportunity/search-result?opportunity=hackathons&page=${
        page ?? 1
      }&per_page=15&oppstatus=open&quickApply=true`,
      {
        cache: "force-cache",
        next: {
          revalidate: 60 * 60 * 24,
          tags: ["unstop-hackathons"],
        },
      }
    )
    const data = await response.json()

    const normalizedData = data.data.data.map(
      (hackathon: UnstopHackathonDetails) => ({
        title: hackathon.title,
        url: `https://unstop.com/${hackathon.public_url}`,
        organizer: hackathon.organisation.name,
        imageUrl: hackathon.banner_mobile.image_url,
        startDate: new Date(hackathon.start_date).toLocaleDateString(),
        endDate: new Date(hackathon.end_date).toLocaleDateString(),
        currency: hackathon.prizes[0]?.currency,
        prize: hackathon.prizes
          .reduce((acc, curr) => acc + (curr?.cash ?? 0), 0)
          .toLocaleString(),
        location: hackathon.region,
        tags: hackathon.filters.map((filter) => filter.name),
        source: "unstop" as const,
        registrationCount: hackathon.registerCount,
      })
    )

    return normalizedData
  } catch (error) {
    console.error("Error fetching Unstop hackathons:", error)
    return []
  }
}
