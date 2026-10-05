
import { Outlet } from "react-router-dom"
import { Navbar } from "./Navbar"

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-gray-200 bg-white py-12 text-center text-sm text-gray-500">
        <p>© 2026 ReverseMarket. Needs-first procurement.</p>
      </footer>
    </div>
  )
}
