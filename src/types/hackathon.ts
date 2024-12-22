export interface NormalizedHackathon {
  title: string
  url: string
  imageUrl: string
  startDate: string
  endDate: string
  organizer: string
  currency?: string
  prize: string
  tags: { id: number; name: string }[]
  source: "devpost" | "unstop"
  registrationCount: number
  location: string
  mode: string
  submissionDate: string
}
