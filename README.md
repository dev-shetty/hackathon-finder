# Hackathon Finder

A minimal website which fetches data from popular websites related to hackathons and shows it in a single page UI, with filters and sorting options.


## Supported Hackathons Websites
- Devpost
- Unstop

## Powered by
- Next.js 15
- ShadCN UI
- TailwindCSS
- TypeScript

## What is this?
- This website lists hackathon details like prizes, dates, and registration count, etc.
- Has option to filter between hackathon categories / tags.
- Can sort based on end time or prize pool.

## Why is this?
So one of my juniors complained about missing hackathons and not finding relevant ones. Valid concern, the current Hackathon sites are too cluttered, this is a small effort on making the hackathons more visible.

## How is this?
Initially I thought about scraping and doing it the hard way. But instead it fetches the hackathon data from the APIs which power the hackathon listing in their own platform.

## What can be improved?
Since I built it in just around 3 hours? There are lot of things which can be added or improved. Let me list a few

- A better and ordered UI,
- Add support to more hackathon hosting platform
- There are much more data returned from the API (you can check the types for each response), can be more creative using it.
- The dates are not proper because of inconsistent formatting in the API itself, can be a good fix.
- Potential to add more options to get curated data, eg. Location filter
- While sorting via prizepool, the sort should obey the currency.

## Development
Setting up locally is as simple as forgetting the environment variables while deploying XD

- Clone the repo
- `npm install`
- `npm run dev`
- Kaboom done!
