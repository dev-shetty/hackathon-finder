export interface UnstopHackathon {
  data: Data
}

export interface Data {
  current_page: number
  data: Datum[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Link[]
  next_page_url: string
  path: string
  per_page: number
  prev_page_url: string
  to: number
  total: number
}

export interface Datum {
  id: number
  public_url: string
  title: string
  organization_id: number
  type: DatumType
  subtype: Subtype
  regn_open: number
  moderation_status: number
  self_moderated: number
  logoUrl2: string
  organisation: DatumOrganisation
  seo_url: string
  status: Status
  tags: string[]
  thumb: null
  banner_mobile: Banner
  filters: Filter[]
  isPaid: boolean
  festival: Festival | null
  fields: any[]
  prizes: Prize[]
  opportunity_config: OpportunityConfig
  seo_details: SEODetail[]
  jobDetail?: JobDetail
  end_date: Date
  start_date: Date
  region: Region
  approved_date: Date
  viewsCount: number
  registerCount: number
  regnRequirements: DatumRegnRequirements
  job_detail?: any[]
}

export interface Banner {
  id: number | null
  filename: string
  path: string
  image_type: ImageType
  image_url: string
}

export type ImageType = "mobile_banner" | "banner"

export interface Festival {
  id: number
  name: string
  abbr: null
  organization_id: number
  organisation: FestivalOrganisation
  start_date: Date
  end_date: Date
  theme_colour: string
  header_type: number
  footer_type: number
  public_url: string
  logoUrl2: string
  regnRequirements: FestivalRegnRequirements
  regn_open: number
}

export interface FestivalOrganisation {
  id: number
  name: string
  logo: string
  banner: Banner
  video: Video
  logoUrl: string
  logoUrl2: string
  bannerUrl: string
  banner_mobile: null
  public_url: string
  meta_info: MetaInfo
  seo_url: string
  assignTags: AssignTags
}

export interface AssignTags {
  tag: null
}

export interface MetaInfo {
  title: string
  keyword: string
  description: string
  sharable_image_url: string
}

export interface Video {
  id: number
  videoable_id: number
  videoable_type: string
  path: null
  video_source: string
  yt_video_id: string
  caption: null
  path_type: null
  sort_order: null
}

export interface FestivalRegnRequirements {
  id: number
  opportunity_id: null
  festival_id: number
  max_team_size: null
  min_team_size: null
  start_regn_dt: Date
  end_regn_dt: Date
  show_deadline: number
  open_for: number
  college_type: number
  same_organisation: number
  study_year_filter: number
  deleted_at: null
  enable_payment: number
  reg_amount: null
  payment_for: number
  service_charge_from: number
  allow_coupons: number
  eligibility: null
  payout_data: null
  gender: string[]
  vendor_id: null
  verified_email: number
  verified_mobile: number
  experience: null
  only_official_domains: null
  enable_verifications: null
  enable_icsfile: null
  proctoring: Proctoring
  gender_diversity: null
  allow_social_login: number
  allowed_countries: null
  extendedFormData: null
  extendRegForm: null
  screening_round: null
  consent_needed: number
  invitations_allowed: number
  registration_limit: null
  same_graduation_year: number
  same_course: number
  same_user_type: number
  can_edit_extended_form: number
  extend_basic_form: null
  core_req_fields: null
  enable_draft_reg: boolean
  closed_job_end_date: number
  reg_restricted: number
  free_webinar_for_unstop_pro: number
  email_reply_to: number
  verified_aadhaar: number
  verified_aadhaar_face: number
  player_extended_form: null
  unique_face_verify: boolean
  resume_parser: number
  display_compatibility_score: null
  registration_config: null
  remainingDaysArray: RemainingDaysArray
  remain_days: Text
  remaining_time: number
  reg_status: string
}

export interface Proctoring {}

export type Text = "Ended" | "day left" | " days left"

export interface RemainingDaysArray {
  durations: number | null | string
  text: Text
}

export interface Filter {
  id: number
  name: string
  type: FilterType
  file_name: string
  domain_id: number
  subtype: null
  icon_url: string
}

export type FilterType = "eligible" | "category"

export interface JobDetail {
  entity_id: number
  max_salary: null
  currency: Currency
  locations: any[]
  type: null
  not_disclosed: boolean
}

export type Currency = "fa-rupee"

export interface OpportunityConfig {
  id: number
  opportunity_id: number
  banner_config: string
  show_registrations_count: number
  show_impressions: number
}

export interface DatumOrganisation {
  id: number
  name: string
  public_url: string
  logoUrl: string
  logoUrl2: string
  show_evaluator_login_link: boolean
  official_email_domains: null | string
}

export interface Prize {
  id: number
  rank: string
  cash: number | null
  currency: Currency
  certificate: number | null
  entity_id: number
  entity_type: EntityType
  others: null | string
  currencyCode: null
  cash_postfix: null
  max_cash: null
  pre_placement_internship: null
  pre_placement_opportunity: null
}

export type EntityType = "App\\Model\\Opportunity"

export type Region = "offline" | "online"

export interface DatumRegnRequirements {
  opportunity_id: number
  start_regn_dt: Date
  end_regn_dt: Date
  show_deadline: number
  remainingDaysArray: RemainingDaysArray
  remain_days: string
  remaining_time: number
  reg_status: RegStatus
}

export type RegStatus = "STARTED"

export interface SEODetail {
  id: number
  entity_id: number
  entity_type: EntityType
  title: string
  description: string
  keywords: string
  event_type: null
  event_data: null
  public_url: null
  sharable_image_url: string
}

export type Status = "LIVE"

export type Subtype = "innovation_challenge" | "online_coding_challenge"

export type DatumType = "hackathons"

export interface Link {
  url: string
  label: string
  active: boolean
}
