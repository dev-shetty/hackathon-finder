"use client"

import { NormalizedHackathon } from "@/types/hackathon"
import { HackathonCard } from "@/components/hackathon-card"
import { useState } from "react"
import { FilterIcon, XIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { posthog } from "@/services/posthog"

export function HackathonList({
  hackathons,
}: {
  hackathons: NormalizedHackathon[]
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isOnlineOnly, setIsOnlineOnly] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sortConfig, setSortConfig] = useState<string>("date-near")

  // Get unique tags from all hackathons
  const allTags = Array.from(new Set(hackathons.flatMap((h) => h.tags)))
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Filter hackathons based on search, online status, and tags
  const filteredHackathons = hackathons
    .filter((hackathon) => {
      const matchesSearch = hackathon.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      const matchesOnline =
        !isOnlineOnly ||
        hackathon.location.toLowerCase().includes("online") ||
        hackathon.location.toLowerCase().includes("remote")
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => hackathon.tags.includes(tag))

      return matchesSearch && matchesOnline && matchesTags
    })
    .sort((a, b) => {
      const aPrize = a.prize.replace(/[^0-9]/g, "")
      const bPrize = b.prize.replace(/[^0-9]/g, "")
      let aDate = new Date(a.endDate.split("/").reverse().join("/")).getTime()
      let bDate = new Date(b.endDate.split("/").reverse().join("/")).getTime()

      // I know this is not correct, but works for now only breaks when sorted from farthest
      if (isNaN(aDate)) {
        aDate = new Date("12/12/2100").getTime()
      }
      if (isNaN(bDate)) {
        bDate = new Date("12/12/2100").getTime()
      }

      switch (sortConfig) {
        case "prize-high":
          return Number(bPrize) - Number(aPrize)
        case "prize-low":
          return Number(aPrize) - Number(bPrize)
        case "date-near":
          return aDate - bDate
        case "date-far":
          return bDate - aDate
        default:
          return 0
      }
    })

  return (
    <>
      <div className="flex flex-col items-center md:items-start gap-4 mb-6">
        <div className="flex flex-row w-full items-center gap-4">
          <input
            type="text"
            placeholder="Search hackathons..."
            className="w-full p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="flex items-center gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="online-only"
                checked={isOnlineOnly}
                onCheckedChange={(checked) => setIsOnlineOnly(!!checked)}
              />
              <label
                htmlFor="online-only"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 whitespace-nowrap"
              >
                Online Only
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsModalOpen(true)
              posthog.capture("filter_modal_opened")
            }}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg flex items-center gap-2"
          >
            <FilterIcon className="w-4 h-4" />
            Filters {selectedTags.length > 0 && `(${selectedTags.length})`}
          </button>

          <Select
            value={sortConfig}
            onValueChange={(value) => {
              setSortConfig(value)
              posthog.capture("sort_changed", { sort_type: value })
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No sorting</SelectItem>
              <SelectItem value="prize-high">
                Prize Pool (High to Low)
              </SelectItem>
              <SelectItem value="prize-low" defaultChecked>
                Prize Pool (Low to High)
              </SelectItem>
              <SelectItem value="date-near">End Date (Nearest)</SelectItem>
              <SelectItem value="date-far">End Date (Furthest)</SelectItem>
            </SelectContent>
          </Select>

          {selectedTags.length > 0 && (
            <div className="flex gap-2 overflow-x-auto items-center">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm flex items-center gap-1"
                >
                  {tag}
                  <button
                    onClick={() =>
                      setSelectedTags((prev) => prev.filter((t) => t !== tag))
                    }
                    className="hover:text-blue-200"
                  >
                    <XIcon className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <button
                onClick={() => setSelectedTags([])}
                className="px-3 py-1 bg-red-500 text-white rounded-full text-sm hover:bg-red-600"
              >
                Clear All
              </button>
            </div>
          )}

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Filter by Tags</DialogTitle>
              </DialogHeader>
              <div className="flex flex-wrap gap-2 max-h-96 overflow-y-auto">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() =>
                      setSelectedTags((prev) =>
                        prev.includes(tag)
                          ? prev.filter((t) => t !== tag)
                          : [...prev, tag]
                      )
                    }
                    className={`px-3 py-1 rounded-full ${
                      selectedTags.includes(tag)
                        ? "bg-blue-500 text-white"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHackathons.map((hackathon) => (
          <HackathonCard key={hackathon.title} hackathon={hackathon} />
        ))}
      </div>
    </>
  )
}
