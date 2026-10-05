import * as React from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../../components/ui/Card"

export function Login() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simplified auth logic for the prototype
    const email = (e.target as any).email.value;
    if (email.includes('provider')) {
      navigate('/provider');
    } else {
      navigate('/buyer');
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center pb-8">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <p className="text-sm text-gray-500">Enter your credentials to access your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input 
              label="Email" 
              name="email" 
              type="email" 
              placeholder="name@organization.com" 
              required 
            />
            <Input 
              label="Password" 
              name="password" 
              type="password" 
              placeholder="••••••••" 
              required 
            />
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Button type="submit" className="w-full mt-2">Sign in</Button>
            
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <Button type="button" variant="outline" className="w-full">
              Google
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-600">
            Don't have an account? <Link to="/signup" className="font-medium text-primary hover:underline">Create one</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
