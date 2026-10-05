import React, { useState } from 'react';
import { ShoppingBag, Plus, Search, Trash2, Edit2, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { useMarketplace } from '../../context/MarketplaceContext';
import { CatalogProduct } from '../../data/mockData';

export function ProviderCatalog() {
  const { catalog, addProduct, deleteProduct } = useMarketplace();
  const [search, setSearch] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);

  // New product form fields
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Apparel');
  const [description, setDescription] = useState('');
  const [startingPrice, setStartingPrice] = useState(150);
  const [typicalDelivery, setTypicalDelivery] = useState('4-6 days');
  const [availability, setAvailability] = useState<'In Stock' | 'Made to Order' | 'High Capacity'>('Made to Order');
  const [specInput, setSpecInput] = useState('');
  const [specs, setSpecs] = useState<string[]>(['Pre-shrunk', 'Custom Screen Print Ready']);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addProduct({
      providerId: 'p1',
      name,
      category,
      description,
      startingPrice: Number(startingPrice),
      typicalDelivery,
      availability,
      specifications: specs
    });

    setAddModalOpen(false);
    setName('');
    setDescription('');
  };

  const filtered = catalog.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D2CEC2] dark:border-[#3C4743]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
            Machinery & Product Catalog
          </h1>
          <p className="text-xs sm:text-sm text-[#66645E] dark:text-[#A6A39A] mt-0.5">
            Manage your standard workshop deliverables, baseline pricing, and capacity parameters.
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => setAddModalOpen(true)}
          className="gap-2 shadow-xs"
        >
          <Plus className="h-4 w-4" /> Add Product / Service
        </Button>
      </div>

      <div className="max-w-md">
        <Input
          placeholder="Search products or fabrication capabilities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search className="h-4 w-4" />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] p-6 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <Badge variant="accent">{item.category}</Badge>
                <Badge variant={item.availability === 'High Capacity' ? 'success' : 'neutral'}>
                  {item.availability}
                </Badge>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#252525] dark:text-[#FFFDF7]">
                  {item.name}
                </h3>
                <p className="text-xs text-[#66645E] dark:text-[#A6A39A] mt-1 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.specifications.map((s) => (
                  <span
                    key={s}
                    className="text-[10px] px-2 py-0.5 rounded bg-[#EAE6DA]/60 dark:bg-[#232826] text-[#252525] dark:text-[#EDE9E1]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#D2CEC2]/50 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-[#66645E] block">Base Price</span>
                <strong className="text-sm font-bold text-[#365C63]">₹{item.startingPrice}</strong>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#66645E]">{item.typicalDelivery}</span>
                <button
                  onClick={() => deleteProduct(item.id)}
                  className="p-1.5 rounded-md text-[#66645E] hover:text-[#9A5C55] transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Product Modal */}
      {addModalOpen && (
        <Modal
          isOpen={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          title="Add Catalog Deliverable"
          description="Publish a standard product or capability to your verified supplier profile."
        >
          <form onSubmit={handleAdd} className="space-y-4 text-xs">
            <Input
              label="Deliverable Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. 240 GSM Organic Fleece College Hoodies"
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="h-9 rounded-md border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#232826] px-2.5"
                >
                  <option value="Apparel">Apparel</option>
                  <option value="Print & Packaging">Print & Packaging</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Event Services">Event Services</option>
                </select>
              </div>
              <Input
                label="Baseline Unit Price (₹)"
                type="number"
                value={startingPrice}
                onChange={(e) => setStartingPrice(Number(e.target.value))}
                required
              />
            </div>

            <Input
              label="Typical Turnaround Time"
              value={typicalDelivery}
              onChange={(e) => setTypicalDelivery(e.target.value)}
              placeholder="e.g. 4-6 days"
              required
            />

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold">Description</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Product specifications, fabric weave, ink certifications..."
                className="w-full rounded-md border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#232826] p-2.5"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#D2CEC2]/60">
              <Button variant="ghost" size="sm" type="button" onClick={() => setAddModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit">
                Save to Catalog
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
