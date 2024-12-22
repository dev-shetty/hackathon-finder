export interface DevpostHackathon {
  hackathons?: Hackathon[]
  meta?: Meta
  name?: string
  founded?: number
  members?: string[]
}

export interface Hackathon {
  id: number
  title: string
  displayed_location: DisplayedLocation
  open_state: string
  thumbnail_url: string
  analytics_identifier: string
  url: string
  time_left_to_submission: string
  submission_period_dates: string
  themes: Theme[]
  prize_amount: string
  registrations_count: number
  featured: boolean
  organization_name: string
  winners_announced: boolean
  submission_gallery_url: string
  start_a_submission_url: string
  invite_only: boolean
  eligibility_requirement_invite_only_description: null
  managed_by_devpost_badge: boolean
}

export interface DisplayedLocation {
  icon: string
  location: string
}

export interface Theme {
  id: number
  name: string
}

export interface Meta {
  total_count: number
  per_page: number
  fuzzy: boolean
}

export interface Album {
  name: string
  artist: ArtistClass
  tracks: Track[]
}

export interface ArtistClass {
  name: string
  founded: number
  members: string[]
}

export interface Track {
  name: string
  duration: number
}
