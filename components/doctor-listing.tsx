"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Header from "@/components/header"
import DoctorCard from "@/components/doctor-card"
import FilterSidebar from "@/components/filter-sidebar"
import { Button } from "@/components/ui/button"
import { Pagination } from "@/components/ui/pagination"
import type { Doctor } from "@/lib/types"

export default function DoctorListing() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [totalDoctors, setTotalDoctors] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    experience: [],
    availability: [],
    gender: [],
    fees: [],
    sortBy: "relevance",
  })

  const pageSize = 10

  useEffect(() => {
    // Get filters from URL params
    const experienceParam = searchParams.get("experience")?.split(",") || []
    const availabilityParam = searchParams.get("availability")?.split(",") || []
    const genderParam = searchParams.get("gender")?.split(",") || []
    const feesParam = searchParams.get("fees")?.split(",") || []
    const sortByParam = searchParams.get("sortBy") || "relevance"
    const pageParam = Number.parseInt(searchParams.get("page") || "1")

    setFilters({
      experience: experienceParam,
      availability: availabilityParam,
      gender: genderParam,
      fees: feesParam,
      sortBy: sortByParam,
    })
    setCurrentPage(pageParam)

    fetchDoctors(pageParam, {
      experience: experienceParam,
      availability: availabilityParam,
      gender: genderParam,
      fees: feesParam,
      sortBy: sortByParam,
    })
  }, [searchParams])

  const fetchDoctors = async (page: number, filterParams: any) => {
    setLoading(true)
    try {
      // Build query string from filters
      const queryParams = new URLSearchParams()
      queryParams.append("page", page.toString())
      queryParams.append("limit", pageSize.toString())

      if (filterParams.experience.length) queryParams.append("experience", filterParams.experience.join(","))
      if (filterParams.availability.length) queryParams.append("availability", filterParams.availability.join(","))
      if (filterParams.gender.length) queryParams.append("gender", filterParams.gender.join(","))
      if (filterParams.fees.length) queryParams.append("fees", filterParams.fees.join(","))
      if (filterParams.sortBy) queryParams.append("sortBy", filterParams.sortBy)

      const response = await fetch(`/api/doctors?${queryParams.toString()}`)
      const data = await response.json()

      setDoctors(data.doctors)
      setTotalDoctors(data.total)
    } catch (error) {
      console.error("Error fetching doctors:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (newFilters: any) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)

    // Update URL with new filters
    const queryParams = new URLSearchParams()
    if (updatedFilters.experience.length) queryParams.append("experience", updatedFilters.experience.join(","))
    if (updatedFilters.availability.length) queryParams.append("availability", updatedFilters.availability.join(","))
    if (updatedFilters.gender.length) queryParams.append("gender", updatedFilters.gender.join(","))
    if (updatedFilters.fees.length) queryParams.append("fees", updatedFilters.fees.join(","))
    if (updatedFilters.sortBy) queryParams.append("sortBy", updatedFilters.sortBy)
    queryParams.append("page", "1") // Reset to first page on filter change

    router.push(`/?${queryParams.toString()}`)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)

    // Update URL with new page
    const queryParams = new URLSearchParams(searchParams.toString())
    queryParams.set("page", page.toString())

    router.push(`/?${queryParams.toString()}`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#02475b]">General Physician & Internal Medicine</h1>
          <p className="text-gray-600 mt-2">
            Consult with top General Physician & Internal Medicine specialists. Book appointments online, view doctor
            profiles, ratings, and more.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Sidebar */}
          <div className="w-full md:w-1/4">
            <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
          </div>

          {/* Doctor Listing */}
          <div className="w-full md:w-3/4">
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-[#02475b]">{totalDoctors} Doctors available</h2>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    className="border rounded p-1 text-sm"
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange({ sortBy: e.target.value })}
                  >
                    <option value="relevance">Relevance</option>
                    <option value="experience_high">Experience (High to Low)</option>
                    <option value="experience_low">Experience (Low to High)</option>
                    <option value="fees_high">Fees (High to Low)</option>
                    <option value="fees_low">Fees (Low to High)</option>
                  </select>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff6f61]"></div>
              </div>
            ) : (
              <>
                {doctors.length === 0 ? (
                  <div className="bg-white rounded-lg shadow p-8 text-center">
                    <h3 className="text-xl font-semibold text-[#02475b] mb-2">No doctors found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your filters to see more results.</p>
                    <Button
                      onClick={() =>
                        handleFilterChange({
                          experience: [],
                          availability: [],
                          gender: [],
                          fees: [],
                          sortBy: "relevance",
                        })
                      }
                      className="bg-[#ff6f61] hover:bg-[#ff5c4d] text-white"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {doctors.map((doctor) => (
                      <DoctorCard key={doctor._id} doctor={doctor} />
                    ))}

                    {/* Pagination */}
                    <div className="mt-6 flex justify-center">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(totalDoctors / pageSize)}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
