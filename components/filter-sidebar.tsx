"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FilterSidebarProps {
  filters: {
    experience: string[]
    availability: string[]
    gender: string[]
    fees: string[]
    sortBy: string
  }
  onFilterChange: (filters: any) => void
}

export default function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    experience: true,
    availability: true,
    gender: true,
    fees: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  const handleExperienceChange = (value: string) => {
    const newExperience = filters.experience.includes(value)
      ? filters.experience.filter((item) => item !== value)
      : [...filters.experience, value]

    onFilterChange({ experience: newExperience })
  }

  const handleAvailabilityChange = (value: string) => {
    const newAvailability = filters.availability.includes(value)
      ? filters.availability.filter((item) => item !== value)
      : [...filters.availability, value]

    onFilterChange({ availability: newAvailability })
  }

  const handleGenderChange = (value: string) => {
    const newGender = filters.gender.includes(value)
      ? filters.gender.filter((item) => item !== value)
      : [...filters.gender, value]

    onFilterChange({ gender: newGender })
  }

  const handleFeesChange = (value: string) => {
    const newFees = filters.fees.includes(value)
      ? filters.fees.filter((item) => item !== value)
      : [...filters.fees, value]

    onFilterChange({ fees: newFees })
  }

  const clearAllFilters = () => {
    onFilterChange({
      experience: [],
      availability: [],
      gender: [],
      fees: [],
      sortBy: "relevance",
    })
  }

  const hasActiveFilters = () => {
    return (
      filters.experience.length > 0 ||
      filters.availability.length > 0 ||
      filters.gender.length > 0 ||
      filters.fees.length > 0 ||
      filters.sortBy !== "relevance"
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg text-[#02475b]">Filters</h3>
        {hasActiveFilters() && (
          <Button variant="ghost" className="text-[#ff6f61] hover:text-[#ff5c4d] p-0 h-auto" onClick={clearAllFilters}>
            Clear All
          </Button>
        )}
      </div>

      {/* Experience Filter */}
      <div className="border-b pb-3 mb-3">
        <div
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => toggleSection("experience")}
        >
          <h4 className="font-medium text-[#02475b]">Experience</h4>
          {expandedSections.experience ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </div>

        {expandedSections.experience && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="exp-0-5"
                checked={filters.experience.includes("0-5")}
                onCheckedChange={() => handleExperienceChange("0-5")}
              />
              <label htmlFor="exp-0-5" className="text-sm cursor-pointer">
                0-5 years
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="exp-5-10"
                checked={filters.experience.includes("5-10")}
                onCheckedChange={() => handleExperienceChange("5-10")}
              />
              <label htmlFor="exp-5-10" className="text-sm cursor-pointer">
                5-10 years
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="exp-10-15"
                checked={filters.experience.includes("10-15")}
                onCheckedChange={() => handleExperienceChange("10-15")}
              />
              <label htmlFor="exp-10-15" className="text-sm cursor-pointer">
                10-15 years
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="exp-15+"
                checked={filters.experience.includes("15+")}
                onCheckedChange={() => handleExperienceChange("15+")}
              />
              <label htmlFor="exp-15+" className="text-sm cursor-pointer">
                15+ years
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Availability Filter */}
      <div className="border-b pb-3 mb-3">
        <div
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => toggleSection("availability")}
        >
          <h4 className="font-medium text-[#02475b]">Availability</h4>
          {expandedSections.availability ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </div>

        {expandedSections.availability && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="avail-today"
                checked={filters.availability.includes("today")}
                onCheckedChange={() => handleAvailabilityChange("today")}
              />
              <label htmlFor="avail-today" className="text-sm cursor-pointer">
                Available Today
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="avail-tomorrow"
                checked={filters.availability.includes("tomorrow")}
                onCheckedChange={() => handleAvailabilityChange("tomorrow")}
              />
              <label htmlFor="avail-tomorrow" className="text-sm cursor-pointer">
                Available Tomorrow
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="avail-weekend"
                checked={filters.availability.includes("weekend")}
                onCheckedChange={() => handleAvailabilityChange("weekend")}
              />
              <label htmlFor="avail-weekend" className="text-sm cursor-pointer">
                Available on Weekend
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Gender Filter */}
      <div className="border-b pb-3 mb-3">
        <div className="flex justify-between items-center cursor-pointer mb-2" onClick={() => toggleSection("gender")}>
          <h4 className="font-medium text-[#02475b]">Gender</h4>
          {expandedSections.gender ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </div>

        {expandedSections.gender && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="gender-male"
                checked={filters.gender.includes("male")}
                onCheckedChange={() => handleGenderChange("male")}
              />
              <label htmlFor="gender-male" className="text-sm cursor-pointer">
                Male
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="gender-female"
                checked={filters.gender.includes("female")}
                onCheckedChange={() => handleGenderChange("female")}
              />
              <label htmlFor="gender-female" className="text-sm cursor-pointer">
                Female
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Fees Filter */}
      <div className="pb-3">
        <div className="flex justify-between items-center cursor-pointer mb-2" onClick={() => toggleSection("fees")}>
          <h4 className="font-medium text-[#02475b]">Consultation Fee</h4>
          {expandedSections.fees ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </div>

        {expandedSections.fees && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="fees-0-500"
                checked={filters.fees.includes("0-500")}
                onCheckedChange={() => handleFeesChange("0-500")}
              />
              <label htmlFor="fees-0-500" className="text-sm cursor-pointer">
                ₹0 - ₹500
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="fees-500-1000"
                checked={filters.fees.includes("500-1000")}
                onCheckedChange={() => handleFeesChange("500-1000")}
              />
              <label htmlFor="fees-500-1000" className="text-sm cursor-pointer">
                ₹500 - ₹1000
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="fees-1000+"
                checked={filters.fees.includes("1000+")}
                onCheckedChange={() => handleFeesChange("1000+")}
              />
              <label htmlFor="fees-1000+" className="text-sm cursor-pointer">
                ₹1000+
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
