import * as React from "react"
import { Outlet } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { Sparkles } from "lucide-react"

export function DashboardLayout({ role }: { role: 'buyer' | 'provider' }) {
  const [assistantOpen, setAssistantOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar role={role} />
      <main className="pl-64 flex flex-col min-h-screen">
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </main>

      {/* Global AI Assistant Trigger */}
      <button 
        onClick={() => setAssistantOpen(!assistantOpen)}
        className="fixed bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        <Sparkles className="h-6 w-6" />
      </button>

      {/* Simple Assistant Drawer - Mock */}
      {assistantOpen && (
        <div className="fixed bottom-24 right-8 w-80 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl z-50 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h4 className="font-semibold text-sm flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary"/> Assistant</h4>
            <button onClick={() => setAssistantOpen(false)} className="text-gray-400 hover:text-gray-600 text-sm">Close</button>
          </div>
          <div className="h-64 overflow-y-auto text-sm text-gray-600 space-y-3">
            <p className="bg-gray-50 p-2 rounded-md">How can I help you today? I'm aware of the current page context.</p>
          </div>
          <input type="text" placeholder="Ask a question..." className="w-full text-sm rounded-md border border-gray-200 px-3 py-2 outline-none focus:border-primary" />
        </div>
      )}
    </div>
  )
}
