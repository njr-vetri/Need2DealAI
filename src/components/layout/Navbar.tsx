
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/Button"

export function Navbar() {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold tracking-tight text-primary">
            ReverseMarket
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/how-it-works" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">How it works</Link>
            <Link to="/providers" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Providers</Link>
            <Link to="/categories" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Categories</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/login')}>Sign in</Button>
          <Button onClick={() => navigate('/signup')}>Post a Requirement</Button>
        </div>
      </div>
    </header>
  )
}
