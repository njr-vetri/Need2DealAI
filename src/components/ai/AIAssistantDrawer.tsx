import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, X, Send, Bot, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Button } from '../ui/Button';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  actionText?: string;
  actionLink?: string;
  timestamp: string;
}

export function AIAssistantDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { role, requirements, offers, providers, orders } = useMarketplace();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Derive active context based on route
  const currentReqId = location.pathname.match(/\/requirements\/([^/]+)/)?.[1];
  const currentOrderId = location.pathname.match(/\/orders\/([^/]+)/)?.[1];

  const activeReq = requirements.find((r) => r.id === currentReqId);
  const activeOrder = orders.find((o) => o.id === currentOrderId);
  const reqOffers = activeReq ? offers.filter((o) => o.requirementId === activeReq.id) : [];

  const [messages, setMessages] = useState<Message[]>([]);

  // Initialize contextual greeting whenever route changes or drawer opens
  useEffect(() => {
    let initialGreeting = '';
    let quickChips: string[] = [];

    if (activeReq) {
      initialGreeting = `I see you are viewing requirement "${activeReq.title}". There are ${reqOffers.length} offers submitted. Chennai PrintWorks currently ranks as your strongest overall match (96%). How can I help evaluate or enquire?`;
      quickChips = [
        'Why is Chennai PrintWorks recommended?',
        'Compare pricing vs fastest delivery',
        'Draft an enquiry message about fabric GSM'
      ];
    } else if (location.pathname.includes('/requirements/new')) {
      initialGreeting = `Ready to post a new requirement! You can describe your need naturally (e.g. "Need 500 cotton hoodies for tech fest, budget ₹80,000, 7 days"), and our parser will extract structured specifications automatically.`;
      quickChips = [
        'Give me a good prompt for bulk t-shirts',
        'What budget is typical for 20 IoT kits?',
        'How to ensure reliable delivery'
      ];
    } else if (activeOrder) {
      initialGreeting = `Tracking Order #${activeOrder.id} (${activeOrder.title}). Status is currently "${activeOrder.status.replace('_', ' ')}", due on ${activeOrder.deliveryDate}. No delay risk detected.`;
      quickChips = [
        'Check milestone completion SLA',
        'When is the next status update expected?',
        'How to contact provider logistics'
      ];
    } else if (role === 'provider') {
      initialGreeting = `Welcome to the Provider Assistant! I can help you evaluate open buyer requirements, craft competitive bids that win deals, and optimize your delivery turnaround.`;
      quickChips = [
        'Which open requirements fit my category best?',
        'How do I calculate a winning bid margin?',
        'Tips to increase my reliability score'
      ];
    } else {
      initialGreeting = `Welcome to Need2Deal Procurement Assistant. I can help you draft requirements, benchmark supplier quotes, inspect mutual agreements, and track fulfillment milestones.`;
      quickChips = [
        'Show my items needing attention',
        'How does the mutual agreement flow work?',
        'Best practices for college symposium procurement'
      ];
    }

    setMessages([
      {
        id: 'init-1',
        sender: 'assistant',
        text: initialGreeting,
        timestamp: 'Just now'
      }
    ]);
  }, [location.pathname, role, activeReq?.id, activeOrder?.id]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Context-aware simulated assistant logic
    setTimeout(() => {
      let replyText = '';
      let actionText: string | undefined;
      let actionLink: string | undefined;

      const q = query.toLowerCase();

      if (q.includes('why') && q.includes('recommended') && activeReq) {
        replyText = `Chennai PrintWorks is scored at 96% because:
1. Pricing: At ₹72,000, it is 10% below your ₹80,000 budget cap.
2. Timeline: Delivers in 6 days (2 days ahead of your Oct 18 deadline).
3. Track Record: 96% reliability score over 184 completed orders in Apparel with zero past missed deadlines.`;
        actionText = 'View Comparison Table';
        actionLink = `/buyer/requirements/${activeReq.id}`;
      } else if (q.includes('compare') && activeReq) {
        replyText = `Here is the breakdown for "${activeReq.title}":
• Cheapest: CampusFab Solutions at ₹64,500 (9 days delivery, 190 GSM).
• Fastest: Heritage Paper & Press at ₹79,000 (4 days express turnaround, 220 GSM).
• Best Overall: Chennai PrintWorks at ₹72,000 (6 days delivery, 210 GSM bio-washed).`;
      } else if (q.includes('draft') || q.includes('enquiry') || q.includes('message')) {
        replyText = `Here is a suggested enquiry message you can send directly:
"Hello, we are finalizing supplier selection for our 500 T-shirts requirement. Could you confirm if 210 GSM fabric is pre-shrunk, and whether a physical sample swatch can be verified on campus prior to the batch run?"`;
      } else if (q.includes('prompt') || q.includes('bulk t-shirts')) {
        replyText = `Try this description in the Natural Language input:
"Need 500 custom cotton t-shirts for college tech fest in Navy Blue with 2-color front screen print. Budget is ₹80,000 and delivery needed within 7 days in Chennai."`;
        actionText = 'Open Create Requirement';
        actionLink = '/buyer/requirements/new';
      } else if (q.includes('attention') || q.includes('needs attention')) {
        replyText = `Items currently requiring your decision:
1. 3 offers waiting on "500 custom cotton T-shirts"
2. Mutual Agreement for "Auditorium Sound & Rigging" awaits your signature
3. Order #ord-801 (1,000 Jute Bags) is in production and on track for Oct 10 delivery.`;
        actionText = 'Review Pending Agreement';
        actionLink = '/buyer/agreements/agr-101';
      } else if (q.includes('agreement') || q.includes('mutual agreement')) {
        replyText = `Need2Deal uses mutual digital agreements before orders are released:
1. Buyer accepts an offer → Platform generates a digital contract with agreed price, deadline, and specs.
2. Both Buyer and Provider digitally sign the terms.
3. Once agreed, the order automatically creates milestone tracking for live fulfillment!`;
      } else if (q.includes('milestone') || q.includes('sla')) {
        replyText = `Order milestones are tracked across 7 phases:
Agreement Confirmed → Provider Started → Production → Quality Checked → Dispatched → Out for Delivery → Completed.
Current order #ord-801 is at Phase 3 (Production) with zero risk flags.`;
      } else if (role === 'provider' && (q.includes('winning') || q.includes('fit'))) {
        replyText = `For maximum win-rate on Need2Deal:
1. Quote within 5-15% below buyer budget.
2. Offer delivery at least 2 days ahead of buyer deadline.
3. Detail fabric specs, warranty guarantees, and previous student fest experience in your offer notes.`;
      } else {
        replyText = `I have recorded your query. In Need2Deal, all procurement steps — from natural requirement posting to offer comparison, mutual agreements, and milestone tracking — are unified to eliminate back-and-forth friction.`;
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        actionText,
        actionLink,
        timestamp: 'Just now'
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-3 py-2 rounded-md bg-[#365C63] text-[#FFFDF7] shadow-md hover:bg-[#2B494F] transition-colors cursor-pointer border border-[#2B494F]"
        title="Open Procurement Assistant"
      >
        <Bot className="h-4 w-4 text-[#FFFDF7]" />
        <span className="text-xs font-semibold tracking-tight">Need2Deal Assistant</span>
      </button>

      {/* Slide-over Assistant Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#252525]/40 transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative z-10 w-full max-w-md h-full bg-[#FFFDF7] dark:bg-[#272E2B] border-l border-[#D2CEC2] dark:border-[#3C4743] shadow-xl flex flex-col animate-in slide-in-from-right duration-200">
            {/* Header */}
            <div className="p-4 border-b border-[#D2CEC2] dark:border-[#3C4743] flex items-center justify-between bg-[#EAE6DA] dark:bg-[#232826]">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-md bg-[#365C63] text-[#FFFDF7]">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#252525] dark:text-[#FFFDF7]">
                    Procurement Assistant
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#66645E] dark:text-[#A6A39A]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#66805F]" />
                    <span>
                      {activeReq
                        ? `Context: ${activeReq.title.slice(0, 24)}...`
                        : activeOrder
                        ? `Context: Order #${activeOrder.id}`
                        : `${role === 'buyer' ? 'Buyer Mode' : 'Provider Mode'}`}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-md text-[#66645E] hover:bg-[#E2DDD2] dark:hover:bg-[#2A332F] text-[#252525] dark:text-[#FFFDF7] transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Conversation Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${
                    m.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-md p-3 text-xs leading-relaxed whitespace-pre-wrap ${
                      m.sender === 'user'
                        ? 'bg-[#365C63] text-[#FFFDF7] shadow-xs'
                        : 'bg-[#EAE6DA] dark:bg-[#232826] text-[#252525] dark:text-[#EDE9E1] border border-[#D2CEC2] dark:border-[#3C4743]'
                    }`}
                  >
                    {m.text}

                    {m.actionText && m.actionLink && (
                      <div className="mt-2.5 pt-2 border-t border-[#D2CEC2]/60 dark:border-[#3C4743]/60">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            navigate(m.actionLink!);
                            setIsOpen(false);
                          }}
                          className="w-full text-xs h-7 gap-1"
                        >
                          {m.actionText} <ArrowRight className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-[#66645E] dark:text-[#A6A39A] mt-1 px-1">
                    {m.timestamp}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 p-2.5 rounded-md bg-[#EAE6DA] dark:bg-[#232826] text-xs text-[#66645E] dark:text-[#A6A39A] w-20">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#365C63] animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#365C63] animate-bounce delay-100" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#365C63] animate-bounce delay-200" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Context Chips */}
            <div className="p-3 border-t border-[#D2CEC2] dark:border-[#3C4743] bg-[#EAE6DA]/50 dark:bg-[#232826]/50">
              <span className="text-[11px] font-semibold text-[#66645E] dark:text-[#A6A39A] block mb-1.5">
                Suggested questions:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  activeReq ? 'Why Chennai PrintWorks?' : 'Items needing attention',
                  activeReq ? 'Compare pricing' : 'Explain mutual agreement',
                  'Check order delivery risk'
                ].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleSend(chip)}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-[#FFFDF7] dark:bg-[#272E2B] text-[#252525] dark:text-[#EDE9E1] border border-[#D2CEC2] dark:border-[#3C4743] hover:bg-[#EAE6DA] transition-colors text-left"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#272E2B]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about this requirement..."
                  className="flex-1 bg-[#FFFDF7] dark:bg-[#232826] border border-[#D2CEC2] dark:border-[#3C4743] rounded-md px-3 py-2 text-xs text-[#252525] dark:text-[#FFFDF7] placeholder-[#66645E]/70 focus:outline-none focus:ring-1 focus:ring-[#365C63]"
                />
                <Button
                  type="submit"
                  size="sm"
                  variant="primary"
                  disabled={!input.trim() || isTyping}
                  className="h-8 px-3"
                >
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
