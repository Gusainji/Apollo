import Link from "next/link"
import { Search, ShoppingCart, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center">
              <div className="relative h-10 w-32">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-[#02475b]">Apollo</span>
                  <span className="text-2xl font-bold text-[#ff6f61]">247</span>
                </div>
              </div>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="#" className="text-[#02475b] hover:text-[#ff6f61] font-medium">
                Doctors
              </Link>
              <Link href="#" className="text-[#02475b] hover:text-[#ff6f61] font-medium">
                Pharmacy
              </Link>
              <Link href="#" className="text-[#02475b] hover:text-[#ff6f61] font-medium">
                Lab Tests
              </Link>
              <Link href="#" className="text-[#02475b] hover:text-[#ff6f61] font-medium">
                Health Records
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="Search doctors, medicines, etc."
                className="pl-10 pr-4 py-2 border rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-[#ff6f61] focus:border-transparent"
              />
              <Search className="absolute left-3 text-gray-400" size={18} />
            </div>
            <Button variant="ghost" className="hidden md:flex items-center text-[#02475b]">
              <ShoppingCart size={20} className="mr-2" />
              <span>Cart</span>
            </Button>
            <Button variant="ghost" className="hidden md:flex items-center text-[#02475b]">
              <User size={20} className="mr-2" />
              <span>Profile</span>
            </Button>
            <Button variant="outline" className="md:hidden">
              <Menu size={20} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
