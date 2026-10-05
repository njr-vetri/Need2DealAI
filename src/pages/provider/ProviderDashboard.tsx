import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/Button"
import { Card, CardContent } from "../../components/ui/Card"
import { Badge } from "../../components/ui/Badge"
import { mockRequirements, mockOrders } from "../../data/mockData"
import { Sparkles, Clock } from "lucide-react"

export function ProviderDashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Provider Workspace</h1>
          <p className="text-gray-500 mt-1">Review new opportunities and manage your fulfillment.</p>
        </div>
        <Button onClick={() => navigate('/provider/requirements')} className="gap-2">
          Find Opportunities
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-3 border-y border-gray-200 py-8">
        <div className="flex flex-col gap-2 border-l-2 border-primary pl-4">
          <span className="text-sm font-medium text-primary uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="h-4 w-4" /> New Matches
          </span>
          <div className="text-4xl font-bold text-primary tracking-tight">
            12
          </div>
          <span className="text-xs text-primary/70 font-medium">Found in the last 24h</span>
        </div>
        <div className="flex flex-col gap-2 border-l-2 border-gray-200 pl-4">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Offers Pending</span>
          <div className="text-4xl font-bold text-gray-900 tracking-tight">
            4
          </div>
        </div>
        <div className="flex flex-col gap-2 border-l-2 border-gray-200 pl-4">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Active Orders</span>
          <div className="text-4xl font-bold text-gray-900 tracking-tight">
            {mockOrders.length}
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Matched For You</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/provider/requirements')}>View all</Button>
          </div>
          <div className="flex flex-col gap-3">
            {mockRequirements.map(req => (
              <Card key={req.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/provider/requirements/${req.id}`)}>
                <CardContent className="p-5 flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-gray-900 leading-tight pr-4">{req.title}</span>
                    <Badge variant="success" className="shrink-0">96% Match</Badge>
                  </div>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span className="font-mono bg-gray-50 px-2 py-1 rounded">Budget: ₹{req.budget.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3"/> {req.deadline}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2">Submit Offer</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Action Required</h2>
          </div>
          <div className="flex flex-col gap-3">
            {mockOrders.map(order => (
              <Card key={order.id} className="border-l-4 border-l-amber-500">
                <CardContent className="p-5 flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-gray-900">{order.title}</span>
                    <Badge variant="warning">{order.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">Please update the fulfillment status. The deadline is approaching.</p>
                  <div className="flex justify-end mt-2">
                    <Button size="sm">Update Status</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
