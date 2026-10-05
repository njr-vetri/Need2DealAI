import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shirt, FileText, Cpu, Volume2, Hammer, Package, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { marketplaceCategories } from '../../data/mockData';

export function BuyerCategories() {
  const navigate = useNavigate();

  const iconMap: Record<string, React.ReactNode> = {
    Shirt: <Shirt className="h-6 w-6 text-[#365C63]" />,
    FileText: <FileText className="h-6 w-6 text-[#A37B52]" />,
    Cpu: <Cpu className="h-6 w-6 text-[#252525] dark:text-[#8BAAB8]" />,
    Volume2: <Volume2 className="h-6 w-6 text-[#9A5C55]" />,
    Hammer: <Hammer className="h-6 w-6 text-[#365C63]" />,
    Package: <Package className="h-6 w-6 text-[#A37B52]" />
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D2CEC2] dark:border-[#3C4743]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
            Procurement Categories
          </h1>
          <p className="text-xs sm:text-sm text-[#66645E] dark:text-[#A6A39A] mt-0.5">
            Explore verified vendor specializations across college fests, academic departments, and tech clubs.
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => navigate('/buyer/requirements/new')}
        >
          Post a Requirement
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marketplaceCategories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => navigate(`/buyer/requirements?cat=${encodeURIComponent(cat.name)}`)}
            className="p-6 rounded-2xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] hover:border-[#365C63] transition-all cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="h-12 w-12 rounded-xl bg-[#EAE6DA] dark:bg-[#232826] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                {iconMap[cat.icon] || <Package className="h-6 w-6" />}
              </div>
              <h3 className="text-lg font-bold text-[#252525] dark:text-[#FFFDF7]">
                {cat.name}
              </h3>
              <p className="text-xs text-[#66645E] dark:text-[#A6A39A] mt-1.5 leading-relaxed">
                {cat.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-[#D2CEC2]/50 flex items-center justify-between text-xs">
              <span className="font-mono font-bold text-[#365C63] dark:text-[#8BAAB8]">
                {cat.count} Active Requirements
              </span>
              <span className="flex items-center gap-1 font-semibold text-[#252525] dark:text-[#FFFDF7] group-hover:translate-x-1 transition-transform">
                Explore <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
