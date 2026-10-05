import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Clock,
  Layers,
  FileText,
  Package,
  Cpu,
  Shirt,
  Volume2,
  Hammer,
  FileCheck,
  BellRing
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { marketplaceCategories } from '../../data/mockData';

export function LandingPage() {
  const navigate = useNavigate();

  // Interactive hero scrubber state: 0 = Requirement, 1 = Bids, 2 = Comparison, 3 = Agreement, 4 = Milestones
  const [heroStep, setHeroStep] = useState<number>(0);

  const heroSteps = [
    { title: '1. Post Demand', label: 'Requirement' },
    { title: '2. Receive Bids', label: '3 Offers In' },
    { title: '3. Multi-Factor Matrix', label: 'AI Match 96%' },
    { title: '4. Mutual Agreement', label: 'Signed Contract' },
    { title: '5. Milestone Tracking', label: 'In Production' }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* SECTION: HERO (Split Screen with Interactive Marketplace Simulation) */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-24 border-b border-[#D2CEC2] dark:border-[#3C4743]">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E7EFE5] dark:bg-[#29382B] text-[#3D5A38] dark:text-[#8BAAB8] border border-[#C8DAC4] dark:border-[#374C3A] text-xs font-semibold mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-[#365C63] animate-pulse" />
                The Needs-First Procurement Model
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7] leading-[1.08] mb-6">
                Post what you need. <br />
                <span className="text-[#365C63] dark:text-[#8BAAB8]">Suppliers compete</span> with exact offers.
              </h1>

              <p className="text-base sm:text-lg text-[#66645E] dark:text-[#A6A39A] max-w-xl leading-relaxed mb-8">
                Eliminate endless catalog searches and price haggling. Describe your quantity, budget, and deadline — qualified suppliers submit binding bids, you compare on real reliability, and contracts are confirmed digitally.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => navigate('/signup?role=buyer')}
                  className="shadow-md"
                >
                  Post a Requirement <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/provider/requirements')}
                >
                  Explore Demands as Supplier
                </Button>
              </div>

              {/* Trust strip */}
              <div className="flex items-center gap-6 mt-10 pt-6 border-t border-[#D2CEC2]/60 dark:border-[#3C4743]/60 text-xs text-[#66645E] dark:text-[#A6A39A]">
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-[#365C63]" />
                  <span>No upfront fees</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="h-4 w-4 text-[#365C63]" />
                  <span>Legally binding digital agreements</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <Clock className="h-4 w-4 text-[#365C63]" />
                  <span>Average 3 bids in 24 hrs</span>
                </div>
              </div>
            </div>

            {/* Right: Custom Interactive Marketplace Simulation */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] shadow-xl p-6 relative overflow-hidden">
                {/* Simulation Control Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-[#D2CEC2]/60 dark:border-[#3C4743]/60 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#365C63]" />
                    <span className="text-xs font-bold text-[#252525] dark:text-[#FFFDF7]">
                      Live Deal Flow Engine
                    </span>
                  </div>
                  <div className="flex gap-1 bg-[#EAE6DA] dark:bg-[#232826] p-1 rounded-lg">
                    {heroSteps.map((step, idx) => (
                      <button
                        key={step.title}
                        onClick={() => setHeroStep(idx)}
                        className={`px-2 py-1 text-[11px] font-semibold rounded-md transition-all cursor-pointer ${
                          heroStep === idx
                            ? 'bg-[#252525] text-[#FFFDF7] dark:bg-[#FFFDF7] dark:text-[#252525] shadow-xs'
                            : 'text-[#66645E] dark:text-[#A6A39A] hover:text-[#252525]'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {/* State 0: Buyer Requirement */}
                {heroStep === 0 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <Badge variant="accent">Phase 1: Demand Posted</Badge>
                      <span className="text-xs font-mono text-[#66645E] dark:text-[#A6A39A]">REQ-2026-904</span>
                    </div>
                    <div className="p-4 rounded-xl bg-[#EAE6DA]/50 dark:bg-[#232826] border border-[#D2CEC2]/70 dark:border-[#3C4743]">
                      <h4 className="font-bold text-base text-[#252525] dark:text-[#FFFDF7]">
                        500 Custom Bio-Washed Cotton T-Shirts
                      </h4>
                      <p className="text-xs text-[#66645E] dark:text-[#A6A39A] mt-1">
                        Anna University College Tech Symposium • 2-Color Screen Print Front
                      </p>
                      <div className="grid grid-cols-3 gap-3 mt-4 pt-3 border-t border-[#D2CEC2]/60 dark:border-[#3C4743]/60 text-xs">
                        <div>
                          <span className="text-[#66645E] dark:text-[#A6A39A] block text-[10px] uppercase">Budget Cap</span>
                          <span className="font-bold text-[#252525] dark:text-[#FFFDF7] text-sm">₹80,000</span>
                        </div>
                        <div>
                          <span className="text-[#66645E] dark:text-[#A6A39A] block text-[10px] uppercase">Quantity</span>
                          <span className="font-bold text-[#252525] dark:text-[#FFFDF7] text-sm">500 pcs</span>
                        </div>
                        <div>
                          <span className="text-[#66645E] dark:text-[#A6A39A] block text-[10px] uppercase">Target Delivery</span>
                          <span className="font-bold text-[#252525] dark:text-[#FFFDF7] text-sm">Oct 18, 2026</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-[#66645E] dark:text-[#A6A39A] flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-[#365C63]" />
                      Broadcasted to 12 verified apparel manufacturers in South India.
                    </p>
                  </div>
                )}

                {/* State 1: Incoming Bids */}
                {heroStep === 1 && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <Badge variant="warning">3 Proposals Received</Badge>
                      <span className="text-xs text-[#66645E] dark:text-[#A6A39A]">Avg. Turnaround: 6.3 Days</span>
                    </div>

                    {[
                      { name: 'Chennai PrintWorks', price: '₹72,000', days: '6 days', rel: '96%' },
                      { name: 'Heritage Paper & Press', price: '₹79,000', days: '4 days', rel: '97%' },
                      { name: 'CampusFab Solutions', price: '₹64,500', days: '9 days', rel: '89%' }
                    ].map((b, i) => (
                      <div
                        key={b.name}
                        className="flex items-center justify-between p-3 rounded-lg bg-[#EAE6DA]/40 dark:bg-[#232826] border border-[#D2CEC2]/60 dark:border-[#3C4743]"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="h-6 w-6 rounded-full bg-[#252525] text-[#FFFDF7] dark:bg-[#FFFDF7] dark:text-[#252525] text-xs font-bold flex items-center justify-center">
                            {i + 1}
                          </span>
                          <div>
                            <span className="text-xs font-bold text-[#252525] dark:text-[#FFFDF7] block">{b.name}</span>
                            <span className="text-[11px] text-[#66645E] dark:text-[#A6A39A]">Delivery: {b.days} • Reliability: {b.rel}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-[#252525] dark:text-[#FFFDF7] block">{b.price}</span>
                          <span className="text-[10px] text-[#365C63] font-semibold">Under Budget</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* State 2: Comparison & AI Recommendation */}
                {heroStep === 2 && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <Badge variant="success">Recommended Choice</Badge>
                      <span className="text-xs font-bold text-[#365C63]">AI Match Score: 96%</span>
                    </div>
                    <div className="p-4 rounded-xl bg-[#E7EFE5]/60 dark:bg-[#29382B] border border-[#C8DAC4] dark:border-[#374C3A]">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-xs font-bold text-[#3D5A38] dark:text-[#8BAAB8]">Chennai PrintWorks</span>
                          <h4 className="text-lg font-bold text-[#252525] dark:text-[#FFFDF7] mt-0.5">₹72,000 Total</h4>
                        </div>
                        <Badge variant="match">Best Overall</Badge>
                      </div>
                      <p className="text-xs text-[#252525]/80 dark:text-[#EDE9E1]/80 mt-2 leading-relaxed">
                        Meets strict 210 GSM fabric specifications, saves ₹8,000 on budget cap, and delivers 2 days prior to your symposium date.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-[#EAE6DA]/40 dark:bg-[#232826] border border-[#D2CEC2]/50">
                        <span className="text-[#66645E] block text-[10px]">Cheapest Option</span>
                        <span className="font-bold">CampusFab (₹64,500)</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#EAE6DA]/40 dark:bg-[#232826] border border-[#D2CEC2]/50">
                        <span className="text-[#66645E] block text-[10px]">Fastest Turnaround</span>
                        <span className="font-bold">Heritage Press (4 Days)</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* State 3: Mutual Agreement */}
                {heroStep === 3 && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <Badge variant="neutral">Mutual Agreement #AGR-102</Badge>
                      <span className="text-xs text-[#365C63] font-bold">Both Signed</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white dark:bg-[#232826] border border-[#D2CEC2] dark:border-[#3C4743] space-y-2.5">
                      <div className="flex justify-between text-xs pb-2 border-b border-[#D2CEC2]/50">
                        <span className="text-[#66645E]">Buyer:</span>
                        <span className="font-semibold">Aditya S. (College Lead)</span>
                      </div>
                      <div className="flex justify-between text-xs pb-2 border-b border-[#D2CEC2]/50">
                        <span className="text-[#66645E]">Supplier:</span>
                        <span className="font-semibold">Chennai PrintWorks</span>
                      </div>
                      <div className="flex justify-between text-xs pb-2 border-b border-[#D2CEC2]/50">
                        <span className="text-[#66645E]">Agreed Price:</span>
                        <span className="font-bold text-sm text-[#365C63]">₹72,000 Fixed</span>
                      </div>
                      <div className="flex items-center justify-between pt-1 text-[11px] text-[#365C63] font-semibold">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Buyer Signed (Oct 3)
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Supplier Signed (Oct 3)
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* State 4: Milestone Tracking */}
                {heroStep === 4 && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <Badge variant="accent">Order #ORD-801 Tracking</Badge>
                      <span className="text-xs font-mono text-[#365C63]">Phase 3/7 Active</span>
                    </div>
                    <div className="p-4 rounded-xl bg-[#EAE6DA]/40 dark:bg-[#232826] border border-[#D2CEC2]/60 dark:border-[#3C4743] space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-7 w-7 rounded-full bg-[#365C63] text-white flex items-center justify-center text-xs font-bold">
                          ✓
                        </div>
                        <div className="text-xs">
                          <span className="font-bold block">1. Agreement Confirmed</span>
                          <span className="text-[10px] text-[#66645E]">Sept 23, 2026</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-7 w-7 rounded-full bg-[#365C63] text-white flex items-center justify-center text-xs font-bold">
                          ✓
                        </div>
                        <div className="text-xs">
                          <span className="font-bold block">2. Raw Material Cut & Prepped</span>
                          <span className="text-[10px] text-[#66645E]">Sept 25, 2026</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-7 w-7 rounded-full bg-[#252525] text-[#FFFDF7] flex items-center justify-center text-xs font-bold animate-pulse">
                          3
                        </div>
                        <div className="text-xs">
                          <span className="font-bold block text-[#365C63]">3. Printing Batch in Progress (62%)</span>
                          <span className="text-[10px] text-[#66645E]">Est. Handover: Oct 08, 2026</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom Scrubber Indicator */}
                <div className="mt-5 pt-3 border-t border-[#D2CEC2]/60 dark:border-[#3C4743]/60 flex items-center justify-between text-xs text-[#66645E] dark:text-[#A6A39A]">
                  <span className="font-mono text-[11px]">
                    Step {heroStep + 1} of 5: {heroSteps[heroStep].title}
                  </span>
                  <button
                    onClick={() => setHeroStep((prev) => (prev + 1) % 5)}
                    className="font-bold text-[#252525] dark:text-[#FFFDF7] hover:text-[#365C63] flex items-center gap-1 cursor-pointer"
                  >
                    Next Stage <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: The Procurement Bottleneck */}
      <section className="py-20 border-b border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] transition-colors">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
              Why traditional catalogs fail serious buyers
            </h2>
            <p className="text-sm text-[#66645E] dark:text-[#A6A39A] mt-3 leading-relaxed">
              Standard e-commerce marketplaces force buyers to search thousands of listings, send cold inquiries, and guess whether a supplier can handle custom quantities on time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#F4F1E8] dark:bg-[#1C201F]">
              <div className="h-10 w-10 rounded-lg bg-[#9A5C55]/15 text-[#9A5C55] flex items-center justify-center font-bold mb-4">
                ✕
              </div>
              <h3 className="text-base font-bold text-[#252525] dark:text-[#FFFDF7] mb-2">
                Endless Search Fatigue
              </h3>
              <p className="text-xs text-[#66645E] dark:text-[#A6A39A] leading-relaxed">
                Browsing 50 different supplier storefronts to find someone who handles 500 cotton tees, only to discover their minimum order quantity is 2,000 or their lead time is 4 weeks.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#F4F1E8] dark:bg-[#1C201F]">
              <div className="h-10 w-10 rounded-lg bg-[#9A5C55]/15 text-[#9A5C55] flex items-center justify-center font-bold mb-4">
                ✕
              </div>
              <h3 className="text-base font-bold text-[#252525] dark:text-[#FFFDF7] mb-2">
                Opaque Bidding & Surcharges
              </h3>
              <p className="text-xs text-[#66645E] dark:text-[#A6A39A] leading-relaxed">
                Prices listed online rarely include screen preparation, GST, express delivery, or custom packaging, leading to surprise invoices halfway through production.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#F4F1E8] dark:bg-[#1C201F]">
              <div className="h-10 w-10 rounded-lg bg-[#9A5C55]/15 text-[#9A5C55] flex items-center justify-center font-bold mb-4">
                ✕
              </div>
              <h3 className="text-base font-bold text-[#252525] dark:text-[#FFFDF7] mb-2">
                No Delivery Accountability
              </h3>
              <p className="text-xs text-[#66645E] dark:text-[#A6A39A] leading-relaxed">
                Vague promises made over WhatsApp with zero binding agreements. When event day arrives and the order is delayed, buyers have no contractual recourse.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: How Need2Deal Reverses the Process */}
      <section className="py-20 border-b border-[#D2CEC2] dark:border-[#3C4743]">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
              The reverse marketplace model in action
            </h2>
            <p className="text-sm text-[#66645E] dark:text-[#A6A39A] mt-3 leading-relaxed">
              We flipped the market dynamics. You define the requirement once; vetted suppliers compete for your deal with clear terms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="p-8 rounded-2xl bg-[#252525] text-[#FFFDF7] shadow-xl space-y-6">
              <h3 className="text-2xl font-bold tracking-tight">The Need2Deal Advantage</h3>
              <ul className="space-y-4 text-xs leading-relaxed text-[#FFFDF7]/90">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-[#8BAAB8] mt-0.5 shrink-0" />
                  <span><strong>Demand Broadcasting:</strong> Your post instantly reaches pre-vetted suppliers whose machinery matches your exact volume.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-[#8BAAB8] mt-0.5 shrink-0" />
                  <span><strong>Transparent Apples-to-Apples:</strong> Compare offers in an interactive table covering price, turnaround, fabric GSM, and warranty.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-[#8BAAB8] mt-0.5 shrink-0" />
                  <span><strong>Locked Agreements:</strong> Both parties digitally confirm an immutable terms sheet before any payment changes hands.</span>
                </li>
              </ul>
              <Button
                variant="secondary"
                size="md"
                onClick={() => navigate('/buyer/requirements/new')}
                className="mt-2"
              >
                Post Your First Requirement
              </Button>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525]">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-[#365C63]">01</span>
                  <h4 className="text-sm font-bold text-[#252525] dark:text-[#FFFDF7]">Zero Cold Outreach</h4>
                </div>
                <p className="text-xs text-[#66645E] dark:text-[#A6A39A] mt-1.5 ml-7">
                  You do not message 10 vendors. Vendors submit binding bids directly to your requirement dashboard.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525]">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-[#365C63]">02</span>
                  <h4 className="text-sm font-bold text-[#252525] dark:text-[#FFFDF7]">Intelligent Match Scoring</h4>
                </div>
                <p className="text-xs text-[#66645E] dark:text-[#A6A39A] mt-1.5 ml-7">
                  The system ranks proposals based on past reliability, delivery buffer, and budget savings rather than just the lowest sticker price.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525]">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-[#365C63]">03</span>
                  <h4 className="text-sm font-bold text-[#252525] dark:text-[#FFFDF7]">Milestone Fulfillment Tracking</h4>
                </div>
                <p className="text-xs text-[#66645E] dark:text-[#A6A39A] mt-1.5 ml-7">
                  Suppliers log material prep, production progress, and dispatch proof directly in your shared timeline.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 & 4: Buyer & Provider Workflows */}
      <section className="py-20 border-b border-[#D2CEC2] dark:border-[#3C4743] bg-[#EAE6DA]/40 dark:bg-[#232826]/40 transition-colors">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
              Engineered for both sides of the deal
            </h2>
            <p className="text-sm text-[#66645E] dark:text-[#A6A39A] mt-2">
              Whether you are organizing a university festival or running an industrial print shop, Need2Deal streamlines the entire transaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Buyer Journey */}
            <div className="p-8 rounded-2xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#365C63] uppercase tracking-wider">Buyer Workflow</span>
                <Badge variant="accent">For Colleges & Teams</Badge>
              </div>
              <h3 className="text-xl font-bold text-[#252525] dark:text-[#FFFDF7]">
                From concept to verified delivery in 4 steps
              </h3>
              <div className="space-y-4 text-xs">
                <div className="flex gap-3">
                  <span className="h-6 w-6 rounded-md bg-[#252525] text-white flex items-center justify-center font-bold text-[11px] shrink-0">1</span>
                  <div>
                    <strong className="block text-sm text-[#252525] dark:text-[#FFFDF7]">Describe Your Requirement</strong>
                    <span className="text-[#66645E] dark:text-[#A6A39A]">Type naturally or use structured fields: units, materials, budget, and firm deadline.</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="h-6 w-6 rounded-md bg-[#252525] text-white flex items-center justify-center font-bold text-[11px] shrink-0">2</span>
                  <div>
                    <strong className="block text-sm text-[#252525] dark:text-[#FFFDF7]">Compare Bids in Table View</strong>
                    <span className="text-[#66645E] dark:text-[#A6A39A]">Analyze the difference between lowest price, fastest delivery, and best overall reliability.</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="h-6 w-6 rounded-md bg-[#252525] text-white flex items-center justify-center font-bold text-[11px] shrink-0">3</span>
                  <div>
                    <strong className="block text-sm text-[#252525] dark:text-[#FFFDF7]">Digital Agreement Signing</strong>
                    <span className="text-[#66645E] dark:text-[#A6A39A]">Sign off on mutually acknowledged specifications and delivery guarantees.</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="h-6 w-6 rounded-md bg-[#252525] text-white flex items-center justify-center font-bold text-[11px] shrink-0">4</span>
                  <div>
                    <strong className="block text-sm text-[#252525] dark:text-[#FFFDF7]">Real-Time Milestone Tracking</strong>
                    <span className="text-[#66645E] dark:text-[#A6A39A]">Receive automated alerts at raw material prep, batch production, and campus arrival.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Provider Advantage */}
            <div className="p-8 rounded-2xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#A37B52] uppercase tracking-wider">Supplier Advantage</span>
                <Badge variant="warning">For Manufacturers</Badge>
              </div>
              <h3 className="text-xl font-bold text-[#252525] dark:text-[#FFFDF7]">
                Guaranteed high-intent demand with zero marketing spend
              </h3>
              <div className="space-y-4 text-xs">
                <div className="flex gap-3">
                  <span className="h-6 w-6 rounded-md bg-[#A37B52] text-white flex items-center justify-center font-bold text-[11px] shrink-0">1</span>
                  <div>
                    <strong className="block text-sm text-[#252525] dark:text-[#FFFDF7]">Pre-Qualified Needs Feed</strong>
                    <span className="text-[#66645E] dark:text-[#A6A39A]">Access genuine procurement orders with verified budgets and explicit delivery dates.</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="h-6 w-6 rounded-md bg-[#A37B52] text-white flex items-center justify-center font-bold text-[11px] shrink-0">2</span>
                  <div>
                    <strong className="block text-sm text-[#252525] dark:text-[#FFFDF7]">Targeted Category Alerts</strong>
                    <span className="text-[#66645E] dark:text-[#A6A39A]">Get notified only when buyer requests match your machinery and capacity.</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="h-6 w-6 rounded-md bg-[#A37B52] text-white flex items-center justify-center font-bold text-[11px] shrink-0">3</span>
                  <div>
                    <strong className="block text-sm text-[#252525] dark:text-[#FFFDF7]">No Payment Haggling</strong>
                    <span className="text-[#66645E] dark:text-[#A6A39A]">Contracts are digitally executed with upfront agreement on price and inspection terms.</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="h-6 w-6 rounded-md bg-[#A37B52] text-white flex items-center justify-center font-bold text-[11px] shrink-0">4</span>
                  <div>
                    <strong className="block text-sm text-[#252525] dark:text-[#FFFDF7]">Reliability Score Growth</strong>
                    <span className="text-[#66645E] dark:text-[#A6A39A]">Every on-time order compounds your platform reputation and wins you more volume.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Multi-Factor Offer Comparison Preview */}
      <section className="py-20 border-b border-[#D2CEC2] dark:border-[#3C4743]">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="max-w-2xl mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
              Compare beyond the lowest price
            </h2>
            <p className="text-sm text-[#66645E] dark:text-[#A6A39A] mt-2">
              Choosing only the cheapest bid often leads to missed deadlines and poor materials. Need2Deal clearly contrasts price, delivery speed, and reliability.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#EAE6DA] dark:bg-[#232826] border-b border-[#D2CEC2] dark:border-[#3C4743] text-[#66645E] dark:text-[#A6A39A]">
                <tr>
                  <th className="p-4 font-bold">Supplier</th>
                  <th className="p-4 font-bold">Quoted Price</th>
                  <th className="p-4 font-bold">Delivery Time</th>
                  <th className="p-4 font-bold">Reliability Score</th>
                  <th className="p-4 font-bold">Match Rationale</th>
                  <th className="p-4 font-bold text-right">Verdict</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D2CEC2]/40 dark:divide-[#3C4743]/40">
                <tr className="bg-[#E7EFE5]/40 dark:bg-[#29382B]/40 font-medium">
                  <td className="p-4">
                    <span className="font-bold text-[#252525] dark:text-[#FFFDF7] block">Chennai PrintWorks</span>
                    <span className="text-[11px] text-[#365C63]">184 Orders Completed</span>
                  </td>
                  <td className="p-4 font-bold text-sm">₹72,000</td>
                  <td className="p-4 font-bold text-[#365C63]">6 Days (Buffer: +2d)</td>
                  <td className="p-4 font-bold">96%</td>
                  <td className="p-4 text-[#66645E] dark:text-[#A6A39A] max-w-xs">
                    Meets 210 GSM bio-wash, ₹8k under budget, campus verified.
                  </td>
                  <td className="p-4 text-right">
                    <Badge variant="match">Best Overall Match</Badge>
                  </td>
                </tr>
                <tr>
                  <td className="p-4">
                    <span className="font-bold text-[#252525] dark:text-[#FFFDF7] block">CampusFab Solutions</span>
                    <span className="text-[11px] text-[#66645E]">64 Orders Completed</span>
                  </td>
                  <td className="p-4 font-bold text-sm text-[#365C63]">₹64,500</td>
                  <td className="p-4">9 Days (Close to deadline)</td>
                  <td className="p-4">89%</td>
                  <td className="p-4 text-[#66645E] dark:text-[#A6A39A] max-w-xs">
                    ₹15.5k under budget, but lighter 190 GSM fabric.
                  </td>
                  <td className="p-4 text-right">
                    <Badge variant="neutral">Cheapest</Badge>
                  </td>
                </tr>
                <tr>
                  <td className="p-4">
                    <span className="font-bold text-[#252525] dark:text-[#FFFDF7] block">Heritage Paper & Press</span>
                    <span className="text-[11px] text-[#66645E]">240 Orders Completed</span>
                  </td>
                  <td className="p-4 font-bold text-sm">₹79,000</td>
                  <td className="p-4 font-bold text-[#365C63]">4 Days Express</td>
                  <td className="p-4 font-bold">97%</td>
                  <td className="p-4 text-[#66645E] dark:text-[#A6A39A] max-w-xs">
                    Fastest turnaround, ready fabric blanks in warehouse.
                  </td>
                  <td className="p-4 text-right">
                    <Badge variant="warning">Fastest</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 6: Natural Language Requirement Parser */}
      <section className="py-20 border-b border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] transition-colors">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
                Describe your need in plain words
              </h2>
              <p className="text-sm text-[#66645E] dark:text-[#A6A39A] leading-relaxed">
                No complex RFQ templates or spreadsheets. Simply write a sentence about what you want. Our intelligent parsing engine extracts quantity, unit, budget cap, deadline, and tags automatically.
              </p>
              <div className="pt-2">
                <Button
                  variant="primary"
                  onClick={() => navigate('/buyer/requirements/new')}
                >
                  Try the Natural Language Parser
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#F4F1E8] dark:bg-[#1C201F] p-6 space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-[#66645E] dark:text-[#A6A39A]">
                  Example Input
                </div>
                <div className="p-4 rounded-lg bg-[#FFFDF7] dark:bg-[#252525] border border-[#D2CEC2] dark:border-[#3C4743] text-sm text-[#252525] dark:text-[#FFFDF7] italic">
                  &ldquo;I need 500 custom cotton T-shirts for our college event. Budget is ₹80,000 and I need delivery within 7 days in Chennai.&rdquo;
                </div>

                <div className="pt-2 space-y-2">
                  <span className="text-xs font-bold text-[#365C63] flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" /> Structured Output Extracted:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="p-2.5 rounded-md bg-[#FFFDF7] dark:bg-[#252525] border border-[#D2CEC2]/60">
                      <span className="text-[#66645E] block text-[10px]">Product</span>
                      <strong className="text-[#252525] dark:text-[#FFFDF7]">Custom T-Shirts</strong>
                    </div>
                    <div className="p-2.5 rounded-md bg-[#FFFDF7] dark:bg-[#252525] border border-[#D2CEC2]/60">
                      <span className="text-[#66645E] block text-[10px]">Quantity</span>
                      <strong className="text-[#252525] dark:text-[#FFFDF7]">500 Units</strong>
                    </div>
                    <div className="p-2.5 rounded-md bg-[#FFFDF7] dark:bg-[#252525] border border-[#D2CEC2]/60">
                      <span className="text-[#66645E] block text-[10px]">Budget</span>
                      <strong className="text-[#252525] dark:text-[#FFFDF7]">₹80,000 Cap</strong>
                    </div>
                    <div className="p-2.5 rounded-md bg-[#FFFDF7] dark:bg-[#252525] border border-[#D2CEC2]/60">
                      <span className="text-[#66645E] block text-[10px]">Timeline</span>
                      <strong className="text-[#252525] dark:text-[#FFFDF7]">7 Days Lead</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: Mutual Digital Agreements */}
      <section className="py-20 border-b border-[#D2CEC2] dark:border-[#3C4743]">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-6 space-y-5">
              <h2 className="text-3xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
                Mutual digital contracts before work starts
              </h2>
              <p className="text-sm text-[#66645E] dark:text-[#A6A39A] leading-relaxed">
                Misunderstandings kill events and businesses. On Need2Deal, selecting an offer generates a standardized mutual agreement stating the exact specifications, delivery handover location, and dispute terms.
              </p>
              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-center gap-2 text-[#252525] dark:text-[#FFFDF7] font-semibold">
                  <CheckCircle2 className="h-4 w-4 text-[#365C63]" />
                  <span>Both buyer and supplier digitally acknowledge specifications</span>
                </div>
                <div className="flex items-center gap-2 text-[#252525] dark:text-[#FFFDF7] font-semibold">
                  <CheckCircle2 className="h-4 w-4 text-[#365C63]" />
                  <span>Fixed pricing guarantee — zero mid-production renegotiation</span>
                </div>
                <div className="flex items-center gap-2 text-[#252525] dark:text-[#FFFDF7] font-semibold">
                  <CheckCircle2 className="h-4 w-4 text-[#365C63]" />
                  <span>Immutable audit log for institutional reimbursement</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-6">
              <div className="p-6 rounded-2xl bg-[#FFFDF7] dark:bg-[#252525] border border-[#D2CEC2] dark:border-[#3C4743] shadow-md space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#D2CEC2]/60 dark:border-[#3C4743]/60">
                  <div className="flex items-center gap-2">
                    <FileCheck className="h-4 w-4 text-[#365C63]" />
                    <span className="font-bold text-xs uppercase tracking-wider text-[#252525] dark:text-[#FFFDF7]">Contract Preview</span>
                  </div>
                  <Badge variant="success">Agreed & Active</Badge>
                </div>
                <div className="p-3.5 rounded-lg bg-[#F4F1E8] dark:bg-[#1C201F] text-xs font-mono space-y-1.5 text-[#252525] dark:text-[#FFFDF7]">
                  <p>• PRODUCT: 1,000 Custom Eco-Friendly Jute Bags</p>
                  <p>• SPEC: Export-grade laminated jute, screen printed crest</p>
                  <p>• FIXED PRICE: ₹62,000 all-inclusive</p>
                  <p>• DEADLINE: Oct 10, 2026</p>
                  <p>• LOCATION: Anna University Campus Gate 1</p>
                </div>
                <div className="flex items-center justify-between pt-2 text-[11px] text-[#66645E] dark:text-[#A6A39A]">
                  <span>Signed by Aditya Swaminathan (Buyer)</span>
                  <span>Signed by Ramanathan K. (Supplier)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: Order Tracking & Reminders */}
      <section className="py-20 border-b border-[#D2CEC2] dark:border-[#3C4743] bg-[#EAE6DA]/30 dark:bg-[#232826]/30 transition-colors">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
              Live order tracking with SLA reminders
            </h2>
            <p className="text-sm text-[#66645E] dark:text-[#A6A39A] mt-2">
              Stay in control as production advances. Real-time notifications alert both parties if a milestone slips, keeping delivery on target.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525]">
              <div className="h-8 w-8 rounded-md bg-[#365C63]/15 text-[#365C63] flex items-center justify-center mb-3">
                <FileCheck className="h-4 w-4" />
              </div>
              <h4 className="font-bold text-sm text-[#252525] dark:text-[#FFFDF7] mb-1">Contract Execution</h4>
              <p className="text-xs text-[#66645E] dark:text-[#A6A39A]">Immediate notification when the supplier confirms terms and commits workshop capacity.</p>
            </div>

            <div className="p-5 rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525]">
              <div className="h-8 w-8 rounded-md bg-[#365C63]/15 text-[#365C63] flex items-center justify-center mb-3">
                <Layers className="h-4 w-4" />
              </div>
              <h4 className="font-bold text-sm text-[#252525] dark:text-[#FFFDF7] mb-1">Production Milestones</h4>
              <p className="text-xs text-[#66645E] dark:text-[#A6A39A]">Log material cutting, print batch completion, and quality control checks live.</p>
            </div>

            <div className="p-5 rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525]">
              <div className="h-8 w-8 rounded-md bg-[#365C63]/15 text-[#365C63] flex items-center justify-center mb-3">
                <BellRing className="h-4 w-4" />
              </div>
              <h4 className="font-bold text-sm text-[#252525] dark:text-[#FFFDF7] mb-1">Proactive SLA Alerts</h4>
              <p className="text-xs text-[#66645E] dark:text-[#A6A39A]">Automatic reminders trigger 5 days and 48 hours prior to the firm delivery deadline.</p>
            </div>

            <div className="p-5 rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525]">
              <div className="h-8 w-8 rounded-md bg-[#365C63]/15 text-[#365C63] flex items-center justify-center mb-3">
                <Package className="h-4 w-4" />
              </div>
              <h4 className="font-bold text-sm text-[#252525] dark:text-[#FFFDF7] mb-1">Delivery Sign-Off</h4>
              <p className="text-xs text-[#66645E] dark:text-[#A6A39A]">Secure handover verification ensuring goods match approved physical specimens.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: Popular Need Categories */}
      <section className="py-20 border-b border-[#D2CEC2] dark:border-[#3C4743]">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
                Explore core demand categories
              </h2>
              <p className="text-sm text-[#66645E] dark:text-[#A6A39A] mt-2">
                Active requirements spanning student festivals, hardware laboratories, and institutional conferences.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/buyer/categories')}
              className="mt-4 sm:mt-0"
            >
              View All Categories
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {marketplaceCategories.map((cat) => {
              const iconMap: Record<string, React.ReactNode> = {
                Shirt: <Shirt className="h-5 w-5 text-[#365C63]" />,
                FileText: <FileText className="h-5 w-5 text-[#A37B52]" />,
                Cpu: <Cpu className="h-5 w-5 text-[#252525] dark:text-[#8BAAB8]" />,
                Volume2: <Volume2 className="h-5 w-5 text-[#9A5C55]" />,
                Hammer: <Hammer className="h-5 w-5 text-[#365C63]" />,
                Package: <Package className="h-5 w-5 text-[#A37B52]" />
              };

              return (
                <div
                  key={cat.name}
                  onClick={() => navigate(`/buyer/requirements?cat=${encodeURIComponent(cat.name)}`)}
                  className="p-4 rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] hover:border-[#365C63] transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="p-2.5 rounded-lg bg-[#EAE6DA] dark:bg-[#232826] w-fit mb-3 group-hover:scale-105 transition-transform">
                      {iconMap[cat.icon] || <Package className="h-5 w-5" />}
                    </div>
                    <h3 className="font-bold text-xs text-[#252525] dark:text-[#FFFDF7] mb-1">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-[#66645E] dark:text-[#A6A39A] line-clamp-2">
                      {cat.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-[#D2CEC2]/40 text-[10px] font-mono text-[#365C63] font-bold">
                    {cat.count} Active Needs
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 10: Final Editorial CTA */}
      <section className="py-20 bg-[#EAE6DA] dark:bg-[#232826] text-[#252525] dark:text-[#FFFDF7] border-t border-[#D2CEC2] dark:border-[#3C4743] transition-colors">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center">
          <div className="max-w-3xl mx-auto space-y-5">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              Ready to experience needs-first procurement?
            </h2>
            <p className="text-sm sm:text-base text-[#66645E] dark:text-[#A6A39A] max-w-xl mx-auto leading-relaxed">
              Join collegiate committees, procurement managers, and certified manufacturers discovering deals without endless catalog hunting.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
              <Button
                size="lg"
                variant="primary"
                onClick={() => navigate('/signup?role=buyer')}
                className="w-full sm:w-auto"
              >
                Post a Requirement as Buyer
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/signup?role=provider')}
                className="w-full sm:w-auto bg-[#FFFDF7] dark:bg-[#272E2B]"
              >
                Join as Verified Supplier
              </Button>
            </div>
            <p className="text-xs text-[#66645E] dark:text-[#A6A39A] pt-2">
              Takes less than 90 seconds. No credit card required.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
