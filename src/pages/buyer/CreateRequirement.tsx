import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Save,
  CheckCircle2,
  Calendar,
  DollarSign,
  MapPin,
  Layers,
  FileText,
  Eye,
  Send,
  RotateCcw
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { useMarketplace } from '../../context/MarketplaceContext';

export function CreateRequirement() {
  const navigate = useNavigate();
  const { addRequirement } = useMarketplace();

  const [mode, setMode] = useState<'natural' | 'manual'>('natural');
  const [naturalText, setNaturalText] = useState(
    'I need 500 custom cotton T-shirts for our college event. Budget is ₹80,000 and I need delivery within 7 days in Chennai.'
  );

  // AI multi-phase extraction state
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentProcessStep, setCurrentProcessStep] = useState<number>(0);
  const [isExtracted, setIsExtracted] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const processingPhases = [
    'Reading requirement...',
    'Understanding product & material...',
    'Extracting quantity & units...',
    'Checking budget & feasibility...',
    'Understanding deadline & delivery window...',
    'Finding relevant certified categories...'
  ];

  // Extracted/Manual form fields
  const [title, setTitle] = useState('500 Custom Cotton T-Shirts for College Event');
  const [category, setCategory] = useState('Apparel');
  const [quantity, setQuantity] = useState(500);
  const [unit, setUnit] = useState('Pieces');
  const [budget, setBudget] = useState(80000);
  const [deadline, setDeadline] = useState('2026-10-18');
  const [location, setLocation] = useState('Anna University Campus, Chennai');
  const [description, setDescription] = useState(
    'Need 500 premium 200-220 GSM combed cotton round-neck t-shirts in Navy Blue with 2-color screen print front logo and sponsor badges on right sleeve. Assorted sizes (S, M, L, XL).'
  );
  const [preferences, setPreferences] = useState<string[]>([
    'Organic / Combed Cotton',
    'Pre-shrunk fabric required',
    'Physical sample approval before run',
    'Delivery 2 days before event'
  ]);
  const [prefInput, setPrefInput] = useState('');

  const samplePrompts = [
    'I need 500 custom cotton T-shirts for our college event. Budget is ₹80,000 and I need delivery within 7 days in Chennai.',
    'Need 20 assembled ESP32-S3 IoT development boards with CNC aluminum enclosures. Budget ₹35,000, deadline Oct 25.',
    'Require 2,500 hardcover student planners with gold foil stamping and matching lanyards. Budget ₹1,20,000 within 12 days.'
  ];

  const handleStartAIParse = (promptText?: string) => {
    const textToAnalyze = promptText || naturalText;
    if (!textToAnalyze.trim()) return;

    setIsProcessing(true);
    setCurrentProcessStep(0);
    setIsExtracted(false);

    // Multi-step progressive reveal
    const interval = setInterval(() => {
      setCurrentProcessStep((prev) => {
        if (prev < processingPhases.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            setIsExtracted(true);

            // Populate extracted fields based on prompt
            if (textToAnalyze.toLowerCase().includes('esp32') || textToAnalyze.toLowerCase().includes('iot')) {
              setTitle('20 Assembled ESP32-S3 IoT Boards with CNC Enclosure');
              setCategory('Electronics');
              setQuantity(20);
              setUnit('Kits');
              setBudget(35000);
              setDeadline('2026-10-25');
              setDescription('Custom assembled ESP32-S3 modules with onboard display breakout and laser etched black aluminum housing.');
            } else if (textToAnalyze.toLowerCase().includes('planner') || textToAnalyze.toLowerCase().includes('brochure')) {
              setTitle('2,500 Hardcover Spiral Planners with Foil Stamped Crest');
              setCategory('Print & Packaging');
              setQuantity(2500);
              setUnit('Sets');
              setBudget(120000);
              setDeadline('2026-10-22');
              setDescription('Custom academic student planners with twin wire spiral binding and gold foil embossed emblem.');
            } else {
              setTitle('500 Custom Cotton T-Shirts for College Event');
              setCategory('Apparel');
              setQuantity(500);
              setUnit('Pieces');
              setBudget(80000);
              setDeadline('2026-10-18');
              setDescription('Need 500 premium 200-220 GSM combed cotton round-neck t-shirts in Navy Blue with 2-color screen print front logo.');
            }
          }, 400);
          return prev;
        }
      });
    }, 450);
  };

  const handleAddPreference = () => {
    if (prefInput.trim() && !preferences.includes(prefInput.trim())) {
      setPreferences([...preferences, prefInput.trim()]);
      setPrefInput('');
    }
  };

  const handleRemovePreference = (idx: number) => {
    setPreferences(preferences.filter((_, i) => i !== idx));
  };

  const handlePublish = (status: 'active' | 'draft') => {
    const created = addRequirement({
      title: title || 'Untitled Procurement Demand',
      category,
      quantity: Number(quantity) || 100,
      unit,
      budget: Number(budget) || 50000,
      deadline,
      location,
      description,
      preferences,
      status
    });

    navigate(`/buyer/requirements/${created.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D2CEC2] dark:border-[#3C4743]">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#365C63] dark:text-[#8BAAB8] font-bold">
            Needs-First Creation
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]">
            Post What You Need
          </h1>
          <p className="text-xs sm:text-sm text-[#66645E] dark:text-[#A6A39A] mt-0.5">
            Describe your demand in plain natural language or fill out structured specifications.
          </p>
        </div>

        {/* Mode selector */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-[#EAE6DA] dark:bg-[#232826] self-start sm:self-auto border border-[#D2CEC2] dark:border-[#3C4743]">
          <button
            type="button"
            onClick={() => setMode('natural')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
              mode === 'natural'
                ? 'bg-[#FFFDF7] dark:bg-[#252525] text-[#252525] dark:text-[#FFFDF7] shadow-xs'
                : 'text-[#66645E] dark:text-[#A6A39A]'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-[#365C63]" /> Describe Naturally
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('manual');
              setIsExtracted(true);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
              mode === 'manual'
                ? 'bg-[#FFFDF7] dark:bg-[#252525] text-[#252525] dark:text-[#FFFDF7] shadow-xs'
                : 'text-[#66645E] dark:text-[#A6A39A]'
            }`}
          >
            <FileText className="h-3.5 w-3.5" /> Manual Spec Form
          </button>
        </div>
      </div>

      {/* MODE 1: Describe Naturally */}
      {mode === 'natural' && (
        <div className="rounded-2xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-[#252525] text-[#FFFDF7] dark:bg-[#FFFDF7] dark:text-[#252525] flex items-center justify-center shrink-0">
              <Sparkles className="h-5 w-5 text-[#8BAAB8] dark:text-[#365C63]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#252525] dark:text-[#FFFDF7]">
                What do you need procured?
              </h2>
              <p className="text-xs text-[#66645E] dark:text-[#A6A39A] mt-0.5 leading-relaxed">
                Describe item type, estimated quantity, budget ceiling, and delivery deadline. Our parser will extract structured deal terms automatically.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <textarea
              rows={4}
              value={naturalText}
              onChange={(e) => setNaturalText(e.target.value)}
              disabled={isProcessing}
              placeholder="e.g. I need 500 custom cotton T-shirts for our college event. Budget is ₹80,000 and I need delivery within 7 days in Chennai."
              className="w-full rounded-xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#232826] p-4 text-sm text-[#252525] dark:text-[#FFFDF7] placeholder-[#66645E]/60 focus:outline-none focus:ring-2 focus:ring-[#365C63] resize-none leading-relaxed"
            />

            {/* Prompt presets */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-[#66645E] dark:text-[#A6A39A]">
                Or try an example prompt:
              </span>
              <div className="flex flex-wrap gap-2">
                {samplePrompts.map((p, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setNaturalText(p);
                      handleStartAIParse(p);
                    }}
                    className="text-[11px] px-3 py-1.5 rounded-lg bg-[#EAE6DA]/70 dark:bg-[#232826] text-[#252525] dark:text-[#EDE9E1] hover:bg-[#D2CEC2] transition-colors border border-[#D2CEC2]/70 dark:border-[#3C4743] text-left"
                  >
                    {p.slice(0, 48)}...
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-[#66645E] dark:text-[#A6A39A]">
              Instant extraction with zero human delay
            </span>
            <Button
              variant="primary"
              size="md"
              disabled={isProcessing || !naturalText.trim()}
              onClick={() => handleStartAIParse()}
              className="gap-2"
            >
              <Sparkles className="h-4 w-4" /> Parse Requirement
            </Button>
          </div>

          {/* Multi-phase AI Processing Sequence Animation */}
          {isProcessing && (
            <div className="p-5 rounded-xl bg-[#EAE6DA]/60 dark:bg-[#232826] border border-[#D2CEC2] dark:border-[#3C4743] space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between text-xs font-bold text-[#365C63] dark:text-[#8BAAB8]">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#365C63] animate-ping" />
                  Intelligent Extraction in Progress...
                </span>
                <span>{currentProcessStep + 1} / {processingPhases.length}</span>
              </div>

              <div className="space-y-2">
                {processingPhases.map((phase, idx) => {
                  const isDone = idx < currentProcessStep;
                  const isCurrent = idx === currentProcessStep;
                  return (
                    <div
                      key={phase}
                      className={`flex items-center gap-2.5 text-xs transition-opacity ${
                        isDone
                          ? 'text-[#3D5A38] dark:text-[#8BAAB8] font-medium'
                          : isCurrent
                          ? 'text-[#252525] dark:text-[#FFFDF7] font-bold'
                          : 'text-[#66645E]/50 dark:text-[#A6A39A]/50'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="h-4 w-4 text-[#365C63] shrink-0" />
                      ) : isCurrent ? (
                        <span className="h-4 w-4 rounded-full border-2 border-[#365C63] border-t-transparent animate-spin shrink-0" />
                      ) : (
                        <span className="h-4 w-4 rounded-full border border-gray-300 dark:border-gray-600 shrink-0" />
                      )}
                      <span>{phase}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* EXTRACTED / STRUCTURED SPECIFICATION FORM (Editable before publish) */}
      {(isExtracted || mode === 'manual') && (
        <div className="rounded-2xl border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#252525] p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between pb-4 border-b border-[#D2CEC2]/60 dark:border-[#3C4743]/60">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="success">Extracted & Structured</Badge>
                <span className="text-xs text-[#66645E] dark:text-[#A6A39A]">Review terms before broadcasting</span>
              </div>
              <h3 className="text-lg font-bold text-[#252525] dark:text-[#FFFDF7] mt-1">
                Requirement Specifications
              </h3>
            </div>
            <button
              onClick={() => handleStartAIParse()}
              className="text-xs font-semibold text-[#365C63] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Re-parse
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <Input
                label="Requirement Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#252525] dark:text-[#EDE9E1]">
                Category <span className="text-[#9A5C55]">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-10 w-full rounded-md border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#232826] px-3 py-2 text-sm text-[#252525] dark:text-[#EDE9E1] focus:outline-none focus:ring-2 focus:ring-[#365C63]"
              >
                <option value="Apparel">Apparel</option>
                <option value="Print & Packaging">Print & Packaging</option>
                <option value="Electronics">Electronics</option>
                <option value="Event Services">Event Services</option>
                <option value="Custom Fabrication">Custom Fabrication</option>
                <option value="Bulk Supplies">Bulk Supplies</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
              />
              <Input
                label="Unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="Pieces, Kits, Sets"
                required
              />
            </div>

            <Input
              label="Maximum Budget Ceiling (₹)"
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              required
            />

            <Input
              label="Delivery Deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />

            <div className="md:col-span-2">
              <Input
                label="Delivery Handover Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                leftIcon={<MapPin className="h-4 w-4" />}
                required
              />
            </div>

            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#252525] dark:text-[#EDE9E1]">
                Detailed Technical Specifications & Quality Criteria
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-md border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#232826] p-3 text-sm text-[#252525] dark:text-[#FFFDF7] focus:outline-none focus:ring-2 focus:ring-[#365C63] leading-relaxed"
              />
            </div>

            {/* Special preferences / tags */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-semibold text-[#252525] dark:text-[#EDE9E1]">
                Quality Guarantees & Preferences
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {preferences.map((p, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-[#EAE6DA] dark:bg-[#232826] text-[#252525] dark:text-[#EDE9E1] border border-[#D2CEC2] dark:border-[#3C4743]"
                  >
                    {p}
                    <button
                      type="button"
                      onClick={() => handleRemovePreference(idx)}
                      className="text-[#66645E] hover:text-[#9A5C55] cursor-pointer ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={prefInput}
                  onChange={(e) => setPrefInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddPreference();
                    }
                  }}
                  placeholder="Type criteria (e.g. 'Colorfast warranty', 'ISO 9001') and press Add"
                  className="flex-1 h-9 rounded-md border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#232826] px-3 text-xs text-[#252525] dark:text-[#FFFDF7] focus:outline-none focus:ring-1 focus:ring-[#365C63]"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddPreference}
                  className="h-9"
                >
                  Add Tag
                </Button>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 border-t border-[#D2CEC2]/60 dark:border-[#3C4743]/60">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => handlePublish('draft')}
              className="gap-2"
            >
              <Save className="h-4 w-4" /> Save as Draft
            </Button>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => setPreviewOpen(true)}
                className="gap-2"
              >
                <Eye className="h-4 w-4" /> Preview
              </Button>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => handlePublish('active')}
                className="gap-2 shadow-sm"
              >
                Publish Requirement <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewOpen && (
        <Modal
          isOpen={previewOpen}
          onClose={() => setPreviewOpen(false)}
          title="Requirement Preview"
          description="This is how suppliers in your region will view your demand."
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-[#EAE6DA]/50 dark:bg-[#232826] border border-[#D2CEC2] dark:border-[#3C4743] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-[#66645E]">NEW DEMAND</span>
                <Badge variant="accent">{category}</Badge>
              </div>
              <h3 className="text-base font-bold text-[#252525] dark:text-[#FFFDF7]">{title}</h3>
              <p className="text-[#66645E] dark:text-[#A6A39A]">{description}</p>
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#D2CEC2]/50 text-xs font-semibold">
                <div>Budget: ₹{budget.toLocaleString()}</div>
                <div>Quantity: {quantity} {unit}</div>
                <div>Deadline: {deadline}</div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" size="sm" onClick={() => setPreviewOpen(false)}>
                Back to Edit
              </Button>
              <Button variant="primary" size="sm" onClick={() => handlePublish('active')}>
                Confirm & Publish Now
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
