import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { NormalizedHackathon } from "@/types/hackathon"
import Image from "next/image"
import Link from "next/link"

export function HackathonCard({
  hackathon,
}: {
  hackathon: NormalizedHackathon
}) {
  return (
    <Link href={hackathon.url} target="_blank" rel="noopener noreferrer">
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="relative w-full h-48 mb-4">
            <Image
              src={hackathon.imageUrl}
              alt={hackathon.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain rounded-t-lg w-full h-full"
              placeholder="blur"
              blurDataURL={hackathon.imageUrl}
            />
          </div>
          <CardTitle className="mt-4">{hackathon.title}</CardTitle>
          <CardDescription>{hackathon.organizer}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <p className="text-sm">
              <span className="font-semibold">Prize:</span>{" "}
              {hackathon.currency === "fa-rupee" && "₹"}
              {hackathon.prize.toLocaleString()}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Dates:</span>{" "}
              {hackathon.source === "devpost"
                ? hackathon.submissionDate
                : `${hackathon.startDate} - ${hackathon.endDate}`}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Registrations:</span>{" "}
              {hackathon.registrationCount}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Location:</span>{" "}
              {hackathon.location}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2">
          <div className="flex flex-wrap gap-2">
            {hackathon.tags.map((tag, index) => (
              <span
                key={tag.id}
                className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
