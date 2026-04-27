import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
          <FileText className="h-6 w-6" />
          EuroInvoice
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/generator" className="text-gray-600 hover:text-blue-600 transition-colors">
            Invoice Generator
          </Link>
          <Link href="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors">
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
          <Link href="/generator">
            <Button size="sm">Create Invoice</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
