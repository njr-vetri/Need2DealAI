
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/Button"
import { ArrowRight, CheckCircle2, Shield, Zap } from "lucide-react"

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative px-4 pt-24 pb-16 md:px-8 md:pt-32 md:pb-24 overflow-hidden">
        <div className="container mx-auto grid max-w-[1400px] grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col items-start gap-6 max-w-2xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.05]">
              Tell us what you need.<br/>
              <span className="text-gray-500">Let providers compete.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-[50ch]">
              Stop searching for suppliers. Describe your requirement once, receive relevant offers, and let our intelligence match you with the perfect provider.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button size="lg" onClick={() => navigate('/signup')} className="gap-2">
                Post a Requirement <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/providers')}>
                Explore Providers
              </Button>
            </div>
          </div>
          
          <div className="relative lg:h-[600px] rounded-2xl bg-gray-100 border border-gray-200 shadow-sm overflow-hidden flex items-center justify-center p-8">
            {/* Visual representation of the reverse marketplace */}
            <div className="absolute inset-0 opacity-40 bg-[url('https://picsum.photos/seed/marketplace-abstract/800/600')] bg-cover bg-center"></div>
            <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/50 flex flex-col gap-4">
              <div className="flex justify-between items-center border-b pb-4">
                <span className="text-sm font-semibold text-gray-500">YOUR REQUIREMENT</span>
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-medium">Active</span>
              </div>
              <p className="font-semibold text-gray-900 text-lg">500 Custom T-Shirts for College Event</p>
              <div className="space-y-3 pt-4">
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-between opacity-50">
                  <span className="text-sm font-medium">Provider A</span>
                  <span className="text-sm font-mono text-gray-500">₹72,000</span>
                </div>
                <div className="p-3 bg-primary/5 rounded-lg border border-primary/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Provider C</span>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-primary">Best Match</span>
                  </div>
                  <span className="text-sm font-mono font-bold text-primary">₹76,000</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-between opacity-50">
                  <span className="text-sm font-medium">Provider B</span>
                  <span className="text-sm font-mono text-gray-500">₹65,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="bg-white py-24 px-4 md:px-8 border-t border-gray-100">
        <div className="container mx-auto max-w-[1400px]">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">A Needs-First Approach</h2>
            <p className="mt-4 text-gray-600">Unlike traditional marketplaces where you browse endless catalogs, ReverseMarket brings the right suppliers to you.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="flex flex-col gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Intelligent Matching</h3>
              <p className="text-gray-600 leading-relaxed">Our AI understands your requirement and alerts providers whose capabilities, location, and workload match your exact needs.</p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Objective Comparison</h3>
              <p className="text-gray-600 leading-relaxed">Compare incoming offers on price, delivery time, and reliability score in one standardized view. No more scattered email quotes.</p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Clear Agreements</h3>
              <p className="text-gray-600 leading-relaxed">Both parties sign off on a mutual digital agreement. Track fulfillment deadlines and order status natively within the platform.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
