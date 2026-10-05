import * as React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/Button"
import { Card, CardContent } from "../../components/ui/Card"
import { Input } from "../../components/ui/Input"
import { Bot, ArrowRight, Loader2, Save } from "lucide-react"

export function CreateRequirement() {
  const navigate = useNavigate();
  const [mode, setMode] = React.useState<'chat' | 'form'>('chat');
  const [analyzing, setAnalyzing] = React.useState(false);
  const [extracted, setExtracted] = React.useState(false);

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setExtracted(true);
      setMode('form');
    }, 2500); // Simulate AI processing
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create Requirement</h1>
          <p className="text-gray-500 mt-1">Describe what you need, and we'll match you with the right providers.</p>
        </div>
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          <button 
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === 'chat' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-900'}`}
            onClick={() => setMode('chat')}
          >
            AI Assistant
          </button>
          <button 
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === 'form' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-900'}`}
            onClick={() => setMode('form')}
          >
            Manual Form
          </button>
        </div>
      </div>

      {mode === 'chat' && !extracted && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-8 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary text-white rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Describe what you need</h3>
                <p className="text-sm text-gray-600">I will extract the details and prepare the requirement for you.</p>
              </div>
            </div>
            
            <form onSubmit={handleChatSubmit} className="flex flex-col gap-4">
              <textarea 
                className="w-full h-32 rounded-lg border border-gray-300 bg-white p-4 focus:outline-none focus:ring-2 focus:ring-primary resize-none shadow-sm"
                placeholder="Example: I need 500 custom T-shirts for a college event. My budget is ₹80,000 and I need them delivered within 7 days in Chennai."
                disabled={analyzing}
              ></textarea>
              <div className="flex justify-end">
                <Button type="submit" disabled={analyzing} className="gap-2">
                  {analyzing ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Analyzing requirement...</>
                  ) : (
                    <>Analyze Requirement <ArrowRight className="h-4 w-4" /></>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {mode === 'form' && (
        <div className="flex flex-col gap-8 animate-in fade-in">
          {extracted && (
            <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg flex items-start gap-3">
              <Bot className="h-5 w-5 mt-0.5 text-green-600" />
              <div>
                <p className="font-semibold">Requirement Extracted Successfully</p>
                <p className="text-sm mt-1">I found 12 providers that match these parameters. Please review and publish.</p>
              </div>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <div className="col-span-2">
              <Input label="Requirement Title" defaultValue={extracted ? "500 Custom T-Shirts for College Event" : ""} />
            </div>
            <Input label="Category" defaultValue={extracted ? "Apparel" : ""} />
            <Input label="Quantity" type="number" defaultValue={extracted ? "500" : ""} />
            <Input label="Budget (Max)" type="number" defaultValue={extracted ? "80000" : ""} />
            <Input label="Deadline" type="date" />
            <div className="col-span-2 flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Detailed Description</label>
              <textarea className="w-full h-24 rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"></textarea>
            </div>
          </div>
          
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <Button variant="outline" className="gap-2" onClick={() => navigate('/buyer')}>
              <Save className="h-4 w-4" /> Save as Draft
            </Button>
            <Button onClick={() => navigate('/buyer')}>
              Publish Requirement
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
