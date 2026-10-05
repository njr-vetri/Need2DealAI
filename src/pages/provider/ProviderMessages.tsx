import React, { useState } from 'react';
import { Send, MessageSquare } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useMarketplace } from '../../context/MarketplaceContext';

export function ProviderMessages() {
  const { messages, sendMessage, requirements } = useMarketplace();
  const [inputText, setInputText] = useState('');
  const [selectedReqId, setSelectedReqId] = useState<string>('req-1');

  const activeReq = requirements.find((r) => r.id === selectedReqId) || requirements[0];
  const reqMessages = messages.filter((m) => m.requirementId === selectedReqId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendMessage(inputText, selectedReqId, undefined, 'provider');
    setInputText('');
  };

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-[#D2CEC2] dark:border-[#3C4743]">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
          Buyer Inquiries & Message Threads
        </h1>
        <p className="text-xs sm:text-sm text-[#66645E] dark:text-[#A6A39A] mt-0.5">
          Direct communication with buyers evaluating your bids or negotiating technical specs.
        </p>
      </div>

      <div className="rounded-2xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] shadow-xs overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
        {/* Left: Threads */}
        <div className="md:col-span-4 border-r border-[#D2CEC2] dark:border-[#3C4743] bg-[#EAE6DA]/30 dark:bg-[#232826]/30">
          <div className="p-4 border-b border-[#D2CEC2]/60 dark:border-[#3C4743]/60 text-xs font-mono uppercase tracking-wider text-[#66645E]">
            Buyer Demand Conversations
          </div>
          <div className="divide-y divide-[#D2CEC2]/40 dark:divide-[#3C4743]/40">
            {requirements.slice(0, 3).map((r) => (
              <div
                key={r.id}
                onClick={() => setSelectedReqId(r.id)}
                className={`p-4 transition-colors cursor-pointer space-y-1 ${
                  selectedReqId === r.id
                    ? 'bg-[#EAE6DA] dark:bg-[#232826]'
                    : 'hover:bg-[#EAE6DA]/50 dark:hover:bg-[#232826]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#66645E] uppercase">{r.id}</span>
                  <Badge variant="accent">{r.category}</Badge>
                </div>
                <h4 className="text-xs font-bold text-[#252525] dark:text-[#FFFDF7] line-clamp-1">
                  {r.title}
                </h4>
                <p className="text-[11px] text-[#66645E] dark:text-[#A6A39A]">
                  Client: {r.buyerOrg}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Messages Stream */}
        <div className="md:col-span-8 flex flex-col justify-between">
          <div className="p-4 border-b border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#252525] dark:text-[#FFFDF7]">
                {activeReq.title}
              </h3>
              <span className="text-[11px] text-[#365C63] font-medium">
                Client: {activeReq.buyerName} ({activeReq.buyerOrg})
              </span>
            </div>
          </div>

          <div className="flex-1 p-5 overflow-y-auto space-y-4 max-h-[420px]">
            {reqMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.senderRole === 'provider' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl p-3.5 text-xs leading-relaxed ${
                    msg.senderRole === 'provider'
                      ? 'bg-[#252525] text-[#FFFDF7] rounded-br-none'
                      : 'bg-[#EAE6DA] dark:bg-[#232826] text-[#252525] dark:text-[#EDE9E1] border border-[#D2CEC2] dark:border-[#3C4743] rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-[#66645E] mt-1 px-1">
                  {msg.senderName} • {msg.timestamp}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-4 border-t border-[#D2CEC2] dark:border-[#3C4743] flex items-center gap-2 bg-[#FFFDF7] dark:bg-[#252525]">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Reply with workshop specifications, fabric details, or timing..."
              className="flex-1 h-10 rounded-md border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#232826] px-3.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#365C63]"
            />
            <Button type="submit" variant="primary" size="sm" className="h-10 px-4 gap-1.5">
              <Send className="h-3.5 w-3.5" /> Send Reply
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
