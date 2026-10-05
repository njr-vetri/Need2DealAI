import * as React from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Card, CardContent } from "../../components/ui/Card"
import { Package, Search } from "lucide-react"

export function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = React.useState<'buyer' | 'provider' | null>(null);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'provider') {
      navigate('/provider');
    } else {
      navigate('/buyer');
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
          <p className="text-gray-500 mt-2">Join ReverseMarket to connect with the right partners.</p>
        </div>

        <Card>
          <CardContent className="p-8">
            <form onSubmit={handleSignup} className="space-y-6">
              
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900 block">How will you use ReverseMarket?</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`
                    flex flex-col items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all
                    ${role === 'buyer' ? 'border-primary bg-primary/5 shadow-sm' : 'border-gray-200 hover:border-gray-300'}
                  `}>
                    <input 
                      type="radio" 
                      name="role" 
                      value="buyer" 
                      className="sr-only" 
                      onChange={() => setRole('buyer')}
                      required
                    />
                    <div className={`p-3 rounded-full ${role === 'buyer' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                      <Search className="h-6 w-6" />
                    </div>
                    <div className="text-center">
                      <span className="block font-medium">Buyer</span>
                      <span className="text-xs text-gray-500 mt-1">I need products or services</span>
                    </div>
                  </label>

                  <label className={`
                    flex flex-col items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all
                    ${role === 'provider' ? 'border-primary bg-primary/5 shadow-sm' : 'border-gray-200 hover:border-gray-300'}
                  `}>
                    <input 
                      type="radio" 
                      name="role" 
                      value="provider" 
                      className="sr-only" 
                      onChange={() => setRole('provider')}
                      required
                    />
                    <div className={`p-3 rounded-full ${role === 'provider' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                      <Package className="h-6 w-6" />
                    </div>
                    <div className="text-center">
                      <span className="block font-medium">Provider</span>
                      <span className="text-xs text-gray-500 mt-1">I provide products or services</span>
                    </div>
                  </label>
                </div>
              </div>

              {role && (
                <div className="space-y-4 pt-4 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-2">
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="First Name" required />
                    <Input label="Last Name" required />
                  </div>
                  
                  {role === 'provider' && (
                    <Input label="Business / Organization Name" required />
                  )}
                  {role === 'buyer' && (
                    <Input label="Organization / College (Optional)" />
                  )}

                  <Input label="Email" type="email" required />
                  <Input label="Password" type="password" required />
                  
                  <Button type="submit" className="w-full mt-4" size="lg">Create Account</Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
        
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
