import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ShieldCheck, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useMarketplace } from '../../context/MarketplaceContext';

export function Login() {
  const navigate = useNavigate();
  const { setRole } = useMarketplace();

  const [selectedRole, setSelectedRole] = useState<'buyer' | 'provider'>('buyer');
  const [email, setEmail] = useState('aditya.techfest@annauniv.edu');
  const [password, setPassword] = useState('demo1234');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleQuickSelect = (role: 'buyer' | 'provider') => {
    setSelectedRole(role);
    if (role === 'buyer') {
      setEmail('aditya.techfest@annauniv.edu');
      setPassword('demo1234');
    } else {
      setEmail('orders@chennaiprintworks.in');
      setPassword('demo1234');
    }
    setError(null);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid organizational or business email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setRole(selectedRole);
      setSuccess(`Authenticated successfully as ${selectedRole === 'buyer' ? 'Aditya Swaminathan (Buyer)' : 'Chennai PrintWorks (Provider)'}!`);

      setTimeout(() => {
        if (selectedRole === 'buyer') {
          navigate('/buyer');
        } else {
          navigate('/provider');
        }
      }, 700);
    }, 900);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-4xl rounded-lg border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#272E2B] shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12">
        {/* Left Side: Editorial Story & Quick Demo Logins */}
        <div className="md:col-span-5 bg-[#EAE6DA] dark:bg-[#232826] text-[#252525] dark:text-[#FFFDF7] p-7 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#D2CEC2] dark:border-[#3C4743]">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-7 w-7 rounded-md bg-[#365C63] text-[#FFFDF7] flex items-center justify-center font-bold text-xs">
                N2D
              </div>
              <span className="font-bold text-xs tracking-tight text-[#252525] dark:text-[#FFFDF7]">Need2Deal Procurement</span>
            </div>

            <h2 className="text-xl font-bold tracking-tight leading-snug">
              Welcome back to needs-first procurement.
            </h2>
            <p className="text-xs text-[#66645E] dark:text-[#A6A39A] mt-2.5 leading-relaxed">
              Track open demands, inspect multi-factor proposals, and sign digital milestone agreements with zero friction.
            </p>

            {/* Quick Demo Account Selector */}
            <div className="mt-7 pt-5 border-t border-[#D2CEC2] dark:border-[#3C4743] space-y-2.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#66645E] dark:text-[#A6A39A] block">
                Instant Demo Profiles:
              </span>

              <button
                type="button"
                onClick={() => handleQuickSelect('buyer')}
                className={`w-full text-left p-3 rounded-md border transition-colors cursor-pointer ${
                  selectedRole === 'buyer'
                    ? 'bg-[#FFFDF7] dark:bg-[#272E2B] border-[#365C63] text-[#252525] dark:text-[#FFFDF7] shadow-xs'
                    : 'bg-[#FFFDF7]/60 dark:bg-[#272E2B]/60 border-[#D2CEC2] dark:border-[#3C4743] text-[#66645E] dark:text-[#A6A39A] hover:bg-[#FFFDF7]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#252525] dark:text-[#FFFDF7]">Buyer Account</span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-[#365C63]/10 text-[#365C63] dark:text-[#8BAAB8] font-semibold">College Lead</span>
                </div>
                <span className="text-[11px] block mt-0.5 text-[#66645E] dark:text-[#A6A39A] truncate">aditya.techfest@annauniv.edu</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickSelect('provider')}
                className={`w-full text-left p-3 rounded-md border transition-colors cursor-pointer ${
                  selectedRole === 'provider'
                    ? 'bg-[#FFFDF7] dark:bg-[#272E2B] border-[#365C63] text-[#252525] dark:text-[#FFFDF7] shadow-xs'
                    : 'bg-[#FFFDF7]/60 dark:bg-[#272E2B]/60 border-[#D2CEC2] dark:border-[#3C4743] text-[#66645E] dark:text-[#A6A39A] hover:bg-[#FFFDF7]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#252525] dark:text-[#FFFDF7]">Supplier Account</span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-[#A37B52]/15 text-[#A37B52] dark:text-[#E5CFA3] font-semibold">Manufacturer</span>
                </div>
                <span className="text-[11px] block mt-0.5 text-[#66645E] dark:text-[#A6A39A] truncate">orders@chennaiprintworks.in</span>
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-[#D2CEC2] dark:border-[#3C4743] text-[11px] text-[#66645E] dark:text-[#A6A39A] flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-[#365C63]" />
            <span>Encrypted authentication & verified identities</span>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="md:col-span-7 p-7 sm:p-9 flex flex-col justify-center bg-[#FFFDF7] dark:bg-[#272E2B]">
          <div className="mb-5">
            <h3 className="text-xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
              Sign in to your account
            </h3>
            <p className="text-xs text-[#66645E] dark:text-[#A6A39A] mt-1">
              Select your role and enter your workspace credentials.
            </p>
          </div>

          {/* Role Choice Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1 rounded-lg bg-[#EAE6DA] dark:bg-[#232826] mb-6">
            <button
              type="button"
              onClick={() => handleQuickSelect('buyer')}
              className={`py-2 text-xs font-bold rounded-md transition-all cursor-pointer ${
                selectedRole === 'buyer'
                  ? 'bg-[#FFFDF7] dark:bg-[#252525] text-[#252525] dark:text-[#FFFDF7] shadow-xs'
                  : 'text-[#66645E] dark:text-[#A6A39A] hover:text-[#252525]'
              }`}
            >
              Signing in as Buyer
            </button>
            <button
              type="button"
              onClick={() => handleQuickSelect('provider')}
              className={`py-2 text-xs font-bold rounded-md transition-all cursor-pointer ${
                selectedRole === 'provider'
                  ? 'bg-[#FFFDF7] dark:bg-[#252525] text-[#252525] dark:text-[#FFFDF7] shadow-xs'
                  : 'text-[#66645E] dark:text-[#A6A39A] hover:text-[#252525]'
              }`}
            >
              Signing in as Supplier
            </button>
          </div>

          {/* Feedback Banners */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-[#F7E9E7] dark:bg-[#3E2725] border border-[#ECCAC7] dark:border-[#583330] flex items-center gap-2 text-xs font-medium text-[#824A44] dark:text-[#F1B2AD]">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 rounded-lg bg-[#E7EFE5] dark:bg-[#29382B] border border-[#C8DAC4] dark:border-[#374C3A] flex items-center gap-2 text-xs font-semibold text-[#3D5A38] dark:text-[#8BAAB8]">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Work or Organization Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@organization.com"
              required
            />

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#252525] dark:text-[#EDE9E1] tracking-wide">
                  Password <span className="text-[#9A5C55]">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-xs text-[#365C63] dark:text-[#8BAAB8] hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="flex h-10 w-full rounded-md border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#232826] px-3.5 py-2 text-sm text-[#252525] dark:text-[#EDE9E1] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#365C63]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-[#66645E] dark:text-[#A6A39A] hover:text-[#252525] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs text-[#66645E] dark:text-[#A6A39A] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#D2CEC2] text-[#252525] focus:ring-[#365C63]"
                />
                <span>Remember this workstation</span>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="w-full mt-2"
            >
              Sign In as {selectedRole === 'buyer' ? 'Buyer' : 'Supplier'} <ArrowRight className="h-4 w-4 ml-1" />
            </Button>

            {/* Google sign-in placeholder */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[#D2CEC2]/60 dark:border-[#3C4743]/60" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-mono tracking-wider">
                <span className="bg-[#FFFDF7] dark:bg-[#252525] px-2 text-[#66645E] dark:text-[#A6A39A]">
                  Or Enterprise SSO
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => {
                setError(null);
                setSuccess('Mock Google Workspace Single-Sign-On linked.');
                setTimeout(() => navigate(selectedRole === 'buyer' ? '/buyer' : '/provider'), 600);
              }}
              className="w-full text-xs"
            >
              Sign in with Google Workspace
            </Button>
          </form>

          <p className="text-center text-xs text-[#66645E] dark:text-[#A6A39A] mt-6">
            New to Need2Deal?{' '}
            <Link to="/signup" className="font-bold text-[#252525] dark:text-[#FFFDF7] hover:text-[#365C63] underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-[#252525]/50 backdrop-blur-xs" onClick={() => setShowForgotPassword(false)} />
          <div className="relative z-10 w-full max-w-sm rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] p-6 shadow-xl">
            <h4 className="text-base font-bold text-[#252525] dark:text-[#FFFDF7] mb-1">
              Reset Your Password
            </h4>
            <p className="text-xs text-[#66645E] dark:text-[#A6A39A] mb-4">
              Enter your email and we will simulate sending a recovery authorization token.
            </p>

            {forgotSent ? (
              <div className="p-3 rounded-lg bg-[#E7EFE5] text-[#3D5A38] text-xs font-semibold mb-4">
                Password reset link dispatched to {forgotEmail}!
              </div>
            ) : (
              <div className="space-y-3">
                <Input
                  label="Email Address"
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="your-email@univ.edu"
                />
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    if (forgotEmail) setForgotSent(true);
                  }}
                >
                  Send Recovery Link
                </Button>
              </div>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-3"
              onClick={() => {
                setShowForgotPassword(false);
                setForgotSent(false);
              }}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
