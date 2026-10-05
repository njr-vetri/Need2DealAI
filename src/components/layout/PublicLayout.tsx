import { Outlet, Link } from 'react-router-dom';
import { Navbar } from './Navbar';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F1E8] dark:bg-[#1C201F] text-[#252525] dark:text-[#EDE9E1] transition-colors">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Restrained Human-Designed Footer */}
      <footer className="border-t border-[#D2CEC2] dark:border-[#3C4743] bg-[#EAE6DA] dark:bg-[#232826] pt-12 pb-10 transition-colors">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#D2CEC2]/70 dark:border-[#3C4743]/70">
            {/* Brand column */}
            <div className="space-y-3.5 md:col-span-1">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-md bg-[#365C63] text-[#FFFDF7] flex items-center justify-center font-bold text-xs">
                  N2D
                </div>
                <span className="text-lg font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
                  Need2Deal
                </span>
              </div>
              <p className="text-xs text-[#66645E] dark:text-[#A6A39A] leading-relaxed">
                The needs-first procurement platform. Buyers post explicit specifications, verified suppliers respond with competitive bids, and deals progress through signed mutual agreements to delivery.
              </p>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#365C63] dark:text-[#8BAAB8]">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Zero spam, verified suppliers only</span>
              </div>
            </div>

            {/* Buyer workflows */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#66645E] dark:text-[#A6A39A]">
                For Buyers
              </h4>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <Link to="/buyer/requirements/new" className="text-[#66645E] dark:text-[#A6A39A] hover:text-[#365C63] dark:hover:text-[#FFFDF7] transition-colors">
                    Post a Requirement
                  </Link>
                </li>
                <li>
                  <Link to="/buyer/requirements" className="text-[#66645E] dark:text-[#A6A39A] hover:text-[#365C63] dark:hover:text-[#FFFDF7] transition-colors">
                    Compare Supplier Bids
                  </Link>
                </li>
                <li>
                  <Link to="/buyer/providers" className="text-[#66645E] dark:text-[#A6A39A] hover:text-[#365C63] dark:hover:text-[#FFFDF7] transition-colors">
                    Verified Supplier Directory
                  </Link>
                </li>
                <li>
                  <Link to="/buyer/orders" className="text-[#66645E] dark:text-[#A6A39A] hover:text-[#365C63] dark:hover:text-[#FFFDF7] transition-colors">
                    Order Tracking & SLAs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Provider workflows */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#66645E] dark:text-[#A6A39A]">
                For Suppliers
              </h4>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <Link to="/provider/requirements" className="text-[#66645E] dark:text-[#A6A39A] hover:text-[#365C63] dark:hover:text-[#FFFDF7] transition-colors">
                    Discover Open Demand
                  </Link>
                </li>
                <li>
                  <Link to="/provider/offers" className="text-[#66645E] dark:text-[#A6A39A] hover:text-[#365C63] dark:hover:text-[#FFFDF7] transition-colors">
                    Submit Custom Proposals
                  </Link>
                </li>
                <li>
                  <Link to="/provider/catalog" className="text-[#66645E] dark:text-[#A6A39A] hover:text-[#365C63] dark:hover:text-[#FFFDF7] transition-colors">
                    Product & Machinery Catalog
                  </Link>
                </li>
                <li>
                  <Link to="/signup?role=provider" className="text-[#66645E] dark:text-[#A6A39A] hover:text-[#365C63] dark:hover:text-[#FFFDF7] transition-colors">
                    Become a Verified Supplier
                  </Link>
                </li>
              </ul>
            </div>

            {/* Fast Quick Links */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#66645E] dark:text-[#A6A39A]">
                Platform Guarantees
              </h4>
              <p className="text-xs text-[#66645E] dark:text-[#A6A39A] leading-relaxed">
                Every transaction uses dual digital signing before production commences. Clear delivery milestones and SLA tracking keep everyone honest.
              </p>
              <div className="pt-1.5">
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#365C63] dark:text-[#8BAAB8] hover:underline"
                >
                  Join the marketplace <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#66645E] dark:text-[#A6A39A] gap-3">
            <p>© 2026 Need2Deal. All rights reserved. Post what you need. Find the right deal.</p>
            <div className="flex gap-5 text-[11px]">
              <span className="hover:underline cursor-pointer">Privacy Policy</span>
              <span className="hover:underline cursor-pointer">Terms of Trade</span>
              <span className="hover:underline cursor-pointer">Campus Partner Program</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
