export interface NormalizedHackathon {
  title: string
  url: string
  imageUrl: string
  startDate: string
  endDate: string
  organizer: string
  currency?: string
  prize: string
  tags: string[]
  source: "devpost" | "unstop"
  registrationCount: number
  timeLeft: string
  location: string
  submissionDate: string
}
