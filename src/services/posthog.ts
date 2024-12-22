import posthog from "posthog-js"

// Only initialize PostHog in production
if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
    person_profiles: "always",
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") posthog.debug()
    },
    capture_pageview: false, // Disable automatic pageview capture, we'll handle this manually
  })
}

export { posthog }
