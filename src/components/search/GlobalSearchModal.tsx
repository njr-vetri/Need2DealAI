import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, FileText, Users, Package, ShoppingBag, ArrowRight } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';

export interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');
  const { searchAll } = useMarketplace();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Global keyboard shortcut Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = searchAll(query);

  const handleSelect = (link: string) => {
    navigate(link);
    onClose();
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'requirement':
        return <FileText className="h-4 w-4 text-[#365C63]" />;
      case 'provider':
        return <Users className="h-4 w-4 text-[#A37B52]" />;
      case 'order':
        return <Package className="h-4 w-4 text-[#6F8065]" />;
      case 'product':
        return <ShoppingBag className="h-4 w-4 text-[#5B7480]" />;
      default:
        return <FileText className="h-4 w-4 text-[#66645E]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      <div className="fixed inset-0 bg-[#252525]/45 transition-opacity" onClick={onClose} />

      <div className="relative z-10 w-full max-w-xl rounded-lg border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#272E2B] shadow-xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#272E2B]">
          <Search className="h-4 w-4 text-[#66645E] dark:text-[#A6A39A] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search requirements, suppliers, orders, or items..."
            className="w-full bg-transparent text-xs text-[#252525] dark:text-[#FFFDF7] placeholder-[#66645E]/70 dark:placeholder-[#A6A39A]/50 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#66645E] hover:text-[#252525] dark:hover:text-[#FFFDF7]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <kbd className="hidden sm:inline-block ml-2 px-1.5 py-0.5 text-[10px] font-mono text-[#66645E] dark:text-[#A6A39A] bg-[#EAE6DA] dark:bg-[#232826] rounded border border-[#D2CEC2] dark:border-[#3C4743]">
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div className="max-h-[380px] overflow-y-auto p-2">
          {query.trim() === '' ? (
            <div className="p-6 text-center text-xs text-[#66645E] dark:text-[#A6A39A]">
              <p className="font-semibold text-[#252525] dark:text-[#FFFDF7] text-xs mb-1">
                Quick Marketplace Search
              </p>
              <p>Type keywords to search across active demands, verified suppliers, and milestone orders.</p>
              <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                {['T-Shirts', 'ESP32', 'Planners', 'Chennai PrintWorks', 'Order #ord-801'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 text-xs rounded-md bg-[#EAE6DA] dark:bg-[#232826] text-[#252525] dark:text-[#EDE9E1] hover:bg-[#E2DDD2] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="divide-y divide-[#D2CEC2]/50 dark:divide-[#3C4743]/50">
              {results.map((res) => (
                <div
                  key={`${res.type}-${res.id}`}
                  onClick={() => handleSelect(res.link)}
                  className="flex items-center justify-between p-3 rounded-md hover:bg-[#EAE6DA]/70 dark:hover:bg-[#232826] transition-colors cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-md bg-[#EAE6DA] dark:bg-[#232826] mt-0.5">
                      {getIcon(res.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[#252525] dark:text-[#FFFDF7]">
                          {res.title}
                        </span>
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-[#365C63]/10 text-[#365C63] dark:bg-[#365C63]/30 dark:text-[#EDE9E1]">
                          {res.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#66645E] dark:text-[#A6A39A] mt-0.5">
                        {res.subtitle}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-[#66645E] group-hover:text-[#252525] dark:group-hover:text-[#FFFDF7] group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-[#66645E] dark:text-[#A6A39A]">
              No results found for &ldquo;<span className="font-semibold">{query}</span>&rdquo;.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
